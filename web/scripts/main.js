var mainCircuit = new Circuit({ x: 10, y: 10 });
mainCircuit.gates.push(new Lable_Gate({ x: 50, y: 50 }, "Inputs"));
mainCircuit.gates.push(new CONST_HIGH_Gate({ x: 50, y: 150 }));
mainCircuit.gates.push(new CONST_LOW_Gate({ x: 50, y: 250 }));
mainCircuit.gates.push(new Switch_Gate({ x: 50, y: 350 }));
mainCircuit.gates.push(new Lable_Gate({ x: 250, y: 50 }, "1-Input gates"));
mainCircuit.gates.push(new Buffer_Gate({ x: 250, y: 150 }));
mainCircuit.gates.push(new NOT_Gate({ x: 250, y: 250 }));
mainCircuit.gates.push(new Lable_Gate({ x: 450, y: 50 }, "Conjunction\nand Disjunction"));
mainCircuit.gates.push(new AND_Gate({ x: 450, y: 150 }));
mainCircuit.gates.push(new OR_Gate({ x: 450, y: 250 }));
mainCircuit.gates.push(new Lable_Gate({ x: 650, y: 50 }, "Alternative denial\nand Joint denial"));
mainCircuit.gates.push(new NAND_Gate({ x: 650, y: 150 }));
mainCircuit.gates.push(new NOR_Gate({ x: 650, y: 250 }));
mainCircuit.gates.push(new Lable_Gate({ x: 900, y: 50 }, "Exclusive or\nand Biconditional"));
mainCircuit.gates.push(new XOR_Gate({ x: 900, y: 150 }));
mainCircuit.gates.push(new XNOR_Gate({ x: 900, y: 250 }));
mainCircuit.gates.push(new Lable_Gate({ x: 1150, y: 50 }, "Outputs"));
mainCircuit.gates.push(new Lamp_Gate({ x: 1150, y: 150 }));
mainCircuit.gates.push(new Display_Gate({ x: 1150, y: 250 }));
//mainCircuit.gates[0].connections.push({gate: mainCircuit.gates[1], outputNr: 0, inputNr: 0});
mainCircuit.refrashCanvas();
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
var errorContainer = document.getElementById("error-container");
errorContainer.getElementsByTagName("BUTTON")[0].addEventListener("click", function () {
    errorContainer.className = "hidden";
});
//# sourceMappingURL=main.js.map