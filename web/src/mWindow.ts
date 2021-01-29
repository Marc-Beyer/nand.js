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
        this.htmlElement.style.minHeight = this.transform.height + "px";
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
            MWindow.activeWindow.dragOffset.x = e.offsetX;
            MWindow.activeWindow.dragOffset.y = e.offsetY;
        });
        
        document.addEventListener("mouseup", (e: MouseEvent)=>{
            MWindow.activeWindow  = null;
            
        });

        document.getElementById("window-container").append(this.htmlElement);

        document.addEventListener("mousemove", (e: MouseEvent)=>{
            if(MWindow.activeWindow == null)return;
            MWindow.activeWindow.htmlElement.style.left = MWindow.clampMin(0, e.clientX - MWindow.activeWindow.dragOffset.x) + "px";
            MWindow.activeWindow.htmlElement.style.top = MWindow.clampMin(0, e.clientY - MWindow.activeWindow.dragOffset.y) + "px";
        });
    }

    // Append an HTMLElement to the content-div
    public append(emement: HTMLElement) {
        this.content.append(emement);
    }

    // 
    public static clampMin(min: number, value: number): number{
        if(value < min)return min;
        return value;
    }
} 

interface DropItem{
    itemName: string,
    value: string | number
}

class DropContainer {
    public htmlElement: HTMLElement;

    constructor(name: string, items: DropItem[]) {
        this.htmlElement = document.createElement("div");
        this.htmlElement.className = "drop-container";
        
        // Create header
        let header: HTMLElement = document.createElement("h2");
        header.textContent = name;
        this.htmlElement.append(header);

        // Create list
        let list: HTMLElement = document.createElement("ul");
        for (let item of items) {
            let listItem: HTMLElement = document.createElement("li");
            let aItem: HTMLElement = document.createElement("a");
            aItem.textContent = item.itemName;
            aItem.className = "add";
            aItem.dataset.value = "" + item.value;
            listItem.append(aItem);
            list.append(listItem);
        }
        this.htmlElement.append(list);
    }
}