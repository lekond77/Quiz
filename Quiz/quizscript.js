const QUESTIONS = [
  {
    question: "En quelle année Google a-t-il été lancé sur le web ?",
    answers: [1998, 1990, 1899],
    correctAnswer: "1998",
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
    correctAnswer: "1",
  },
  {
    question: "Quel fruit a le même nom qu'un animal ?",
    answers: ["kiwi", "Murène banane", "Ascidia roja"],
    correctAnswer: "kiwi",
  },
  {
    question: "Combien de minutes dure un match de rugby ?",
    answers: [90, 75, 80],
    correctAnswer: "80",
  },
  {
    question: "Quel est le numéro de la maison des Simpson ?",
    answers: [720, 742, 801],
    correctAnswer: "742",
  },
  {
    question: " Qui a joué Harry Potter dans Harry Potter  ?",
    answers: ["Rupert Grint", "Alan Rickman", "Daniel Radcliffe"],
    correctAnswer: "Daniel Radcliffe",
  },
  {
    question: "Quelle est la capitale de la France?",
    answers: ["Paris", "Londres", "Berlin"],
    correctAnswer: "Paris",
  },
  {
    question: "Combien y a-t-il de pays dans l'Union Européenne?",
    answers: ["27", "28", "30"],
    correctAnswer: "27",
  },
];

QUESTIONS.sort(() => Math.random() - 0.2);

let jq = $.noConflict();
//let correctAnswer = [];
let questions = [];

jq(document).ready(function () {
  let questionParagraph = jq("#question");
  let answerParagraph = jq("#answers");
  let currentQuestion = 0;

  //Choose five questions
  function chooseQuestions() {
    for (i in QUESTIONS) if (i < 2) questions.push(QUESTIONS[i]);

    return questions;
  }

  let quiz = chooseQuestions();

  function displayQuestion() {
    //retrieve the current question
    const question = quiz[currentQuestion];

    // display current question

    questionParagraph.html(question.question);

    // display choices
    let input = "";
    let j = 0;

    for (const choice of question.answers) {
      input += `<input type="radio" id="choice${currentQuestion}${j}" name="choice${currentQuestion}" value="${choice}">
        <label for="choice${currentQuestion}${j}">
         ${choice}</label><br>`;
      j++;
    }
    answerParagraph.html(input);
  }

  // Display border none for next question
  function displayNone(id) {
    jq(id).parent().parent().css({
      border: "none",
    });
  }

  let score = 0;
  function checkAnswer(event) {
    // checks if the clicked button is the correct answer
    if (event.target.value === quiz[currentQuestion].correctAnswer) {
      jq(`#${event.target.id}`).parent().parent().css({
        border: "solid 2px green",
      });
      jq(`#${event.target.id}`).siblings("input").attr("disabled", "true");

      score += 1;
      jq("#score").text("Score: " + score);
      setTimeout(displayNone, 1500, `#${event.target.id}`);
    } else {
      jq(`#${event.target.id}`)
        .parent()
        .parent()
        .css({ border: "solid 2px red", "border-radius": "10px" });
      jq(`#${event.target.id}`).siblings("input").attr("disabled", "true");
      setTimeout(displayNone, 1500, `#${event.target.id}`);
    }

    currentQuestion++;
    // check if the quiz is completed
    if (currentQuestion === quiz.length) {
      setTimeout(function () {
        alert("Votre sccore est : " + score + " / " + quiz.length);
        let button = jq(
          '<button onclick="location.reload();">Jouer de nouveau</button>'
        );
        jq("body").append(button);
      }, 300);
    } else {
      // following question in 1.5 second
      setTimeout(displayQuestion, 1500);
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.matches("input[type=radio]")) {
      checkAnswer(event);
    }
  });

  displayQuestion();
});
