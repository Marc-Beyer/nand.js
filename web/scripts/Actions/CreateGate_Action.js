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
var CreateGate_Action = /** @class */ (function (_super) {
    __extends(CreateGate_Action, _super);
    function CreateGate_Action(gate) {
        var _this = _super.call(this) || this;
        _this.gate = gate;
        return _this;
    }
    // Override
    CreateGate_Action.prototype.redoAction = function () {
    };
    // Override
    CreateGate_Action.prototype.undoAction = function () {
        console.log("cgAction", this.gate);
        mainCircuit.deleteGate(this.gate, false);
    };
    return CreateGate_Action;
}(Action));
//# sourceMappingURL=CreateGate_Action.js.map