var Gate = /** @class */ (function () {
    function Gate(name, inputs, outputs, position) {
        if (inputs === void 0) { inputs = 0; }
        if (outputs === void 0) { outputs = 0; }
        if (position === void 0) { position = { x: 0, y: 0 }; }
        this.connections = [];
        this.ioWidth = 20;
        this.ioHeight = 3;
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
        this.transform = { position: position, width: 200, height: 100 };
        this.inputSignals = [];
        for (var index = 0; index < inputs; index++) {
            this.inputSignals.push(false);
        }
        console.log(this.inputSignals);
    }
    // If the position is within the bounds of the transform return true else return false
    Gate.prototype.isGateInPosition = function (position) {
        if (this.transform.position.x < position.x && this.transform.position.x + this.transform.width > position.x &&
            this.transform.position.y < position.y && this.transform.position.y + this.transform.height > position.y) {
            return true;
        }
    };
    // If the position is within the bounds of an input return it's nr else return null
    Gate.prototype.gateInputAtPosition = function (position) {
        //console.log("MousePos", position.x + " " + position.y);
        for (var i = 0; i < this.inputs; i++) {
            var inputPosition = this.getInputPosition(i);
            //console.log("gateInputAtPosition", inputPosition.x + " " + inputPosition.y);
            if (inputPosition.x < position.x && inputPosition.x + this.ioWidth > position.x &&
                inputPosition.y - this.ioWidth / 2 < position.y && inputPosition.y + this.ioWidth / 2 > position.y) {
                return i;
            }
        }
        return null;
    };
    // If the position is within the bounds of an output return it's nr else return null
    Gate.prototype.gateOutputAtPosition = function (position) {
        for (var i = 0; i < this.outputs; i++) {
            var outputPosition = this.getOutputPosition(i);
            if (outputPosition.x < position.x && outputPosition.x + this.ioWidth > position.x &&
                outputPosition.y - this.ioWidth / 2 < position.y && outputPosition.y + this.ioWidth / 2 > position.y) {
                return i;
            }
        }
        return null;
    };
    // Draws the Gate to the canvas
    Gate.prototype.drawGate = function (ctx, offset) {
        // Set style
        ctx.fillStyle = "#3B3B3B";
        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        // Set style
        ctx.fillStyle = "#DDDDDD";
        // Draw box and name
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        ctx.fillText(this.name, this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + this.transform.height / 2 + offset.y);
        // Draw inputs
        for (var i = 0; i < this.inputs; i++) {
            var inputPosition = this.getInputPosition(i);
            ctx.fillRect(inputPosition.x + offset.x, inputPosition.y + offset.y, this.ioWidth, this.ioHeight);
        }
        // Draw outputs
        for (var i = 0; i < this.outputs; i++) {
            var outputPosition = this.getOutputPosition(i);
            ctx.fillRect(outputPosition.x + offset.x, outputPosition.y + offset.y, this.ioWidth, this.ioHeight);
        }
    };
    // Draws the connections to the canvas
    Gate.prototype.drawConnations = function (ctx, offset) {
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var connection = _a[_i];
            var inputPosition = connection.gate.getInputPosition(connection.inputNr);
            var outputPosition = this.getOutputPosition(connection.outputNr);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + this.ioWidth + offset.x, outputPosition.y + this.ioHeight / 2 + offset.y);
            ctx.lineTo(inputPosition.x + offset.x, inputPosition.y + this.ioHeight / 2 + offset.y);
            ctx.stroke();
        }
    };
    // Get the position of the input with number nr
    Gate.prototype.getInputPosition = function (nr) {
        if (nr >= this.inputs) {
            return null;
        }
        return { x: this.transform.position.x - 20, y: this.transform.position.y + nr * this.transform.height / this.inputs + (this.transform.height / this.inputs) / 2 };
    };
    // Get the position of the output with number nr
    Gate.prototype.getOutputPosition = function (nr) {
        if (nr >= this.outputs) {
            return null;
        }
        return { x: this.transform.position.x + this.transform.width, y: this.transform.position.y + nr * this.transform.height / this.outputs + (this.transform.height / this.outputs) / 2 };
    };
    // Get the offset to transform.position
    Gate.prototype.getOffsetPosition = function (position) {
        position.x = this.transform.position.x - position.x;
        position.y = this.transform.position.y - position.y;
        return position;
    };
    // Returns the Gate type and position as string
    Gate.prototype.toString = function () {
        return this.name + " (" + this.transform.position.x + "," + this.transform.position.y + "," + this.transform.width + "," + this.transform.height + ")";
    };
    return Gate;
}());
//# sourceMappingURL=gate.js.map