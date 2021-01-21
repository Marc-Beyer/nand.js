var Gate = /** @class */ (function () {
    function Gate(lable, inputs, outputs, position, boolFunction) {
        if (inputs === void 0) { inputs = 0; }
        if (outputs === void 0) { outputs = 0; }
        if (position === void 0) { position = { x: 0, y: 0 }; }
        if (boolFunction === void 0) { boolFunction = function (inputs) { return [false]; }; }
        this.name = "Not yet set";
        this.connections = [];
        this.ioWidth = 20;
        this.ioHeight = 2;
        this.type = 0;
        this.lable = lable;
        this.inputs = inputs;
        this.outputs = outputs;
        this.transform = { position: position, width: 70, height: 40 };
        this.boolFunction = boolFunction;
        this.inputSignals = [];
        for (var index = 0; index < inputs; index++) {
            this.inputSignals.push(false);
        }
        //console.log(this.inputSignals);
    }
    // If the position is within the bounds of the transform return true else return false
    Gate.prototype.isGateInPosition = function (position) {
        if (this.transform.position.x < position.x && this.transform.position.x + this.transform.width > position.x &&
            this.transform.position.y < position.y && this.transform.position.y + this.transform.height > position.y) {
            return true;
        }
        return false;
    };
    // If the position is within the bounds of an input return it's nr else return null
    Gate.prototype.gateInputAtPosition = function (position) {
        ////console.log("MousePos", position.x + " " + position.y);
        for (var i = 0; i < this.inputs; i++) {
            var inputPosition = this.getInputPosition(i);
            ////console.log("gateInputAtPosition", inputPosition.x + " " + inputPosition.y);
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
        ctx.fillStyle = OPTIONS.COLOR.background;
        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
        // Draw inputs
        this.drawInputs(ctx, offset);
        // Draw outputs
        this.drawOutputs(ctx, offset);
        // Draw box and lable
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        ctx.fillText(this.lable, this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + offset.y + 20);
    };
    Gate.prototype.drawInputs = function (ctx, offset) {
        for (var i = 0; i < this.inputs; i++) {
            if (this.inputSignals[i]) {
                ctx.fillStyle = OPTIONS.COLOR.active;
            }
            else {
                ctx.fillStyle = OPTIONS.COLOR.main;
            }
            var inputPosition = this.getInputPosition(i);
            ctx.fillRect(inputPosition.x + offset.x, inputPosition.y + offset.y - this.ioHeight / 2, this.ioWidth, this.ioHeight);
        }
        ctx.fillStyle = OPTIONS.COLOR.main;
    };
    Gate.prototype.drawOutputs = function (ctx, offset) {
        for (var i = 0; i < this.outputs; i++) {
            if (this.getOutput(i)) {
                ctx.fillStyle = OPTIONS.COLOR.active;
            }
            else {
                ctx.fillStyle = OPTIONS.COLOR.main;
            }
            var outputPosition = this.getOutputPosition(i);
            ctx.fillRect(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioHeight / 2, this.ioWidth, this.ioHeight);
        }
        ctx.fillStyle = OPTIONS.COLOR.main;
    };
    Gate.prototype.drawNegatedOutputs = function (ctx, offset) {
        ctx.fillStyle = OPTIONS.COLOR.background;
        for (var i = 0; i < this.outputs; i++) {
            if (this.getOutput(i)) {
                ctx.strokeStyle = OPTIONS.COLOR.active;
            }
            else {
                ctx.strokeStyle = OPTIONS.COLOR.main;
            }
            var outputPosition = this.getOutputPosition(i);
            var radius = 4;
            ctx.beginPath();
            switch (OPTIONS.negatedIOStyle) {
                case 0:
                    ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth / 2);
                    ctx.lineTo(outputPosition.x + offset.x + this.ioWidth / 2, outputPosition.y + offset.y + this.ioHeight / 2);
                    break;
                case 1:
                    ctx.arc(outputPosition.x + offset.x + radius + OPTIONS.strokeSize, outputPosition.y + offset.y, radius, 0, 2 * Math.PI);
                    break;
            }
            ctx.fill();
            ctx.stroke();
        }
        ctx.fillStyle = OPTIONS.COLOR.main;
        ctx.strokeStyle = OPTIONS.COLOR.main;
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
    // Calculate the outputSignal
    Gate.prototype.getOutput = function (nr) {
        if (nr === void 0) { nr = 0; }
        return this.boolFunction(this.inputSignals)[nr];
    };
    // Update signal at input eith the number nr
    Gate.prototype.updateInput = function (nr, bool) {
        /*for (let connection of this.connections) {
            connection.gate.updateInput(connection.inputNr, this.getOutput());
        }*/
        var changed = this.inputSignals[nr] !== bool;
        this.inputSignals[nr] = bool;
        return changed;
    };
    // Returns the Gate type and position as string
    Gate.prototype.toString = function () {
        return this.name + " (" + this.transform.position.x + "," + this.transform.position.y + "," + this.transform.width + "," + this.transform.height + ")";
    };
    // Is called when the gate is destroyed
    Gate.prototype.onDestroy = function () { };
    // Is called when the mouse is up on the active gate
    Gate.prototype.onMouseUp = function () { };
    return Gate;
}());
//# sourceMappingURL=gate.js.map