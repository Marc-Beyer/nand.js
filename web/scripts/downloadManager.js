// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
function downloadAsImage(data, filename, type) {
    var file = data;
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
function onLoad(event) {
    var jsonSaveFile = event.target.result;
    console.log("jsonSaveFile", jsonSaveFile);
    saveManager.loadJSONString(jsonSaveFile);
}
function startRead(event) {
    var fileLoaderBtn = document.getElementById("file-loader-btn");
    var file = fileLoaderBtn.files[0];
    if (file) {
        var fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = onLoad;
    }
}
/*
function convertRegEx(str, nr){
    if(str.lastIndexOf("/") > 1){
        let regEx = str.substr(1, str.lastIndexOf("/")-1);
        if(str.substring(str.lastIndexOf("/"), str.length).includes("i")){
            jFile[nr] [regEx] = 0;
        }else{
            jFile[nr] [regEx] = 1;
        }
        return true;
    }
    return false;
}

//process the filedata
function onLoad(event) {
    let fileString = event.target.result;
    let jsonSaveFile = JSON.parse(fileString);
    
    for (let key in jsonSaveFile) {
        //check the type of the object
        if(jsonSaveFile[key].type === "channel"){
            //regEx can be used
            if(convertRegEx(jsonSaveFile[key].key, 0) === false){
                jFile[0] [jsonSaveFile[key].key] = 1;
            }
            
        }else if(jsonSaveFile[key].type === "keyword"){
            //regEx can be used
            if(convertRegEx(jsonSaveFile[key].key, 1) === false){
                jFile[1] [jsonSaveFile[key].key] = 1;
            }
            
        }else if(jsonSaveFile[key].type === "wildcard"){
            //regEx can not be used
            jFile[2] [jsonSaveFile[key].key] = 1;
            
        }
    }
    
    //export the savefile;
    let d = new Date();
    download([JSON.stringify(jFile, null, 2)],"ChannelBlocker " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".save" ,".save");
}

function startRead(event) {
    let file = document.getElementById('fileLoaderBtn').files[0];
    if (file) {
        let fileReader = new FileReader();

        fileReader.readAsText(file, "UTF-8");

        fileReader.onload = onLoad;
    }
}


if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('fileLoaderBtn').addEventListener('change', startRead, false);
} else {
    alert('The file-APIs are not supported. You are not able to import.');
}

document.getElementById('visibleFileLoaderBtn').addEventListener('click', () => {
        document.getElementById('fileLoaderBtn').click();
});
}
*/ 
//# sourceMappingURL=downloadManager.js.map