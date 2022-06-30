
//storing the button colors
let buttonColors = [ "red", "blue", "green", "yellow"];

// Storing the game pattern and the user's click pattern 
let gamePattern = [];
let userClickedPattern = [];

//A check for when the game as started
let start = true;
let level = 0;

// Formatting Keyboard press to start the game only
$(document).keydown(function(){
    if (start) {
        $("h1").html("Level "+level);
        nextSequence();
        start = false;
    }   
});

//Fomatting Button Clicks
$(".box").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animate(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// formatting the sewuence of the game when played
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").html("Level "+level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).delay(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//creating the function that checks the game pattern against user's click and call the next sequence
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// storing sounds to be played in the game
function playSound(key){
    let sound = new Audio("sounds/"+key+".mp3");
    sound.play();
}

//Formatting animation for the button press
function animate(button){
    $("#"+button).addClass("pressed");
    setTimeout(() => {
        $("#"+button).removeClass("pressed");
    }, 100);
}

//What happens when user gets answer wrong = start over
function startOver(){
    level = 0;
    gamePattern = [];
    start = true;
}


// To display how it works when "help" button is clicked
$("button").click(function(){
    $(".explainer").toggleClass("active");
});


