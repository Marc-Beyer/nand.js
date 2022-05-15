// 1-Input gates 

class Buffer_Gate extends Gate {
    constructor(position: Position2D) {
        super("1", 1, 1, position, (inputs: boolean[]) => {return inputs});
        this.type = GATE_TYPE.Buffer;
        this.name = "Buffer";
    }
}

class NOT_Gate extends Gate {
    constructor(position: Position2D) {
        super("1", 1, 1, position, (inputs: boolean[]) => {return [!inputs[0]]});
        this.type = GATE_TYPE.NOT;
        this.name = "NOT";
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        this.drawNegatedOutputs(ctx, offset);
    }
}

// Conjunction and Disjunction

class AND_Gate extends Gate {
    constructor(position: Position2D) {
        super("&", 2, 1, position, (inputs: boolean[]) => {return [inputs[0] && inputs[1]]});
        this.type = GATE_TYPE.AND;
        this.name = "AND";
    }
}

class OR_Gate extends Gate {
    constructor(position: Position2D) {
        super(String.fromCharCode(8805) + "1", 2, 1, position, (inputs: boolean[]) => {return [inputs[0] || inputs[1]]});
        this.type = GATE_TYPE.OR;
        this.name = "OR";
    }
}

// Alternative denial and Joint denial

class NAND_Gate extends Gate {
    constructor(position: Position2D) {
        super("&", 2, 1, position, (inputs: boolean[]) => {return [!(inputs[0] && inputs[1])]});
        this.type = GATE_TYPE.NAND;
        this.name = "NAND";
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        switch (OPTIONS.gateStyle) {
            case 0:
                super.drawGate(ctx, offset);
                break;
            case 1:
                // Set style
                ctx.fillStyle = OPTIONS.COLOR.background;

                // Set style
                ctx.fillStyle = OPTIONS.COLOR.main;

                // Draw inputs
                this.drawInputs(ctx, offset);

                // Draw outputs
                this.drawOutputs(ctx, offset);

                let radius = this.transform.height / 2;

                ctx.beginPath();
                ctx.arc(this.transform.position.x + offset.x + this.transform.width - radius,  this.transform.position.y + offset.y + radius, radius, 1.5 * Math.PI, 0.5 * Math.PI);
                ctx.lineTo(this.transform.position.x + offset.x, this.transform.position.y + offset.y + this.transform.height);
                ctx.lineTo(this.transform.position.x + offset.x, this.transform.position.y + offset.y);
                ctx.lineTo(this.transform.position.x + offset.x + this.transform.width - radius, this.transform.position.y + offset.y);
                

                ctx.fillStyle = OPTIONS.COLOR.active;
                ctx.fill();

                ctx.fillStyle = OPTIONS.COLOR.main;
                ctx.stroke();

                break;
        }
        this.drawNegatedOutputs(ctx, offset);
    }
}

class NOR_Gate extends Gate {
    constructor(position: Position2D) {
        super(String.fromCharCode(8805) + "1", 2, 1, position, (inputs: boolean[]) => {return [!(inputs[0] || inputs[1])]});
        this.type = GATE_TYPE.NOR;
        this.name = "NOR";
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        this.drawNegatedOutputs(ctx, offset);
    }
}

// Exclusive or and Biconditional

class XOR_Gate extends Gate {
    constructor(position: Position2D) {
        super("=1", 2, 1, position, (inputs: boolean[]) => {return [(inputs[0] || inputs[1]) && !(inputs[0] && inputs[1])]});
        this.type = GATE_TYPE.XOR;
        this.name = "XOR";
    }
}

class XNOR_Gate extends Gate {
    constructor(position: Position2D) {
        super("=1", 2, 1, position, (inputs: boolean[]) => {return [!((inputs[0] || inputs[1]) && !(inputs[0] && inputs[1]))]});
        this.type = GATE_TYPE.XNOR;
        this.name = "XNOR";
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        this.drawNegatedOutputs(ctx, offset);
    }
}

// Inputs

class CONST_HIGH_Gate extends Gate {
    constructor(position: Position2D) {
        super("OUT 1", 0, 1, position, (inputs: boolean[]) => {return [true]});
        this.type = GATE_TYPE.CONST_HIGH_Gate;
        this.name = "CONST_HIGH_Gate";
    }
}

class CONST_LOW_Gate extends Gate {
    constructor(position: Position2D) {
        super("OUT 0", 0, 1, position, (inputs: boolean[]) => {return [false]});
        this.type = GATE_TYPE.CONST_LOW_Gate;
        this.name = "CONST_LOW_Gate";
    }
}

class Clock_Gate extends Gate {
    public clockState: boolean = true;
    public interval: number;

