var Circuit = /** @class */ (function () {
    function Circuit(grid) {
        if (grid === void 0) { grid = { x: 1, y: 1 }; }
        this.activeIO = null;
        this.activeOffset = null;
        this.gates = [];
        this.mainCanvas = document.getElementById("main-canvas");
        this.ctx = this.mainCanvas.getContext("2d");
        var rect = this.mainCanvas.getBoundingClientRect();
        this.mainCanvas.width = rect.width;
        this.mainCanvas.height = rect.height;
        //TODO resize window event handler
        this.grid = grid;
        // Add mouse event handler
        this.mainCanvas.addEventListener("mousedown", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("mousemove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("mouseup", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("mouseout", this.mouseoutEventHandler);
        // Add touch event handler
        this.mainCanvas.addEventListener("touchstart", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("touchmove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("touchend", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("touchcancel", this.mouseoutEventHandler);
        this.gates.push(new Gate("&", 2, 1, { x: 30, y: 10 }));
        this.gates.push(new Gate("&", 3, 1, { x: 500, y: 10 }));
        this.gates.push(new Gate("&", 1, 2, { x: 400, y: 510 }));
        this.gates.push(new Gate("&", 4, 4, { x: 1100, y: 110 }));
        this.gates.push(new Gate("&", 4, 4, { x: 1400, y: 410 }));
        this.gates[0].connections.push({ gate: this.gates[1], outputNr: 0, inputNr: 0 });
        this.refrashCanvas();
    }
    // Redraw the canvas
    Circuit.prototype.refrashCanvas = function () {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        // Set style
        this.ctx.lineWidth = 3;
        this.ctx.font = "30px Arial";
        this.ctx.strokeStyle = "#DDDDDD";
        this.ctx.fillStyle = "#DDDDDD";
        // Darw Gates and Connections
        for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
            var gate = _a[_i];
            gate.drawConnations(this.ctx);
        }
        for (var _b = 0, _c = this.gates; _b < _c.length; _b++) {
            var gate = _c[_b];
            gate.drawGate(this.ctx);
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
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    /////////////////////
    /// Event-Handler ///
    /////////////////////
    Circuit.prototype.mousedownEventHandler = function (e) {
        //console.log("e", e);
        // Check if the user clicked on a gate
        mainCircuit.activeGate = mainCircuit.getGateAtPosition(mainCircuit.getMousePositionOnCanvas(e));
        if (mainCircuit.activeGate !== null) {
            mainCircuit.activeOffset = mainCircuit.activeGate.getOffsetPosition(mainCircuit.getMousePositionOnCanvas(e));
        }
        else {
            // Check if the user clicked on an input or output
            mainCircuit.activeIO = mainCircuit.getIOAtPosition(mainCircuit.getMousePositionOnCanvas(e));
            if (mainCircuit.activeIO !== null) {
                console.log(mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
            }
        }
        mainCircuit.isMouseDown = true;
    };
    Circuit.prototype.mousemoveEventHandler = function (e) {
        //console.log("e", e);
        if (mainCircuit.isMouseDown && mainCircuit.activeGate !== null) {
            //console.log(mainCircuit.activeGate.toString());
            mainCircuit.activeGate.transform.position = mainCircuit.stickPositionToGrid({ x: e.clientX + mainCircuit.activeOffset.x, y: e.clientY + mainCircuit.activeOffset.y });
            mainCircuit.refrashCanvas();
        }
    };
    Circuit.prototype.mouseupEventHandler = function (e) {
        console.log(mainCircuit.getMousePositionOnCanvas(e).x + " " + mainCircuit.getMousePositionOnCanvas(e).y);
        mainCircuit.isMouseDown = false;
        if (mainCircuit.activeIO !== null) {
            if (mainCircuit.activeIO.ioType === IOType.Input) {
                var output = mainCircuit.getOutputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if (output !== null) {
                    // Create a new Connection
                    console.log("output: " + output.gate.toString() + " " + output.ioNr + " " + output.ioType);
                    console.log("active: " + mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
                    output.gate.connections.push({ gate: mainCircuit.activeIO.gate, outputNr: output.ioNr, inputNr: mainCircuit.activeIO.ioNr });
                    mainCircuit.refrashCanvas();
                }
            }
            else if (mainCircuit.activeIO.ioType === IOType.Output) {
                var input = mainCircuit.getInputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if (input !== null) {
                    // Create a new Connection
                    console.log("active: " + mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
                    console.log("input: " + input.gate.toString() + " " + input.ioNr + " " + input.ioType);
                    mainCircuit.activeIO.gate.connections.push({ gate: input.gate, outputNr: mainCircuit.activeIO.ioNr, inputNr: input.ioNr });
                    mainCircuit.refrashCanvas();
                }
            }
        }
        mainCircuit.activeGate = null;
        mainCircuit.activeIO = null;
    };
    Circuit.prototype.mouseoutEventHandler = function (e) {
        //console.log("e", e);
        mainCircuit.isMouseDown = false;
        mainCircuit.activeGate = null;
        mainCircuit.activeIO = null;
    };
    return Circuit;
}());
var mainCircuit = new Circuit({ x: 50, y: 50 });
//# sourceMappingURL=main.js.map