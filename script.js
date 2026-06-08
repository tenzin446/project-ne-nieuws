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
        question: "Welke AI-chatbot is gemaakt door OpenAI?",
        answer: [
            { text: "Gemini", correct: false },
            { text: "ChatGPT", correct: true },
            { text: "Alexa", correct: false },
            { text: "Siri", correct: false },
        ]
    },
    {
        question: "Welke AI-assistent is ontwikkeld door Google?",
        answer: [
            { text: "Siri", correct: false },
            { text: "Cortana", correct: false },
            { text: "Gemini", correct: true },
            { text: "Bixby", correct: false },
        ]
    },
    {
        question: "Welke AI-toepassing wordt gebruikt om gezichten op foto’s te herkennen?",
        answer: [
            { text: "Natural Language Processing", correct: false },
            { text: "Gezichtsherkenning", correct: true },
            { text: "Data Encryptie", correct: false },
            { text: "Augmented Reality", correct: false },
        ]
    },
    {
        question: "Waarom gebruiken bedrijven Artificial Intelligence voor data-analyse?",
        answer: [
            { text: "Om bestanden kleiner te maken", correct: false },
            { text: "Om beeldschermen scherper te maken", correct: false },
            { text: "Om batterijen langer mee te laten gaan", correct: false },
            { text: "Om sneller patronen en trends te ontdekken", correct: true },
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
