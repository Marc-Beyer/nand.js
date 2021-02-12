// 1-Input gates 
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Buffer_Gate = /** @class */ (function (_super) {
    __extends(Buffer_Gate, _super);
    function Buffer_Gate(position) {
        var _this = _super.call(this, "1", 1, 1, position, function (inputs) { return inputs; }) || this;
        _this.type = GATE_TYPE.Buffer;
        _this.name = "Buffer";
        return _this;
    }
    return Buffer_Gate;
}(Gate));
var NOT_Gate = /** @class */ (function (_super) {
    __extends(NOT_Gate, _super);
    function NOT_Gate(position) {
        var _this = _super.call(this, "1", 1, 1, position, function (inputs) { return [!inputs[0]]; }) || this;
        _this.type = GATE_TYPE.NOT;
        _this.name = "NOT";
        return _this;
    }
    // Overrite the drawGate()
    NOT_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        this.drawNegatedOutputs(ctx, offset);
    };
    return NOT_Gate;
}(Gate));
// Conjunction and Disjunction
var AND_Gate = /** @class */ (function (_super) {
    __extends(AND_Gate, _super);
    function AND_Gate(position) {
        var _this = _super.call(this, "&", 2, 1, position, function (inputs) { return [inputs[0] && inputs[1]]; }) || this;
        _this.type = GATE_TYPE.AND;
        _this.name = "AND";
        return _this;
    }
    return AND_Gate;
}(Gate));
var OR_Gate = /** @class */ (function (_super) {
    __extends(OR_Gate, _super);
    function OR_Gate(position) {
        var _this = _super.call(this, String.fromCharCode(8805) + "1", 2, 1, position, function (inputs) { return [inputs[0] || inputs[1]]; }) || this;
        _this.type = GATE_TYPE.OR;
        _this.name = "OR";
        return _this;
    }
    return OR_Gate;
}(Gate));
// Alternative denial and Joint denial
var NAND_Gate = /** @class */ (function (_super) {
    __extends(NAND_Gate, _super);
    function NAND_Gate(position) {
        var _this = _super.call(this, "&", 2, 1, position, function (inputs) { return [!(inputs[0] && inputs[1])]; }) || this;
        _this.type = GATE_TYPE.NAND;
        _this.name = "NAND";
        return _this;
    }
    // Overrite the drawGate()
    NAND_Gate.prototype.drawGate = function (ctx, offset) {
        switch (OPTIONS.gateStyle) {
            case 0:
                _super.prototype.drawGate.call(this, ctx, offset);
                break;
            case 1:
                // Set style
                ctx.fillStyle = OPTIONS.COLOR.background;
                // Set style
                ctx.fillStyle = OPTIONS.COLOR.main;
                // Draw inputs
                this.drawInputs(ctx, offset);
                // Draw outputs
                this.drawOutputs(ctx, offset);
                var radius = this.transform.height / 2;
                ctx.beginPath();
                ctx.arc(this.transform.position.x + offset.x + this.transform.width - radius, this.transform.position.y + offset.y + radius, radius, 1.5 * Math.PI, 0.5 * Math.PI);
                ctx.lineTo(this.transform.position.x + offset.x, this.transform.position.y + offset.y + this.transform.height);
                ctx.lineTo(this.transform.position.x + offset.x, this.transform.position.y + offset.y);
                ctx.lineTo(this.transform.position.x + offset.x + this.transform.width - radius, this.transform.position.y + offset.y);
                ctx.fillStyle = OPTIONS.COLOR.active;
                ctx.fill();
                ctx.fillStyle = OPTIONS.COLOR.main;
                ctx.stroke();
                break;
        }
        this.drawNegatedOutputs(ctx, offset);
    };
    return NAND_Gate;
}(Gate));
var NOR_Gate = /** @class */ (function (_super) {
    __extends(NOR_Gate, _super);
    function NOR_Gate(position) {
        var _this = _super.call(this, String.fromCharCode(8805) + "1", 2, 1, position, function (inputs) { return [!(inputs[0] || inputs[1])]; }) || this;
        _this.type = GATE_TYPE.NOR;
        _this.name = "NOR";
        return _this;
    }
    // Overrite the drawGate()
    NOR_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        this.drawNegatedOutputs(ctx, offset);
    };
    return NOR_Gate;
}(Gate));
// Exclusive or and Biconditional
var XOR_Gate = /** @class */ (function (_super) {
    __extends(XOR_Gate, _super);
    function XOR_Gate(position) {
        var _this = _super.call(this, "=1", 2, 1, position, function (inputs) { return [(inputs[0] || inputs[1]) && !(inputs[0] && inputs[1])]; }) || this;
        _this.type = GATE_TYPE.XOR;
        _this.name = "XOR";
        return _this;
    }
    return XOR_Gate;
}(Gate));
var XNOR_Gate = /** @class */ (function (_super) {
    __extends(XNOR_Gate, _super);
    function XNOR_Gate(position) {
        var _this = _super.call(this, "=1", 2, 1, position, function (inputs) { return [!((inputs[0] || inputs[1]) && !(inputs[0] && inputs[1]))]; }) || this;
        _this.type = GATE_TYPE.XNOR;
        _this.name = "XNOR";
        return _this;
    }
    // Overrite the drawGate()
    XNOR_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        this.drawNegatedOutputs(ctx, offset);
    };
    return XNOR_Gate;
}(Gate));
// Inputs
var CONST_HIGH_Gate = /** @class */ (function (_super) {
    __extends(CONST_HIGH_Gate, _super);
    function CONST_HIGH_Gate(position) {
        var _this = _super.call(this, "OUT 1", 0, 1, position, function (inputs) { return [true]; }) || this;
        _this.type = GATE_TYPE.CONST_HIGH_Gate;
        _this.name = "CONST_HIGH_Gate";
        return _this;
    }
    return CONST_HIGH_Gate;
}(Gate));
var CONST_LOW_Gate = /** @class */ (function (_super) {
    __extends(CONST_LOW_Gate, _super);
    function CONST_LOW_Gate(position) {
        var _this = _super.call(this, "OUT 0", 0, 1, position, function (inputs) { return [false]; }) || this;
        _this.type = GATE_TYPE.CONST_LOW_Gate;
        _this.name = "CONST_LOW_Gate";
        return _this;
    }
    return CONST_LOW_Gate;
}(Gate));
var Clock_Gate = /** @class */ (function (_super) {
    __extends(Clock_Gate, _super);
    function Clock_Gate(position) {
        var _this = _super.call(this, "", 0, 1, position, function (inputs) { return [_this.clockState]; }) || this;
        _this.clockState = true;
        _this.type = GATE_TYPE.Clock;
        _this.name = "Clock";
        var gate = _this;
        _this.interval = setInterval(function () {
            gate.clockState = !gate.clockState;
            mainCircuit.connectionManager.updateConnectedGates(gate);
            mainCircuit.refrashCanvas();
        }, 1000);
        return _this;
    }
    // Overrite the drawGate()
    Clock_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        ctx.beginPath();
        ctx.moveTo(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + offset.y + (this.transform.height / 4) * 3);
        ctx.lineTo(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + offset.y + this.transform.height / 4);
        ctx.lineTo(this.transform.position.x + offset.x + this.transform.width / 2, this.transform.position.y + offset.y + this.transform.height / 4);
        ctx.lineTo(this.transform.position.x + offset.x + this.transform.width / 2, this.transform.position.y + offset.y + (this.transform.height / 4) * 3);
        ctx.lineTo(this.transform.position.x + offset.x + (this.transform.width / 4) * 3, this.transform.position.y + offset.y + (this.transform.height / 4) * 3);
        ctx.lineTo(this.transform.position.x + offset.x + (this.transform.width / 4) * 3, this.transform.position.y + offset.y + this.transform.height / 4);
        ctx.stroke();
    };
    // Is call when the gate is destroyed
    Clock_Gate.prototype.onDestroy = function () {
        clearInterval(this.interval);
    };
    return Clock_Gate;
}(Gate));
var Button_Gate = /** @class */ (function (_super) {
    __extends(Button_Gate, _super);
    function Button_Gate(position) {
        var _this = _super.call(this, "", 0, 1, position, function (inputs) { return [_this.buttonState]; }) || this;
        _this.buttonState = false;
        _this.type = GATE_TYPE.Button;
        _this.name = "Button";
        return _this;
    }
    // Overrite the isGateInPosition()
    Button_Gate.prototype.isGateInPosition = function (position) {
        var isInPos = _super.prototype.isGateInPosition.call(this, position);
        if (isInPos) {
            this.buttonState = true;
        }
        mainCircuit.connectionManager.updateConnectedGates(this);
        mainCircuit.refrashCanvas();
        return isInPos;
    };
    // Is called when the mouse is up on the active gate
    Button_Gate.prototype.onMouseUp = function () {
        this.buttonState = false;
        mainCircuit.connectionManager.updateConnectedGates(this);
    };
    // Overrite the drawGate()
    Button_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + offset.y + this.transform.height / 4, this.transform.width / 2, this.transform.height / 2);
        if (this.buttonState) {
            // Set style
            ctx.fillStyle = OPTIONS.COLOR.dark;
            ctx.fillRect(this.transform.position.x + offset.x + this.transform.width / 4 + 2, this.transform.position.y + offset.y + this.transform.height / 4 + 2, this.transform.width / 2 - 4, this.transform.height / 2 - 4);
            ctx.fillStyle = OPTIONS.COLOR.main;
        }
    };
    return Button_Gate;
}(Gate));
var Switch_Gate = /** @class */ (function (_super) {
    __extends(Switch_Gate, _super);
    function Switch_Gate(position) {
        var _this = _super.call(this, "", 0, 1, position, function (inputs) { return [_this.switchState]; }) || this;
        _this.switchState = false;
        _this.type = GATE_TYPE.Switch;
        _this.name = "Switch";
        return _this;
    }
    // Overrite the isGateInPosition()
    Switch_Gate.prototype.isGateInPosition = function (position) {
        var isInPos = _super.prototype.isGateInPosition.call(this, position);
        if (isInPos) {
            this.switchState = !this.switchState;
        }
        mainCircuit.connectionManager.updateConnectedGates(this);
        return isInPos;
    };
    // Overrite the drawGate()
    Switch_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.dark;
        // Draw background
        //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/2, this.transform.height/2);
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
        // Draw background
        if (this.switchState) {
            ctx.beginPath();
            ctx.moveTo(this.transform.position.x + this.transform.width - this.transform.width / 8 + offset.x, this.transform.position.y + this.transform.height / 2 + offset.y);
            ctx.lineTo(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + this.transform.height / 16 * 4 + offset.y);
            ctx.stroke();
            //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(this.transform.position.x + this.transform.width - this.transform.width / 8 + offset.x, this.transform.position.y + this.transform.height / 2 + offset.y);
            ctx.lineTo(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + this.transform.height / 4 * 3 + offset.y);
            ctx.stroke();
            //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/2, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }
        ctx.fillText("1", this.transform.position.x + offset.x + this.transform.width / 8, this.transform.position.y + this.transform.height / 16 * 5 + offset.y);
        ctx.fillText("0", this.transform.position.x + offset.x + this.transform.width / 8, this.transform.position.y + this.transform.height / 16 * 15 + offset.y);
        //ctx.fillText("0", this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/16*10  + offset.y);
    };
    return Switch_Gate;
}(Gate));
// Outputs
var Lamp_Gate = /** @class */ (function (_super) {
    __extends(Lamp_Gate, _super);
    function Lamp_Gate(position) {
        var _this = _super.call(this, "", 1, 0, position, function (inputs) { return [false]; }) || this;
        _this.type = GATE_TYPE.Lamp;
        _this.name = "Lamp";
        _this.transform.width = _this.transform.height;
        return _this;
    }
    // Overrite the drawGate()
    Lamp_Gate.prototype.drawGate = function (ctx, offset) {
        // Set style
        if (this.inputSignals[0]) {
            ctx.fillStyle = OPTIONS.COLOR.active;
        }
        else {
            ctx.fillStyle = OPTIONS.COLOR.background;
        }
        // Draw background
        var radius = this.transform.width / 2;
        ctx.beginPath();
        ctx.arc(this.transform.position.x + offset.x + radius, this.transform.position.y + offset.y + radius, radius, 0, 2 * Math.PI);
        ctx.fill();
        var c = Math.sqrt(radius * radius + radius * radius) / 2;
        ctx.moveTo(this.transform.position.x + offset.x + radius - c, this.transform.position.y + offset.y + radius - c);
        ctx.lineTo(this.transform.position.x + offset.x + radius + c, this.transform.position.y + offset.y + radius + c);
        ctx.moveTo(this.transform.position.x + offset.x + radius + c, this.transform.position.y + offset.y + radius - c);
        ctx.lineTo(this.transform.position.x + offset.x + radius - c, this.transform.position.y + offset.y + radius + c);
        ctx.stroke();
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
        // Draw inputs
        this.drawInputs(ctx, offset);
    };
    return Lamp_Gate;
}(Gate));
var Display_Gate = /** @class */ (function (_super) {
    __extends(Display_Gate, _super);
    function Display_Gate(position) {
        var _this = _super.call(this, "", 4, 0, position, function (inputs) { return [false]; }) || this;
        _this.type = GATE_TYPE.Display;
        _this.name = "Display";
        _this.transform.height = 80;
        return _this;
    }
    // Overrite the drawGate()
    Display_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        ctx.fillStyle = OPTIONS.COLOR.main;
        ctx.font = "50px Courier New";
        ctx.fillText(this.intFromInput().toString(16).toUpperCase(), this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + offset.y + 50);
        ctx.font = "17px Courier New";
    };
    Display_Gate.prototype.intFromInput = function () {
        var value = 0;
        for (var i = this.inputSignals.length - 1; i >= 0; i--) {
            value = (value * 2);
            value += this.inputSignals[i] ? 1 : 0;
        }
        return value;
    };
    return Display_Gate;
}(Gate));
var Segment_Display_Gate = /** @class */ (function (_super) {
    __extends(Segment_Display_Gate, _super);
    function Segment_Display_Gate(position) {
        var _this = _super.call(this, "", 7, 0, position, function (inputs) { return [false]; }) || this;
        _this.type = GATE_TYPE.Segment_Display;
        _this.name = "7 segment display";
        _this.transform.height = 140;
        _this.transform.width = 80;
        return _this;
    }
    // Overrite the drawGate()
    Segment_Display_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        ctx.fillStyle = OPTIONS.COLOR.active;
        var x = this.transform.position.x + offset.x;
        var y = this.transform.position.y + offset.y;
        var width = this.transform.width;
        var height = this.transform.height;
        this.inputSignals[0] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8 + 10, y + height / 8 - 5, this.transform.width / 4 * 3 - 20, 10);
        this.inputSignals[1] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8 * 7 - 10, y + height / 8 + 5, 10, height / 8 * 3 - 10);
        this.inputSignals[2] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8 * 7 - 10, y + height / 8 * 4 + 5, 10, height / 8 * 3 - 10);
        this.inputSignals[3] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8 + 10, y + height / 8 * 7 - 5, this.transform.width / 4 * 3 - 20, 10);
        this.inputSignals[5] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8, y + height / 8 + 5, 10, height / 8 * 3 - 10);
        this.inputSignals[4] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8, y + height / 8 * 4 + 5, 10, height / 8 * 3 - 10);
        this.inputSignals[6] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width / 8 + 10, y + height / 8 * 4 - 5, this.transform.width / 4 * 3 - 20, 10);
        ctx.fillStyle = OPTIONS.COLOR.main;
    };
    Segment_Display_Gate.prototype.intFromInput = function () {
        var value = 0;
        for (var i = this.inputSignals.length - 1; i >= 0; i--) {
            value = (value * 2);
            value += this.inputSignals[i] ? 1 : 0;
        }
        return value;
    };
    return Segment_Display_Gate;
}(Gate));
// Other
var Lable_Gate = /** @class */ (function (_super) {
    __extends(Lable_Gate, _super);
    function Lable_Gate(position, text) {
        if (text === void 0) { text = "Lable"; }
        var _this = _super.call(this, text, 0, 0, position, function (inputs) { return [false]; }) || this;
        _this.type = GATE_TYPE.Lable;
        _this.name = "Lable";
        _this.setText(text);
        return _this;
    }
    // Set the Text and rezize the gate
    Lable_Gate.prototype.setText = function (text) {
        this.text = text.split("\n");
        this.transform.height = this.text.length * 20 + 10;
        this.transform.width = 20;
        for (var _i = 0, _a = this.text; _i < _a.length; _i++) {
            var line = _a[_i];
            if (line.length * 10 + 20 > this.transform.width) {
                this.transform.width = line.length * 10 + 20;
            }
        }
    };
    // Overrite the drawGate()
    Lable_Gate.prototype.drawGate = function (ctx, offset) {
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
        // Draw box and name
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.background;
        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
        ctx.font = "17px 900 Courier New";
        for (var i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + offset.y + i * 20 + 20);
        }
        //ctx.font = "17px bold Courier New";
    };
    return Lable_Gate;
}(Gate));
var Connection_Gate = /** @class */ (function (_super) {
    __extends(Connection_Gate, _super);
    function Connection_Gate(position) {
        var _this = _super.call(this, "", 1, 1, position, function (inputs) { return inputs; }) || this;
        _this.type = GATE_TYPE.Connection;
        _this.name = "Connection";
        _this.transform.width = _this.transform.height = 10;
        _this.ioWidth = _this.ioHeight;
        return _this;
    }
    // Overrite the drawGate()
    Connection_Gate.prototype.drawGate = function (ctx, offset) {
        // Set style
        if (this.inputSignals[0]) {
            ctx.fillStyle = OPTIONS.COLOR.active;
        }
        else {
            ctx.fillStyle = OPTIONS.COLOR.main;
        }
        // Draw background
        var radius = this.transform.width / 2;
        ctx.beginPath();
        ctx.arc(this.transform.position.x + offset.x, this.transform.position.y + offset.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
    };
    // If the position is within the bounds of the transform return true else return false
    Connection_Gate.prototype.isGateInPosition = function (position) {
        if (mainCircuit.connectionManager.getDictance(this.transform.position, position) <= this.transform.width / 2) {
            return true;
        }
        return false;
    };
    // If the position is within the bounds of an output return it's nr else return null
    Connection_Gate.prototype.gateOutputAtPosition = function (position) {
        var outputPosition = this.getOutputPosition(1);
        if (outputPosition.x - 20 < position.x && outputPosition.x + 20 > position.x &&
            outputPosition.y - 20 < position.y && outputPosition.y + 20 > position.y) {
            return 0;
        }
        return null;
    };
    // If the position is within the bounds of an input return it's nr else return null
    Connection_Gate.prototype.gateInputAtPosition = function (position) {
        return null;
    };
    // Get the position of the input with number nr
    Connection_Gate.prototype.getInputPosition = function (nr) {
        return { x: this.transform.position.x, y: this.transform.position.y };
    };
    // Get the position of the output with number nr
    Connection_Gate.prototype.getOutputPosition = function (nr) {
        return { x: this.transform.position.x - this.ioWidth, y: this.transform.position.y };
    };
    return Connection_Gate;
}(Gate));
var RS_Latch_Gate = /** @class */ (function (_super) {
    __extends(RS_Latch_Gate, _super);
    function RS_Latch_Gate(position) {
        var _this = _super.call(this, "S         Q", 2, 2, position, function (inputs) {
            if (inputs[0])
                _this.savedInput = true;
            if (inputs[1])
                _this.savedInput = false;
            if (_this.savedInput) {
                return [false, true];
            }
            else {
                return [true, false];
            }
        }) || this;
        _this.savedInput = false;
        _this.type = GATE_TYPE.RS_Latch;
        _this.name = "RS_Latch";
        _this.transform.height = 80;
        return _this;
    }
    // Overrite the drawGate()
    RS_Latch_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Set style
        ctx.fillText("R         Q", this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + offset.y + this.transform.height - 10);
        ctx.fillText("            _", this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + offset.y + 3);
    };
    return RS_Latch_Gate;
}(Gate));
//# sourceMappingURL=gates.js.map