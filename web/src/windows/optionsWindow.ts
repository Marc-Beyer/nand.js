class OptionsWindow extends MWindow {
    constructor(transform: Transform) {
        super(transform);

        // Add color-options
        let header = document.createElement("h2");
        header.textContent = "Colors";
        header.style.marginTop = "0";
        this.append(header);
        this.createColorInput("main-color", OPTIONS.COLOR.main);
        this.createColorInput("active-color", OPTIONS.COLOR.active);
        this.createColorInput("background-color", OPTIONS.COLOR.background);
        this.createColorInput("dark-color", OPTIONS.COLOR.dark);
        //this.createColorInput("highlight-color", OPTIONS.COLOR.highlight);
        let hr = document.createElement("hr");
        hr.style.margin = "10px 0";
        this.append(hr);
        this.createColorInputForCSS("canvas-background-color");
        this.createColorInputForCSS("main-background-color");
        this.createColorInputForCSS("shade-background-color");
        this.createColorInputForCSS("close-btn-background-color");
        this.createColorInputForCSS("main-color");
        this.createColorInputForCSS("main-border-color");
    }

    public createColorInput(name: string, value: string) {
        let div = document.createElement("div");
        div.className = "flex-row";
        let text = document.createElement("div");
        text.textContent = name;
        text.style.width = "70%";
        let input = document.createElement("input");
        input.className = "grow color-picker";
        input.value = value;
        input.type = "color";

        let str = name.substr(0, name.length - 6);
        input.addEventListener("change", ()=>{
            OPTIONS.COLOR[str] = input.value;
            mainCircuit.refrashCanvas();
        });

        div.append(text);
        div.append(input);
        this.append(div);
    }

    public createColorInputForCSS(name: string) {
        let value = window.getComputedStyle(document.documentElement).getPropertyValue("--"+name);
        value = value.substr(1);
        if(value == "white"){
            value = "#ffffff";
        }
        console.log(name+":"+value);
        let div = document.createElement("div");
        div.className = "flex-row";
        let text = document.createElement("div");
        text.textContent = name;
        text.style.width = "70%";
        let input = document.createElement("input");
        input.className = "grow color-picker";
        input.value = value;
        input.type = "color";

        input.addEventListener("change", ()=>{
            document.documentElement.style.setProperty("--"+name, "#"+input.value);
        });

        div.append(text);
        div.append(input);
        this.append(div);
    }
}