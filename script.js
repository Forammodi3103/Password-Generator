// fetch inputslider using customAttribute
const inputSlider = document.querySelector("[data-lengthSlider]");
// fetch data character is number change using customAttribute
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
// fetch uuperCase character using ID method
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
// fetch all type of Character which are shown in checkbox
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// making string for Symbols by own
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//when you refresh page you see default value is 10
// starting pw is null
let password = "";
// equal to 10
let passwordLength = 10;
// default set that one checkbox is selected
let checkCount = 0;
// calling function
handleSlider();
//set strength circle color to grey
setIndicator("#ccc");

//fuction declaration
// password length ne UI pr display karavu
function handleSlider() {
    // inputslider starting ma passwordlength ne equal hoyy
    inputSlider.value = passwordLength;
    // atle lengthdisplay pn set karela password no number batave
    lengthDisplay.innerText = passwordLength;
    
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

// function for indicator
function setIndicator(color) {
    // set background color using js
    indicator.style.backgroundColor = color;
    // set shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    // Math.random() set rendom number between 0 to 1
// (1.) (0.56 * (9-1)) then ans is round off
    // possible che k number float aave mate a round off karva 
    // "Math.floor" use kariu
// (2.) our range is 0 to max-min
// (3.) we need min to max
// (4.) so 0+min to max-min+min (sum both side by min)
// (5.) now we get number between min to max
}

function generateRandomNumber() {
    // render number will be from 0 to 9
    return getRndInteger(0,9);
}

function generateLowerCase() {
    // lower case askyvalue
    // this give nember...we have to convert it in 'Character' 
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() { 
    // Upper case askyvalue
    // this give nember...we have to convert it in 'Character'
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    //(1.) making string of Symbols
    //(2.) for example i have 20 symbols duration will 1 to 20
    //(3.) random generate number between range
    //(4.) select symbol wchich is wriiten on that index
    const randNum = getRndInteger(0, symbols.length);
    // symbols.length display total number of string character
    return symbols.charAt(randNum);
    // charAt shows which character is there on given index number
}

// Rules for strength checking(You can decide by own)
function calcStrength() {
    // saku j select na hoy to false 
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    // select hoyy tohh true
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    // condition making for rules you made
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

//Promise a async batave che j fullfill thay pan kharo athva na pn thayy
async function copyContent() {
    // fullfill mate
    // error handling mate try catch use karisu
    try {
        // await is used jya sudhi complete na thayy tya sudhi msg display na thavo joi
        // aa syntex ni maddad thi code copy thai sakse j display ma batavio hse
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    // fail thayy tyare
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    // copied text valo msg amuk time pachi jato reh che
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

// shuffleing password
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        // rendom index thi 0 index taraf jse
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// Counting checked checkbox
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    // special condition
    // password ni length checkcount thi ochi hoy tohh a automatically checkcout ne equal thse
    // for example tame 4 e 4 box tick kariya che n length 1 rakhi che 
    // tohh ava time a automatically length 4 kari dese n 4 character no ans apse
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

// atleast one box is selected for generate password
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

// when you use Slider,number showing should be change
inputSlider.addEventListener('input', (e) => {
    // new value is given to passwordlength
    passwordLength = e.target.value;
    handleSlider();
})

// jyare password generate thayy tyare copy possible banse
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // making function Array
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("Compulsory adddition done");

    //remaining adddition
    // remove remaining character
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
   
    //shuffle the password
    //  array pass 
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});