

// console.log(Math.floor(Math.random() * 4))
var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var level = 0
var started = false


//Key press to start
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level)
      nextSequence()
      started = true
    }
})

// Mouse clickeda
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    
    playSound(userChosenColour)
    animatePress(userChosenColour)  
    
    //Check answer when player clicked button
    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1)
})


function checkAnswer(currentLevel){

    // step 3 if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("Success");

        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(() => {
                nextSequence() 
            }, 1000)
        }

    }else{
        // console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over") 
        
        $("#level-title").text("Game Over, Press Any Key to Restart")

        setTimeout(() => {
            $("body").removeClass("game-over")
        },100)

        startOver()
    }
}

function nextSequence() {
    //If nextSequence() is triggered, reset the userClickedPattern to an empty array
    userClickedPattern = []

    level++
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)

    //Animate using jQuery
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)

    //Play sound function
    playSound(randomChosenColour)
}

//Play sound function
function playSound(name){
    //Sounds
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed")

    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed")
    },100)
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}