class Gate {
    public name: string;
    public transform: Transform;
    public inputs: number;
    public outputs: number;
    public connections: Connection[] = [];
    public inputSignals: boolean[];
    public boolFunction: (inputs: boolean[]) => boolean[];
    public ioWidth: number = 20;
    public ioHeight: number = 3;

    constructor(name: string, inputs: number = 0, outputs: number = 0, position: Position2D = {x: 0, y: 0}, boolFunction: (inputs: boolean[]) => boolean[] = (inputs: boolean[]) => {return [false]}) {
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
        this.transform = {position: position, width: 70, height: 40};
        this.boolFunction = boolFunction;
        this.inputSignals = [];
        for (let index = 0; index < inputs; index++) {
            this.inputSignals.push(false);
        }
        console.log(this.inputSignals);
    }

    // If the position is within the bounds of the transform return true else return false
    public isGateInPosition(position: Position2D): boolean {
        if(this.transform.position.x < position.x && this.transform.position.x + this.transform.width > position.x &&
            this.transform.position.y < position.y && this.transform.position.y + this.transform.height > position.y){
            return true;
        }
    }

    // If the position is within the bounds of an input return it's nr else return null
    public gateInputAtPosition(position: Position2D): number | null {
        //console.log("MousePos", position.x + " " + position.y);
        for (let i = 0; i < this.inputs; i++) {
            let inputPosition = this.getInputPosition(i);
            //console.log("gateInputAtPosition", inputPosition.x + " " + inputPosition.y);
            if(inputPosition.x < position.x && inputPosition.x + this.ioWidth > position.x &&
                inputPosition.y - this.ioWidth/2 < position.y && inputPosition.y + this.ioWidth/2 > position.y){
                    return i;
            }
        }
        return null;
    }

    // If the position is within the bounds of an output return it's nr else return null
    public gateOutputAtPosition(position: Position2D): number | null {
        for (let i = 0; i < this.outputs; i++) {
            let outputPosition = this.getOutputPosition(i);
            if(outputPosition.x < position.x && outputPosition.x + this.ioWidth > position.x &&
                outputPosition.y - this.ioWidth/2 < position.y && outputPosition.y + this.ioWidth/2 > position.y){
                    return i;
            }
        }
        return null;
    }

    // Draws the Gate to the canvas
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D) {
        // Set style
        ctx.fillStyle = "#3B3B3B";

        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        
        // Set style
        ctx.fillStyle = "#DDDDDD";

        // Draw box and name
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        ctx.fillText(this.name, this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + 20);

        // Draw inputs
        for (let i = 0; i < this.inputs; i++) {
            if(this.inputSignals[i]){
                ctx.fillStyle = "#FF0000";
            }else{
                ctx.fillStyle = "#DDDDDD";
            }
            let inputPosition = this.getInputPosition(i);
            ctx.fillRect(inputPosition.x + offset.x, inputPosition.y + offset.y, this.ioWidth, this.ioHeight);
        }

        // Draw outputs
        for (let i = 0; i < this.outputs; i++) {
            if(this.getOutput(i)){
                ctx.fillStyle = "#FF0000";
            }else{
                ctx.fillStyle = "#DDDDDD";
            }
            let outputPosition = this.getOutputPosition(i);
            ctx.fillRect(outputPosition.x + offset.x, outputPosition.y + offset.y, this.ioWidth, this.ioHeight);
        }
    }
    
    // Draws the connections to the canvas
    public drawConnations(ctx: CanvasRenderingContext2D, offset: Position2D) {
        if(this.getOutput()){
            ctx.strokeStyle = "#FF0000";
        }else{
            ctx.strokeStyle = "#DDDDDD";
        }
        for (let connection of this.connections) {
            let inputPosition = connection.gate.getInputPosition(connection.inputNr);
            let outputPosition = this.getOutputPosition(connection.outputNr);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + this.ioWidth + offset.x, outputPosition.y + this.ioHeight/2 + offset.y);
            ctx.lineTo(inputPosition.x + offset.x, inputPosition.y + this.ioHeight/2 + offset.y);
            ctx.stroke();
        }
        ctx.strokeStyle = "#DDDDDD";
    }

    // Get the position of the input with number nr
    public getInputPosition(nr: number): Position2D | null{
        if(nr >= this.inputs){
            return null;
        }
        return {x: this.transform.position.x -20, y: this.transform.position.y + nr * this.transform.height/this.inputs + (this.transform.height/this.inputs)/2};
    }

    // Get the position of the output with number nr
    public getOutputPosition(nr: number): Position2D | null{
        if(nr >= this.outputs){
            return null;
        }
        return {x: this.transform.position.x + this.transform.width, y: this.transform.position.y + nr * this.transform.height/this.outputs + (this.transform.height/this.outputs)/2};
    }

    // Get the offset to transform.position
    public getOffsetPosition(position: Position2D): Position2D {
        position.x = this.transform.position.x - position.x;
        position.y = this.transform.position.y - position.y;
        return position;
    }

    // Calculate the outputSignal
    public getOutput(nr: number = 0): boolean{
        return this.boolFunction(this.inputSignals)[nr];
    }

    // Update signal at input eith the number nr
    public updateInput(nr: number, bool: boolean){
        if(this.inputSignals[nr] !== bool){
            this.inputSignals[nr] = bool;
            for (let connection of this.connections) {
                connection.gate.updateInput(connection.inputNr, this.getOutput());
            }
        }else{
            this.inputSignals[nr] = bool;
        }
    }

    // Returns the Gate type and position as string
    public toString(): string{
        return this.name + " (" + this.transform.position.x + "," + this.transform.position.y + "," + this.transform.width + "," + this.transform.height + ")";
    }
}
