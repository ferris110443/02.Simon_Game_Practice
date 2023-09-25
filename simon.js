
//=============Variables===============


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 1;

//=============Event===============


$(document).keypress(function(event){
    console.log(event)
    if (started!=true && event.originalEvent.key ==="a"){
        $('#level-title').text("Level : "+ level)
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkResults(userClickedPattern.length-1);
    playSound(userChosenColor);
})


//=============function===============

function nextSequence(){
    userClickedPattern = [];
    $('#level-title').text("Level : "+ level);
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNum];
    gamePattern.push(randomChosenColor);
    level++;
    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);

}




function checkResults(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length ===userClickedPattern.length)
        setTimeout(function(){
            nextSequence()
        },1000)
    }else {

        $("body").addClass('game-over');
        playSound('wrong');
        $("#level-title").text("Game Over, Press A Key to Restart");
        setInterval(function(){
            $("body").removeClass("game-over")
        },300)

        startOver()
    }

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 300);
  }


  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }