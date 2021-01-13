class OptionsWindow extends MWindow {
    constructor(transform: Transform) {
        super(transform);

        // Add color-options
        let header = document.createElement("h2");
        header.textContent = "Colors";
        header.style.marginTop = "0";
        this.append(header);
        this.createTextInput("main-color", "#DDDDDD");
        this.createTextInput("active-color", "#FF0000");
        this.createTextInput("background-color", "#3B3B3B");
        this.createTextInput("dark-color", "#222222");
    }

    public createTextInput(name: string, value: string) {
        let div = document.createElement("div");
        div.className = "flex-row";
        let text = document.createElement("div");
        text.textContent = name;
        text.style.width = "40%";
        let input = document.createElement("input");
        input.className = "grow color-picker";
        input.value = value;
        input.type = "color";

        div.append(text);
        div.append(input);
        this.append(div);
    }
}