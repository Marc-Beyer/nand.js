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
var Group_Action = /** @class */ (function (_super) {
    __extends(Group_Action, _super);
    function Group_Action(actions) {
        var _this = _super.call(this) || this;
        _this.actions = actions;
        return _this;
    }
    // Override
    Group_Action.prototype.redoAction = function () {
    };
    // Override
    Group_Action.prototype.undoAction = function () {
        console.log("this.actions", this.actions);
        for (var _i = 0, _a = this.actions; _i < _a.length; _i++) {
            var action = _a[_i];
            action.undoAction();
        }
    };
    return Group_Action;
}(Action));
//# sourceMappingURL=Group_Action.js.map