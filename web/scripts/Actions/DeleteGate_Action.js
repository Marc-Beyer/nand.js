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
var DeleteGate_Action = /** @class */ (function (_super) {
    __extends(DeleteGate_Action, _super);
    function DeleteGate_Action(gate) {
        var _this = _super.call(this) || this;
        _this.para = null;
        _this.gate = gate;
        return _this;
    }
    // Override
    DeleteGate_Action.prototype.redoAction = function () {
    };
    // Override
    DeleteGate_Action.prototype.undoAction = function () {
        console.log("dgAction", this.gate);
        mainCircuit.addBackGate(this.gate);
    };
    return DeleteGate_Action;
}(Action));
//# sourceMappingURL=DeleteGate_Action.js.map