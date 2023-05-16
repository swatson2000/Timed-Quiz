const questions = [
      {
        question: "which is a variable that cannot be modified?",
        answers: [
            {text: "var", correct: false},
            {text: "const", correct: true},
            {text: "function", correct: false},
            {text: "div", correct: false},
                 ]
      },
      {
        question: "Inside which HTML element do we put the Javascript?",
        answers: [
            {text: "javascript", correct: false},
            {text: "js", correct: false},
            {text: "script", correct: true},
            {text: "scripting", correct: false},
                 ]
      },
      {
        question: "How does a FOR loop star?",
        answers: [
            {text: "for (i<=5;i++)", correct: false},
            {text: "for i=1 to 5", correct: false},
            {text: "for (i=0;i<=5)", correct: false},
            {text: "for(i=0;i<=5;i++)", correct: true},
                 ]
      },
      {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            {text: "Math.ceil(x,y)", correct: false},
            {text: "top(x,y)", correct: false},
            {text: "Math.max(x,y)", correct: true},
            {text: "ceil(x,y)", correct: false},
                 ]
      },
      {
        question: "How do you round the number 7.25 to the nearest integer?",
        answers: [
            {text: "Math.round(7.25)", correct: true},
            {text: "round(7.25)", correct: false},
            {text: "rnd(7.25)", correct: false},
            {text: "Math.rnd(7.25)", correct: false},
        ]
      },  
                  ];     

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const submitButton = document.getElementById("submit-btn");
const timerElement = document.getElementById("timer");
const toLeaderboard = document.getElementById("show-leaderboard");


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let leaderboardData = [];

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    submitButton.innerHTML = "Submit";
    showQuestion();
    startTimer();
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  if (timeLeft <= 0) {
      clearInterval(timer);
      showScore();
      
  
  }
}


function stopTimer() {
  timeLeft = 20;
  timer = 0;
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


currentQuestion.answers.forEach(answer => {
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answerButtons.appendChild(button);
  if(answer.correct){
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);

});
}

function resetState(){
  submitButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);   
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  submitButton.style.display = "block";
  }



function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  submitButton.innerHTML = "Play Again";
  submitButton.style.display = "block";

  var playerName = 'promt("Enter your name:");'
  var entry = {
    name: playerName, // You can change this to retrieve the name from the user
    score: score,
  };
  leaderboardData.push(entry); // Add the entry to the leaderboard data array
localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
}




  function handleSubmitButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
      showQuestion();
    }else{
      showScore();
      
      
      }
      
    }

  
submitButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleSubmitButton();
  }else{
    startQuiz();
    
  
  }
})
function showLeaderboard() {
    window.location.href = "leaderboard.html";
    localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
}



  toLeaderboard.addEventListener("click", ()=>{
   showLeaderboard();
  });

 startQuiz();