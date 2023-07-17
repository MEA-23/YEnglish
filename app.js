let englishWordContainer = document.getElementById('englishWord');
let arabicWordContainer = document.getElementById('arabicWord');
let checkButton = document.getElementById('checkButton');
let clearButton = document.getElementById('clear');

let data = loadData();

let index = -1;

let activeWords = data.filter(function (item) {
    return item.selected === true;
});
console.log("active",activeWords);


englishWordContainer.setAttribute('type', 'text');


function* indexGenerator(){

    while (true){
        index++;
    if (activeWords.length === 0) {
        console.log(index);
        yield false;
    }

    else if (index < activeWords.length ) {
        console.log(index);
        yield  index;
    }

    else if (index >= activeWords.length) {
        index = 0;
        yield index;
    }
    console.log(index);

    }


    }

    let wordId ;


function wordSelect() {

    var wordIndex = indexGenerator().next().value;
   
    if (wordIndex === false) {

        arabicWordContainer.value = "لا توجد كلمات مختارة";
        englishWordContainer.value = "No words selected";
        checkButton.disabled = true;
        clearButton.disabled = true;
        englishWordContainer.disabled = true;
        arabicWordContainer.disabled = true;
    }

    else {

        if (hintIsEnabled()){
            arabicWordContainer.disabled = false
        }

        else if (!hintIsEnabled()){
            arabicWordContainer.disabled = true
        }

        englishWordContainer.disabled = false;


        checkButton.disabled = false;
        clearButton.disabled = false;

        wordId = activeWords[wordIndex].id;
        console.log(wordId);

        var ArabicWord  = getArabicWord();

        arabicWordContainer.value = ArabicWord
    

    }

 
}

function checkWord() {

    var EnglishWord = getEnglishWord();

    var userAnswer = englishWordContainer.value;

    if (userAnswer === EnglishWord) {
        clear();
        wordSelect();
    } else {
       console.log("wrong");
       console.log(EnglishWord);
    }
}

wordSelect();


clearButton.addEventListener('click', clear);


function clear() {
    englishWordContainer.value = "";
}


function userExperience (){

   
englishWordContainer.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        checkButton.click();
        
        englishWordContainer.focus()

  
    }  
})}


function revealWord (){
    if (activeWordsIsNotEmpty()){
arabicWordContainer.value = getEnglishWord()
englishWordContainer.value = ""
}
}

function hideWord (){
    if (activeWordsIsNotEmpty()) {
        arabicWordContainer.value = getArabicWord()
    }
}



function openWordsPage (){
    window.location.replace("allWords.html");
   
}

function openSettingsPage (){
    window.location.replace("setting.html");
}




arabicWordContainer.addEventListener('focus', revealWord)
englishWordContainer.addEventListener('focus', hideWord)
userExperience ()


function getEnglishWord(){

    for (var datas of data){
        if (datas.id === wordId){
          return   datas.english;
        }
    }
}

function getArabicWord(){

    for (var datas of data){
        if (datas.id === wordId){
          return   datas.arabic;
        }
    }
}

function activeWordsIsNotEmpty(){

   if (activeWords.length === 0){
       return false;
   }

   else {
       return true;
   }
}


function hintIsEnabled(){

    settings = getSettings();

    if (settings === null) {

            return true
    }

    else{

        if (dataFind("name","hint",settings).state){
            return true;
        }
        else {
            return false;
        }
        
    }

    }