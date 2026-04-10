// add javascript here
let answer = 0;
let guessCount = 0;
let range = 0;
let startTime = 0;
const scores = [];
const roundTimes = [];

function liveTime(){
    let date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    if (day % 10 == 1 && day != 11){
        day += "st";
    }
    else if (day % 10 == 2 && day != 12){
        day += "nd";
    }
    else if (day % 10 == 3 && day !=13){
        day += "rd";
    }
    else{
        day += "th";
    }
    let year = date.getFullYear();
    let currentTime = date.toLocaleTimeString();
    document.getElementById("date").textContent = month + " " + day + ", " + year + ". Current Time: " + currentTime;
}

liveTime();
setInterval(liveTime, 1000);

let playerName = prompt("Enter your name: ").toLowerCase();
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play(){
    startTime = new Date().getTime();
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Guess a number 1-" + range;
    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;

}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct! It took " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
    }
    else if(guess < answer){
        msg.textContent = "Too low, try again.";
    }
    else{
        msg.textContent = "Too high, try again.";
    }
    
}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i]; //sum = sum + scores[i]
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;}); //sort score increasing

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
}
function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}