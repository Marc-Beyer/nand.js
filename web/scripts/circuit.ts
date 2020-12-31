class Circuit{
    public grid: Position2D;
    
    public gates: Gate[] = [];

    private isMouseDown: boolean;
    private activeGate: Gate;
    private activeIO: IO = null;
    private activeOffset: Position2D = null;

    private mainCanvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gloabalOffset: Position2D = {x: 0, y: 0};
    private mainCanvasRealWidth = 1000;
    private mainCanvasRealHeight = 1000;

    
    private _zoomFactor: number = 1;

    public get zoomFactor(): number {
        return this._zoomFactor;
    }
    public set zoomFactor(value: number) {
        //console.log("this._zoomFactor",this.zoomFactor);
        this.mainCanvas.width = this.mainCanvasRealWidth * value;
        this.mainCanvas.height = this.mainCanvasRealHeight * value;
        this._zoomFactor = value;
    }

    constructor(grid: Position2D = {x: 1, y: 1}) {
        this.mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
        this.ctx = this.mainCanvas.getContext("2d");
        let rect = this.mainCanvas.getBoundingClientRect();
        this.mainCanvas.width = rect.width;
        this.mainCanvas.height = rect.height;
        this.mainCanvasRealWidth = this.mainCanvas.width;
        this.mainCanvasRealHeight = this.mainCanvas.height;
        //TODO resize window event handler
        this.grid = grid;
    
        // Add mouse event handler
        this.mainCanvas.addEventListener("mousedown", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("mousemove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("mouseup", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("mouseout", this.mouseoutEventHandler);
        this.mainCanvas.addEventListener("wheel", this.wheelEventHandler);
        
        // Add touch event handler
        this.mainCanvas.addEventListener("touchstart", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("touchmove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("touchend", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("touchcancel", this.mouseoutEventHandler);

        // Add keydown event handler
        document.addEventListener("keydown", this.keydownEventHandler);
    }

    // Redraw the canvas
    public refrashCanvas() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        // Set style
        this.ctx.lineWidth = 3;
        this.ctx.font = "17px Courier New";
        this.ctx.textAlign = "center"; 
        this.ctx.strokeStyle = "#DDDDDD";
        this.ctx.fillStyle = "#DDDDDD";

        // Darw Gates and Connections
        for (let gate of this.gates) {
            gate.drawConnations(this.ctx, this.gloabalOffset);
        }
        for (let gate of this.gates) {
            gate.drawGate(this.ctx, this.gloabalOffset);
        }
    }

    // Get the first Gate at the position
    private getGateAtPosition(position: Position2D): Gate | null {
        for (let gate of this.gates) {
            if(gate.isGateInPosition(position)){
                return gate;
            }
        }

        return null;
    }
    
    // Get the first input at the position
    private getInputAtPosition(position: Position2D): IO | null {
        for (let gate of this.gates) {
            // Get the first input at the position and check if there is one 
            let input = gate.gateInputAtPosition(position);
            if(input !== null){
                return {gate: gate, ioNr: input, ioType: IOType.Input};
            }
        }
        return null;
    }

    // Get the first output at the position
    private getOutputAtPosition(position: Position2D): IO | null {
        for (let gate of this.gates) {
            // Get the first output at the position and check if there is one 
            let output = gate.gateOutputAtPosition(position);
            if(output !== null){
                return {gate: gate, ioNr: output, ioType: IOType.Output};
            }
        }
        return null;
    }

    // Get the first IO at the position
    private getIOAtPosition(position: Position2D): IO | null {
        for (let gate of this.gates) {
            // Get the first input at the position and check if there is one 
            let input = gate.gateInputAtPosition(position);
            if(input !== null){
                return {gate: gate, ioNr: input, ioType: IOType.Input};
            }else{
                // Get the first output at the position and check if there is one 
                let output = gate.gateOutputAtPosition(position);
                if(output !== null){
                    return {gate: gate, ioNr: output, ioType: IOType.Output};
                }
            }
        }
        return null;
    }

    // Return nearest posion on grid
    public stickPositionToGrid(position: Position2D): Position2D {
        position.x -= position.x % this.grid.x;
        position.y -= position.y % this.grid.y;
        return position;
    }

    // Get the mouseposition on the canvas from a mouseevent
    public getMousePositionOnCanvas(event: MouseEvent): Position2D {
        let rect = this.mainCanvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * this.zoomFactor - this.gloabalOffset.x,
            y: (event.clientY - rect.top) * this.zoomFactor - this.gloabalOffset.y
        };
    }

    /////////////////////
    /// Event-Handler ///
    /////////////////////

    private mousedownEventHandler(e: MouseEvent) {
        ////console.log("e", e);
        // Check if the user clicked on a gate
        mainCircuit.activeGate = mainCircuit.getGateAtPosition(mainCircuit.getMousePositionOnCanvas(e));
        if(mainCircuit.activeGate !== null){
            mainCircuit.activeOffset = mainCircuit.activeGate.getOffsetPosition(mainCircuit.getMousePositionOnCanvas(e));
            mainCircuit.activeIO = null;
        }else{
            // Check if the user clicked on an input or output
            mainCircuit.activeIO = mainCircuit.getIOAtPosition(mainCircuit.getMousePositionOnCanvas(e));
            if(mainCircuit.activeIO !== null){
                //console.log(mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
            }
        }
        mainCircuit.isMouseDown = true;
    }

    private mousemoveEventHandler(e: MouseEvent) {
        ////console.log("e", e);
        if(mainCircuit.isMouseDown) {
            if(mainCircuit.activeGate !== null){
                // Move activeGate
                let mousePosition = mainCircuit.getMousePositionOnCanvas(e);
                mousePosition.x += mainCircuit.activeOffset.x;
                mousePosition.y += mainCircuit.activeOffset.y;
                mainCircuit.activeGate.transform.position = mainCircuit.stickPositionToGrid(mousePosition);
                mainCircuit.refrashCanvas();
            }else if(mainCircuit.activeIO !== null){
                // Draw unfinished connection
                mainCircuit.refrashCanvas();
                let ioPosition = null;
                let mousePosition = mainCircuit.getMousePositionOnCanvas(e);

                mainCircuit.ctx.beginPath();

                if(mainCircuit.activeIO.ioType === IOType.Input){
                    ioPosition = mainCircuit.activeIO.gate.getInputPosition(mainCircuit.activeIO.ioNr);
                    mainCircuit.ctx.moveTo(ioPosition.x + mainCircuit.gloabalOffset.x, ioPosition.y + mainCircuit.activeIO.gate.ioHeight/2 + mainCircuit.gloabalOffset.y);
                }else{
                    ioPosition = mainCircuit.activeIO.gate.getOutputPosition(mainCircuit.activeIO.ioNr);
                    mainCircuit.ctx.moveTo(ioPosition.x + mainCircuit.activeIO.gate.ioWidth + mainCircuit.gloabalOffset.x, ioPosition.y + mainCircuit.activeIO.gate.ioHeight/2 + mainCircuit.gloabalOffset.y);
                }

                mainCircuit.ctx.lineTo(mousePosition.x + mainCircuit.gloabalOffset.x, mousePosition.y + mainCircuit.gloabalOffset.y);
                mainCircuit.ctx.stroke();
            }else{
                // Change globalOffset
                mainCircuit.gloabalOffset.x += e.movementX * mainCircuit.zoomFactor;
                mainCircuit.gloabalOffset.y += e.movementY * mainCircuit.zoomFactor;
                //console.log(" * this.zoomFactor", mainCircuit.zoomFactor,"mainCircuit.gloabalOffset.x",mainCircuit.gloabalOffset.x,"mainCircuit.gloabalOffset.y",mainCircuit.gloabalOffset.y);
                mainCircuit.refrashCanvas();
            }0
        }
    }

    private mouseupEventHandler(e: MouseEvent) {
        mainCircuit.isMouseDown = false;
        if(mainCircuit.activeIO !== null){
            if(mainCircuit.activeIO.ioType === IOType.Input){
                let output = mainCircuit.getOutputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if(output !== null){
                    // Create a new Connection
                    output.gate.connections.push({gate: mainCircuit.activeIO.gate, outputNr: output.ioNr, inputNr: mainCircuit.activeIO.ioNr});
                    mainCircuit.activeIO.gate.updateInput(mainCircuit.activeIO.ioNr, output.gate.getOutput());
                }
            }else if(mainCircuit.activeIO.ioType === IOType.Output){
                let input = mainCircuit.getInputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if(input !== null){
                    // Create a new Connection
                    mainCircuit.activeIO.gate.connections.push({gate: input.gate, outputNr: mainCircuit.activeIO.ioNr, inputNr: input.ioNr});
                    input.gate.updateInput(input.ioNr, mainCircuit.activeIO.gate.getOutput());
                }
            }
        }

        mainCircuit.refrashCanvas();
    }

    private mouseoutEventHandler(e: MouseEvent) {
        ////console.log("e", e);
        mainCircuit.isMouseDown = false;
    }

    private wheelEventHandler(e: WheelEvent){
        e.preventDefault();
        
        mainCircuit.zoomFactor = mainCircuit.zoomFactor + e.deltaY * 0.01;
        mainCircuit.refrashCanvas();
    }

    private keydownEventHandler(e: KeyboardEvent) {
        if(e.key === "Backspace" || e.key === "Delete"){
            if(mainCircuit.activeGate !== null){
                let gateIndex = mainCircuit.gates.indexOf(mainCircuit.activeGate);
                if (gateIndex > -1) {
                    mainCircuit.gates.splice(gateIndex, 1);
                    mainCircuit.refrashCanvas();
                }
            }
        }
    }
}