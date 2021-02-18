class CreateGate_Action extends Action {

    public gate: Gate;

    constructor(gate: Gate) {
        super();
        this.gate = gate;
    }
    
    // Override
    public redoAction(): void{

    }
    
    // Override
    public undoAction(): void{
        console.log("cgAction",this.gate);
        mainCircuit.deleteGate(this.gate, false);
    }
}