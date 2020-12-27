class Circuit{
    public grid: Position2D;

    private isMouseDown: boolean;
    private activeGate: Gate;
    private activeIO: IO = null;
    private activeOffset: Position2D = null;

    private mainCanvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gates: Gate[] = [];


    constructor(grid: Position2D = {x: 1, y: 1}) {
        this.mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
        this.ctx = this.mainCanvas.getContext("2d");
        let rect = this.mainCanvas.getBoundingClientRect();
        this.mainCanvas.width = rect.width;
        this.mainCanvas.height = rect.height;
        //TODO resize window event handler
        this.grid = grid;
    
        // Add mouse event handler
        this.mainCanvas.addEventListener("mousedown", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("mousemove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("mouseup", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("mouseout", this.mouseoutEventHandler);
    
        // Add touch event handler
        this.mainCanvas.addEventListener("touchstart", this.mousedownEventHandler);
        this.mainCanvas.addEventListener("touchmove", this.mousemoveEventHandler);
        this.mainCanvas.addEventListener("touchend", this.mouseupEventHandler);
        this.mainCanvas.addEventListener("touchcancel", this.mouseoutEventHandler);

        this.gates.push(new Gate("&", 2, 1, {x: 30, y: 10}));
        this.gates.push(new Gate("&", 3, 1, {x: 500, y: 10}));
        this.gates.push(new Gate("&", 1, 2, {x: 400, y: 510}));
        this.gates.push(new Gate("&", 4, 4, {x: 1100, y: 110}));
        this.gates.push(new Gate("&", 4, 4, {x: 1400, y: 410}));

        this.gates[0].connections.push({gate: this.gates[1], outputNr: 0, inputNr: 0});

        this.refrashCanvas();
    }

    // Redraw the canvas
    private refrashCanvas() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        // Set style
        this.ctx.lineWidth = 3;
        this.ctx.font = "30px Arial";
        this.ctx.strokeStyle = "#DDDDDD";
        this.ctx.fillStyle = "#DDDDDD";

        // Darw Gates and Connections
        for (let gate of this.gates) {
            gate.drawConnations(this.ctx);
        }
        for (let gate of this.gates) {
            gate.drawGate(this.ctx);
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
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    }

    /////////////////////
    /// Event-Handler ///
    /////////////////////

    private mousedownEventHandler(e: MouseEvent) {
        //console.log("e", e);
        // Check if the user clicked on a gate
        mainCircuit.activeGate = mainCircuit.getGateAtPosition(mainCircuit.getMousePositionOnCanvas(e));
        if(mainCircuit.activeGate !== null){
            mainCircuit.activeOffset = mainCircuit.activeGate.getOffsetPosition(mainCircuit.getMousePositionOnCanvas(e));
        }else{
            // Check if the user clicked on an input or output
            mainCircuit.activeIO = mainCircuit.getIOAtPosition(mainCircuit.getMousePositionOnCanvas(e));
            if(mainCircuit.activeIO !== null){
                console.log(mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
            }
        }
        mainCircuit.isMouseDown = true;
    }

    private mousemoveEventHandler(e: MouseEvent) {
        //console.log("e", e);
        if(mainCircuit.isMouseDown && mainCircuit.activeGate !== null){
            //console.log(mainCircuit.activeGate.toString());
            mainCircuit.activeGate.transform.position = mainCircuit.stickPositionToGrid({x: e.clientX + mainCircuit.activeOffset.x, y: e.clientY + mainCircuit.activeOffset.y});
            mainCircuit.refrashCanvas();
        }
    }

    private mouseupEventHandler(e: MouseEvent) {
        console.log(mainCircuit.getMousePositionOnCanvas(e).x + " " + mainCircuit.getMousePositionOnCanvas(e).y);
        mainCircuit.isMouseDown = false;
        if(mainCircuit.activeIO !== null){
            if(mainCircuit.activeIO.ioType === IOType.Input){
                let output = mainCircuit.getOutputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if(output !== null){
                    // Create a new Connection
                    console.log("output: " + output.gate.toString() + " " + output.ioNr + " " + output.ioType);
                    console.log("active: " + mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
                    output.gate.connections.push({gate: mainCircuit.activeIO.gate, outputNr: output.ioNr, inputNr: mainCircuit.activeIO.ioNr});
                    mainCircuit.refrashCanvas();
                }
            }else if(mainCircuit.activeIO.ioType === IOType.Output){
                let input = mainCircuit.getInputAtPosition(mainCircuit.getMousePositionOnCanvas(e));
                if(input !== null){
                    // Create a new Connection
                    console.log("active: " + mainCircuit.activeIO.gate.toString() + " " + mainCircuit.activeIO.ioNr + " " + mainCircuit.activeIO.ioType);
                    console.log("input: " + input.gate.toString() + " " + input.ioNr + " " + input.ioType);
                    mainCircuit.activeIO.gate.connections.push({gate: input.gate, outputNr: mainCircuit.activeIO.ioNr, inputNr: input.ioNr});
                    mainCircuit.refrashCanvas();
                }
            }
        }
        mainCircuit.activeGate = null;
        mainCircuit.activeIO = null;
    }

    private mouseoutEventHandler(e: MouseEvent  ) {
        //console.log("e", e);
        mainCircuit.isMouseDown = false;
        mainCircuit.activeGate = null;
        mainCircuit.activeIO = null;
    }
}


var mainCircuit = new Circuit({x: 50, y: 50});