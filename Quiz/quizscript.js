const QUESTIONS = [
  {
    question: "En quelle année Google a-t-il été lancé sur le web ?",
    answers: [1998, 1990, 1899],
    correctAnswer: 1998,
  },
  {
    question:
      "Quel est le nom du réseau d'ordinateurs à partir duquel l'Internet a émergé ?",
    answers: ["JANET", "Arpanet", "Wikipedia"],
    correctAnswer: "Arpanet",
  },
  {
    question: "Qui a été la première personne à marcher sur la lune ?",
    answers: ["Neil Armstrong", "Virgil Grissom", "James Lovell"],
    correctAnswer: "Neil Armstrong",
  },
  {
    question: "Que vaut:  3 + 0 * 5 - 2 ?",
    answers: [13, 6, 1],
    correctAnswer: 1,
  },
  {
    question: "Quel fruit a le même nom qu'un animal ?",
    answers: ["kiwi", "Murène banane", "Ascidia roja"],
    correctAnswer: "kiwi",
  },
  {
    question: "Combien de minutes dure un match de rugby ?",
    answers: [90, 75, 80],
    correctAnswer: 80,
  },
  {
    question: "Quel est le numéro de la maison des Simpson ?",
    answers: [720, 742, 801],
    correctAnswer: 742,
  },
  {
    question: " Qui a joué Harry Potter dans Harry Potter  ?",
    answers: ["Rupert Grint", "Alan Rickman", "Daniel Radcliffe"],
    correctAnswer: "Daniel Radcliffe",
  },
];

QUESTIONS.sort(() => Math.random() - 0.2);
let correctAnswer = [];
let jq = $.noConflict();
jq(document).ready(function () {
  for (i in QUESTIONS) {
    if (i < 5) {
      let div = jq(`<div id="question${i}"></div>`);
      let paragraph = jq(`<p> ${QUESTIONS[i].question} </p>`);
      let p = jq(`<p id="answer${i}"></p>`);

      jq("#quiz").append(div);
      jq(`#question${i}`).append(paragraph);
      jq(`#question${i}`).append(p);
      for (j in QUESTIONS[i].answers) {
        let input = jq(
          `<input type="radio" id="answers${i}${j}" value="${QUESTIONS[i].answers[j]}" name="answers${i}">
          <label for="answers${i}${j}">
           ${QUESTIONS[i].answers[j]}</label><br>`
        );
        jq(`#answer${i}`).append(input);
        if (QUESTIONS[i].answers[j] == QUESTIONS[i].correctAnswer) {
          correctAnswer.push([`answers${i}${j}${QUESTIONS[i].answers[j]}`]);
        }
      }
    }
  }

  let score = 0;
  jq("input[type=radio]").on("change", function () {
    let userAnswer = this.id + this.value;
    let answer = checkAnswer(correctAnswer, userAnswer);
    if (answer !== "") {
      jq(`#${this.id}`)
        .parent()
        .parent()
        .css({ border: "solid 5px green", "border-radius": "10px" });
      jq(`#${this.id}`).siblings().attr("disabled", "true");
      score += 1;
      jq("#score").text("Score: " + score);
    } else {
      jq(`#${this.id}`)
        .parent()
        .parent()
        .css({ border: "solid 5px red", "border-radius": "10px" });
      jq(`#${this.id}`).siblings().attr("disabled", "true");
    }
  });
});

function checkAnswer(correctAnswerArray, userAnswer) {
  let answer = "";
  correctAnswerArray.forEach((element) => {
    for (let i in element) {
      if (element[i] === userAnswer) answer = "correct";
    }
  });
  return answer;
}
