var ConnectionManager = /** @class */ (function () {
    function ConnectionManager() {
        this.connections = [];
        this.drawType = 0;
    }
    // Draw all connections
    ConnectionManager.prototype.drawConnations = function (ctx, offset) {
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var connection = _a[_i];
            if (connection.fromGate.getOutput(connection.fromOutputNr)) {
                ctx.strokeStyle = OPTIONS.COLOR.active;
            }
            else {
                ctx.strokeStyle = OPTIONS.COLOR.main;
            }
            var outputPosition = connection.fromGate.getOutputPosition(connection.fromOutputNr);
            var inputPosition = connection.toGate.getInputPosition(connection.toInputNr);
            switch (this.drawType) {
                case 1:
                    ctx.beginPath();
                    ctx.moveTo(outputPosition.x + connection.fromGate.ioWidth + offset.x, outputPosition.y + offset.y);
                    ctx.lineTo(inputPosition.x + offset.x, inputPosition.y + offset.y);
                    ctx.stroke();
                    break;
                case 0:
                    var outX = outputPosition.x + connection.fromGate.ioWidth + offset.x;
                    var outY = outputPosition.y + offset.y;
                    var inX = inputPosition.x + offset.x;
                    var inY = inputPosition.y + offset.y;
                    ctx.beginPath();
                    ctx.moveTo(outX, outY);
                    // if the x of input is less ?TODO
                    if (outX > inX) {
                        if (outY > inY) {
                            ctx.lineTo(outX, outY - (outY - inY) / 2);
                            ctx.lineTo(inX, inY + (outY - inY) / 2);
                        }
                        else {
                            ctx.lineTo(outX, outY + (inY - outY) / 2);
                            ctx.lineTo(inX, inY - (inY - outY) / 2);
                        }
                    }
                    else {
                        ctx.lineTo(outX + (inX - outX) / 2, outY);
                        ctx.lineTo(outX + (inX - outX) / 2, inY);
                    }
                    ctx.lineTo(inX, inY);
                    ctx.stroke();
                    break;
                default:
                    break;
            }
        }
        ctx.strokeStyle = OPTIONS.COLOR.main;
    };
    ConnectionManager.prototype.addConnection = function (connection) {
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var iterator = _a[_i];
            if (iterator.toGate == connection.toGate && iterator.toInputNr == connection.toInputNr) {
                return false;
            }
            if (connection.toInputNr >= connection.toGate.inputs) {
                return false;
            }
            if (connection.fromOutputNr >= connection.fromGate.outputs) {
                return false;
            }
        }
        this.connections.push(connection);
        if (connection.toGate.updateInput(connection.toInputNr, connection.fromGate.getOutput(connection.fromOutputNr))) {
            this.updateConnectedGates(connection.toGate);
        }
        return true;
    };
    ConnectionManager.prototype.updateConnectedGates = function (gate) {
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var connection = _a[_i];
            if (connection.fromGate == gate) {
                if (connection.toGate.updateInput(connection.toInputNr, connection.fromGate.getOutput(connection.fromOutputNr))) {
                    try {
                        this.updateConnectedGates(connection.toGate);
                    }
                    catch (error) {
                        document.getElementById("error-container").getElementsByTagName("P")[0].textContent = "An error occured! Most likely due to cyclic connections.";
                        document.getElementById("error-container").className = "";
                    }
                }
            }
        }
    };
    ConnectionManager.prototype.deleteAllConnections = function (gate) {
        for (var index = 0; index < this.connections.length; index++) {
            if (this.connections[index].toGate == gate) {
                this.connections.splice(index, 1);
                this.deleteAllConnections(gate);
                return;
            }
            if (this.connections[index].fromGate == gate) {
                var connectedGate = this.connections[index].toGate;
                this.connections[index].toGate.updateInput(this.connections[index].toInputNr, false);
                this.updateConnectedGates(this.connections[index].toGate);
                this.connections.splice(index, 1);
                this.deleteAllConnections(gate);
                if (connectedGate instanceof Connection_Gate) {
                    mainCircuit.deleteGate(connectedGate);
                }
                return;
            }
        }
    };
    ConnectionManager.prototype.removeConnection = function (connection) {
        var index = this.connections.indexOf(connection);
        if (index >= 0) {
            var gate = connection.toGate;
            var inputNr = connection.toInputNr;
            this.connections.splice(index, 1);
            gate.updateInput(inputNr, false);
            this.updateConnectedGates(gate);
        }
    };
    // Get the connection at pos
    ConnectionManager.prototype.getConnectionAtPosition = function (pos) {
        for (var _i = 0, _a = this.connections; _i < _a.length; _i++) {
            var connection = _a[_i];
            var outputPosition = connection.fromGate.getOutputPosition(connection.fromOutputNr);
            outputPosition = { x: outputPosition.x + connection.fromGate.ioWidth, y: outputPosition.y + connection.fromGate.ioHeight / 2 };
            var inputPosition = connection.toGate.getInputPosition(connection.toInputNr);
            inputPosition = { x: inputPosition.x, y: inputPosition.y + connection.toGate.ioHeight / 2 };
            if (this.isPosAtLine(outputPosition, inputPosition, pos)) {
                return connection;
            }
        }
        return null;
    };
    // Check if pointC is near line AB
    ConnectionManager.prototype.isPosAtLine = function (pointA, pointB, pointC) {
        var a = this.getDictance(pointB, pointC); // Distance between pointB and pointC
        var b = this.getDictance(pointA, pointC); // Distance between pointA and pointC
        var c = this.getDictance(pointA, pointB); // Distance between pointA and pointB
        var A = this.toDegrees(Math.acos((a * a - c * c - b * b) / (-2 * b * c))); // Angle at pointA
        var B = this.toDegrees(Math.acos((b * b - a * a - c * c) / (-2 * a * c))); // Angle at pointB
        if (A >= 90.1 || B >= 90.1) {
            return false;
        }
        var distanceToLine = b * Math.sin(this.toRadians(A));
        if (distanceToLine > 10) {
            return false;
        }
        return true;
    };
    // Get the distance between two points
    ConnectionManager.prototype.getDictance = function (pointA, pointB) {
        var x = pointA.x - pointB.x;
        var y = pointA.y - pointB.y;
        return Math.sqrt(x * x + y * y);
    };
    // Turns radian to degree 
    ConnectionManager.prototype.toDegrees = function (angle) {
        return angle * (180 / Math.PI);
    };
    // Turns degree to radian 
    ConnectionManager.prototype.toRadians = function (angle) {
        return angle * (Math.PI / 180);
    };
    return ConnectionManager;
}());
//# sourceMappingURL=connectionManager.js.map