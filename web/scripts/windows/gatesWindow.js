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
var GatesWindow = /** @class */ (function (_super) {
    __extends(GatesWindow, _super);
    function GatesWindow(transform) {
        var _this = _super.call(this, transform) || this;
        var inputsDropContainer = new DropContainer("Inputs", [
            { itemName: "Constand high", value: GATE_TYPE.CONST_HIGH_Gate },
            { itemName: "Constand low", value: GATE_TYPE.CONST_LOW_Gate },
            { itemName: "Clock", value: GATE_TYPE.Clock },
            { itemName: "Button", value: GATE_TYPE.Button },
            { itemName: "Switch", value: GATE_TYPE.Switch }
        ]);
        var logicGatesDropContainer = new DropContainer("Logic Gates", [
            { itemName: "Buffer", value: GATE_TYPE.Buffer },
            { itemName: "NOT", value: GATE_TYPE.NOT },
            { itemName: "AND", value: GATE_TYPE.AND },
            { itemName: "OR", value: GATE_TYPE.OR },
            { itemName: "NAND", value: GATE_TYPE.NAND },
            { itemName: "NOR", value: GATE_TYPE.NOR },
            { itemName: "XOR", value: GATE_TYPE.XOR },
            { itemName: "XNOR", value: GATE_TYPE.XNOR }
        ]);
        var outputsDropContainer = new DropContainer("Outputs", [
            { itemName: "Lamp", value: GATE_TYPE.Lamp },
            { itemName: "Display", value: GATE_TYPE.Display }
        ]);
        var otherDropContainer = new DropContainer("Other", [
            { itemName: "Lable", value: GATE_TYPE.Lable }
        ]);
        _this.append(inputsDropContainer.htmlElement);
        _this.append(logicGatesDropContainer.htmlElement);
        _this.append(outputsDropContainer.htmlElement);
        _this.append(otherDropContainer.htmlElement);
        var dropContainer = document.getElementsByClassName("drop-container");
        var _loop_1 = function (index) {
            var element = dropContainer[index];
            var header = element.getElementsByTagName("H2")[0];
            header.addEventListener("click", function (e) {
                if (element.classList.contains("open")) {
                    element.className = element.className.replace(" open", "");
                }
                else {
                    element.className += " open";
                }
            });
        };
        for (var index = 0; index < dropContainer.length; index++) {
            _loop_1(index);
        }
        var addButtons = document.getElementsByClassName("add");
        var _loop_2 = function (index) {
            var addButton = addButtons[index];
            addButton.addEventListener("click", function (e) {
                var position = {
                    x: mainCircuit.mainCanvas.width / 2 - mainCircuit.gloabalOffset.x,
                    y: mainCircuit.mainCanvas.height / 2 - mainCircuit.gloabalOffset.y
                };
                mainCircuit.addGate(parseInt(addButton.dataset.value), position);
            });
        };
        for (var index = 0; index < addButtons.length; index++) {
            _loop_2(index);
        }
        return _this;
    }
    return GatesWindow;
}(MWindow));
//# sourceMappingURL=gatesWindow.js.map