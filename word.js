let table = document.querySelector('table')
let englishWordInput = document.getElementById('englishWord')
let arabicWordInput = document.getElementById('arabicWord')


let data = []

let globalCheckVariable = {state : false, that : null}

let oldNewData = {oldData : null, newData : null}


function createInput (englishWord, arabicWord) {

    var containerId =  getID(englishWord, arabicWord)

    var tr = document.createElement('tr')
    tr.setAttribute('id', containerId)

    var td1 = document.createElement('td')
    td1.classList.add('center')
    td1.innerHTML = `<input class='checkBox' type="checkbox" >`
    var checkBox = td1.querySelector('.checkBox')
    checkBox.addEventListener('click', changeState)
    if (!selectIsEnabled()){
        checkBox.setAttribute('disabled', 'true')
    }

    var td2 = document.createElement('td')
    td2.classList.add('center')
    td2.innerHTML = englishWord
    
    var td3 = document.createElement('td')
    td3.classList.add('center')
    td3.innerHTML = arabicWord
        
    var td4 = document.createElement('td')
    td4.classList.add('center')
    var button = document.createElement('button')
    button.classList.add('eddit')
    button.innerHTML = 'eddit'
    if (!edditIsEnabled()){
        button.setAttribute('disabled', 'true')
    }
    button.addEventListener('click', edditText)
    td4.appendChild(button)

    var td5 = document.createElement('td')
    td5.classList.add('center')
    var button = document.createElement('button')
    button.classList.add('delete')
    button.innerHTML = 'delete'
    if (!deleteIsEnabled()){
        button.setAttribute('disabled', 'true')
    }
    button.addEventListener('click', deleteTask)
    td5.appendChild(button)


    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)

   var state = addToData(englishWord, arabicWord,containerId)

    if (state){

    table.insertBefore(tr, table.childNodes[2])
    }
}


function addWord() {

var englishWord = englishWordInput.value
var arabicWord = arabicWordInput.value
console.log(englishWord, arabicWord)

if (englishWord == "" || arabicWord == "") {
    alert("you must enter a txt")
    return
}

else if (typeof(englishWord)==='string' && typeof(arabicWord)==='string')
{
    createInput(englishWord, arabicWord)
    deleteInput()
}
}




function deleteInput() { 
    englishWordInput.value = ""
    arabicWordInput.value = ""
}



function deleteTask (){

    var parent = this.parentNode.parentNode
    parent.remove()
    var id = parent.getAttribute('id')

    for (var datas of data){
            
            if (datas.id == id){
                var index = data.indexOf(datas)
                data.splice(index, 1)
                saveData(data)
                break
            }
    }


}




function changeState (){

    var buton = this
    buton.classList.toggle('selected')
    var state = buton.classList.contains('selected')

    // check if the button in edditable mood

    if (globalCheckVariable.state){

        parent1 = buton.parentNode.parentNode
        parent2 = globalCheckVariable.that.parentNode.parentNode
    
        if (parent1 == parent2){
            globalCheckVariable.that.click()
        }
    

    }

    if (state){
        changeDataSelected(true,buton)
    }
    else {
        changeDataSelected(false,buton)
    }

}


function edditText (){

    // check the global variable
    if (!globalCheckVariable.state){
        globalCheckVariable.state = true
        globalCheckVariable.that = this
 
        //change the button to save
        var parent = this.parentNode.parentNode
        var tds = parent.querySelectorAll('td')
        var englishWordContainer = tds[1]
        var arabicWordContainer = tds[2]
        var button = tds[3].querySelector('button')
        button.innerHTML = 'save'
        button.classList.add('save')
        button.removeEventListener('click', edditText)
        button.addEventListener('click', saveText)
        englishWordContainer.setAttribute('contenteditable', 'true')
        arabicWordContainer.setAttribute('contenteditable', 'true')
        englishWordContainer.classList.add('edditAble')
        arabicWordContainer.classList.add('edditAble')

        oldNewData.oldData = [englishWordContainer.innerHTML,
                                arabicWordContainer.innerHTML]

    }

    else {

        var target = globalCheckVariable.that
        target.click()
        this.click()

    }


}

function saveText (){

    var parent = this.parentNode.parentNode
    var tds = parent.querySelectorAll('td')
    var englishWordContainer = tds[1]
    var arabicWordContainer = tds[2]
    var button = tds[3].querySelector('button')
    button.innerHTML = 'eddit'
    button.removeEventListener('click', saveText)
    button.addEventListener('click', edditText)
    button.classList.remove('save')
    englishWordContainer.setAttribute('contenteditable', 'false')
    arabicWordContainer.setAttribute('contenteditable', 'false')
    englishWordContainer.classList.remove('edditAble')
    arabicWordContainer.classList.remove('edditAble')

    globalCheckVariable.state = false
    globalCheckVariable.that = null

    oldNewData.newData = [englishWordContainer.innerHTML,
                            arabicWordContainer.innerHTML]

    // id


    for (var datas of data){

        if (oldNewData.oldData[0] == oldNewData.newData[0] && oldNewData.oldData[1] == oldNewData.newData[1]){

            return   changeData()
        }

    else if (datas.english == englishWordContainer.innerHTML && datas.arabic == arabicWordContainer.innerHTML){
        var index = data.indexOf(datas)
        var length = data.length
        var input = confirm('this word is already exist, do you want to over write ?')
        
        if (input){

            var oldContainerr = document.getElementById(datas.id)
            oldContainerr.remove()
            data.splice(index, 1)
            changeData()
            saveData(data)
            return true
        }

        else {
            console.log('not added')
            englishWordContainer.innerHTML = oldNewData.oldData[0]
            arabicWordContainer.innerHTML = oldNewData.oldData[1]
            return false
        }

    }

    }
 /////////////////////


     changeData()

}

