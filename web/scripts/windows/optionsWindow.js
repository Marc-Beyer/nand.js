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
        //this.createColorInput("highlight-color", OPTIONS.COLOR.highlight);
        var hr = document.createElement("hr");
        hr.style.margin = "10px 0";
        _this.append(hr);
        _this.createColorInputForCSS("canvas-background-color");
        _this.createColorInputForCSS("main-background-color");
        _this.createColorInputForCSS("shade-background-color");
        _this.createColorInputForCSS("close-btn-background-color");
        _this.createColorInputForCSS("main-color");
        _this.createColorInputForCSS("main-border-color");
        return _this;
    }
    OptionsWindow.prototype.createColorInput = function (name, value) {
        var div = document.createElement("div");
        div.className = "flex-row";
        var text = document.createElement("div");
        text.textContent = name;
        text.style.width = "70%";
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
    OptionsWindow.prototype.createColorInputForCSS = function (name) {
        var value = window.getComputedStyle(document.documentElement).getPropertyValue("--" + name);
        value = value.substr(1);
        if (value == "white") {
            value = "#ffffff";
        }
        console.log(name + ":" + value);
        var div = document.createElement("div");
        div.className = "flex-row";
        var text = document.createElement("div");
        text.textContent = name;
        text.style.width = "70%";
        var input = document.createElement("input");
        input.className = "grow color-picker";
        input.value = value;
        input.type = "color";
        input.addEventListener("change", function () {
            document.documentElement.style.setProperty("--" + name, "#" + input.value);
        });
        div.append(text);
        div.append(input);
        this.append(div);
    };
    return OptionsWindow;
}(MWindow));
//# sourceMappingURL=optionsWindow.js.map