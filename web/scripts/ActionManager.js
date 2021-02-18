var ActionManager = /** @class */ (function () {
    function ActionManager() {
        var _this = this;
        this.actions = [];
        document.getElementById("undo-btn").addEventListener("click", function (e) {
            _this.undo();
        });
    }
    ActionManager.prototype.addAction = function (action) {
        this.actions.push(action);
    };
    ActionManager.prototype.undo = function () {
        var action = this.actions.pop();
        if (action != null)
            action.undoAction();
    };
    return ActionManager;
}());
//# sourceMappingURL=ActionManager.js.map