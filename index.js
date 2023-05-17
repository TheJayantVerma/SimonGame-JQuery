var hasGameStarted = false;
var simonColors = ["red", "green", "blue", "yellow"];
var displayedColors = [];
var userChosenColors = [];
var level = 0;

function initiateGameOver() {
    $("body").addClass("wrong");
    setTimeout(function() {
        $("body").removeClass("wrong");
    }, 200);
    new Audio("Sounds/wrong.mp3").play();
    hasGameStarted = false;
    displayedColors = [];
    userChosenColors = [];
    level = 0;
    $("#title-text").html("Game Over,<br>Press Any Key To Restart.");
}

function checkAnswer(currentIndex) {
    if (userChosenColors[currentIndex] == displayedColors[currentIndex]) {
        if (userChosenColors.length == displayedColors.length) {
            setTimeout(function() {
                userChosenColors = [];
                initiateNextLevel();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        initiateGameOver();
    }
}

function playSound(currentBtn) {
    var soundName = currentBtn.attr("id");
    new Audio("Sounds/" + soundName + ".mp3").play();
}

function btnPressed(currentBtn) {
    currentBtn.addClass("btn-pressed");
    setTimeout(function() {
        currentBtn.removeClass("btn-pressed");
    }, 100);

}

function initiateNextLevel() {
    level++;
    $("#title-text").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var nextColorFromSimon = simonColors[randomNumber];
    displayedColors.push(nextColorFromSimon);
    var nextBtn = $("#" + nextColorFromSimon);
    nextBtn.fadeOut(200).fadeIn(200);
    playSound(nextBtn);
}

$(".btn").click(function() {
    userChosenColors.push($(this).attr("id"));
    btnPressed($(this));
    playSound($(this));
    checkAnswer(userChosenColors.length - 1);
})

$(document).keypress(function() {
    if (!hasGameStarted) {
        hasGameStarted = true;
        initiateNextLevel();
    }
})