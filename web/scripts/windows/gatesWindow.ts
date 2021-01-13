class GatesWindow extends MWindow {
    constructor(transform: Transform) {
        super(transform);

        let inputsDropContainer: DropContainer = new DropContainer("Inputs", [
            {itemName: "Constand high", value: GATE_TYPE.CONST_HIGH_Gate},
            {itemName: "Constand low", value: GATE_TYPE.CONST_LOW_Gate},
            {itemName: "Clock", value: GATE_TYPE.Clock},
            {itemName: "Button", value: GATE_TYPE.Button},
            {itemName: "Switch", value: GATE_TYPE.Switch}
        ]);
        let logicGatesDropContainer: DropContainer = new DropContainer("Logic Gates", [
            {itemName: "Buffer", value: GATE_TYPE.Buffer},
            {itemName: "NOT", value: GATE_TYPE.NOT},
            {itemName: "AND", value: GATE_TYPE.AND},
            {itemName: "OR", value: GATE_TYPE.OR},
            {itemName: "NAND", value: GATE_TYPE.NAND},
            {itemName: "NOR", value: GATE_TYPE.NOR},
            {itemName: "XOR", value: GATE_TYPE.XOR},
            {itemName: "XNOR", value: GATE_TYPE.XNOR}
        ]);
        let outputsDropContainer: DropContainer = new DropContainer("Outputs", [
            {itemName: "Lamp", value: GATE_TYPE.Lamp},
            {itemName: "Display", value: GATE_TYPE.Display}
        ]);
        let otherDropContainer: DropContainer = new DropContainer("Other", [
            {itemName: "Lable", value: GATE_TYPE.Lable}
        ]);
        
        this.append(inputsDropContainer.htmlElement);
        this.append(logicGatesDropContainer.htmlElement);
        this.append(outputsDropContainer.htmlElement);
        this.append(otherDropContainer.htmlElement);

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
            });
        }

        let addButtons = document.getElementsByClassName("add");
        for (let index = 0; index < addButtons.length; index++) {
            let addButton: HTMLElement = addButtons[index] as HTMLElement;
            addButton.addEventListener("click", (e)=>{
                let position: Position2D = {
                    x: mainCircuit.mainCanvas.width/2-mainCircuit.gloabalOffset.x,
                    y: mainCircuit.mainCanvas.height/2-mainCircuit.gloabalOffset.y
                };
                mainCircuit.addGate(parseInt(addButton.dataset.value), position);
            });
        }
    }
}