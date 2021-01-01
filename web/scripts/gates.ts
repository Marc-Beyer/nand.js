// 1-Input gates 

class Buffer_Gate extends Gate {
    constructor(position: Position2D) {
        super("1", 1, 1, position, (inputs: boolean[]) => {return inputs});
    }
}

class NOT_Gate extends Gate {
    constructor(position: Position2D) {
        super("1", 1, 1, position, (inputs: boolean[]) => {return [!inputs[0]]});
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        
        // Draw outputs
        for (let i = 0; i < this.outputs; i++) {
            let outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth/2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth/2, outputPosition.y + offset.y + this.ioHeight/2);
            ctx.stroke();
        }
    }
}

// Conjunction and Disjunction

class AND_Gate extends Gate {
    constructor(position: Position2D) {
        super("&", 2, 1, position, (inputs: boolean[]) => {return [inputs[0] && inputs[1]]});
    }
}

class OR_Gate extends Gate {
    constructor(position: Position2D) {
        super(String.fromCharCode(8805) + "1", 2, 1, position, (inputs: boolean[]) => {return [inputs[0] || inputs[1]]});
    }
}

// Alternative denial and Joint denial

class NAND_Gate extends Gate {
    constructor(position: Position2D) {
        super("&", 2, 1, position, (inputs: boolean[]) => {return [!(inputs[0] && inputs[1])]});
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        
        // Draw outputs
        for (let i = 0; i < this.outputs; i++) {
            let outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth/2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth/2, outputPosition.y + offset.y + this.ioHeight/2);
            ctx.stroke();
        }
    }
}

class NOR_Gate extends Gate {
    constructor(position: Position2D) {
        super(String.fromCharCode(8805) + "1", 2, 1, position, (inputs: boolean[]) => {return [!(inputs[0] || inputs[1])]});
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        
        // Draw outputs
        for (let i = 0; i < this.outputs; i++) {
            let outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth/2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth/2, outputPosition.y + offset.y + this.ioHeight/2);
            ctx.stroke();
        }
    }
}

// Exclusive or and Biconditional

class XOR_Gate extends Gate {
    constructor(position: Position2D) {
        super("=1", 2, 1, position, (inputs: boolean[]) => {return [(inputs[0] || inputs[1]) && !(inputs[0] && inputs[1])]});
    }
}

class XNOR_Gate extends Gate {
    constructor(position: Position2D) {
        super("=1", 2, 1, position, (inputs: boolean[]) => {return [!((inputs[0] || inputs[1]) && !(inputs[0] && inputs[1]))]});
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        
        // Draw outputs
        for (let i = 0; i < this.outputs; i++) {
            let outputPosition = this.getOutputPosition(i);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + offset.x, outputPosition.y + offset.y - this.ioWidth/2);
            ctx.lineTo(outputPosition.x + offset.x + this.ioWidth/2, outputPosition.y + offset.y + this.ioHeight/2);
            ctx.stroke();
        }
    }
}

// Outputs

class CONST_HIGH_Gate extends Gate {
    constructor(position: Position2D) {
        super("OUT 1", 0, 1, position, (inputs: boolean[]) => {return [true]});
    }
}

class CONST_LOW_Gate extends Gate {
    constructor(position: Position2D) {
        super("OUT 0", 0, 1, position, (inputs: boolean[]) => {return [false]});
    }
}

class Switch_Gate extends Gate {
    public switchState: boolean = true;

    constructor(position: Position2D) {
        super("", 0, 1, position, (inputs: boolean[]) => {return [this.switchState]});
    }

    // Overrite the isGateInPosition()
    public isGateInPosition(position: Position2D): boolean {
        let isInPos: boolean = super.isGateInPosition(position);
        if(isInPos){
            this.switchState = !this.switchState;
        }
        /*for (let connection of this.connections) {
            connection.gate.updateInput(connection.inputNr, this.getOutput());
        }*/
        mainCircuit.connectionManager.updateConnectedGates(this);
        return isInPos;
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);

        // Set style
        ctx.fillStyle = "#222222";

        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/2, this.transform.height/2);
        
        // Set style
        ctx.fillStyle = "#DDDDDD";

        // Draw background
        if(this.switchState){
            ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }else{
            ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/2, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }
        
        ctx.fillText("|", this.transform.position.x + offset.x + this.transform.width/8, this.transform.position.y + this.transform.height/16*10 + offset.y);
        ctx.fillText("0", this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/16*10  + offset.y);

    }
}

// Outputs

class Lamp_Gate extends Gate {
    constructor(position: Position2D) {
        super("", 1, 0, position, (inputs: boolean[]) => {return [false]});
        this.transform.width = this.transform.height;
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        // Set style
        if(this.inputSignals[0]){
            ctx.fillStyle = "#FF0000";
        }else{
            ctx.fillStyle = "#3B3B3B";
        }

        // Draw background
        let radius = this.transform.width/2;
        ctx.beginPath();
        ctx.arc(this.transform.position.x + offset.x + radius, this.transform.position.y + offset.y + radius, radius, 0, 2 * Math.PI);
        ctx.fill();
        let c = Math.sqrt(radius*radius + radius*radius)/2;
        ctx.moveTo(this.transform.position.x + offset.x + radius - c, this.transform.position.y + offset.y + radius - c);
        ctx.lineTo(this.transform.position.x + offset.x + radius + c, this.transform.position.y + offset.y + radius + c);
        ctx.moveTo(this.transform.position.x + offset.x + radius + c, this.transform.position.y + offset.y + radius - c);
        ctx.lineTo(this.transform.position.x + offset.x + radius - c, this.transform.position.y + offset.y + radius + c);
        ctx.stroke();
        
        // Set style
        ctx.fillStyle = "#DDDDDD";

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
    }
}

// Other

class Lable_Gate extends Gate {
    public text: string[];
    constructor(position: Position2D, text: string) {
        super(text, 0, 0, position, (inputs: boolean[]) => {return [false]});
        this.text = text.split("\n");
        this.transform.height = this.text.length * 20 + 10;

        for (let line of  this.text) {
            if(line.length * 10 + 20 >  this.transform.width){
                this.transform.width = line.length * 10 + 20;
            }
        }
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        // Set style
        ctx.fillStyle = "#3B3B3B";

        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        
        // Set style
        ctx.fillStyle = "#DDDDDD";

        // Draw box and name
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);
        for (let i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + i * 20 + 20);
        }
    }
}