    constructor(position: Position2D) {
        super("", 0, 1, position, (inputs: boolean[]) => {return [this.clockState]});
        this.type = GATE_TYPE.Clock;
        this.name = "Clock";
        let gate = this;
        this.interval = setInterval(function(){ 
            gate.clockState = !gate.clockState; 
            mainCircuit.connectionManager.updateConnectedGates(gate);
            mainCircuit.refrashCanvas();
        }, 1000);
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);

        ctx.beginPath();
        ctx.moveTo(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + (this.transform.height/4) * 3);
        ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4);
        ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/2, this.transform.position.y + offset.y + this.transform.height/4);
        ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/2, this.transform.position.y + offset.y + (this.transform.height/4) * 3);
        ctx.lineTo(this.transform.position.x + offset.x + (this.transform.width/4)*3, this.transform.position.y + offset.y + (this.transform.height/4) * 3);
        ctx.lineTo(this.transform.position.x + offset.x + (this.transform.width/4)*3, this.transform.position.y + offset.y + this.transform.height/4);
        ctx.stroke();
    }

    // Is call when the gate is destroyed
    public onDestroy(){
        clearInterval(this.interval);
    }
}

class Button_Gate extends Gate {
    public buttonState: boolean = false;

    constructor(position: Position2D) {
        super("", 0, 1, position, (inputs: boolean[]) => {return [this.buttonState]});
        this.type = GATE_TYPE.Button;
        this.name = "Button";
    }

    // Overrite the isGateInPosition()
    public isGateInPosition(position: Position2D): boolean {
        let isInPos: boolean = super.isGateInPosition(position);
        if(isInPos){
            this.buttonState = true;
        }
        mainCircuit.connectionManager.updateConnectedGates(this);
        mainCircuit.refrashCanvas();
        return isInPos;
    }

    // Is called when the mouse is up on the active gate
    public onMouseUp(){
        this.buttonState = false;
        mainCircuit.connectionManager.updateConnectedGates(this);
    }

     // Overrite the drawGate()
     public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);

        // Set style
        ctx.fillStyle = OPTIONS.COLOR.dark;

        // Draw background
        //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/2, this.transform.height/2);
        
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;

        let xPos = this.transform.position.x + this.transform.width/2 + offset.x;
        let yPos = this.transform.position.y + this.transform.height/3 + offset.y;

        // Draw background
        if(this.buttonState){
            ctx.beginPath();
            ctx.moveTo(this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/2 + offset.y);
            ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + this.transform.height/16*4 + offset.y);
            ctx.stroke();
            yPos -= this.transform.height/6;
            //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }else{
            ctx.beginPath();
            ctx.moveTo(this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/2 + offset.y);
            ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + this.transform.height/4*3 + offset.y);
            ctx.stroke();
            //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/2, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }

        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos + this.transform.width/4, yPos);
        ctx.moveTo(xPos + this.transform.width/ 32 * 3 , yPos);
        ctx.lineTo(xPos + this.transform.width/ 32 * 3, yPos + this.transform.height/3);
        ctx.moveTo(xPos + this.transform.width/ 32 * 5, yPos);
        ctx.lineTo(xPos + this.transform.width/ 32 * 5, yPos + this.transform.height/3);
        ctx.stroke();

        ctx.fillText("1", this.transform.position.x + offset.x + this.transform.width/8, this.transform.position.y + this.transform.height/16*5 + offset.y);
        ctx.fillText("0", this.transform.position.x + offset.x + this.transform.width/8, this.transform.position.y + this.transform.height/16*15 + offset.y);
        //ctx.fillText("0", this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/16*10  + offset.y);

    }

    /* Old Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);

        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/2, this.transform.height/2);
    
        if(this.buttonState){
            // Set style
            ctx.fillStyle = OPTIONS.COLOR.dark;
            ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4+2, this.transform.position.y + offset.y + this.transform.height/4+2, this.transform.width/2-4, this.transform.height/2-4);
            ctx.fillStyle = OPTIONS.COLOR.main;
        }
    }
    */
}

class Switch_Gate extends Gate {
    public switchState: boolean = false;

    constructor(position: Position2D) {
        super("", 0, 1, position, (inputs: boolean[]) => {return [this.switchState]});
        this.type = GATE_TYPE.Switch;
        this.name = "Switch";
    }

    // Overrite the isGateInPosition()
    public isGateInPosition(position: Position2D): boolean {
        let isInPos: boolean = super.isGateInPosition(position);
        if(isInPos){
            this.switchState = !this.switchState;
        }
        mainCircuit.connectionManager.updateConnectedGates(this);
        return isInPos;
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);

        // Set style
        ctx.fillStyle = OPTIONS.COLOR.dark;

