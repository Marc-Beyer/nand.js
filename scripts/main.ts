const ttIn = document.querySelector("#tt-in") as HTMLInputElement;
const ttOut = document.querySelector("#tt-out") as HTMLInputElement;
const truthTable = document.querySelector("#truth-table") as HTMLTableElement;
const knf = document.querySelector("#knf") as HTMLElement;
const dnf = document.querySelector("#dnf") as HTMLElement;
const kv4 = document.querySelector("#kv-table-4") as HTMLTableElement;
const kv3 = document.querySelector("#kv-table-3") as HTMLTableElement;
const kv2 = document.querySelector("#kv-table-2") as HTMLTableElement;


let ttInputs: number = 0;
let ttOutputs: number = 0;

let truthTableInputs: boolean[][] = [];
let truthTableOutputs: boolean[][] = [];

ttIn.addEventListener("change", (e)=>{
    getUserInput();
});

ttOut.addEventListener("change", (e)=>{
    getUserInput();
});

function getUserInput(){
    ttInputs = Number(ttIn.value);
    ttOutputs = Number(ttOut.value);
    calcTable();
}
getUserInput();

function calcTable(){
    truthTableInputs = [];
    truthTableOutputs = [];
    for (let index = 0; index < Math.pow(2, ttInputs); index++) {
        truthTableInputs.push(dec2binArr(index, ttInputs))
    }
    console.log(truthTableInputs);
    drawTable();
}

function drawTable(){
    truthTable.innerHTML = '';
    let tr = document.createElement("tr");
    for (let index = 0; index < ttInputs; index++) {
        let th = document.createElement("th");
        th.innerHTML = String.fromCharCode(65 + index);
        tr.append(th);
    }
    tr.append(document.createElement("th"));
    for (let index = 0; index < ttOutputs; index++) {
        let th = document.createElement("th");
        th.innerHTML = "X<sub>" + index + "</sub>";
        tr.append(th);
    }
    truthTable.append(tr);

    for (let index = 0; index < truthTableInputs.length; index++) {
        const element = truthTableInputs[index];
        let tr = document.createElement("tr");

        for (const iterator of element) {
            let td = document.createElement("td");
            if(iterator){
                td.innerHTML = "1";
            }else{
                td.innerHTML = "0";
            }
            tr.append(td);
        }

        tr.append(document.createElement("th"));

        let outTruthArr = [];
        for (let i = 0; i < ttOutputs; i++) {
            let td = document.createElement("td");
            td.className="in";
            let button = document.createElement("button") as HTMLButtonElement;
            button.innerHTML = "0";
            button.addEventListener("click", (e)=>{
                ttButtonClickHandler(i, index, button);
            });
            td.append(button);
            tr.append(td);
            outTruthArr.push(false);
        }
        truthTableOutputs.push(outTruthArr);

        truthTable.append(tr);
    }
    calcDnfAndKnf();
}

function dec2binArr(dec: number, length: number): boolean[]{
    let binArr: boolean[] = [];
    let binStr: string[] = (dec >>> 0).toString(2).split('');
    for (let character of binStr) {
        if(character === '1'){
            binArr.push(true);
        }else{
            binArr.push(false);
        }
    }
    while(binArr.length < length){
        binArr.unshift(false);
    }
    return binArr;
}

function calcDnfAndKnf(){
    dnf.innerHTML = "";
    knf.innerHTML = "";
    for (let xNr = 0; xNr < ttOutputs; xNr++) {
        let dnfRows: number[] = [];
        let knfRows: number[] = [];

        dnf.innerHTML += "X<sub>" + xNr + "</sub> = ";
        knf.innerHTML += "X<sub>" + xNr + "</sub> = ";

        for (let rowNr = 0; rowNr < truthTableInputs.length; rowNr++) {
            if(truthTableOutputs[xNr][rowNr]){
                dnfRows.push(rowNr);
            }else{
                knfRows.push(rowNr);
            }
            
        }
        
        //DNF
        let dnfString = "";
        for (const rowNr of dnfRows) {
            dnfString += "(";
            for (let index = 0; index < truthTableInputs[rowNr].length; index++) {
                const row = truthTableInputs[rowNr][index];
                dnfString += ((row) ? " " : " ¬") + String.fromCharCode(65 + index) + " ∧";
            }
            dnfString = dnfString.slice(0, -2);
            dnfString += " ) ∨ ";
        }
        dnfString = dnfString.slice(0, -3);
        dnf.innerHTML += dnfString + "<br>";

        //KNF
        let knfString = "";
        for (const rowNr of knfRows) {
            knfString += "(";
            for (let index = 0; index < truthTableInputs[rowNr].length; index++) {
                const row = truthTableInputs[rowNr][index];
                knfString += ((row) ? " " : " ¬") + String.fromCharCode(65 + index) + " ∨";
            }
            knfString = knfString.slice(0, -2);
            knfString += " ) ∧ ";
        }
        knfString = knfString.slice(0, -3);
        knf.innerHTML += knfString + "<br>";
    }
    dnf.innerHTML = dnf.innerHTML.slice(0, -4);
    knf.innerHTML = knf.innerHTML.slice(0, -4);
}

function calcKV(){
    let templateContent = document.querySelector('template').content;
    
}

// Handler

function ttButtonClickHandler(x: number, y: number, btn: HTMLButtonElement){
    console.log(x,y,"pressed");
    truthTableOutputs[x][y] = !truthTableOutputs[x][y];
    btn.innerHTML = (truthTableOutputs[x][y]) ? "1" : "0";
    calcDnfAndKnf();
}