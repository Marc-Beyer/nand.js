var ttIn = document.querySelector("#tt-in");
var ttOut = document.querySelector("#tt-out");
var truthTable = document.querySelector("#truth-table");
var knf = document.querySelector("#knf");
var dnf = document.querySelector("#dnf");
var ttInputs = 0;
var ttOutputs = 0;
var truthTableInputs = [];
var truthTableOutputs = [];
ttIn.addEventListener("change", function (e) {
    getUserInput();
});
ttOut.addEventListener("change", function (e) {
    getUserInput();
});
function getUserInput() {
    ttInputs = Number(ttIn.value);
    ttOutputs = Number(ttOut.value);
    calcTable();
}
getUserInput();
function calcTable() {
    truthTableInputs = [];
    truthTableOutputs = [];
    for (var index = 0; index < Math.pow(2, ttInputs); index++) {
        truthTableInputs.push(dec2binArr(index, ttInputs));
    }
    console.log(truthTableInputs);
    drawTable();
}
function drawTable() {
    truthTable.innerHTML = '';
    var tr = document.createElement("tr");
    for (var index = 0; index < ttInputs; index++) {
        var th = document.createElement("th");
        th.innerHTML = String.fromCharCode(65 + index);
        tr.append(th);
    }
    tr.append(document.createElement("th"));
    for (var index = 0; index < ttOutputs; index++) {
        var th = document.createElement("th");
        th.innerHTML = "X<sub>" + index + "</sub>";
        tr.append(th);
    }
    truthTable.append(tr);
    var _loop_1 = function (index) {
        var element = truthTableInputs[index];
        var tr_1 = document.createElement("tr");
        for (var _i = 0, element_1 = element; _i < element_1.length; _i++) {
            var iterator = element_1[_i];
            var td = document.createElement("td");
            if (iterator) {
                td.innerHTML = "1";
            }
            else {
                td.innerHTML = "0";
            }
            tr_1.append(td);
        }
        tr_1.append(document.createElement("th"));
        var outTruthArr = [];
        var _loop_2 = function (i) {
            var td = document.createElement("td");
            td.className = "in";
            var button = document.createElement("button");
            button.innerHTML = "0";
            button.addEventListener("click", function (e) {
                ttButtonClickHandler(i, index, button);
            });
            td.append(button);
            tr_1.append(td);
            outTruthArr.push(false);
        };
        for (var i = 0; i < ttOutputs; i++) {
            _loop_2(i);
        }
        truthTableOutputs.push(outTruthArr);
        truthTable.append(tr_1);
    };
    for (var index = 0; index < truthTableInputs.length; index++) {
        _loop_1(index);
    }
    calcDnfAndKnf();
}
function dec2binArr(dec, length) {
    var binArr = [];
    var binStr = (dec >>> 0).toString(2).split('');
    for (var _i = 0, binStr_1 = binStr; _i < binStr_1.length; _i++) {
        var character = binStr_1[_i];
        if (character === '1') {
            binArr.push(true);
        }
        else {
            binArr.push(false);
        }
    }
    while (binArr.length < length) {
        binArr.unshift(false);
    }
    return binArr;
}
function calcDnfAndKnf() {
    dnf.innerHTML = "";
    knf.innerHTML = "";
    for (var xNr = 0; xNr < ttOutputs; xNr++) {
        var dnfRows = [];
        var knfRows = [];
        dnf.innerHTML += "X<sub>" + xNr + "</sub> = ";
        knf.innerHTML += "X<sub>" + xNr + "</sub> = ";
        for (var rowNr = 0; rowNr < truthTableInputs.length; rowNr++) {
            if (truthTableOutputs[xNr][rowNr]) {
                dnfRows.push(rowNr);
            }
            else {
                knfRows.push(rowNr);
            }
        }
        //DNF
        var dnfString = "";
        for (var _i = 0, dnfRows_1 = dnfRows; _i < dnfRows_1.length; _i++) {
            var rowNr = dnfRows_1[_i];
            dnfString += "(";
            for (var index = 0; index < truthTableInputs[rowNr].length; index++) {
                var row = truthTableInputs[rowNr][index];
                dnfString += ((row) ? " " : " ¬") + String.fromCharCode(65 + index) + " ∧";
            }
            dnfString = dnfString.slice(0, -2);
            dnfString += " ) ∨ ";
        }
        dnfString = dnfString.slice(0, -3);
        dnf.innerHTML += dnfString + "<br>";
        //KNF
        var knfString = "";
        for (var _a = 0, knfRows_1 = knfRows; _a < knfRows_1.length; _a++) {
            var rowNr = knfRows_1[_a];
            knfString += "(";
            for (var index = 0; index < truthTableInputs[rowNr].length; index++) {
                var row = truthTableInputs[rowNr][index];
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
// Handler
function ttButtonClickHandler(x, y, btn) {
    console.log(x, y, "pressed");
    truthTableOutputs[x][y] = !truthTableOutputs[x][y];
    btn.innerHTML = (truthTableOutputs[x][y]) ? "1" : "0";
    calcDnfAndKnf();
}
