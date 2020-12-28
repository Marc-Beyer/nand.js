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