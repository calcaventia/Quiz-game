const questions = [
  {
    question: "What is the result of the expression '2' + 2 in JavaScript?",
    answers: [
      { text: "22", correct: true },
      { text: "4", correct: false },
      { text: "NaN", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "What is the scope of a variable defined with the 'let' keyword?",
    answers: [
      { text: "Global scope", correct: false },
      { text: "Function & Block scope", correct: true },
      { text: "ID scope", correct: false },
      { text: "Class scope", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'bind()' method in JavaScript?",
    answers: [
      { text: "To concatenate two or more strings", correct: false },
      { text: "To convert a function into a string", correct: false },
      { text: "To attach an event handler to an element", correct: false },
      { text: "To bind a function to a specific context", correct: true }
    ]
  },
  {
    question: "Javascript is an _______ language?",
    answers: [
      { text: "Object-Oriented", correct: true },
      { text: "Object-Based", correct: false },
      { text: "Procedural", correct: false },
      { text: "None Of The Above", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'reduce()' method in JavaScript?",
    answers: [
      { text: "To iterate over an array and execute a function on each element", correct: false },
      { text: "To filter out elements from an array based on a condition", correct: false },
      { text: "To sort the elements of an array in ascending order", correct: false },
      { text: "To reduce an array to a single value by applying an accumulator function", correct: true }
    ]
  },
  {
    question: "What is the output of the following code?\n\nconsole.log(0.1 + 0.2 === 0.3);",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true }
    ]
  },
  {
    question: "What is the purpose of the 'fetch()' function in JavaScript?",
    answers: [
      { text: "To validate the syntax of a JSON object", correct: false },
      { text: "To convert a JSON string into a JavaScript object", correct: false },
      { text: "To fetch data from a server using an HTTP request", correct: true },
      { text: "To create a copy of an existing JavaScript object", correct: false }
    ]
  },
  {
    question: "What is the result of the expression '5' - 3 in JavaScript?",
    answers: [
      { text: "8", correct: false },
      { text: "2", correct: true },
      { text: "NaN", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "What is the purpose of the 'querySelectorAll()' method in JavaScript?",
    answers: [
      { text: "To select the first element that matches a CSS selector", correct: false },
      { text: "To select all elements that match a CSS selector", correct: true },
      { text: "To select elements based on a specified attribute value", correct: false },
      { text: "To select elements based on their position in the DOM", correct: false }
    ]
  },
  {
    question: "What is the output of the following code?\n\nconsole.log(typeof NaN);",
    answers: [
      { text: "'number'", correct: true },
      { text: "'NaN'", correct: false },
      { text: "'undefined'", correct: false },
      { text: "'null'", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

let minutes = 3;
let seconds = 0;
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function startTimer() {
  const timerInterval = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      clearInterval(timerInterval);
      // Add your code to handle the end of the quiz here
    } else {
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      minutesElement.textContent = minutes.toString().padStart(2, "0");
      secondsElement.textContent = seconds.toString().padStart(2, "0");
    }
  }, 1000);
}

startTimer();

function resetTimer() {
  minutes = 3;
  seconds = 0;
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
  startTimer();
}


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next Question';
  showQuestion();
}



function showQuestion() {
  resetState();
  let  currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML  = answer.text;
    button.classList.add('btn');
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  })
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!';
  nextButton.innerHTML = 'Play Again!';
  nextButton.style.display = 'block';
}


function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
    resetTimer();
  }
})

startQuiz();
