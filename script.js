 const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    answer: 2
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitBtn = document.getElementById("submit");

function renderQuiz() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  questionsContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option, optIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = optIndex;
      if (progress[`question-${index}`] == optIndex) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        saveProgress(index, optIndex);
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });

  // Show stored score if available
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
}

function saveProgress(qIndex, optIndex) {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  progress[`question-${qIndex}`] = optIndex;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

submitBtn.addEventListener("click", () => {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[`question-${index}`] == q.answer) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

window.onload = renderQuiz;
