const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text:"Berlin", correct:false},
            {text:"Madrid", correct:false},
            {text: "Paris", correct:true},
            {text: "Rome", correct:false}
        ],
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            {text:"Kalahari", correct:false},
            {text:"Gobi", correct:false},
            {text: "Antarctica", correct:false},
            {text: "Sahara", correct:true}
        ],
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            {text:"Asia", correct:false},
            {text:"Australia", correct:true},
            {text: "Arctic", correct:false},
            {text: "Africa", correct:false}
        ],
    },
    {
        question: "Who painted the Mona Lisa?", 
        answers: [
            {text:"Vincent van Gogh", correct:false},
            {text:"Pablo Picasso", correct:false},
            {text: "Leonardo da Vinci", correct:true},
            {text: "Claude Monet", correct:false}
        ]
    },
    {

        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {text:"Charles Dickens", correct:false},    
            {text:"Jane Austen", correct:false},
            {text: "William Shakespeare", correct:true},
            {text: "Mark Twain", correct:false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
quizOver = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}   

function resetState() {
    nextButton.style.display = "none";
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


nextButton.addEventListener("click", () => {
    if(quizOver) {
        startQuiz();
        quizOver = false;
        return;
    }

    if(currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
    else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    quizOver = true;
}

startQuiz();