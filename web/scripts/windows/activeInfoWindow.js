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
var ActiveInfoWindow = /** @class */ (function (_super) {
    __extends(ActiveInfoWindow, _super);
    function ActiveInfoWindow(transform) {
        var _this = _super.call(this, transform) || this;
        // Add color-options
        var header = document.createElement("h2");
        header.textContent = "Active Gate:";
        header.style.marginTop = "0";
        header.style.marginBottom = "0";
        _this.append(header);
        // Add nameElement
        _this.nameElement = document.createElement("h3");
        _this.nameElement.textContent = "None";
        _this.append(_this.nameElement);
        _this.createTextArea("text:", "");
        return _this;
    }
    ActiveInfoWindow.prototype.setActive = function (gate) {
        if (gate == null) {
            this.nameElement.textContent = "None";
            this.textarea.parentElement.hidden = true;
            return;
        }
        this.nameElement.textContent = gate.name;
        switch (gate.type) {
            case GATE_TYPE.Lable:
                var lable = gate;
                var text = lable.text[0];
                for (var index = 1; index < lable.text.length; index++) {
                    var element = lable.text[index];
                    text += "\n" + element;
                }
                this.textarea.value = text;
                this.textarea.parentElement.hidden = false;
                break;
            default:
                this.textarea.parentElement.hidden = true;
                break;
        }
    };
    ActiveInfoWindow.prototype.createTextArea = function (name, value) {
        var _this = this;
        var text = document.createElement("div");
        text.textContent = name;
        this.textarea = document.createElement("textarea");
        this.textarea.value = value;
        this.textarea.addEventListener("keydown", function (e) {
            e.stopPropagation();
        });
        this.textarea.addEventListener("keyup", function (e) {
            var lable = mainCircuit.activeGate;
            lable.setText(_this.textarea.value);
            mainCircuit.refrashCanvas();
        });
        text.append(this.textarea);
        this.append(text);
        text.hidden = true;
    };
    return ActiveInfoWindow;
}(MWindow));
//# sourceMappingURL=activeInfoWindow.js.map