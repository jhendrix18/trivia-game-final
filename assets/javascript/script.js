// creating constructor function, three attributes possible all listed below
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;                                                                             // the question we are current on
}

// function to get the index of current question
Quiz.prototype.getQuestionIndex = function() {                                                          // select constructor function (quiz), use prototype keyword, "get"+name of the function 
    return this.questions[this.questionIndex];                                                          // return if the current question is a position within the questions array??????
}                                                                                       

// function to check if our quiz has ended
Quiz.prototype.isEnded = function () {      
    return this.questions.length === this.questionIndex;                                                // return if the current question index/position is equal to the final position within the questions array
}

// function for guesses, checks if current choice is the correct answer 

Quiz.prototype.guess = function(answer) {                                                               // passing answer as the argument* because we want to compare user choice to answer, two already defined parameters
    if(this.getQuestionIndex().correctAnswer(answer)) {                                                 // if the correct answer for the current question
        this.score++;
    }
    this.questionIndex++;                                                                               // implement the current idex of the question. Moves us to a new question, regardless if previous answer was correct or wrong (keeps the game moving along, otherwise we'd stay on the same question over and over)
}

// =========================================================== Section 2 =====================================================================================================================

// writing constructor function
function Question(text, choices, answer) {                             
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

// a function to detect if the user's choice is a correct answer or wrong answer
Question.prototype.correctAnswer = function(choice) {                                                   //select constructor function, make it a prototype, correct answer, set equal to function with param containing the user choice         
    return choice === this.answer;                                                                      // return true if "this" is equal to the answer
}

// ========================================================= Section 3 =========================================================================================================================

// timer function

var number = 30;                                                                                         // variable to store timer count/value
var intervalId;                                                                                          // variable to store the counter interval amount

function run() {                                                                                         // function to initiate the timer
    clearInterval(intervalId);                                                                           // clears any previous interval values, safety net
    intervalId = setInterval(decrement, 1000);                                                           // sets interval details, in this case, decrement (to be defined) in seconds
}

function decrement() {
    number --;                                                                                           // specify how much to decrement at the interval set above
    $("#game-timer").html("<h2>" + "Time Remaining: " + number + "</h2>");                               // dispay timer value on page in game-timer div created
    if (number === 0) {
        quiz.isEnded;
        alert("game over!");
    }
}

// I'm stuck here....... need/want to write a function that forces the game to end..


// =========================================================== Section 4 =====================================================================================================================================

// function populates questions
function populate() {                                                                                   
    if(quiz.isEnded()) {                                                                                // has the quiz ended yet? If so, show the user's score
        showScores();
    }
    else {                                                                                              // if not, populate that question
        // show question
        var element = document.getElementById("question");                                              // jQuery version of this? Look it up and revise
        element.innerHTML = quiz.getQuestionIndex().text;                                               // same, can I use jQuery to make this a bit cleaner and simpler?

        // show choices
        var choices = quiz.getQuestionIndex().choices;                                                  // established variable to grab and store question answer choices for THIS specific index position
        for(var i = 0; i < choices.length; i++) {                                                       // then, loop over all choices for this question 
            var element = document.getElementById("choice" + i);                                        // create var, pointing at choices, select all 4 by using the i variable since it loops over all
            element.innerHTML = choices[i];                                                             // set the button text to all choices listed (i)
            guess ("button" + i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess) {                                                                              // function to check if user answer is correct, and move to next question (called above)
    var button = document.getElementById(id);                                                            // why are we selecting by id and id?
    button.onclick = function() {                                                                        // on click, call guess function (using object and function)
        quiz.guess(guess);                                                                               // call populate function again, moves us forward regardless of correctness.
        populate();
    }
};

function showProgress() {                                                                               // function to show current progress/placement within the quiz
    var currentQuestionNumber = quiz.questionIndex + 1;                                                 // new variable, get our question indez number and add 1 to move forward to next
    var element = document.getElementById("progress");                                                  // grab the progress div in html document, prep for update
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHtml = "<h1>Result</h1>";                                                               // dynamically creates a results element 
    gameOverHtml += "<h2 id='score'> Your Score: " + quiz.score + "</h2>";                              // dynamically creates a your score element to display how the user did
    var element = document.getElementById("quiz");                                                      // grab the existing "quiz" element/div
    element.innerHTML = gameOverHtml;                                                                   // replace it all with elements listed within gameoverhtml
}

// uses constructors to add/populate questions inside an array
var questions = [
    new Question("What is the fastest animal on the planet?", ["Gazelle", "Cheetah", "Ostrich", "Tiger"], "Cheetah"),
    new Question("What is the largest animal on the planet?", ["Blue Whale", "Elephant", "Green Whale", "Dinosaur"], "Blue Whale"),
    new Question("What does the dollar sign usually tell you is in play?", ["bootstrap", "CSS", "HTML", "jQuery"], "jQuery"),
    new Question("HTML and CSS are generally referred to as _____ side languages?", ["Light Side", "Dark Side", "Client Side", "Server Side"], "Client Side")
];

var quiz = new Quiz(questions);                                                                             // created an object for our quiz controller. uses constructor attribs outlined (text, choice, answer)

populate();                                                                                                 // calling the function written above
run();