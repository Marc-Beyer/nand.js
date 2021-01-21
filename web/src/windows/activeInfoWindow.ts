class ActiveInfoWindow extends MWindow {
    public nameElement: HTMLElement;

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
    }

    public setActive(gate: Gate) {
        if(gate != null){
            this.nameElement.textContent = gate.name;
        }else{
            this.nameElement.textContent = "None";
        }
    }
}