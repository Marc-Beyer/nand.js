class CreateConnection_Action extends Action {

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
        mainCircuit.connectionManager.removeConnection(this.connection, false);
        mainCircuit.refrashCanvas();
    }
}