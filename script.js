// Quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Rhino"],
    answer: "Blue Whale",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "Python", "C", "JavaScript"],
    answer: "JavaScript",
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load selections from sessionStorage if available
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuiz() {
  questionsDiv.innerHTML = "";
  quizData.forEach((q, qIndex) => {
    const questionContainer = document.createElement("div");

    const qTitle = document.createElement("p");
    qTitle.textContent = `${qIndex + 1}. ${q.question}`;
    questionContainer.appendChild(qTitle);

    q.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${qIndex}`;
      radio.value = opt;

      // Restore checked state from sessionStorage
      if (progress[qIndex] === opt) {
        radio.checked = true;
      }

      // Save progress on change
      radio.addEventListener("change", () => {
        progress[qIndex] = opt;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionContainer);
  });
}

// Calculate and display score
function submitQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    if (progress[i] && progress[i] === q.answer) {
      score++;
    }
  });

  const finalScoreText = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = finalScoreText;

  // Save score to localStorage
  localStorage.setItem("score", score.toString());
}

// Load score from localStorage if already submitted
function loadFinalScore() {
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
  }
}

// Event listeners
submitBtn.addEventListener("click", submitQuiz);

// Initial render
renderQuiz();
loadFinalScore();