function rendrData (){


    for (var datas of data){
        console.log(datas)
        var englishWord = datas.english
        var arabicWord = datas.arabic
        var selected = datas.selected

        let tr = document.createElement('tr')
        tr.setAttribute('id', datas.id)

        var td1 = document.createElement('td')
        td1.classList.add('center')
        td1.innerHTML = `<input class='checkBox' type="checkbox" >`
        var checkBox = td1.querySelector('.checkBox')
        checkBox.addEventListener('click', changeState)
        
        if (selected){
            checkBox.classList.add('selected')
            checkBox.setAttribute('checked', 'true')
        }
        if (!selectIsEnabled()){
            checkBox.setAttribute('disabled', 'true')
        }
       

        var td2 = document.createElement('td')
        td2.classList.add('center')
        td2.innerHTML = englishWord
        
        var td3 = document.createElement('td')
        td3.classList.add('center')
        td3.innerHTML = arabicWord
            
        var td4 = document.createElement('td')
        td4.classList.add('center')
        var button = document.createElement('button')
        button.classList.add('eddit')
        button.innerHTML = 'eddit'
        button.addEventListener('click', edditText)
        if (!edditIsEnabled()){
            button.setAttribute('disabled', 'true')
        }
        td4.appendChild(button)
    
        var td5 = document.createElement('td')
        td5.classList.add('center')
        var button = document.createElement('button')
        button.classList.add('delete')
        button.innerHTML = 'delete'

        if (!deleteIsEnabled()){
            button.setAttribute('disabled', 'true')
        }

        button.addEventListener('click', deleteTask)
        td5.appendChild(button)
    
    
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
    
        // table.appendChild(tr)
        // insert after the first row
        table.insertBefore(tr, table.childNodes[2])
    }


}






function changeData (){
 
    var oldData = oldNewData.oldData
    var newData = oldNewData.newData

    var oldEnglishWord = oldData[0]
    var oldArabicWord = oldData[1]

    var newEnglishWord = newData[0]
    var newArabicWord = newData[1]

    for (var datas of data){

        if (datas.english == oldEnglishWord && datas.arabic == oldArabicWord){
            datas.english = newEnglishWord
            datas.arabic = newArabicWord
            datas.id = getID(newEnglishWord, newArabicWord)
            saveData(data)
            break
        }

    }
    console.log(data)
}


function changeDataSelected (state,item){

    var parent = item.parentNode.parentNode
    var tds = parent.querySelectorAll('td')
    var englishWordContainer = tds[1]
    var arabicWordContainer = tds[2]

    if (state){

        for (var datas of data){

            if (datas.english == englishWordContainer.innerHTML && datas.arabic == arabicWordContainer.innerHTML){
                datas.selected = true
                saveData(data)
                break
            }
    
        }

    }

    else {

        for (var datas of data){

            if (datas.english == englishWordContainer.innerHTML && datas.arabic == arabicWordContainer.innerHTML){
                datas.selected = false
                saveData(data)
                break
            }
    
        }
    }

    console.log(data)

}


function addToData (englishWord, arabicWord,containerId){


    for (var datas of data){

        if (datas.english == englishWord && datas.arabic == arabicWord){
            var index = data.indexOf(datas)
            var length = data.length
            var input = confirm('this word is already exist, do you want to over write ?')
            
            if (input){

                data.splice(length+1, 0, {
                    english : englishWord,
                    arabic : arabicWord,
                    selected : false,
                    id : containerId
                });
                var oldContainerr = document.getElementById(datas.id)
                oldContainerr.remove()
                data.splice(index, 1)
                saveData(data)
                return true
            }

            else {
                console.log('not added')
                return false
            }

        }



    }

        data.push({
            english : englishWord,
            arabic : arabicWord,
            selected : false,
            id : containerId
        });

        console.log('added')
      console.log(data)
        
      saveData(data)
        return true

    


}

function getID (englishWord, arabicWord){

    return `${englishWord}${arabicWord}${Math.floor(Math.random() * 1000)}`

}



// user experience functions

function userExperience (){

    var englishWord = englishWordInput
    var arabicWord = arabicWordInput

englishWordInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        englishWord = englishWordInput.value
        arabicWordInput.focus()

  
    }  
})

arabicWordInput.addEventListener('keyup', function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        arabicWord = arabicWordInput.value


        if (englishWord == "" || arabicWord == "") {
            alert("you must enter a txt")
            return
        }
        
        else if (typeof(englishWord)==='string' && typeof(arabicWord)==='string')
        {
            createInput(englishWord, arabicWord)
            deleteInput()
        }


        englishWordInput.focus()
        
        

    }
})


}


function openMainPage (){
     window.location.replace("index.html");
    
}


function openSettingsPage (){
    window.location.replace("setting.html");
}


function deleteIsEnabled(){

    settings = getSettings();

    if (settings === null) {

            return false;
    }

    else{

    if (dataFind("name","delete",settings).state){
        return true;
    }
    else {
        return false;
    }
    
    }
}


function edditIsEnabled(){

    settings = getSettings();

    if (settings === null) {

            return true;
    }

    else{

    if (dataFind("name","eddit",settings).state){
        return true;
    }
    else {
        return false;
    }
    
    }
}


function selectIsEnabled(){

    settings = getSettings();

    if (settings === null) {

            return true;
    }

    else{

    if (dataFind("name","select",settings).state){
        return true;
    }
    else {
        return false;
    }
    
    }
}


userExperience ()
data = loadData()

rendrData()