        // Draw background
        //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/2, this.transform.height/2);
        
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;

        // Draw background
        if(this.switchState){
            ctx.beginPath();
            ctx.moveTo(this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/2 + offset.y);
            ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + this.transform.height/16*4 + offset.y);
            ctx.stroke();
            //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }else{
            ctx.beginPath();
            ctx.moveTo(this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/2 + offset.y);
            ctx.lineTo(this.transform.position.x + offset.x + this.transform.width/4, this.transform.position.y + this.transform.height/4*3 + offset.y);
            ctx.stroke();
            //ctx.fillRect(this.transform.position.x + offset.x + this.transform.width/2, this.transform.position.y + offset.y + this.transform.height/4, this.transform.width/4, this.transform.height/2);
        }
        
        ctx.fillText("1", this.transform.position.x + offset.x + this.transform.width/8, this.transform.position.y + this.transform.height/16*5 + offset.y);
        ctx.fillText("0", this.transform.position.x + offset.x + this.transform.width/8, this.transform.position.y + this.transform.height/16*15 + offset.y);
        //ctx.fillText("0", this.transform.position.x + this.transform.width - this.transform.width/8 + offset.x, this.transform.position.y + this.transform.height/16*10  + offset.y);

    }
}

// Outputs

class Lamp_Gate extends Gate {
    constructor(position: Position2D) {
        super("", 1, 0, position, (inputs: boolean[]) => {return [false]});
        this.type = GATE_TYPE.Lamp;
        this.name = "Lamp";
        this.transform.width = this.transform.height;
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        // Set style
        if(this.inputSignals[0]){
            ctx.fillStyle = OPTIONS.COLOR.active;
        }else{
            ctx.fillStyle = OPTIONS.COLOR.background;
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
        ctx.fillStyle = OPTIONS.COLOR.main;

        // Draw inputs
        this.drawInputs(ctx, offset);
    }
}

class Display_Gate extends Gate {
    constructor(position: Position2D) {
        super("", 4, 0, position, (inputs: boolean[]) => {return [false]});
        this.type = GATE_TYPE.Display;
        this.name = "Display";
        this.transform.height = 80;
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        ctx.fillStyle = OPTIONS.COLOR.main;
        ctx.font = "50px Courier New";
        ctx.fillText(this.intFromInput().toString(16).toUpperCase(), this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + 50);
    
        ctx.font = "17px Courier New";
    }

    public intFromInput(): number{
        let value: number = 0;
        for (let i = this.inputSignals.length-1; i >= 0; i--) {
            value = (value * 2);
            value += this.inputSignals[i] ? 1 : 0; 
        }
        return value;
    }
}

class Segment_Display_Gate extends Gate {
    constructor(position: Position2D) {
        super("", 7, 0, position, (inputs: boolean[]) => {return [false]});
        this.type = GATE_TYPE.Segment_Display;
        this.name = "7 segment display";
        this.transform.height = 140;
        this.transform.width = 80;
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        ctx.fillStyle = OPTIONS.COLOR.active;

        let x = this.transform.position.x + offset.x;
        let y = this.transform.position.y + offset.y;
        let width = this.transform.width;
        let height = this.transform.height;
        
        this.inputSignals[0] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8 + 10, y + height/8-5, this.transform.width/4*3 - 20, 10);

        this.inputSignals[1] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8*7-10, y + height/8 + 5, 10, height/8*3 - 10);

        this.inputSignals[2] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8*7-10, y + height/8*4 + 5, 10, height/8*3 - 10);

        this.inputSignals[3] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8 + 10, y + height/8*7-5, this.transform.width/4*3 - 20, 10);

        this.inputSignals[5] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8, y + height/8 + 5, 10, height/8*3 - 10);

        this.inputSignals[4] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8, y + height/8*4 + 5, 10, height/8*3 - 10);
        
        this.inputSignals[6] ? ctx.fillStyle = OPTIONS.COLOR.active : ctx.fillStyle = OPTIONS.COLOR.dark;
        ctx.fillRect(x + width/8 + 10, y + height/8*4-5, this.transform.width/4*3 - 20, 10);

        ctx.fillStyle = OPTIONS.COLOR.main;
    }

    public intFromInput(): number{
        let value: number = 0;
        for (let i = this.inputSignals.length-1; i >= 0; i--) {
            value = (value * 2);
            value += this.inputSignals[i] ? 1 : 0; 
        }
        return value;
    }
}

// Other

class Lable_Gate extends Gate {
    public text: string[];
    constructor(position: Position2D, text: string = "Lable") {
        super(text, 0, 0, position, (inputs: boolean[]) => {return [false]});
        this.type = GATE_TYPE.Lable;
        this.name = "Lable";
        this.setText(text);
    }

