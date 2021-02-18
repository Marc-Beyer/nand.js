class DeleteConnection_Action extends Action {

    public connection: Connection;

    constructor(connection: Connection) {
        super();
        this.connection = connection;
    }
    
    // Override
    public redoAction(): void{

    }
    
    // Override
    public undoAction(): void{
        mainCircuit.connectionManager.addConnection(this.connection, false);
        mainCircuit.refrashCanvas();
    }
}