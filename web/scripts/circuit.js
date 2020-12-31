var Circuit = /** @class */ (function () {
    function Circuit(grid) {
        if (grid === void 0) { grid = { x: 1, y: 1 }; }
        this.gates = [];
        this.activeIO = null;
        this.activeOffset = null;
        this.gloabalOffset = { x: 0, y: 0 };
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
        //TODO resize window event handler
        this.grid = grid;
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
    }
    Object.defineProperty(Circuit.prototype, "zoomFactor", {
        get: function () {
            return this._zoomFactor;
        },
        set: function (value) {
            //console.log("this._zoomFactor",this.zoomFactor);
            this.mainCanvas.width = this.mainCanvasRealWidth * value;
            this.mainCanvas.height = this.mainCanvasRealHeight * value;
            this._zoomFactor = value;
        },
        enumerable: true,
        configurable: true
    });
    // Redraw the canvas
    Circuit.prototype.refrashCanvas = function () {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        // Set style
        this.ctx.lineWidth = 3;
        this.ctx.font = "17px Courier New";
        this.ctx.textAlign = "center";
        this.ctx.strokeStyle = "#DDDDDD";
        this.ctx.fillStyle = "#DDDDDD";
        // Darw Gates and Connections
        for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
            var gate = _a[_i];
            gate.drawConnations(this.ctx, this.gloabalOffset);
        }
        for (var _b = 0, _c = this.gates; _b < _c.length; _b++) {
            var gate = _c[_b];
            gate.drawGate(this.ctx, this.gloabalOffset);
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
                return { gate: gate, ioNr: input, ioType: IOType.Input };
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
                return { gate: gate, ioNr: output, ioType: IOType.Output };
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
                return { gate: gate, ioNr: input, ioType: IOType.Input };
            }
            else {
                // Get the first output at the position and check if there is one 
                var output = gate.gateOutputAtPosition(position);
                if (output !== null) {
                    return { gate: gate, ioNr: output, ioType: IOType.Output };
                }
            }
        }
        return null;
    };
    // Return nearest posion on grid
    Circuit.prototype.stickPositionToGrid = function (position) {
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
    /////////////////////
    /// Event-Handler ///
    /////////////////////
    Circuit.prototype.mousedownEventHandler = function (e) {
        ////console.log("e", e);
        // Check if the user clicked on a gate
        mainCircuit.activeGate = mainCircuit.getGateAtPosition(mainCircuit.getMousePositionOnCanvas(e));
        if (mainCircuit.activeGate !== null) {
            mainCircuit.activeOffset = mainCircuit.activeGate.getOffsetPosition(mainCircuit.getMousePositionOnCanvas(e));
            mainCircuit.activeIO = null;
        }
        else {
            // Check if the user clicked on an input or output
            mainCircuit.activeIO = mainCircuit.getIOAtPosition(mainCircuit.getMousePositionOnCanvas(e));
            if (mainCircuit.activeIO !== null) {
                //console.log(mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
            }
        }
        mainCircuit.isMouseDown = true;
    };
    Circuit.prototype.mousemoveEventHandler = function (e) {
        ////console.log("e", e);
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
                mainCircuit.refrashCanvas();
                var ioPosition = null;
                var mousePosition = mainCircuit.getMousePositionOnCanvas(e);
                mainCircuit.ctx.beginPath();
                if (mainCircuit.activeIO.ioType === IOType.Input) {
                    ioPosition = mainCircuit.activeIO.gate.getInputPosition(mainCircuit.activeIO.ioNr);
                    mainCircuit.ctx.moveTo(ioPosition.x + mainCircuit.gloabalOffset.x, ioPosition.y + mainCircuit.activeIO.gate.ioHeight / 2 + mainCircuit.gloabalOffset.y);
                }
                else {
                    ioPosition = mainCircuit.activeIO.gate.getOutputPosition(mainCircuit.activeIO.ioNr);
                    mainCircuit.ctx.moveTo(ioPosition.x + mainCircuit.activeIO.gate.ioWidth + mainCircuit.gloabalOffset.x, ioPosition.y + mainCircuit.activeIO.gate.ioHeight / 2 + mainCircuit.gloabalOffset.y);
                }
                mainCircuit.ctx.lineTo(mousePosition.x + mainCircuit.gloabalOffset.x, mousePosition.y + mainCircuit.gloabalOffset.y);
                mainCircuit.ctx.stroke();
            }
            else {
                // Change globalOffset
                mainCircuit.gloabalOffset.x += e.movementX * mainCircuit.zoomFactor;
                mainCircuit.gloabalOffset.y += e.movementY * mainCircuit.zoomFactor;
                //console.log(" * this.zoomFactor", mainCircuit.zoomFactor,"mainCircuit.gloabalOffset.x",mainCircuit.gloabalOffset.x,"mainCircuit.gloabalOffset.y",mainCircuit.gloabalOffset.y);
                mainCircuit.refrashCanvas();
            }
            0;
        }
    };
    Circuit.prototype.mouseupEventHandler = function (e) {
        mainCircuit.isMouseDown = false;
        if (mainCircuit.activeIO !== null) {
            if (mainCircuit.activeIO.ioType === IOType.Input) {
                var output = mainCircuit.getOutputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if (output !== null) {
                    // Create a new Connection
                    output.gate.connections.push({ gate: mainCircuit.activeIO.gate, outputNr: output.ioNr, inputNr: mainCircuit.activeIO.ioNr });
                    mainCircuit.activeIO.gate.updateInput(mainCircuit.activeIO.ioNr, output.gate.getOutput());
                }
            }
            else if (mainCircuit.activeIO.ioType === IOType.Output) {
                var input = mainCircuit.getInputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if (input !== null) {
                    // Create a new Connection
                    mainCircuit.activeIO.gate.connections.push({ gate: input.gate, outputNr: mainCircuit.activeIO.ioNr, inputNr: input.ioNr });
                    input.gate.updateInput(input.ioNr, mainCircuit.activeIO.gate.getOutput());
                }
            }
        }
        mainCircuit.refrashCanvas();
    };
    Circuit.prototype.mouseoutEventHandler = function (e) {
        ////console.log("e", e);
        mainCircuit.isMouseDown = false;
    };
    Circuit.prototype.wheelEventHandler = function (e) {
        e.preventDefault();
        mainCircuit.zoomFactor = mainCircuit.zoomFactor + e.deltaY * 0.01;
        mainCircuit.refrashCanvas();
    };
    Circuit.prototype.keydownEventHandler = function (e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            if (mainCircuit.activeGate !== null) {
                var gateIndex = mainCircuit.gates.indexOf(mainCircuit.activeGate);
                if (gateIndex > -1) {
                    mainCircuit.gates.splice(gateIndex, 1);
                    mainCircuit.refrashCanvas();
                }
            }
        }
    };
    return Circuit;
}());
//# sourceMappingURL=circuit.js.map