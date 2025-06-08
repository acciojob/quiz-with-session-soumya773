const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
      "Hyperlink Machine Language"
    ],
    answer: 0
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: 1
  },
  {
    question: "Which of the following is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Laravel"],
    answer: 3
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
