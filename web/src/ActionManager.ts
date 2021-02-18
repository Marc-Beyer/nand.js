class ActionManager {

    actions: Action[] = [];

    constructor() {
        document.getElementById("undo-btn").addEventListener("click", (e)=>{
            this.undo();
        });
    }

    public addAction(action: Action){
        this.actions.push(action);
    }

    public undo(){
        let action: Action = this.actions.pop();
        if(action != null)action.undoAction();
    }
}