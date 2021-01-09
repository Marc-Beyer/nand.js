var SaveManager = /** @class */ (function () {
    function SaveManager(curcit) {
        this.curcit = curcit;
    }
    SaveManager.prototype.loadJSONString = function (jsonString) {
        try {
            var jsonObj = JSON.parse(jsonString);
            mainCircuit.connectionManager.connections = [];
            mainCircuit.gates = [];
            var gates = jsonObj.gates;
            for (var index = 0; index < gates.length; index++) {
                var gate = gates[index];
                var posion = gate.para[0];
                gate.para.shift();
                mainCircuit.addGate(gate.type, posion, gate.para);
            }
        }
        catch (error) {
            return false;
        }
        return true;
    };
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
        var connections = null;
        for (var index = 0; index < this.curcit.connectionManager.connections.length; index++) {
            var element = this.curcit.connectionManager.connections[index];
            connections = {
                fromGate: this.curcit.gates.indexOf(element.fromGate),
                fromOutputNr: element.fromOutputNr,
                toGate: this.curcit.gates.indexOf(element.toGate),
                toInputNr: element.toInputNr
            };
        }
        var saveJSON = {
            gates: gates,
            connections: connections
        };
        console.log("saveJSON", saveJSON);
        console.log("saveJSON", JSON.stringify(saveJSON));
        return JSON.stringify(saveJSON);
    };
    return SaveManager;
}());
//# sourceMappingURL=saveManager.js.map