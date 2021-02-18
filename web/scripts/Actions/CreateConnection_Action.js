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
var CreateConnection_Action = /** @class */ (function (_super) {
    __extends(CreateConnection_Action, _super);
    function CreateConnection_Action(connection) {
        var _this = _super.call(this) || this;
        _this.connection = connection;
        return _this;
    }
    // Override
    CreateConnection_Action.prototype.redoAction = function () {
    };
    // Override
    CreateConnection_Action.prototype.undoAction = function () {
        mainCircuit.connectionManager.removeConnection(this.connection, false);
        mainCircuit.refrashCanvas();
    };
    return CreateConnection_Action;
}(Action));
//# sourceMappingURL=CreateConnection_Action.js.map