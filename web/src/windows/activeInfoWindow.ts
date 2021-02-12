class ActiveInfoWindow extends MWindow {
    public nameElement: HTMLElement;
    public textarea: HTMLTextAreaElement;

    constructor(transform: Transform) {
        super(transform);

        // Add color-options
        let header = document.createElement("h2");
        header.textContent = "Active Gate:";
        header.style.marginTop = "0";
        header.style.marginBottom = "0";
        this.append(header);
        // Add nameElement
        this.nameElement = document.createElement("h3");
        this.nameElement.textContent = "None";
        this.append(this.nameElement);
        
        this.createTextArea("text:", "");
    }

    public setActive(gate: Gate) {
        if(gate == null){
            this.nameElement.textContent = "None";
            this.textarea.parentElement.hidden = true;
            return;
        }

        this.nameElement.textContent = gate.name;
        switch (gate.type) {
            case GATE_TYPE.Lable:
                let lable = gate as Lable_Gate;
                let text = lable.text[0];
                for (let index = 1; index < lable.text.length; index++) {
                    const element = lable.text[index];
                    text += "\n" + element;
                }
                this.textarea.value = text;
                this.textarea.parentElement.hidden = false;
                break;
        
            default:
                this.textarea.parentElement.hidden = true;
                break;
        }
        
    }

    public createTextArea(name: string, value: string) {
        let text = document.createElement("div");
        text.textContent = name;
        this.textarea = document.createElement("textarea");
        this.textarea.value = value;

        this.textarea.addEventListener("keydown", (e)=>{
            e.stopPropagation();
        });

        this.textarea.addEventListener("keyup", (e)=>{
            let lable = mainCircuit.activeGate as Lable_Gate;
            lable.setText(this.textarea.value);
            mainCircuit.refrashCanvas();
        });
        text.append(this.textarea);
        this.append(text);
        text.hidden = true;
    }
}