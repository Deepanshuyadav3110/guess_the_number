let randomNumber = parseInt((Math.random()*100)+1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining=document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.loworhi');
const startover = document.querySelector('.resultparas');

const p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame=true;

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}
function validateGuess(guess){
    // to check whether the user enter the correct value or not
    if(isNaN(guess)){
        alert('Enter a valid number.');
    }
    else if(guess<1){
        alert('you enter a number less than 1.');
    }
    else if(guess>100){
        alert('you enter a number greater than 100.')
    }
    else{
        prevGuess.push(guess);
        if(numGuess === 11){
            displayGuess(guess);
            displayMessage(`Game over. Random number was ${randomNumber}`);
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}
function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You Won. The number is ${randomNumber}`);
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`the number is too less`);
    }
    else if(guess > randomNumber){
        displayMessage(`the number is too greater`);
    }
}
function displayGuess(guess){
    userInput.value='';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`;
}
function displayMessage(message){
    lowOrHi.innerHTML = `<h3>${message}</h3>`
}

function endGame(){
    userInput.value ='';
    userInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = '<h3 id="newGame">Start New Game</h3>';
    startover.appendChild(p);
    playGame=false;
    newGame();
}
function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt((Math.random()*100)+1);
        prevGuess=[];
        numGuess=1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11-numGuess} `;
        userInput.removeAttribute('disabled');
        startover.removeChild(p);
        playGame=true;
    })
}