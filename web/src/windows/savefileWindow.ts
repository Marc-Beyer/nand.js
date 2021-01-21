class SavefileWindow extends MWindow {
    constructor(transform: Transform, saveString: string) {
        super(transform);

        let textArea: HTMLTextAreaElement = document.createElement("textarea") as HTMLTextAreaElement;
        textArea.value = saveString;
        textArea.className = "grow";
        this.append(textArea);
    
        // Create Copy and Load Btn
        let btnContainer = document.createElement("div");
        btnContainer.className = "flex-row";
        let loadTextBtn = document.createElement("button");
        loadTextBtn.textContent = "LOAD TEXT";
        loadTextBtn.className = "grow";
        loadTextBtn.addEventListener("click", ()=>{
            saveManager.loadJSONString(textArea.value);
        });
        let copyAllBtn = document.createElement("button");
        copyAllBtn.textContent = "COPY ALL";
        copyAllBtn.className = "grow";
        copyAllBtn.addEventListener("click", ()=>{
            textArea.select();
            document.execCommand('copy');
        });
    
        btnContainer.append(loadTextBtn);
        btnContainer.append(copyAllBtn);
        this.append(btnContainer);
    }
}