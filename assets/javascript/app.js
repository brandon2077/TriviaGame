// Defining the basic variables
$(document).ready(function(){
    var counter;
    var count = 0;
    var timer = 31;
    var passed = 0;
    var missed = 0;
    var silence = 0;
    var isSelected = false;

// Placing the questionss and answerss into arrays
// Then placing the arrays into variables
    var questions = ["How many Tenets did the Dark Brotherhood originally follow?","What race was the Night Mother in life?","Which of the following Daedra is once said to have appeared as the Night Mother, however this was later deemed incorrect?","What is the Blade of Woe?","What Dark Brotherhood rank does the jester Cicero retain at the time when he arrives in the Falkreath Sanctuary in Skyrim?","What race are the Shadowscales?","In which city in Cyrodiil can the Hero of Kvatch enter a Sanctuary?"];
    var answers = ["Five","Dunmer","Mephala","A Daedric Artefact","Keeper","Argonian","Cheydinhal","Shadowmere"];
    var choiceOne = ["Five","Dunmer","Molag Bal","A sword","Murderer","Kajiit","Bruma","Darkracer"];
    var choiceTwo = ["Three","Nord","Meridia","A Daedric Artefact","Silencer","Dov","Bravil","Frost"];
    var choiceThree = ["Ten","Altmer","Mephala","A poem","Keeper","Hist","Kvatch","Shadowmere"];
    var choiceFour = ["Fifty-two","Daedra","Azura","A dagger","Listener","Argonian","Cheydinhal","Evilmane"];

// Begin Functions

// Answer Image Functions 
    function showImages() {
        if(count === 0) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/tenents.jpg">');
        }
        else if(count === 1) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/nightmother.jpg">');
        }
        else if(count === 2) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/mephala.jpg">');
        }
        else if(count === 3) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/bladeofwoe.jpg">');
        }
        else if(count === 4) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/cicero.png">');
        }
        else if(count === 5) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/shadowscale.jpg">');
        }
        else if(count === 6) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/sanct.png">');
        }
        else if(count === 7) {
            $("#imageColumn").show();
            $("#imageColumn").html('<img src="assets/images/shadowmere.png">');
        }
    }
// Question Functions	
    function showColumns() {
        $("#questionsColumn").show();
        $("#choiceColumn-1").show();
        $("#choiceColumn-2").show();
        $("#choiceColumn-3").show();
        $("#choiceColumn-4").show();
    }
    function hideColumns() {
        $("#questionsColumn").hide();
        $("#choiceColumn-1").hide();
        $("#choiceColumn-2").hide();
        $("#choiceColumn-3").hide();
        $("#choiceColumn-4").hide();
    }
    function hideScore() {
        $("#passedColumn").hide();
        $("#missedColumn").hide();
        $("#silenceColumn").hide();
        $("#restartColumn").hide();
    }
    function displayQuestion () {
        hideScore();
        $("#answersColumn").hide();
        $("#imageColumn").hide();
        $("#timerColumn").show();
        showColumns();
        $("#questionsColumn").html(questions[count]);
        $("#choiceColumn-1").html(choiceOne[count]);
        $("#choiceColumn-2").html(choiceTwo[count]);
        $("#choiceColumn-3").html(choiceThree[count]);
        $("#choiceColumn-4").html(choiceFour[count]);

        $("#choiceColumn-1").hover(function() {
            $(this).css("color", "#a76284");
        },
        function(){
            $(this).css("color", "#743e50");
        });
        $("#choiceColumn-2").hover(function() {
            $(this).css("color", "#a76284");
        },
        function(){
            $(this).css("color", "#743e50");
        });
        $("#choiceColumn-3").hover(function() {
            $(this).css("color", "#a76284");
        },
        function(){
            $(this).css("color", "#743e50");
        });
        $("#choiceColumn-4").hover(function() {
            $(this).css("color", "#a76284");
        },
        function(){
            $(this).css("color", "#743e50");
        });
    }
    $("#choiceColumn-1").on("click", checkAnswer)
    $("#choiceColumn-2").on("click", checkAnswer)
    $("#choiceColumn-3").on("click", checkAnswer)
    $("#choiceColumn-4").on("click", checkAnswer)
// Answer functions 
    function checkAnswer() {
        hideColumns();
        if($(this).text() === answers[count]) {
            stopTime();
            isSelected = true;
            $("#answersColumn").show();
            $("#answersColumn").html("Passed! The passphrase is: " + answers[count]);
            showImages();
            passed++;
            count++;
        }
        else {
            stopTime();
            isSelected = true;
            $("#answersColumn").show();
            $("#answersColumn").html("Failed! The passphrase is: " + answers[count]);
            showImages();
            missed++;
            count++;
        }

        checkGameEnd();
    }
// End game funcion
    function checkGameEnd() {
        if(count === questions.length) {
            $("#timerColumn").hide();
            showScore();
            count = 0;
            $(".start").show();
            $(".start").on("click", function() {
                resetScore();
                startGame();
            });
        }
    }
    function resetTime() {
        timer = 31;
    }
    function displayTime() {
        timer--;
        $("#timerColumn").html("You have " + timer + " seconds remaining");
            if(timer <= 0) {
                hideColumns();
                stopTime();
                $("#answersColumn").show();
                $("#answersColumn").html("You've chosen silence. The passphrase is: " + answers[count]);
                showImages();
                silence++;
                count++;
                checkGameEnd();
            }
    }
    function startTime() {
        clearInterval(counter);
        counter = setInterval(displayTime, 1000);
    }
    function stopTime() {
        clearInterval(counter);
        resetTime();
        if(count < questions.length - 1) {
            setTimeout(startTime, 2000);
            setTimeout(displayQuestion, 3000);
        }
    }
    resetTime();
// Score function
    function showScore() {
        $("#passedColumn").show();
        $("#passedColumn").html("Passed: " + passed);
        $("#missedColumn").show();
        $("#missedColumn").html("Failed: " + missed);
        $("#silenceColumn").show();
        $("#silenceColumn").html("Silence: " + silence);
        $("#restartColumn").show();
        $("#restartColumn").html("Click Enter to Retry!");
    }
    function resetScore() {
        passed = 0;
        missed = 0;
        silence = 0;
    }
    function startGame() {
        $(".start").hide();
        startTime();
        displayQuestion();
    }
  $(".start").on("click", function() {
    startGame();
  });
});
