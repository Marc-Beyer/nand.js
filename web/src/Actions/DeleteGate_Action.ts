class DeleteGate_Action extends Action {

    public gate: Gate;
    public para: any[] = null;

    constructor(gate: Gate) {
        super();
        this.gate = gate;
    }
    
    // Override
    public redoAction(): void{

    }
    
    // Override
    public undoAction(): void{
        console.log("dgAction",this.gate);
        
        mainCircuit.addBackGate(this.gate);
    }
}