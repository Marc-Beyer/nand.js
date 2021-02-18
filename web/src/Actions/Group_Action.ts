class Group_Action extends Action {

    public actions: Action[];

    constructor(actions: Action[]) {
        super();
        this.actions = actions;
    }
    
    // Override
    public redoAction(): void{

    }
    
    // Override
    public undoAction(): void{
        console.log("this.actions", this.actions);
        for (let action of this.actions) {
            action.undoAction();
        }
    }
}