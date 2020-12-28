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
//# sourceMappingURL=gates.js.map