    // Set the Text and rezize the gate
    public setText(text: string){
        this.text = text.split("\n");
        this.transform.height = this.text.length * 20 + 10;

        this.transform.width = 20;
        for (let line of  this.text) {
            if(line.length * 10 + 20 >  this.transform.width){
                this.transform.width = line.length * 10 + 20;
            }
        }
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;

        // Draw box and name
        ctx.strokeRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);

        // Set style
        ctx.fillStyle = OPTIONS.COLOR.background;

        // Draw background
        ctx.fillRect(this.transform.position.x + offset.x, this.transform.position.y + offset.y, this.transform.width, this.transform.height);

        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
        ctx.font = "17px 900 Courier New";

        for (let i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + i * 20 + 20);
        }
        
        //ctx.font = "17px bold Courier New";
    }
}

class Connection_Gate extends Gate {
    constructor(position: Position2D) {
        super("", 1, 1, position, (inputs: boolean[]) => {return inputs});
        this.type = GATE_TYPE.Connection;
        this.name = "Connection";
        this.transform.width = this.transform.height = 10;
        this.ioWidth = this.ioHeight;
    }

    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        // Set style
        if(this.inputSignals[0]){
            ctx.fillStyle = OPTIONS.COLOR.active;
        }else{
            ctx.fillStyle = OPTIONS.COLOR.main;
        }
        // Draw background
        let radius = this.transform.width/2;
        ctx.beginPath();
        ctx.arc(this.transform.position.x + offset.x , this.transform.position.y + offset.y, radius, 0, 2 * Math.PI);
        ctx.fill();

        // Set style
        ctx.fillStyle = OPTIONS.COLOR.main;
    }

    // If the position is within the bounds of the transform return true else return false
    public isGateInPosition(position: Position2D): boolean {
        if(mainCircuit.connectionManager.getDictance(this.transform.position, position) <= this.transform.width/2){
            return true;
        }
        return false;
    }

    // If the position is within the bounds of an output return it's nr else return null
    public gateOutputAtPosition(position: Position2D): number | null {
        let outputPosition = this.getOutputPosition(1);
        if(outputPosition.x - 20 < position.x && outputPosition.x + 20 > position.x &&
            outputPosition.y - 20 < position.y && outputPosition.y + 20 > position.y){
                return 0;
        }
        return null;
    }

    // If the position is within the bounds of an input return it's nr else return null
    public gateInputAtPosition(position: Position2D): number | null {
        return null;
    }

    // Get the position of the input with number nr
    public getInputPosition(nr: number): Position2D | null{
        return {x: this.transform.position.x, y: this.transform.position.y};
    }

    // Get the position of the output with number nr
    public getOutputPosition(nr: number): Position2D | null{
        return {x: this.transform.position.x - this.ioWidth, y: this.transform.position.y};
    }
}

/* 
    FlipFlops
*/

class RS_Latch_Gate extends Gate {
    public savedInput: boolean = false;

    constructor(position: Position2D) {
        super("S         Q", 2, 2, position, (inputs: boolean[]) => {
            if(inputs[0])this.savedInput = true;
            if(inputs[1])this.savedInput = false;
            if(this.savedInput){
                return [true, false];
            }else{
                return [false, true];
            }
            
        });
        this.type = GATE_TYPE.RS_Latch;
        this.name = "RS_Latch";
        this.transform.height = 80;
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        // Set style
        ctx.fillText("R         Q", this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + this.transform.height- 10);
        ctx.fillText("            _", this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + this.transform.height- 27);
    }
}

class Gated_RS_Latch_Gate extends Gate {
    public savedInput: boolean = false;

    constructor(position: Position2D) {
        super("S         Q", 3, 2, position, (inputs: boolean[]) => {
            if(inputs[1]){
                if(inputs[0])this.savedInput = true;
                if(inputs[2])this.savedInput = false;
            }
            if(this.savedInput){
                return [true, false];
            }else{
                return [false, true];
            }
            
        });
        this.type = GATE_TYPE.Gated_RS_Latch;
        this.name = "Gated_RS_Latch";
        this.transform.height = 80;
    }
    
    // Overrite the drawGate()
    public drawGate(ctx: CanvasRenderingContext2D, offset: Position2D){
        super.drawGate(ctx, offset);
        // Set style
        ctx.fillText("R         Q", this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + this.transform.height- 10);
        ctx.fillText("C            ", this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + this.transform.height/2+5);
        ctx.fillText("            _", this.transform.position.x + this.transform.width/2 + offset.x, this.transform.position.y + offset.y + this.transform.height- 27);
    }
}