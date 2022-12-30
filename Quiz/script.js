$(document).ready(function () {
  let script = document.createElement("script");
  script.src = "quizscript.js";
  document.body.appendChild(script);
  script.id = "invisible";
  $("#invisible").remove();
});
