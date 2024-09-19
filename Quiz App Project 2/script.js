// Selecting HTML elements
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alertBox = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timerBox = document.querySelector('.timer');

// Quiz data
const quizData = [
  {
    question: "Q. What is the primary function of the var keyword in JavaScript?",
    choices: ["To declare a constant variable", "To import a module", "To declare a function", "To declare a variable"],
    answer: "To declare a variable"
  },
  {
    question: "Q. Which of the following is a valid way to declare a string in JavaScript?",
    choices: ["let name = 'John';", "let name = \"John\";", "let name = John;", "let name = \"John';"],
    answer: "let name = 'John'; or let name = \"John\";"
  },
  {
    question: "Q. What is the purpose of the if statement in JavaScript?",
    choices: ["To loop through an array", "To declare a variable", "To execute a block of code if a condition is true", "To import a module"],
    answer: "To execute a block of code if a condition is true"
  },
  {
    question: "Q. Which of the following is a valid way to declare an object in JavaScript?",
    choices: ["let person = {'name': 'John', 'age': 30};", "let person = \"name\": \"John\", \"age\": 30;", "let person = ['name', 'John', 'age', 30];", "let person = {'name', 'John', 'age', 30};"],
    answer: "let person = {'name': 'John', 'age': 30};"
  },
  {
    question: "Q. What is the purpose of the while loop in JavaScript?",
    choices: ["To execute a block of code if a condition is true", "To declare a variable", "To loop through an array", "To execute a block of code while a condition is true"],
    answer: "To execute a block of code while a condition is true"
  },
  {
    question: "Q. Which of the following is a valid way to declare a function in JavaScript?",
    choices: ["function greet(name) { console.log('Hello, ' + name); }", "let greet = function(name) { console.log('Hello, ' + name); };", "let greet = (name) => { console.log('Hello, ' + name); };", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Q. What is the purpose of the `let` keyword in JavaScript?",
    choices: ["To declare a constant variable", "To declare a variable that can be reassigned", "To declare a function", "To declare a variable that cannot be reassigned"],
    answer: "To declare a variable that can be reassigned"
  },
  {
    question: "Q. What is the purpose of the switch statement in JavaScript?",
    choices: ["To execute a block of code if a condition is true", "To declare a variable", "To execute a block of code based on the value of a variable", "To import a module"],
    answer: "To execute a block of code based on the value of a variable"
  },
  {
    question: "Q. Which of the following is a valid way to use the break statement in JavaScript?",
    choices: ["To exit a loop", "To declare a variable", "To execute a block of code if a condition is true", "To import a module"],
    answer: "To exit a loop"
  },
  {
    question: "Q. Which of the following is a valid way to declare an array in JavaScript?",
    choices: ["let colors = ['red', 'green', 'blue'];", "let colors = \"red\", \"green\", \"blue\";", "let colors = {'red', 'green', 'blue'};", "let colors = {'red': 1, 'green': 2, 'blue': 3};"],
    answer: "let colors = ['red', 'green', 'blue'];"
  }
];

// Global variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 20;
let timerId = null;

// Function to display questions
const displayQuestion = () => {
  const currentQuestion = quizData[currentQuestionIndex];
  questionBox.textContent = currentQuestion.question;

  choicesBox.textContent = "";
  currentQuestion.choices.forEach((choice) => {
    const choiceDiv = document.createElement('div');
    choiceDiv.textContent = choice;
    choiceDiv.classList.add('choice');
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener('click', () => {
      if (choiceDiv.classList.contains('selected')) {
        choiceDiv.classList.remove('selected');
      } else {
        choiceDiv.classList.add('selected');
      }
    });
  });

  if (currentQuestionIndex < quizData.length) {
    startTimer();
  }
};

// Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if (selectedChoice.textContent === quizData[currentQuestionIndex].answer) {
    displayAlert("Correct Answer!");
    score++;
  } else {
    displayAlert(`Wrong Answer! ${quizData[currentQuestionIndex].answer} is the Correct`);
  }

  timeLeft = 20;
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    displayScore();
    stopTimer();
  }
};

// Function to display score
const displayScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quizData.length}!`;
  displayAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timerBox.style.display = "none";
};

// Function to display alert
const displayAlert = (message) => {
  alertBox.style.display = "block";
  alertBox.textContent = message;
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 2000);
};

// Function to start timer
const startTimer = () => {
  clearInterval(timerId);
  timerBox.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerBox.textContent = timeLeft;
    if (timeLeft === 0) {
      const confirmUser = confirm("Time up! Do you want to play the quiz again");
      if (confirmUser) {
        timeLeft = 20;
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
        return;
      }
    }
  }, 1000);
};

// Function to stop timer
const stopTimer = () => {
  clearInterval(timerId);
};

// Function to shuffle questions
const shuffleQuestions = () => {
  for (let i = quizData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
  }
  currentQuestionIndex = 0;
  displayQuestion();
};

// Function to start quiz
const startQuiz = () => {
  timeLeft = 20;
  timerBox.style.display = "flex";
  shuffleQuestions();
};

// Event listener for start button
startBtn.addEventListener('click', () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if (!selectedChoice && nextBtn.textContent === "Next") {
    displayAlert("Please select an answer!");
    return;
  }
  if (selectedChoice && selectedChoice.textContent === "") {
    displayAlert("Please select a valid answer!");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});