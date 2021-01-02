
var mainCircuit = new Circuit({x: 10, y: 10});

mainCircuit.gates.unshift(new Lable_Gate({x: 350, y: 50}, "Inputs"));
mainCircuit.gates.unshift(new CONST_HIGH_Gate({x: 350, y: 150}));
mainCircuit.gates.unshift(new CONST_LOW_Gate({x: 350, y: 250}));
mainCircuit.gates.unshift(new Switch_Gate({x: 350, y: 350}));

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




//mainCircuit.gates[0].connections.concat({gate: mainCircuit.gates[1], outputNr: 0, inputNr: 0});

mainCircuit.refrashCanvas();

let dropContainer = document.getElementsByClassName("drop-container");
for (let index = 0; index < dropContainer.length; index++) {
    let element = dropContainer[index];
    let header = element.getElementsByTagName("H2")[0];
    header.addEventListener("click", (e)=>{
        if(element.classList.contains("open")){
            element.className = element.className.replace(" open", "");
        }else{
            element.className += " open";
        }
    })
}

let addButtons = document.getElementsByClassName("add");
for (let index = 0; index < addButtons.length; index++) {
    let addButton: HTMLElement = addButtons[index] as HTMLElement;
    addButton.addEventListener("click", (e)=>{
        let position: Position2D = {
            x: mainCircuit.mainCanvas.width/2-mainCircuit.gloabalOffset.x,
            y: mainCircuit.mainCanvas.height/2-mainCircuit.gloabalOffset.y
        };
        switch (parseInt(addButton.dataset.value)) {
            case GATE_TYPE.CONST_HIGH_Gate:
                mainCircuit.gates.unshift(new CONST_HIGH_Gate(position));
            break;
            case GATE_TYPE.CONST_LOW_Gate:
                mainCircuit.gates.unshift(new CONST_LOW_Gate(position));
            break;
            case GATE_TYPE.Switch:
                mainCircuit.gates.unshift(new Switch_Gate(position));
            break;
            case GATE_TYPE.Buffer:
                mainCircuit.gates.unshift(new Buffer_Gate(position));
            break;
            case GATE_TYPE.NOT:
                mainCircuit.gates.unshift(new NOT_Gate(position));
            break;
            case GATE_TYPE.AND:
                mainCircuit.gates.unshift(new AND_Gate(position));
            break;
            case GATE_TYPE.OR:
                mainCircuit.gates.unshift(new OR_Gate(position));
            break;
            case GATE_TYPE.NAND:
                mainCircuit.gates.unshift(new NAND_Gate(position));
            break;
            case GATE_TYPE.NOR:
                mainCircuit.gates.unshift(new NOR_Gate(position));
            break;
            case GATE_TYPE.XOR:
                mainCircuit.gates.unshift(new XOR_Gate(position));
            break;
            case GATE_TYPE.XNOR:
                mainCircuit.gates.unshift(new XNOR_Gate(position));
            break;
            case GATE_TYPE.Lamp:
                mainCircuit.gates.unshift(new Lamp_Gate(position));
            break;
            case GATE_TYPE.Display:
                mainCircuit.gates.unshift(new Display_Gate(position));
            break;
            case GATE_TYPE.Lable:
                mainCircuit.gates.unshift(new Lable_Gate(position, "Lable"));
            break;
        }
        mainCircuit.refrashCanvas();
        console.log("WWWWWWWWWW");
    });
}

let errorContainer = document.getElementById("error-container");
errorContainer.getElementsByTagName("BUTTON")[0].addEventListener("click", ()=>{
    errorContainer.className = "hidden";
});

let menu = document.getElementById("menu") as HTMLElement;
let dragContainer = document.getElementById("drag-container") as HTMLElement;
let isDraggingMenu: boolean = false;

dragContainer.addEventListener("mousedown", (e)=>{
    isDraggingMenu = true;
});

document.addEventListener("mouseup", (e: MouseEvent)=>{
    isDraggingMenu = false;
    
});

document.addEventListener("mousemove", (e: MouseEvent)=>{
    if(!isDraggingMenu)return;
    menu.style.left = e.clientX - dragContainer.getBoundingClientRect().width/2 + "px";
    menu.style.top = e.clientY - dragContainer.getBoundingClientRect().height/2 + "px";
});
