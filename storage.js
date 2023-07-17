






function saveData(allData) {
    localStorage.setItem('allData', JSON.stringify(allData));
    console.log('Data saved');
}


function loadData() {
    allData = JSON.parse(localStorage.getItem('allData'));
    if (allData === null) {
        allData = [];
    }
    return allData;
}


function getSettings(){
    var settings = JSON.parse(localStorage.getItem("settings"));
    console.log(settings);
    return settings;
}


function setSettings(settings){
    localStorage.setItem("settings", JSON.stringify(settings));
    console.log("settings saved")
}


function dataFind (name,value,dataContainer){

    for (var datas of dataContainer) {
        if (datas[name] === value) {
            return datas;
        }
    }
        console.log("data not found");
        return false;
}

