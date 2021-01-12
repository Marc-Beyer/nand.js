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
var SavefileWindow = /** @class */ (function (_super) {
    __extends(SavefileWindow, _super);
    function SavefileWindow(transform, saveString) {
        var _this = _super.call(this, transform) || this;
        var textArea = document.createElement("textarea");
        textArea.value = saveString;
        textArea.className = "grow";
        _this.append(textArea);
        // Create Copy and Load Btn
        var btnContainer = document.createElement("div");
        btnContainer.className = "flex-row";
        var loadTextBtn = document.createElement("button");
        loadTextBtn.textContent = "LOAD TEXT";
        loadTextBtn.className = "grow";
        loadTextBtn.addEventListener("click", function () {
            saveManager.loadJSONString(textArea.value);
        });
        var copyAllBtn = document.createElement("button");
        copyAllBtn.textContent = "COPY ALL";
        copyAllBtn.className = "grow";
        copyAllBtn.addEventListener("click", function () {
            textArea.select();
            document.execCommand('copy');
        });
        btnContainer.append(loadTextBtn);
        btnContainer.append(copyAllBtn);
        _this.append(btnContainer);
        return _this;
    }
    return SavefileWindow;
}(MWindow));
//# sourceMappingURL=savefileWindow.js.map