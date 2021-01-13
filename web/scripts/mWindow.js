var MWindow = /** @class */ (function () {
    function MWindow(transform) {
        var _this = this;
        this.dragOffset = { x: 10, y: 10 };
        this.transform = transform;
        // Create outer div
        this.htmlElement = document.createElement("div");
        this.htmlElement.style.width = this.transform.width + "px";
        this.htmlElement.style.height = this.transform.height + "px";
        this.htmlElement.style.top = this.transform.position.y + "px";
        this.htmlElement.style.left = this.transform.position.x + "px";
        this.htmlElement.className = "movable-window";
        // HEADER //
        var header = document.createElement("div");
        header.className = "header";
        // Create darg header
        var dargDiv = document.createElement("div");
        dargDiv.className = "drag-container grow";
        var boxDiv = document.createElement("div");
        boxDiv.className = "box";
        dargDiv.append(boxDiv);
        header.append(dargDiv);
        // Create Close Btn
        if (true) {
            var closeBtn = document.createElement("button");
            closeBtn.className = "close-btn";
            closeBtn.textContent = "X";
            header.append(closeBtn);
            closeBtn.addEventListener("click", function () {
                _this.htmlElement.remove();
            });
        }
        this.htmlElement.append(header);
        // Create the content-div
        this.content = document.createElement("div");
        this.content.className = "content";
        this.htmlElement.append(this.content);
        dargDiv.addEventListener("mousedown", function (e) {
            MWindow.activeWindow = _this;
            MWindow.activeWindow.dragOffset.x = e.offsetX;
            MWindow.activeWindow.dragOffset.y = e.offsetY;
        });
        document.addEventListener("mouseup", function (e) {
            MWindow.activeWindow = null;
        });
        document.getElementById("window-container").append(this.htmlElement);
        document.addEventListener("mousemove", function (e) {
            if (MWindow.activeWindow == null)
                return;
            MWindow.activeWindow.htmlElement.style.left = MWindow.clampMin(0, e.clientX - MWindow.activeWindow.dragOffset.x) + "px";
            MWindow.activeWindow.htmlElement.style.top = MWindow.clampMin(0, e.clientY - MWindow.activeWindow.dragOffset.y) + "px";
        });
    }
    // Append an HTMLElement to the content-div
    MWindow.prototype.append = function (emement) {
        this.content.append(emement);
    };
    // 
    MWindow.clampMin = function (min, value) {
        if (value < min)
            return min;
        return value;
    };
    MWindow.activeWindow = null;
    return MWindow;
}());
var DropContainer = /** @class */ (function () {
    function DropContainer(name, items) {
        this.htmlElement = document.createElement("div");
        this.htmlElement.className = "drop-container";
        // Create header
        var header = document.createElement("h2");
        header.textContent = name;
        this.htmlElement.append(header);
        // Create list
        var list = document.createElement("ul");
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var listItem = document.createElement("li");
            var aItem = document.createElement("a");
            aItem.textContent = item.itemName;
            aItem.className = "add";
            aItem.dataset.value = "" + item.value;
            listItem.append(aItem);
            list.append(listItem);
        }
        this.htmlElement.append(list);
    }
    return DropContainer;
}());
//# sourceMappingURL=mWindow.js.map