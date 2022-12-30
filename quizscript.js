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
    question: "Que font 3 + 0 * 5 - 2 ?",
    answers: [13, 6, 1],
    correctAnswer: 1,
  },
  {
    question: "Quel fruit a le même nom qu'un animal ?",
    answers: ["kiwi", "Murène banane", "Ascidia roja"],
    correctAnswer: "kiwi",
  },
];

function isEqual(a, b) {
  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  return a === b;
}

QUESTIONS.sort(() => Math.random() - 0.5);
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
