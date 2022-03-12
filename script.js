//create variables to track the state of the quiz
var questionindex = 0;
var time = questions.length * 25;
var timerid;

//declare variables from html elements
var startbtn = document.getElementById("start");
var startel = document.getElementById("startQuiz");
var questions = document.getElementById("questions");
var title = document.getElementById("title");
var options = document.getElementById("options");
var timeEl = document.getElementById("time");

//create object array of questions
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if/else statement is enclosed with:",
    options: ["quotes", "curly brackets", "paranthesis", "square brackets"],
    answer: "parenthesis",
  },
  {
    title: "Arrays in Javascript can be used to store:",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ___ when being assigned to variables",
    options: ["commas", "curly brackets", "quotes", "paranthesis"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool during development and debugging for printing content to the debugger is:",
    options: ["Javascript", "terminal/bash", "for loops", "console.log"],
    answer: "terminal/bash",
  },
];

//function 1: start quiz
//click button and then it unhides the fourth div, starts the time
//hides the div #3 which is the start screen
function startQuiz() {
  //hide start screen
  startel.setAttribute("class", "hide");
  //unhide the div regarding the question
  //call out the variable questions that have been called out on line 27 in html
  questions.removeAttribute("class");
  //start timer
  timerid = setInterval(clock, 1000);
}
function clock() {
  //update time
  time--;
  //show your starting time
  timeEl.textContent = time;
  createQuestions();
}
//for (let index = 0; index < array.length; index++) {
//const element = array[index];

//}

//function 2: create the questions and the buttons- processing the object array.
function createQuestions() {
  //get the question objects from the array (title, questions, etc)
  var questionTitle = questions[questionindex];
  //update the html with a question from the array
  title.textContent = questionTitle.title;
  //clear out the previous 'options'
  options.innerHTML = "";
  //loop through the option
  questionTitle.options.forEach(function (option, i) {
    //declare and make a button for each option
    var selection = document.createElement("button");
    selection.setAttribute("class", "option");
    selection.setAttribute("value", option);
    selection.textContent = i + 1 + ". " + option;
    //targeting a button (in line 82) in line 85 calling out the element of the button
    //to put on the dom (line 85)  and add event listener
    selection.onclick = answerKey;
    options.appendChild(selection);
    //the selection is being appended/displayed to the options
  });
}
//function 3: click button to do our logic of right/wrong and update timer
//runs out of time and run out of questions, if not, go to function 2
function answerKey() {
  //determining if user chose the wrong option; better to code for wrong
  if (this.value !== questions[questionindex].answer) {
    //penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
  }
  timeEl.textContent = time; 
  questionindex++;
  if (questionindex === questions.length) {
      finalDestiny();
  }   else {
      createQuestions();
  }
}

//function 4: game ends
startbtn.addEventListener("click", startQuiz);
