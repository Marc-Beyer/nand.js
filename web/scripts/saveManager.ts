class SaveManager {

    private curcit: Circuit;

    constructor(curcit: Circuit) {
        this.curcit = curcit;
    }
    
    // Load gates and connections from JSON string
    public loadJSONString(jsonString: string): boolean{
        try {
            let jsonObj = JSON.parse(jsonString);
            this.curcit.connectionManager.connections = [];
            this.curcit.gates = [];

            // Load Gates
            let gates = jsonObj.gates;
            for (let index = gates.length-1; index >= 0; index--) {
                const gate = gates[index];
                let posion: Position2D = gate.para[0];
                gate.para.shift();
                this.curcit.addGate(gate.type, posion, gate.para);
            }

            // Load connections
            let connections = jsonObj.connections;
            for (let index = 0; index < connections.length; index++) {
                const connection = connections[index];
                let fromGate: Gate = this.curcit.gates[connection.fromGate];
                let toGate: Gate = this.curcit.gates[connection.toGate];
                this.curcit.connectionManager.addConnection({
                    fromGate: fromGate,
                     fromOutputNr: connection.fromOutputNr,
                     toGate: toGate,
                     toInputNr: connection.toInputNr
                    });
            }

            this.curcit.refrashCanvas();
        } catch (error) {
            this.curcit.refrashCanvas();
            return false;
        }
        return true;
    }

    // Return a JSON-string with all Gates and connections
    public getSaveJSON(): string{
        let gates: any[] = [];
        for (let index = 0; index < this.curcit.gates.length; index++) {
            let gate: Gate = this.curcit.gates[index];
            let para = [gate.transform.position as any];
            if(gate.type === GATE_TYPE.Lable){
                let lable: Lable_Gate = gate as Lable_Gate;
                let text: string = lable.text[0];
                for (let index = 1; index < lable.text.length; index++) {
                    text += "\n" + lable.text[index];
                }
                para.push(text);
            }
            gates[index] = {
                type: gate.type,
                para: para
            };
        }

        let connections = [];
        for (let index = 0; index < this.curcit.connectionManager.connections.length; index++) {
            let element = this.curcit.connectionManager.connections[index];
            connections.push({
                fromGate: this.curcit.gates.indexOf(element.fromGate),
                fromOutputNr: element.fromOutputNr,
                toGate: this.curcit.gates.indexOf(element.toGate),
                toInputNr: element.toInputNr
            });
        }

        let saveJSON = {
            gates: gates,
            connections: connections
        }
        
        return JSON.stringify(saveJSON);
    }
}