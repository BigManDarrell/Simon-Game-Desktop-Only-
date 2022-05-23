var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(handler);

function handler() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

$(document).on('keydown click', function() {
    
    if(!started) {
        nextSequence();
        started = true;
    }

});

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut().fadeIn('slow');
    playSound(randomChosenColour);

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press or Click to Restart");
        startOver();
    }

}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}
