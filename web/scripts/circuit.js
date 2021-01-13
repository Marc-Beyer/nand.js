var Circuit = /** @class */ (function () {
    function Circuit(grid) {
        if (grid === void 0) { grid = { x: 1, y: 1 }; }
        this.gates = [];
        this.gloabalOffset = { x: 0, y: 0 };
        this.activeIO = null;
        this.drawPreviewConnection = null;
        this.activeConnection = null;
        this.activeOffset = null;
        this.mainCanvasRealWidth = 1000;
        this.mainCanvasRealHeight = 1000;
        this._zoomFactor = 1;
        this.mainCanvas = document.getElementById("main-canvas");
        this.ctx = this.mainCanvas.getContext("2d");
        var rect = this.mainCanvas.getBoundingClientRect();
        this.mainCanvas.width = rect.width;
        this.mainCanvas.height = rect.height;
        this.mainCanvasRealWidth = this.mainCanvas.width;
        this.mainCanvasRealHeight = this.mainCanvas.height;
        this.grid = grid;
        this.connectionManager = new ConnectionManager();
        // Add mouse event handler
        this.mainCanvas.addEventListener("mousedown", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("mousemove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("mouseup", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("mouseout", this.mouseoutEventHandler);
        this.mainCanvas.addEventListener("wheel", this.wheelEventHandler);
        // Add touch event handler
        this.mainCanvas.addEventListener("touchstart", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("touchmove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("touchend", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("touchcancel", this.mouseoutEventHandler);
        // Add keydown event handler
        document.addEventListener("keydown", this.keydownEventHandler);
        // Add resize event handler
        window.addEventListener('resize', this.reportWindowSize);
    }
    Object.defineProperty(Circuit.prototype, "zoomFactor", {
        get: function () {
            return this._zoomFactor;
        },
        set: function (value) {
            //console.log("this._zoomFactor",this.zoomFactor);
            var oldWidth = this.mainCanvas.width;
            var oldHeight = this.mainCanvas.height;
            this.mainCanvas.width = this.mainCanvasRealWidth * value;
            this.mainCanvas.height = this.mainCanvasRealHeight * value;
            this._zoomFactor = value;
            oldWidth -= this.mainCanvas.width;
            oldHeight -= this.mainCanvas.height;
            this.gloabalOffset.x -= oldWidth / 2;
            this.gloabalOffset.y -= oldHeight / 2;
        },
        enumerable: true,
        configurable: true
    });
    // Redraw the canvas
    Circuit.prototype.refrashCanvas = function () {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        // Set style
        this.ctx.lineWidth = OPTIONS.strokeSize;
        this.ctx.font = "17px Courier New";
        this.ctx.textAlign = "center";
        this.ctx.strokeStyle = "#DDDDDD";
        this.ctx.fillStyle = "#DDDDDD";
        // Darw Gates and Connections
        mainCircuit.connectionManager.drawConnations(this.ctx, this.gloabalOffset);
        for (var i = this.gates.length - 1; i >= 0; i--) {
            this.gates[i].drawGate(this.ctx, this.gloabalOffset);
        }
        // Draw preview-connection
        if (this.drawPreviewConnection != null && mainCircuit.activeIO != null) {
            var ioPosition = null;
            mainCircuit.ctx.beginPath();
            if (mainCircuit.activeIO.ioType === IO_TYPE.Input) {
                ioPosition = mainCircuit.activeIO.gate.getInputPosition(mainCircuit.activeIO.ioNr);
                mainCircuit.ctx.moveTo(ioPosition.x + mainCircuit.gloabalOffset.x, ioPosition.y + mainCircuit.gloabalOffset.y);
            }
            else {
                if (mainCircuit.activeIO.gate.getOutput(mainCircuit.activeIO.ioNr)) {
                    mainCircuit.ctx.strokeStyle = OPTIONS.COLOR.active;
                }
                else {
                    mainCircuit.ctx.strokeStyle = OPTIONS.COLOR.main;
                }
                ioPosition = mainCircuit.activeIO.gate.getOutputPosition(mainCircuit.activeIO.ioNr);
                mainCircuit.ctx.moveTo(ioPosition.x + mainCircuit.activeIO.gate.ioWidth + mainCircuit.gloabalOffset.x, ioPosition.y + mainCircuit.gloabalOffset.y);
            }
            mainCircuit.ctx.lineTo(this.drawPreviewConnection.x + mainCircuit.gloabalOffset.x, this.drawPreviewConnection.y + mainCircuit.gloabalOffset.y);
            mainCircuit.ctx.stroke();
            mainCircuit.ctx.strokeStyle = OPTIONS.COLOR.main;
        }
    };
    // Get the first Gate at the position
    Circuit.prototype.getGateAtPosition = function (position) {
        for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
            var gate = _a[_i];
            if (gate.isGateInPosition(position)) {
                return gate;
            }
        }
        return null;
    };
    // Get the first input at the position
    Circuit.prototype.getInputAtPosition = function (position) {
        for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
            var gate = _a[_i];
            // Get the first input at the position and check if there is one 
            var input = gate.gateInputAtPosition(position);
            if (input !== null) {
                return { gate: gate, ioNr: input, ioType: IO_TYPE.Input };
            }
        }
        return null;
    };
    // Get the first output at the position
    Circuit.prototype.getOutputAtPosition = function (position) {
        for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
            var gate = _a[_i];
            // Get the first output at the position and check if there is one 
            var output = gate.gateOutputAtPosition(position);
            if (output !== null) {
                return { gate: gate, ioNr: output, ioType: IO_TYPE.Output };
            }
        }
        return null;
    };
    // Get the first IO at the position
    Circuit.prototype.getIOAtPosition = function (position) {
        for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
            var gate = _a[_i];
            // Get the first input at the position and check if there is one 
            var input = gate.gateInputAtPosition(position);
            if (input !== null) {
                return { gate: gate, ioNr: input, ioType: IO_TYPE.Input };
            }
            else {
                // Get the first output at the position and check if there is one 
                var output = gate.gateOutputAtPosition(position);
                if (output !== null) {
                    return { gate: gate, ioNr: output, ioType: IO_TYPE.Output };
                }
            }
        }
        return null;
    };
    // Return nearest posion on grid
    Circuit.prototype.stickPositionToGrid = function (position) {
        position.x += this.grid.x / 2;
        position.y += this.grid.y / 2;
        position.x -= position.x % this.grid.x;
        position.y -= position.y % this.grid.y;
        return position;
    };
    // Get the mouseposition on the canvas from a mouseevent
    Circuit.prototype.getMousePositionOnCanvas = function (event) {
        var rect = this.mainCanvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * this.zoomFactor - this.gloabalOffset.x,
            y: (event.clientY - rect.top) * this.zoomFactor - this.gloabalOffset.y
        };
    };
    // Delete the gate and all connections
    Circuit.prototype.deleteGate = function (gate) {
        var gateIndex = this.gates.indexOf(gate);
        if (gateIndex > -1) {
            this.connectionManager.deleteAllConnections(gate);
            this.gates.splice(gateIndex, 1);
            gate.onDestroy();
            this.refrashCanvas();
        }
    };
    /////////////////////
    /// Event-Handler ///
    /////////////////////
    Circuit.prototype.mousedownEventHandler = function (e) {
        // Check if the user clicked on a gate
        mainCircuit.activeGate = mainCircuit.getGateAtPosition(mainCircuit.getMousePositionOnCanvas(e));
        if (mainCircuit.activeGate !== null) {
            mainCircuit.activeOffset = mainCircuit.activeGate.getOffsetPosition(mainCircuit.getMousePositionOnCanvas(e));
            mainCircuit.activeIO = null;
            mainCircuit.activeConnection = null;
        }
        else {
            // Check if the user clicked on an input or output
            mainCircuit.activeIO = mainCircuit.getIOAtPosition(mainCircuit.getMousePositionOnCanvas(e));
            if (mainCircuit.activeIO !== null) {
                mainCircuit.activeConnection = null;
            }
            else {
                // Check if the user clicked on a connection
                mainCircuit.activeConnection = mainCircuit.connectionManager.getConnectionAtPosition(mainCircuit.getMousePositionOnCanvas(e));
            }
        }
        mainCircuit.isMouseDown = true;
    };
    Circuit.prototype.mousemoveEventHandler = function (e) {
        if (mainCircuit.isMouseDown) {
            if (mainCircuit.activeGate !== null) {
                // Move activeGate
                var mousePosition = mainCircuit.getMousePositionOnCanvas(e);
                mousePosition.x += mainCircuit.activeOffset.x;
                mousePosition.y += mainCircuit.activeOffset.y;
                mainCircuit.activeGate.transform.position = mainCircuit.stickPositionToGrid(mousePosition);
                mainCircuit.refrashCanvas();
            }
            else if (mainCircuit.activeIO !== null) {
                // Draw unfinished connection
                mainCircuit.drawPreviewConnection = mainCircuit.stickPositionToGrid(mainCircuit.getMousePositionOnCanvas(e));
                mainCircuit.refrashCanvas();
            }
            else {
                // Change globalOffset
                mainCircuit.gloabalOffset.x += e.movementX * mainCircuit.zoomFactor;
                mainCircuit.gloabalOffset.y += e.movementY * mainCircuit.zoomFactor;
                mainCircuit.refrashCanvas();
            }
        }
    };
    Circuit.prototype.mouseupEventHandler = function (e) {
        mainCircuit.isMouseDown = false;
        if (mainCircuit.activeIO !== null) {
            if (mainCircuit.activeIO.ioType === IO_TYPE.Input) {
                var output = mainCircuit.getOutputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if (output !== null) {
                    // Create a new Connection
                    mainCircuit.connectionManager.addConnection({
                        fromGate: output.gate,
                        fromOutputNr: output.ioNr,
                        toGate: mainCircuit.activeIO.gate,
                        toInputNr: mainCircuit.activeIO.ioNr
                    });
                }
            }
            else if (mainCircuit.activeIO.ioType === IO_TYPE.Output) {
                var input = mainCircuit.getInputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if (input !== null) {
                    // Create a new Connection
                    mainCircuit.connectionManager.addConnection({
                        fromGate: mainCircuit.activeIO.gate,
                        fromOutputNr: mainCircuit.activeIO.ioNr,
                        toGate: input.gate,
                        toInputNr: input.ioNr
                    });
                }
                else {
                    var connGate = new Connection_Gate(mainCircuit.stickPositionToGrid(mainCircuit.getMousePositionOnCanvas(e)));
                    mainCircuit.gates.push(connGate);
                    mainCircuit.connectionManager.addConnection({
                        fromGate: mainCircuit.activeIO.gate,
                        fromOutputNr: mainCircuit.activeIO.ioNr,
                        toGate: connGate,
                        toInputNr: 0
                    });
                    mainCircuit.activeGate = connGate;
                }
            }
        }
        if (mainCircuit.activeGate !== null) {
            mainCircuit.activeGate.onMouseUp();
        }
        mainCircuit.activeIO = null;
        this.drawPreviewConnection = null;
        mainCircuit.refrashCanvas();
    };
    Circuit.prototype.mouseoutEventHandler = function (e) {
        mainCircuit.isMouseDown = false;
        mainCircuit.activeIO = null;
        this.drawPreviewConnection = null;
        mainCircuit.refrashCanvas();
    };
    Circuit.prototype.wheelEventHandler = function (e) {
        e.preventDefault();
        mainCircuit.zoomFactor = mainCircuit.zoomFactor + e.deltaY * 0.01;
        mainCircuit.refrashCanvas();
    };
    Circuit.prototype.keydownEventHandler = function (e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            if (mainCircuit.activeGate !== null) {
                mainCircuit.deleteGate(mainCircuit.activeGate);
                mainCircuit.activeGate = null;
            }
            else if (mainCircuit.activeConnection !== null) {
                mainCircuit.connectionManager.removeConnection(mainCircuit.activeConnection);
                mainCircuit.refrashCanvas();
                mainCircuit.activeConnection = null;
            }
        }
    };
    Circuit.prototype.reportWindowSize = function (e) {
        mainCircuit.mainCanvasRealWidth = mainCircuit.mainCanvas.getBoundingClientRect().width;
        mainCircuit.mainCanvasRealHeight = mainCircuit.mainCanvas.getBoundingClientRect().height;
        mainCircuit.zoomFactor = mainCircuit.zoomFactor;
        mainCircuit.refrashCanvas();
    };
    Circuit.prototype.addGate = function (nr, position, para) {
        if (para === void 0) { para = null; }
        switch (nr) {
            case GATE_TYPE.CONST_HIGH_Gate:
                mainCircuit.gates.unshift(new CONST_HIGH_Gate(position));
                break;
            case GATE_TYPE.CONST_LOW_Gate:
                mainCircuit.gates.unshift(new CONST_LOW_Gate(position));
                break;
            case GATE_TYPE.Switch:
                mainCircuit.gates.unshift(new Switch_Gate(position));
                break;
            case GATE_TYPE.Buffer:
                mainCircuit.gates.unshift(new Buffer_Gate(position));
                break;
            case GATE_TYPE.NOT:
                mainCircuit.gates.unshift(new NOT_Gate(position));
                break;
            case GATE_TYPE.AND:
                mainCircuit.gates.unshift(new AND_Gate(position));
                break;
            case GATE_TYPE.OR:
                mainCircuit.gates.unshift(new OR_Gate(position));
                break;
            case GATE_TYPE.NAND:
                mainCircuit.gates.unshift(new NAND_Gate(position));
                break;
            case GATE_TYPE.NOR:
                mainCircuit.gates.unshift(new NOR_Gate(position));
                break;
            case GATE_TYPE.XOR:
                mainCircuit.gates.unshift(new XOR_Gate(position));
                break;
            case GATE_TYPE.XNOR:
                mainCircuit.gates.unshift(new XNOR_Gate(position));
                break;
            case GATE_TYPE.Lamp:
                mainCircuit.gates.unshift(new Lamp_Gate(position));
                break;
            case GATE_TYPE.Display:
                mainCircuit.gates.unshift(new Display_Gate(position));
                break;
            case GATE_TYPE.Lable:
                mainCircuit.gates.unshift(new Lable_Gate(position, para[0]));
                break;
            case GATE_TYPE.Connection:
                mainCircuit.gates.unshift(new Connection_Gate(position));
                break;
            case GATE_TYPE.Button:
                mainCircuit.gates.unshift(new Button_Gate(position));
                break;
            case GATE_TYPE.Clock:
                mainCircuit.gates.unshift(new Clock_Gate(position));
                break;
        }
        mainCircuit.refrashCanvas();
    };
    return Circuit;
}());
//# sourceMappingURL=circuit.js.map