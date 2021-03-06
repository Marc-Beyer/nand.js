class Gate {
    public name: string = "Not yet set";
    public lable: string;
    public transform: Transform;
    public inputs: number;
    public outputs: number;
    public connections: Connection[] = [];
    public inputSignals: boolean[];
    public boolFunction: (inputs: boolean[]) => boolean[];
    public ioWidth: number = 20;
    public ioHeight: number = 2;
    public type: number = 0;

    constructor(lable: string, inputs: number = 0, outputs: number = 0, position: Position2D = {x: 0, y: 0}, boolFunction: (inputs: boolean[]) => boolean[] = (inputs: boolean[]) => {return [false]}) {
        this.lable = lable;
        this.inputs = inputs;
        this.outputs = outputs;
        this.transform = {position: position, width: 70, height: 40};
        this.boolFunction = boolFunction;
        this.inputSignals = [];
        for (let index = 0; index < inputs; index++) {
            this.inputSignals.push(false);
        }
        //console.log(this.inputSignals);
    }

    // If the position is within the bounds of the transform return true else return false
    public isGateInPosition(position: Position2D): boolean {
        if(this.transform.position.x < position.x && this.transform.position.x + this.transform.width > position.x &&
            this.transform.position.y < position.y && this.transform.position.y + this.transform.height > position.y){
            return true;
        }
        return false;
    }

    // If the position is within the bounds of an input return it's nr else return null
    public gateInputAtPosition(position: Position2D): number | null {
        ////console.log("MousePos", position.x + " " + position.y);
        for (let i = 0; i < this.inputs; i++) {
            let inputPosition = this.getInputPosition(i);
            ////console.log("gateInputAtPosition", inputPosition.x + " " + inputPosition.y);
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
        ctx.fillStyle = OPTIONS.COLOR.background;

        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;

        // Draw inputs
        this.drawInputs(ctx, offset);

        // Draw outputs
        this.drawOutputs(ctx, offset);

        // Draw box and lable
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        ctx.fillText(this.lable, this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + 20);
    }

    public drawInputs(ctx: CanvasRenderingContext2D, offset: Position2D){
        for (let i = 0; i < this.inputs; i++) {
            if(this.inputSignals[i]){
                ctx.fillStyle = OPTIONS.COLOR.active;
            }else{
                ctx.fillStyle = OPTIONS.COLOR.main;
            }
            let inputPosition = this.getInputPosition(i);
            ctx.fillRect(inputPosition.x + offset.x, inputPosition.y + offset.y - this.ioHeight/2, this.ioWidth, this.ioHeight);
        }
        ctx.fillStyle = OPTIONS.COLOR.main;
    }

    public drawOutputs(ctx: CanvasRenderingContext2D, offset: Position2D){
        for (let i = 0; i < this.outputs; i++) {
            if(this.getOutput(i)){
                ctx.fillStyle = OPTIONS.COLOR.active;
            }else{
                ctx.fillStyle = OPTIONS.COLOR.main;
            }
            let outputPosition = this.getOutputPosition(i);
            ctx.fillRect(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioHeight/2, this.ioWidth, this.ioHeight);
        }
        ctx.fillStyle = OPTIONS.COLOR.main;
    }
    
    public drawNegatedOutputs(ctx: CanvasRenderingContext2D, offset: Position2D){
        ctx.fillStyle = OPTIONS.COLOR.background;
        for (let i = 0; i < this.outputs; i++) {
            if(this.getOutput(i)){
                ctx.strokeStyle = OPTIONS.COLOR.active;
            }else{
                ctx.strokeStyle = OPTIONS.COLOR.main;
            }
            let outputPosition = this.getOutputPosition(i);
            let radius = 4;
            ctx.beginPath();
            
            switch (OPTIONS.negatedIOStyle) {
                case 0:
                    ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth/2);
                    ctx.lineTo(outputPosition.x + offset.x + this.ioWidth/2, outputPosition.y + offset.y + this.ioHeight/2);
                    break;
                case 1:
                    ctx.arc(outputPosition.x + offset.x + radius + OPTIONS.strokeSize, outputPosition.y  + offset.y, radius, 0, 2 * Math.PI);
                    break;
            }
            
            ctx.fill();
            ctx.stroke();
        }
        ctx.fillStyle = OPTIONS.COLOR.main;
        ctx.strokeStyle = OPTIONS.COLOR.main;
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
    public updateInput(nr: number, bool: boolean): boolean{
        /*for (let connection of this.connections) {
            connection.gate.updateInput(connection.inputNr, this.getOutput());
        }*/
        let changed: boolean = this.inputSignals[nr] !== bool;
        this.inputSignals[nr] = bool;
        return changed;
    }

    // Returns the Gate type and position as string
    public toString(): string{
        return this.name + " (" + this.transform.position.x + "," + this.transform.position.y + "," + this.transform.width + "," + this.transform.height + ")";
    }

    // Is called when the gate is destroyed
    public onDestroy(){}

    // Is called when the mouse is up on the active gate
    onMouseUp(){}
}
