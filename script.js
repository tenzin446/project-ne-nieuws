const questions = [
    {
        question: "Waar staat AI voor?",
        answer: [
            { text: "Automated Internet", correct: false },
            { text: "Artificial Intelligence", correct: true },
            { text: "Advanced Information", correct: false },
            { text: "Automatic Input", correct: false },
        ]
    },
    {
        question: "Welke AI wordt veel gebruikt om teksten te genereren?",
        answer: [
            { text: "Photoshop", correct: false },
            { text: "ChatGPT", correct: true },
            { text: "Excel", correct: false },
            { text: "Spotify", correct: false },
        ]
    },
    {
        question: "Wat kan AI doen?",
        answer: [
            { text: "Alleen rekenen", correct: false },
            { text: "Alleen muziek afspelen", correct: false },
            { text: "Leren van data en voorspellingen maken", correct: true },
            { text: "Alleen internet gebruiken", correct: false },
        ]
    },
    {
        question: "Welke van deze is een voorbeeld van AI in het dagelijks leven?",
        answer: [
            { text: "YouTube-aanbevelingen", correct: true },
            { text: "Een papieren boek", correct: false },
            { text: "Een lamp", correct: false },
            { text: "Een tafel", correct: false },
        ]
    },
    {
        question: "Wat is een mogelijk nadeel van AI?",
        answer: [
            { text: "Het gebruikt teveel stroom", correct: false },
            { text: "Privacyproblemen en verkeerde informatie", correct: true },
            { text: "Het slaat data op", correct: false },
            { text: "Het maakt soms fouten", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

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

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();

    questionElement.innerHTML = `Je score is ${score} van de ${questions.length}!`;

    nextButton.innerHTML = "Opnieuw";

    nextButton.style.display = "block";

    nextButton.onclick = () => {
        startQuiz();
    };
}

startQuiz();
