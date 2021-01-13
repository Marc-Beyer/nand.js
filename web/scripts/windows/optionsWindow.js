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
var OptionsWindow = /** @class */ (function (_super) {
    __extends(OptionsWindow, _super);
    function OptionsWindow(transform) {
        var _this = _super.call(this, transform) || this;
        // Add color-options
        var header = document.createElement("h2");
        header.textContent = "Colors";
        header.style.marginTop = "0";
        _this.append(header);
        _this.createTextInput("main-color", "#DDDDDD");
        _this.createTextInput("active-color", "#FF0000");
        _this.createTextInput("background-color", "#3B3B3B");
        _this.createTextInput("dark-color", "#222222");
        return _this;
    }
    OptionsWindow.prototype.createTextInput = function (name, value) {
        var div = document.createElement("div");
        div.className = "flex-row";
        var text = document.createElement("div");
        text.textContent = name;
        text.style.width = "40%";
        var input = document.createElement("input");
        input.className = "grow color-picker";
        input.value = value;
        input.type = "color";
        div.append(text);
        div.append(input);
        this.append(div);
    };
    return OptionsWindow;
}(MWindow));
//# sourceMappingURL=optionsWindow.js.map