class SaveManager {

    private curcit: Circuit;

    constructor(curcit: Circuit) {
        this.curcit = curcit;
    }
    
    public loadJSONString(jsonString: string): boolean{
        try {
            let jsonObj = JSON.parse(jsonString);
            mainCircuit.connectionManager.connections = [];
            mainCircuit.gates = [];

            let gates = jsonObj.gates;
            for (let index = 0; index < gates.length; index++) {
                const gate = gates[index];
                let posion: Position2D = gate.para[0];
                gate.para.shift();
                mainCircuit.addGate(gate.type, posion, gate.para);
            }
        } catch (error) {
            return false;
        }
        return true;
    }

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

        let connections = null;
        for (let index = 0; index < this.curcit.connectionManager.connections.length; index++) {
            let element = this.curcit.connectionManager.connections[index];
            connections = {
                fromGate: this.curcit.gates.indexOf(element.fromGate),
                fromOutputNr: element.fromOutputNr,
                toGate: this.curcit.gates.indexOf(element.toGate),
                toInputNr: element.toInputNr
            };
        }

        let saveJSON = {
            gates: gates,
            connections: connections
        }
        console.log("saveJSON", saveJSON);
        console.log("saveJSON", JSON.stringify(saveJSON));
        return JSON.stringify(saveJSON);
    }
}