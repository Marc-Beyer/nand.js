// Declare Oprions for Project
var OPTIONS = {
    strokeSize: 2,
    negatedIOStyle: 1,
    COLOR: {
        main: "#DDDDDD",
        active: "#FF0000",
        background: "#3B3B3B",
        dark: "#222222"
    }
};
// Create a new Circuit
var mainCircuit = new Circuit({ x: 10, y: 10 });
// Create a new SaveManager
var saveManager = new SaveManager(mainCircuit);
/*
mainCircuit.gates.unshift(new Lable_Gate({x: 350, y: 50}, "Inputs"));
mainCircuit.gates.unshift(new CONST_HIGH_Gate({x: 350, y: 150}));
mainCircuit.gates.unshift(new CONST_LOW_Gate({x: 350, y: 250}));
mainCircuit.gates.unshift(new Switch_Gate({x: 350, y: 350}));
mainCircuit.gates.unshift(new Clock_Gate({x: 350, y: 450}));
mainCircuit.gates.unshift(new Button_Gate({x: 350, y: 550}));

mainCircuit.gates.unshift(new Lable_Gate({x: 550, y: 50}, "1-Input gates"));
mainCircuit.gates.unshift(new Buffer_Gate({x: 550, y: 150}));
mainCircuit.gates.unshift(new NOT_Gate({x: 550, y: 250}));

mainCircuit.gates.unshift(new Lable_Gate({x: 750, y: 50}, "Conjunction\nand Disjunction"));
mainCircuit.gates.unshift(new AND_Gate({x: 750, y: 150}));
mainCircuit.gates.unshift(new OR_Gate({x: 750, y: 250}));

mainCircuit.gates.unshift(new Lable_Gate({x: 950, y: 50}, "Alternative denial\nand Joint denial"));
mainCircuit.gates.unshift(new NAND_Gate({x: 950, y: 150}));
mainCircuit.gates.unshift(new NOR_Gate({x: 950, y: 250}));

mainCircuit.gates.unshift(new Lable_Gate({x: 1200, y: 50}, "Exclusive or\nand Biconditional"));
mainCircuit.gates.unshift(new XOR_Gate({x: 1200, y: 150}));
mainCircuit.gates.unshift(new XNOR_Gate({x: 1200, y: 250}));

mainCircuit.gates.unshift(new Lable_Gate({x: 1450, y: 50}, "Outputs"));
mainCircuit.gates.unshift(new Lamp_Gate({x: 1450, y: 150}));
mainCircuit.gates.unshift(new Display_Gate({x: 1450, y: 250}));

mainCircuit.refrashCanvas();
*/
// Add Listener to error-container
var errorContainer = document.getElementById("error-container-close-btn");
errorContainer.addEventListener("click", function () {
    errorContainer.className = "hidden";
});
// Add Listener to save-as-text-btn
document.getElementById("save-as-text-btn").addEventListener("click", function (e) {
    var saveJSON = saveManager.getSaveJSON();
    // Create a new movable window
    new SavefileWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width / 2 - 200,
            y: mainCircuit.mainCanvas.getBoundingClientRect().height / 2 - 250
        },
        width: 400,
        height: 500
    }, saveJSON);
});
// Add Listener to load-text-btn
document.getElementById("load-text-btn").addEventListener("click", function (e) {
    // Create a new movable window
    new SavefileWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width / 2 - 200,
            y: mainCircuit.mainCanvas.getBoundingClientRect().height / 2 - 250
        },
        width: 400,
        height: 500
    }, "");
});
// Add Listener to save-as-file-btn
document.getElementById("save-as-file-btn").addEventListener("click", function () {
    download(saveManager.getSaveJSON(), "LogicGates-save.json", "application/json");
});
// Add Listener to load-file-btn
if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById("file-loader-btn").addEventListener("change", startRead, false);
}
else {
    document.getElementById("error-container").getElementsByTagName("P")[0].textContent = "The file-APIs are not supported. You are not able to Load-files.";
    document.getElementById("error-container").className = "";
}
document.getElementById("load-file-btn").addEventListener('click', function () {
    document.getElementById("file-loader-btn").click();
});
//
// TOOLS
//
document.getElementById("move-to-center-btn").addEventListener("click", function () {
    mainCircuit.gloabalOffset = { x: 0, y: 0 };
    mainCircuit.refrashCanvas();
});
document.getElementById("open-logic-gate-window-btn").addEventListener("click", function () {
    new GatesWindow({
        position: {
            x: 0,
            y: 50
        },
        width: 200,
        height: 200
    });
});
//
// Options
//
document.getElementById("color-btn").addEventListener("click", function () {
    new OptionsWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width / 2 - 200,
            y: mainCircuit.mainCanvas.getBoundingClientRect().height / 2 - 250
        },
        width: 400,
        height: 500
    });
});
//
// Logic Gate Window
//
new GatesWindow({
    position: {
        x: 0,
        y: 50
    },
    width: 200,
    height: 200
});
//# sourceMappingURL=main.js.map