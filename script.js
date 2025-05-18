const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is the largest mammal?",
    choices: ["Elephant", "Giraffe", "Blue Whale", "Rhino"],
    answer: "Blue Whale"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "Python", "C", "JavaScript"],
    answer: "JavaScript"
  }
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Load previous progress if available
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render quiz questions
function renderQuiz() {
  questionsDiv.innerHTML = "";

  quizData.forEach((q, qIndex) => {
    const container = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = q.question;
    container.appendChild(qText);

    q.choices.forEach((choice, cIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `q${qIndex}`;
      radio.value = choice;

      if (progress[qIndex] === choice) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        progress[qIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(container);
  });
}

// Submit quiz and store score
function submitQuiz() {
  let score = 0;

  quizData.forEach((q, i) => {
    if (progress[i] && progress[i] === q.answer) {
      score++;
    }
  });

  const resultText = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = resultText;
  localStorage.setItem("score", score.toString());
}

// Load score from localStorage if already submitted
function loadPreviousScore() {
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
  }
}

submitBtn.addEventListener("click", submitQuiz);

renderQuiz();
loadPreviousScore();
