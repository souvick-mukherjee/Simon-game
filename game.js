var buttonColors=['red','yellow','blue','green'];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var clickNumber=0;
var started=false;

//LISTENS TO KEY PRESSES
$(document).on("keypress",function(){
    if(started===false){
        $("h1").text("Level 0");
        nextSequence();
        started=true;
    
    }
})

//LISTENS TO MOUSE CLICKS
$(".btn").click(function(){
    if(started===true){
    clickNumber+=1;
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    //nextSequence()
    if (checkAnswer(clickNumber-1)===false)
    {
        console.log("wrong");
        gameOver();
        startOver();
    }
    else if((checkAnswer(clickNumber-1)===true) && (clickNumber===level))
    {
        console.log("success");
        setTimeout(nextSequence,1000);
        userClickedPattern=[];
        clickNumber=0;
    }
    }
})

//PLAYS SOUND ON CLICK
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

//PRODUCES ANIMATION ON CLICK
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        
        $("#"+currentColor).removeClass("pressed")},100);
}


//ENTERS NEW SEQUENCE WHEN ALL COLOURS MATCHED IN A LEVEL
function nextSequence(){

    level+=1;
    $("h1").text("Level "+level);

    var randomNumber=Math.round(Math.random()*(3-0)+0);
    // console.log(randomNumber);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();


}

// CHECK COLOUR ON EACH CLICK
function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    //console.log("success");
    return true;}
    else{
    //console.log("wrong");
    return false;}
    
}

// FUNCTION TO BE CALLED IN CASE OF A WRONG SELECTION
function gameOver(){
    var audio=new Audio("sounds/wrong.mp3")
    $("h1").text("Game Over, Press Any Key to Restart");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

}
function startOver()
{
    started=false;
    level=0;
    clickNumber=0
    gamePattern=[];
    userClickedPattern=[];
}