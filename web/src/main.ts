// Declare Oprions for Project
var OPTIONS: Options = {
    strokeSize: 2,
    negatedIOStyle: 1,
    COLOR:{
        main: "#000000",
        active: "#FF0000",
        background: "#FFFFFF",
        dark: "#AAAAAA",
        highlight: "#0000FF",
    }, 
    gateStyle: 0
    /*COLOR:{
        main: "#DDDDDD",
        active: "#FF0000",
        background: "#3B3B3B",
        dark: "#222222"
    }
    */
}

// Set activeInfoWindow
var activeInfoWindow : ActiveInfoWindow = null;
// Create a new Circuit
var mainCircuit = new Circuit({x: 10, y: 10});
// Create a new SaveManager
var saveManager = new SaveManager(mainCircuit);

//mainCircuit.addGate(GATE_TYPE.Segment_Display, {x: 700, y: 300}, []);
//mainCircuit.addGate(GATE_TYPE.RS_Latch, {x: 700, y: 300}, []);

// Add Listener to error-container
let errorContainer = document.getElementById("error-container-close-btn");
errorContainer.addEventListener("click", ()=>{
    document.getElementById("error-container").className = "hidden";
});

// Add Listener to save-as-text-btn
document.getElementById("save-as-text-btn").addEventListener("click", (e)=>{
    let saveJSON = saveManager.getSaveJSON();
    // Create a new movable window
    new SavefileWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width/2-200,
            y: mainCircuit.mainCanvas.getBoundingClientRect().height/2-250
        },
        width: 400,
        height: 500
    }, saveJSON);
});

// Add Listener to load-text-btn
document.getElementById("load-text-btn").addEventListener("click", (e)=>{
    // Create a new movable window
    new SavefileWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width/2-200,
            y: mainCircuit.mainCanvas.getBoundingClientRect().height/2-250
        },
        width: 400,
        height: 500
    }, "");
});

// Add Listener to save-as-image-btn
document.getElementById("save-as-image-btn").addEventListener("click", () => {
    let dataURL = mainCircuit.mainCanvas.toDataURL("image/png");
    let link = document.createElement('a');
    link.download = "nand-js-save.png";
    link.href = dataURL;
    link.click();
});

// Add Listener to save-as-file-btn
document.getElementById("save-as-file-btn").addEventListener("click", () => {
    download(saveManager.getSaveJSON(), "LogicGates-save.json", "application/json");
});

// Add Listener to load-file-btn
if (window.File && window.FileReader && window.FileList && window.Blob) {
	document.getElementById("file-loader-btn").addEventListener("change", startRead, false);
} else {
    document.getElementById("error-container").getElementsByTagName("P")[0].textContent = "The file-APIs are not supported. You are not able to Load-files.";
    document.getElementById("error-container").className = "";
}

document.getElementById("load-file-btn").addEventListener('click', () => {
    document.getElementById("file-loader-btn").click();
});

//
// TOOLS
//
document.getElementById("move-to-center-btn").addEventListener("click", () => {
    mainCircuit.gloabalOffset = {x: 0, y: 0};
    mainCircuit.zoomFactor = 1;
    mainCircuit.refrashCanvas();
});

document.getElementById("open-logic-gate-window-btn").addEventListener("click", () => {
    new GatesWindow({
        position: {
            x: 0,
            y: 50
        },
        width: 200,
        height: 200
    });
});

document.getElementById("open-active-gate-window-btn").addEventListener("click", () => {
    if(activeInfoWindow != null){
        activeInfoWindow.htmlElement.remove();
    }
    activeInfoWindow = new ActiveInfoWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width-220,
            y: 50
        },
        width: 200,
        height: 200
    });
});

//
// Options
//
document.getElementById("color-btn").addEventListener("click", () => {
    new OptionsWindow({
        position: {
            x: mainCircuit.mainCanvas.getBoundingClientRect().width/2-200,
            y: mainCircuit.mainCanvas.getBoundingClientRect().height/2-250
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
        x: 20,
        y: 50
    },
    width: 200,
    height: 200
});

//
// Active Info Window
//
activeInfoWindow = new ActiveInfoWindow({
    position: {
        x: mainCircuit.mainCanvas.getBoundingClientRect().width-220,
        y: 50
    },
    width: 200,
    height: 200
});

//
// Line style
//
document.getElementById("direct-lines-btn").addEventListener("click", ()=>{
    mainCircuit.connectionManager.drawType = 1;
    mainCircuit.refrashCanvas();
});
document.getElementById("straight-lines-btn").addEventListener("click", ()=>{
    mainCircuit.connectionManager.drawType = 0;
    mainCircuit.refrashCanvas();
});