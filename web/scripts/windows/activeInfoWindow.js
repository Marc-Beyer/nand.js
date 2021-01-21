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
        return _this;
    }
    ActiveInfoWindow.prototype.setActive = function (gate) {
        if (gate != null) {
            this.nameElement.textContent = gate.name;
        }
        else {
            this.nameElement.textContent = "None";
        }
    };
    return ActiveInfoWindow;
}(MWindow));
//# sourceMappingURL=activeInfoWindow.js.map