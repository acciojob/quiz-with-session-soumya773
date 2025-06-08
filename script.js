const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1,
  },
  {
    question: "Which ocean is the largest?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    answer: 2,
  },
];

const questionContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let savedAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render questions
questions.forEach((q, qIndex) => {
  const div = document.createElement("div");
  const questionText = document.createElement("p");
  questionText.innerText = q.question;
  div.appendChild(questionText);

  q.choices.forEach((choice, choiceIndex) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${qIndex}`;
    input.value = choice;
    input.dataset.qIndex = qIndex;
    input.dataset.choiceIndex = choiceIndex;

    // Restore previous selection
    if (savedAnswers[qIndex] === choiceIndex) {
      input.setAttribute("checked", "true"); // Cypress expects this
      input.checked = true;
    }

    input.addEventListener("change", () => {
      savedAnswers[qIndex] = choiceIndex;
      sessionStorage.setItem("progress", JSON.stringify(savedAnswers));
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
  });

  questionContainer.appendChild(div);
});

// Submit button
submitBtn.addEventListener("click", () => {
  let score = 0;
  savedAnswers.forEach((choiceIndex, i) => {
    if (choiceIndex === questions[i].answer) {
      score++;
    }
  });

  const message = `Your score is ${score} out of 5.`;
  scoreDiv.innerText = message;
  localStorage.setItem("score", score.toString());
});
