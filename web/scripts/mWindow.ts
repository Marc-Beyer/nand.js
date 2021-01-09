class MWindow {
    public transform: Transform;
    public htmlElement: HTMLElement;
    public content: HTMLElement;
    public dragOffset: Position2D = {x: 10, y: 10};

    public static activeWindow: MWindow = null;

    constructor(transform: Transform) {
        this.transform = transform;

        // Create outer div
        this.htmlElement = document.createElement("div");
        this.htmlElement.style.width = this.transform.width + "px";
        this.htmlElement.style.height = this.transform.height + "px";
        this.htmlElement.style.top = this.transform.position.y + "px";
        this.htmlElement.style.left = this.transform.position.x + "px";
        this.htmlElement.className = "movable-window";

        // HEADER //
        let header: HTMLElement = document.createElement("div");
        header.className = "header";
        // Create darg header
        let dargDiv: HTMLElement = document.createElement("div");
        dargDiv.className = "drag-container grow";
        let boxDiv: HTMLElement = document.createElement("div");
        boxDiv.className = "box";
        dargDiv.append(boxDiv);
        header.append(dargDiv);

        // Create Close Btn
        if(true){
            let closeBtn: HTMLElement = document.createElement("button");
            closeBtn.className = "close-btn";
            closeBtn.textContent = "X";
            header.append(closeBtn);
            closeBtn.addEventListener("click", ()=>{
                this.htmlElement.remove();
            });
        }

        this.htmlElement.append(header);

        // Create the content-div
        this.content = document.createElement("div");
        this.content.className = "content";
        this.htmlElement.append(this.content);

        dargDiv.addEventListener("mousedown", (e: MouseEvent)=>{
            MWindow.activeWindow  = this;
            MWindow.activeWindow.dragOffset.x = e.offsetX; // this.htmlElement.getBoundingClientRect().left -
            MWindow.activeWindow.dragOffset.y = e.offsetY; // his.htmlElement.getBoundingClientRect().top - 
            console.log("this.htmlElement.getBoundingClientRect()", this.htmlElement.getBoundingClientRect(), e);
        });
        
        document.addEventListener("mouseup", (e: MouseEvent)=>{
            MWindow.activeWindow  = null;
            
        });

        document.body.append(this.htmlElement);

        document.addEventListener("mousemove", (e: MouseEvent)=>{
            if(MWindow.activeWindow == null)return;
            MWindow.activeWindow.htmlElement.style.left = e.clientX - MWindow.activeWindow.dragOffset.x + "px";
            MWindow.activeWindow.htmlElement.style.top = e.clientY - MWindow.activeWindow.dragOffset.y + "px";
            console.log("dragOffset", MWindow.activeWindow.dragOffset);
        });
        console.log("createa a new movable window", this.transform, this.htmlElement);
    }

    // Append an HTMLElement to the content-div
    public append(emement: HTMLElement) {
        this.content.append(emement);
    }
} 

interface DropItem{
    itemName: string,
    value: string
}

class DropContainer {
    public htmlElement: HTMLElement;

    constructor(name: string, items: DropItem[]) {
        let htmlElement = document.createElement("div");
        htmlElement.className = "drop-container";
        
        // Create header
        let header: HTMLElement = document.createElement("h2");
        header.textContent = name;
        htmlElement.append(header);

        // Create list
        let list: HTMLElement = document.createElement("ul");
        for (let item of items) {
            let listItem: HTMLElement = document.createElement("h2");
            listItem.textContent = item.itemName;
            listItem.dataset.value = item.value;
            list.append(listItem);
        }
        htmlElement.append(list);
    }
}