
let settings = [{name : 'hint' , state : true },
                {name : 'delete' , state : false },
                {name : 'eddit' , state : true },
                {name : 'select' , state : true }];

let hintCheckBox = document.getElementById("hintCheckBox");
let deleteCheckBox = document.getElementById("deleteCheckBox");
let edditCheckBox = document.getElementById("edditeCheckBox");
let selectCheckBox = document.getElementById("selectCheckBox");

function loadsetting(){
    if (localStorage.getItem("settings") === null) {
        setSettings(settings);
    }
    
    else {
        settings = getSettings();
    }

    renderSettings();
    
}



function openWordsPage (){
    window.location.replace("allWords.html");
   
}


function renderSettings(){

if (hintIsEnabled()){
    hintCheckBox.checked = true;
    console.log("hint is enabled")
}

else {
    hintCheckBox.checked = false;
    console.log("hint is diabled")

}

if (deleteIsEnabled()){
    deleteCheckBox.checked = true;
    console.log("dele is enabled")
}
else {
    deleteCheckBox.checked = false;
    console.log("hint is enabled")

}

if (edditIsEnabled()){
    edditCheckBox.checked = true;
  
}
else {
    edditCheckBox.checked = false;

}

if (selectIsEnabled()){
    selectCheckBox.checked = true;
}
else {
    selectCheckBox.checked = false;

}

}


function hintIsEnabled(){

if (dataFind("name","hint",settings).state){
    return true;
}
else {
    return false;
}

}

function hintSettingChange(){

if (hintCheckBox.checked === true){
    dataFind("name","hint",settings).state = true;
    setSettings(settings);
    console.log(settings)
}
else {
    dataFind("name","hint",settings).state = false;
    setSettings(settings);
    console.log(settings)

}
}

function deleteIsEnabled(){

    if (dataFind("name","delete",settings).state){
        return true;
    }
    else {
        return false;
    }
    
    }
    
    function deleteSettingChange(){
    
    if (deleteCheckBox.checked === true){
        dataFind("name","delete",settings).state = true;
        setSettings(settings);
        console.log(settings)
    }
    else {
        dataFind("name","delete",settings).state = false;
        setSettings(settings);
        console.log(settings)
    
    }
    }


    function edditIsEnabled(){

        if (dataFind("name","eddit",settings).state){
            return true;
        }
        else {
            return false;
        }
        
        }
        
        function edditSettingChange(){
        
        if (edditCheckBox.checked === true){
            dataFind("name","eddit",settings).state = true;
            setSettings(settings);
            console.log(settings)
        }
        else {
            dataFind("name","eddit",settings).state = false;
            setSettings(settings);
            console.log(settings)
        
        }
        }




        function selectIsEnabled(){

            if (dataFind("name","select",settings).state){
                return true;
            }
            else {
                return false;
            }
            
            }
            
            function selectSettingChange(){
            
            if (selectCheckBox.checked === true){
                dataFind("name","select",settings).state = true;
                setSettings(settings);
                console.log(settings)
            }
            else {
                dataFind("name","select",settings).state = false;
                setSettings(settings);
                console.log(settings)
            
            }
            }


function openMainPage (){
    window.location.replace("index.html");
   
}



loadsetting();

