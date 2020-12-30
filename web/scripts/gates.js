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
        return _super.call(this, "1", 1, 1, position, function (inputs) { return inputs; }) || this;
    }
    return Buffer_Gate;
}(Gate));
var NOT_Gate = /** @class */ (function (_super) {
    __extends(NOT_Gate, _super);
    function NOT_Gate(position) {
        return _super.call(this, "1", 1, 1, position, function (inputs) { return [!inputs[0]]; }) || this;
    }
    // Overrite the drawGate()
    NOT_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Draw outputs
        for (var i = 0; i < this.outputs; i++) {
            var outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth / 2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth / 2, outputPosition.y + offset.y + this.ioHeight / 2);
            ctx.stroke();
        }
    };
    return NOT_Gate;
}(Gate));
// Conjunction and Disjunction
var AND_Gate = /** @class */ (function (_super) {
    __extends(AND_Gate, _super);
    function AND_Gate(position) {
        return _super.call(this, "&", 2, 1, position, function (inputs) { return [inputs[0] && inputs[1]]; }) || this;
    }
    return AND_Gate;
}(Gate));
var OR_Gate = /** @class */ (function (_super) {
    __extends(OR_Gate, _super);
    function OR_Gate(position) {
        return _super.call(this, String.fromCharCode(8805) + "1", 2, 1, position, function (inputs) { return [inputs[0] || inputs[1]]; }) || this;
    }
    return OR_Gate;
}(Gate));
// Alternative denial and Joint denial
var NAND_Gate = /** @class */ (function (_super) {
    __extends(NAND_Gate, _super);
    function NAND_Gate(position) {
        return _super.call(this, "&", 2, 1, position, function (inputs) { return [!(inputs[0] && inputs[1])]; }) || this;
    }
    // Overrite the drawGate()
    NAND_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Draw outputs
        for (var i = 0; i < this.outputs; i++) {
            var outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth / 2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth / 2, outputPosition.y + offset.y + this.ioHeight / 2);
            ctx.stroke();
        }
    };
    return NAND_Gate;
}(Gate));
var NOR_Gate = /** @class */ (function (_super) {
    __extends(NOR_Gate, _super);
    function NOR_Gate(position) {
        return _super.call(this, String.fromCharCode(8805) + "1", 2, 1, position, function (inputs) { return [!(inputs[0] || inputs[1])]; }) || this;
    }
    // Overrite the drawGate()
    NOR_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Draw outputs
        for (var i = 0; i < this.outputs; i++) {
            var outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth / 2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth / 2, outputPosition.y + offset.y + this.ioHeight / 2);
            ctx.stroke();
        }
    };
    return NOR_Gate;
}(Gate));
// Exclusive or and Biconditional
var XOR_Gate = /** @class */ (function (_super) {
    __extends(XOR_Gate, _super);
    function XOR_Gate(position) {
        return _super.call(this, "=1", 2, 1, position, function (inputs) { return [(inputs[0] || inputs[1]) && !(inputs[0] && inputs[1])]; }) || this;
    }
    return XOR_Gate;
}(Gate));
var XNOR_Gate = /** @class */ (function (_super) {
    __extends(XNOR_Gate, _super);
    function XNOR_Gate(position) {
        return _super.call(this, "=1", 2, 1, position, function (inputs) { return [!((inputs[0] || inputs[1]) && !(inputs[0] && inputs[1]))]; }) || this;
    }
    // Overrite the drawGate()
    XNOR_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Draw outputs
        for (var i = 0; i < this.outputs; i++) {
            var outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth / 2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth / 2, outputPosition.y + offset.y + this.ioHeight / 2);
            ctx.stroke();
        }
    };
    return XNOR_Gate;
}(Gate));
// Outputs
var CONST_HIGH_Gate = /** @class */ (function (_super) {
    __extends(CONST_HIGH_Gate, _super);
    function CONST_HIGH_Gate(position) {
        return _super.call(this, "OUT 1", 0, 1, position, function (inputs) { return [true]; }) || this;
    }
    return CONST_HIGH_Gate;
}(Gate));
var CONST_LOW_Gate = /** @class */ (function (_super) {
    __extends(CONST_LOW_Gate, _super);
    function CONST_LOW_Gate(position) {
        return _super.call(this, "OUT 0", 0, 1, position, function (inputs) { return [false]; }) || this;
    }
    return CONST_LOW_Gate;
}(Gate));
var Switch_Gate = /** @class */ (function (_super) {
    __extends(Switch_Gate, _super);
    function Switch_Gate(position) {
        var _this = _super.call(this, "", 0, 1, position, function (inputs) { return [_this.switchState]; }) || this;
        _this.switchState = true;
        return _this;
    }
    // Overrite the isGateInPosition()
    Switch_Gate.prototype.isGateInPosition = function (position) {
        var isInPos = _super.prototype.isGateInPosition.call(this, position);
        if (isInPos) {
            this.switchState = !this.switchState;
        }
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var connection = _a[_i];
            connection.gate.updateInput(connection.inputNr, this.getOutput());
        }
        return isInPos;
    };
    // Overrite the drawGate()
    Switch_Gate.prototype.drawGate = function (ctx, offset) {
        _super.prototype.drawGate.call(this, ctx, offset);
        // Set style
        ctx.fillStyle = "#000000";
        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + offset.y + this.transform.height / 4, this.transform.width / 2, this.transform.height / 2);
        // Set style
        ctx.fillStyle = "#DDDDDD";
        // Draw background
        if (this.switchState) {
            ctx.fillRect(this.transform.position.x + offset.x + this.transform.width / 4, this.transform.position.y + offset.y + this.transform.height / 4, this.transform.width / 4, this.transform.height / 2);
        }
        else {
            ctx.fillRect(this.transform.position.x + offset.x + this.transform.width / 2, this.transform.position.y + offset.y + this.transform.height / 4, this.transform.width / 4, this.transform.height / 2);
        }
        ctx.fillText("|", this.transform.position.x + offset.x + this.transform.width / 8, this.transform.position.y + this.transform.height / 16 * 10 + offset.y);
        ctx.fillText("0", this.transform.position.x + this.transform.width - this.transform.width / 8 + offset.x, this.transform.position.y + this.transform.height / 16 * 10 + offset.y);
    };
    return Switch_Gate;
}(Gate));
// Outputs
var Lamp_Gate = /** @class */ (function (_super) {
    __extends(Lamp_Gate, _super);
    function Lamp_Gate(position) {
        var _this = _super.call(this, "", 1, 0, position, function (inputs) { return [false]; }) || this;
        _this.transform.width = _this.transform.height;
        return _this;
    }
    // Overrite the drawGate()
    Lamp_Gate.prototype.drawGate = function (ctx, offset) {
        // Set style
        if (this.inputSignals[0]) {
            ctx.fillStyle = "#FF0000";
        }
        else {
            ctx.fillStyle = "#3B3B3B";
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
        ctx.fillStyle = "#DDDDDD";
        // Draw inputs
        for (var i = 0; i < this.inputs; i++) {
            if (this.inputSignals[i]) {
                ctx.fillStyle = "#FF0000";
            }
            else {
                ctx.fillStyle = "#DDDDDD";
            }
            var inputPosition = this.getInputPosition(i);
            ctx.fillRect(inputPosition.x + offset.x, inputPosition.y + offset.y, this.ioWidth, this.ioHeight);
        }
    };
    return Lamp_Gate;
}(Gate));
// Other
var Lable_Gate = /** @class */ (function (_super) {
    __extends(Lable_Gate, _super);
    function Lable_Gate(position, text) {
        var _this = _super.call(this, text, 0, 0, position, function (inputs) { return [false]; }) || this;
        _this.text = text.split("\n");
        _this.transform.height = _this.text.length * 20 + 10;
        for (var _i = 0, _a = _this.text; _i < _a.length; _i++) {
            var line = _a[_i];
            if (line.length * 10 + 20 > _this.transform.width) {
                _this.transform.width = line.length * 10 + 20;
            }
        }
        return _this;
    }
    // Overrite the drawGate()
    Lable_Gate.prototype.drawGate = function (ctx, offset) {
        // Set style
        ctx.fillStyle = "#3B3B3B";
        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        // Set style
        ctx.fillStyle = "#DDDDDD";
        // Draw box and name
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        for (var i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.transform.position.x + this.transform.width / 2 + offset.x, this.transform.position.y + offset.y + i * 20 + 20);
        }
    };
    return Lable_Gate;
}(Gate));
//# sourceMappingURL=gates.js.map