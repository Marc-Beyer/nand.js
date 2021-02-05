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
        _this.createColorInput("main-color", OPTIONS.COLOR.main);
        _this.createColorInput("active-color", OPTIONS.COLOR.active);
        _this.createColorInput("background-color", OPTIONS.COLOR.background);
        _this.createColorInput("dark-color", OPTIONS.COLOR.dark);
        return _this;
    }
    OptionsWindow.prototype.createColorInput = function (name, value) {
        var div = document.createElement("div");
        div.className = "flex-row";
        var text = document.createElement("div");
        text.textContent = name;
        text.style.width = "40%";
        var input = document.createElement("input");
        input.className = "grow color-picker";
        input.value = value;
        input.type = "color";
        var str = name.substr(0, name.length - 6);
        input.addEventListener("change", function () {
            OPTIONS.COLOR[str] = input.value;
            mainCircuit.refrashCanvas();
        });
        div.append(text);
        div.append(input);
        this.append(div);
    };
    return OptionsWindow;
}(MWindow));
//# sourceMappingURL=optionsWindow.js.map