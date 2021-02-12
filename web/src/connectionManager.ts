class ConnectionManager {

    public connections: Connection[] = [];

    public drawType: number = 0;

    constructor() {
        
    }

    // Draw all connections
    public drawConnations(ctx: CanvasRenderingContext2D, offset: Position2D) {
        for (let connection of this.connections) {
            if(connection.fromGate.getOutput(connection.fromOutputNr)){
                ctx.strokeStyle = OPTIONS.COLOR.active;
            }else{
                ctx.strokeStyle = OPTIONS.COLOR.main;
            }
            if(mainCircuit.activeConnection == connection){
                //ctx.strokeStyle = OPTIONS.COLOR.highlight;
                ctx.lineWidth = OPTIONS.strokeSize + 2;
            }
            let outputPosition = connection.fromGate.getOutputPosition(connection.fromOutputNr);
            let inputPosition = connection.toGate.getInputPosition(connection.toInputNr);
            switch (this.drawType) {
                case 1:
                    ctx.beginPath();
                    ctx.moveTo(outputPosition.x + connection.fromGate.ioWidth + offset.x, outputPosition.y + offset.y);
                    ctx.lineTo(inputPosition.x + offset.x, inputPosition.y + offset.y);
                    ctx.stroke();
                    break;
                case 0:
                    let outX = outputPosition.x + connection.fromGate.ioWidth + offset.x;
                    let outY = outputPosition.y + offset.y;
                    let inX = inputPosition.x + offset.x;
                    let inY = inputPosition.y + offset.y;

                    let path: Position2D[] = this.getConnectionPath(outX, outY, inX, inY);

                    ctx.beginPath();
                    ctx.moveTo(path[0].x, path[0].y);
                    for (let index = 1; index < path.length; index++) {
                        const pos: Position2D = path[index];
                        ctx.lineTo(pos.x, pos.y);
                    }
                    ctx.stroke();
                    break;
            
                default:
                    break;
            }
        }
        ctx.strokeStyle = OPTIONS.COLOR.main;
        ctx.lineWidth = OPTIONS.strokeSize;
    }

    public addConnection(connection: Connection): boolean{
        for (let iterator of this.connections) {
            if(iterator.toGate == connection.toGate && iterator.toInputNr == connection.toInputNr){
                return false;
            }
            if(connection.toInputNr >= connection.toGate.inputs){
                return false;
            }
            if(connection.fromOutputNr >= connection.fromGate.outputs){
                return false;
            }
        }
        this.connections.push(connection);
        if(connection.toGate.updateInput(connection.toInputNr, connection.fromGate.getOutput(connection.fromOutputNr))){
            this.updateConnectedGates(connection.toGate);
        }
        return true;
    }

    public updateConnectedGates(gate: Gate){
        for (let connection of this.connections) {
            if(connection.fromGate == gate){
                if(connection.toGate.updateInput(connection.toInputNr, connection.fromGate.getOutput(connection.fromOutputNr))){
                    try {
                        this.updateConnectedGates(connection.toGate);
                    } catch (error) {
                        document.getElementById("error-container").getElementsByTagName("P")[0].textContent = "An error occured! Most likely due to cyclic connections.";
                        document.getElementById("error-container").className = "";
                    } 
                }
            }
        }
    }

    public deleteAllConnections(gate: Gate){
        for (let index = 0; index < this.connections.length; index++) {
            if(this.connections[index].toGate == gate){
                this.connections.splice(index, 1);
                this.deleteAllConnections(gate);
                return;
            }
            if(this.connections[index].fromGate == gate){
                let connectedGate = this.connections[index].toGate;
                this.connections[index].toGate.updateInput(this.connections[index].toInputNr, false);
                this.updateConnectedGates(this.connections[index].toGate);
                this.connections.splice(index, 1);
                this.deleteAllConnections(gate);

                if(connectedGate instanceof Connection_Gate){
                    mainCircuit.deleteGate(connectedGate);
                }
                return;
            }
        }
    }

    public removeConnection(connection: Connection){
        let index:number = this.connections.indexOf(connection);
        if(index >= 0){
            let gate: Gate = connection.toGate;
            let inputNr: number = connection.toInputNr;
            this.connections.splice(index, 1);
            gate.updateInput(inputNr, false);
            this.updateConnectedGates(gate);
        }
    }
    
    // Get the connection at pos
    public getConnectionAtPosition(pos: Position2D): Connection | null{
        for (let connection of this.connections) {
            let outputPosition = connection.fromGate.getOutputPosition(connection.fromOutputNr);
            outputPosition = {x: outputPosition.x + connection.fromGate.ioWidth, y: outputPosition.y + connection.fromGate.ioHeight/2};
            let inputPosition = connection.toGate.getInputPosition(connection.toInputNr);
            inputPosition = {x: inputPosition.x , y: inputPosition.y + connection.toGate.ioHeight/2};
            switch (this.drawType) {
                case 1:
                    if(this.isPosAtLine(outputPosition, inputPosition, pos)){
                        return connection;
                    }
                    break;
            
                case 0:
                    let path: Position2D[] = this.getConnectionPath(outputPosition.x, outputPosition.y, inputPosition.x, inputPosition.y);

                    for (let index = 1; index < path.length; index++) {
                        if(this.isPosAtLine(path[index-1], path[index], pos)){
                            return connection;
                        }
                    }
                    break;
            }
        }
        return null;
    }

    public getConnectionPath(outX: number, outY: number, inX: number, inY: number): Position2D[]{
        let middlePoint1: Position2D = {x: 0, y: 0};
        let middlePoint2: Position2D = {x: 0, y: 0};

        if(outX > inX){
            if(outY > inY){
                middlePoint1 = {x: outX, y: outY - (outY - inY)/2};
                middlePoint2 = {x: inX, y: inY + (outY - inY)/2};
            }else{
                middlePoint1 = {x: outX, y: outY + (inY - outY)/2};
                middlePoint2 = {x: inX, y: inY - (inY - outY)/2};
            }
        }else{
            middlePoint1 = {x: outX + (inX - outX)/2, y: outY};
            middlePoint2 = {x: outX + (inX - outX)/2, y: inY};
        }

        return [{x: outX, y: outY}, middlePoint1, middlePoint2, {x: inX, y: inY}];
    }

    // Check if pointC is near line AB
    public isPosAtLine (pointA: Position2D, pointB: Position2D, pointC: Position2D): boolean{
        let a: number = this.getDictance(pointB, pointC);                   // Distance between pointB and pointC
        let b: number = this.getDictance(pointA, pointC);                   // Distance between pointA and pointC
        let c: number = this.getDictance(pointA, pointB);                   // Distance between pointA and pointB

        let A = this.toDegrees( Math.acos( (a*a-c*c-b*b)/(-2*b*c) ));        // Angle at pointA
        let B = this.toDegrees( Math.acos( (b*b-a*a-c*c)/(-2*a*c) ));        // Angle at pointB

        if(A >= 90.1 || B >= 90.1){
            return false;
        }

        let distanceToLine = b * Math.sin(this.toRadians(A));

        if(distanceToLine > 10){
            return false;
        }
        
        return true;
    }

    // Get the distance between two points
    public getDictance(pointA: Position2D, pointB: Position2D): number{
        let x = pointA.x - pointB.x;
        let y = pointA.y - pointB.y;
        return Math.sqrt(x*x + y*y);
    }

    // Turns radian to degree 
    public toDegrees (angle: number):number {
        return angle * (180 / Math.PI);
    }

    // Turns degree to radian 
    public toRadians (angle) {
        return angle * (Math.PI / 180);
      }
}