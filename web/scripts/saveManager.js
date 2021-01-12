var SaveManager = /** @class */ (function () {
    function SaveManager(curcit) {
        this.curcit = curcit;
    }
    // Load gates and connections from JSON string
    SaveManager.prototype.loadJSONString = function (jsonString) {
        try {
            var jsonObj = JSON.parse(jsonString);
            this.curcit.connectionManager.connections = [];
            this.curcit.gates = [];
            // Load Gates
            var gates = jsonObj.gates;
            for (var index = gates.length - 1; index >= 0; index--) {
                var gate = gates[index];
                var posion = gate.para[0];
                gate.para.shift();
                this.curcit.addGate(gate.type, posion, gate.para);
            }
            // Load connections
            var connections = jsonObj.connections;
            for (var index = 0; index < connections.length; index++) {
                var connection = connections[index];
                var fromGate = this.curcit.gates[connection.fromGate];
                var toGate = this.curcit.gates[connection.toGate];
                this.curcit.connectionManager.addConnection({
                    fromGate: fromGate,
                    fromOutputNr: connection.fromOutputNr,
                    toGate: toGate,
                    toInputNr: connection.toInputNr
                });
            }
            this.curcit.refrashCanvas();
        }
        catch (error) {
            this.curcit.refrashCanvas();
            document.getElementById("error-container").getElementsByTagName("P")[0].textContent = "An error occured! Could not parse the date.";
            document.getElementById("error-container").className = "";
            return false;
        }
        return true;
    };
    // Return a JSON-string with all Gates and connections
    SaveManager.prototype.getSaveJSON = function () {
        var gates = [];
        for (var index = 0; index < this.curcit.gates.length; index++) {
            var gate = this.curcit.gates[index];
            var para = [gate.transform.position];
            if (gate.type === GATE_TYPE.Lable) {
                var lable = gate;
                var text = lable.text[0];
                for (var index_1 = 1; index_1 < lable.text.length; index_1++) {
                    text += "\n" + lable.text[index_1];
                }
                para.push(text);
            }
            gates[index] = {
                type: gate.type,
                para: para
            };
        }
        var connections = [];
        for (var index = 0; index < this.curcit.connectionManager.connections.length; index++) {
            var element = this.curcit.connectionManager.connections[index];
            connections.push({
                fromGate: this.curcit.gates.indexOf(element.fromGate),
                fromOutputNr: element.fromOutputNr,
                toGate: this.curcit.gates.indexOf(element.toGate),
                toInputNr: element.toInputNr
            });
        }
        var saveJSON = {
            gates: gates,
            connections: connections
        };
        return JSON.stringify(saveJSON);
    };
    return SaveManager;
}());
//# sourceMappingURL=saveManager.js.map