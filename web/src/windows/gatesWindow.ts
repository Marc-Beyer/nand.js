class GatesWindow extends MWindow {
    constructor(transform: Transform) {
        super(transform);

        let inputsDropContainer: DropContainer = new DropContainer("Inputs", [
            {itemName: "Constant high", value: GATE_TYPE.CONST_HIGH_Gate},
            {itemName: "Constant low", value: GATE_TYPE.CONST_LOW_Gate},
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
            {itemName: "Display", value: GATE_TYPE.Display},
            {itemName: "7 segment display", value: GATE_TYPE.Segment_Display}
        ]);
        let otherDropContainer: DropContainer = new DropContainer("Other", [
            {itemName: "Lable", value: GATE_TYPE.Lable},
            {itemName: "RS FlipFlop/Latch", value: GATE_TYPE.RS_Latch}
        ]);
        let flipFlopDropContainer: DropContainer = new DropContainer("FlipFlops", [
            {itemName: "RS FlipFlop", value: GATE_TYPE.RS_Latch},
            {itemName: "RCS FlipFlop", value: GATE_TYPE.Gated_RS_Latch}
        ]);
        
        this.append(inputsDropContainer.htmlElement);
        this.append(logicGatesDropContainer.htmlElement);
        this.append(outputsDropContainer.htmlElement);
        this.append(flipFlopDropContainer.htmlElement);
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