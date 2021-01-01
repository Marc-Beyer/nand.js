class ConnectionManager {

    public connections: Connection[] = [];

    constructor() {
        
    }

    // Draw all connections
    public drawConnations(ctx: CanvasRenderingContext2D, offset: Position2D) {
        for (let connection of this.connections) {
            if(connection.fromGate.getOutput(connection.fromOutputNr)){
                ctx.strokeStyle = "#FF0000";
            }else{
                ctx.strokeStyle = "#DDDDDD";
            }
            let outputPosition = connection.fromGate.getOutputPosition(connection.fromOutputNr);
            let inputPosition = connection.toGate.getInputPosition(connection.toInputNr);
            ctx.beginPath();
            ctx.moveTo(outputPosition.x + connection.fromGate.ioWidth + offset.x, outputPosition.y + connection.fromGate.ioHeight/2 + offset.y);
            ctx.lineTo(inputPosition.x + offset.x, inputPosition.y + connection.toGate.ioHeight/2 + offset.y);
            ctx.stroke();
        }
        ctx.strokeStyle = "#DDDDDD";
    }

    public addConnection(connection: Connection): boolean{
        for (let iterator of this.connections) {
            if(iterator.toGate == connection.toGate && iterator.toInputNr == connection.toInputNr){
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
                this.connections[index].toGate.updateInput(this.connections[index].toInputNr, false);
                this.updateConnectedGates(this.connections[index].toGate);
                this.connections.splice(index, 1);
                this.deleteAllConnections(gate);
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
            if(this.isPosAtLine(outputPosition, inputPosition, pos)){
                return connection;
            }
        }
        return null;
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

        //console.log("Triangle: (" + pointA.x + "|" + pointA.y + "), (" + pointB.x + "|" + pointB.y + "), (" + pointC.x + "|" + pointC.y + ")");
        //console.log("Distance: a " + a + ", b " + b + ", c " + c);
        //console.log("Angles: A " + A + ", B " + B + ", C " + C);
        //console.log("distanceToLine: A " + distanceToLine);

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