let score = 0;
let currentQuestion = 0;
let hintCount = 0;
let maxHints = 3;
let previousQuestion = -1;
let questions = [
  {
    question: "What is the main ingredient in most types of bread?",
    a: "Rye",
    b: "Oats",
    c: "Flour",
    d: "Yeast",
    image: "quizimages/q1.jpg",
    answer: "c",
    },
    {
    question: "What is the difference between sourdough and regular bread?",
    a: "Sourdough uses a different type of yeast",
    b: "Sourdough is made with more sugar",
    c: "Sourdough uses a natural fermentation process",
    d: "Sourdough is made with more salt",
    image: "quizimages/q2.jpg",
    answer: "c",
    },
    {
    question: "What is the name of the process that makes bread rise?",
    a: "Baking",
    b: "Kneading",
    c: "Fermentation",
    d: "Proofing",
    image: "quizimages/q3.jpg",
    answer: "c",
    },
    {
    question: "Which ancient civilization is credited with inventing leavened bread?",
    a: "Ancient Egyptians",
    b: "Ancient Greeks",
    c: "Ancient Romans",
    d: "Ancient Chinese",
    image: "quizimages/q4.jpg",
    answer: "a",
    },
    {
    question: "What is the name of the traditional method for making sourdough bread?",
    a: "Sourdough starter",
    b: "Wild yeast",
    c: "Sourdough culture",
    d: "All of the above",
    image: "quizimages/q5.jpg",
    answer: "a",
    },
    {
    question: "What is the name of the process for shaping bread dough before baking?",
    a: "Kneading",
    b: "Proofing",
    c: "Scoring",
    d: "Shaping",
    image: "quizimages/q6.jpg",
    answer: "d",
    },
    {
    question: "What is the name of the type of bread that is made with a combination of wheat and rye flour?",
    a: "Pumpernickel",
    b: "Sourdough",
    c: "Rye bread",
    d: "Whole wheat",
    image: "quizimages/q7.jpg",
    answer: "a",
    },
    {
    question: "What is the name of the type of bread that is made with a combination of wheat, barley and rye?",
    a: "Pumpernickel",
    b: "Sourdough",
    c: "Rye bread",
    d: "Multigrain",
    image: "quizimages/q8.jpg",
    answer: "d",
    },
    {
    question: "What is the name of the type of bread that is made with only rye flour?",
    a: "Pumpernickel",
    b: "Sourdough",
    c: "Rye bread",
    d: "Whole wheat",
    image: "quizimages/q9.jpg",
    answer: "c",
    },
  {
    question:
      "What is the name of the elastic and sticky protein substance that gives bread its texture?",
    a: "protien",
    b: "pita",
    c: "flatbread",
    d: "gluten",
    image: "quizimages/q10.jpg",
    answer: "d",
  },
];

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

function loadQuestion() {
  // close light box for first question
  if (currentQuestion == 0) {
    closeLightBox();
  }

  // load the image
  let img = document.getElementById("image");
  img.src = questions[currentQuestion].image;
  img.style.maxWidth = "70vh";
  img.style.maxHeight = "80vh";

  // load the question and answers
  document.getElementById("question").innerHTML =
    questions[currentQuestion].question;
  document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
  document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
  document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
  document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
} // loadQuestion




//hint function
function hintBtn() {
  if(currentQuestion != previousQuestion){
  if(hintCount < maxHints){
  document.getElementById("hint").style.visibility = "visible";
  
  


  if (currentQuestion == 0) {
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: Its a powder like substance";
  }
  else if (currentQuestion == 1){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3:its the type of yeast used to make the bread rise ";
  }
  else if (currentQuestion == 2){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: the answer starts with an f ";
  }
  else if (currentQuestion == 3){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: its a middle eastern civilization";
  }
  else if (currentQuestion == 4){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3:_____ starter";
  }
  else if (currentQuestion == 5){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: shapes!";
  }
  else if (currentQuestion == 6){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: ____Nickel";
  }
  else if (currentQuestion == 7){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: it uses MULTIPLE grains";
  }
  else if (currentQuestion == 8){
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: its in the name";
  }
  else{
    document.getElementById("hint").innerHTML = "Hint " + (hintCount + 1) + "/3: Its a GLUEY substance";
  }
  
  hintCount++;
  }else{
  document.getElementById("hintbtn").style.backgroundColor = "#";
  document.getElementById("hintbtn").style.border = "10px solid #3f3d42";
  document.getElementById("hintbtn").style.color = "grey";
  }
  previousQuestion = currentQuestion;
  }
}


function markIt(ans) {
  let message = "";

  if (ans == questions[currentQuestion].answer) {
    // add 1 to score
    score++;

    // display score
    document.getElementById("score").innerHTML =
      score + " / " + questions.length;

    message = "Yay, correct! Your score is " + score + " / " + questions.length;
  } else {
    message =
      "Opps, incorrect! Your score is " + score + " / " + questions.length;
  } // else

  // move to the next question
  currentQuestion++;
  document.getElementById("hint").style.visibility = "hidden";
  if (currentQuestion >= questions.length) {
    // create a special message
    if (score === 10 || score === 9) {
      message =
        "You finished the quiz! Your score is " +
        score +
        " / " +
        questions.length +
        ". You're a smart one!";
    } else if (score === 8 || score === 7) {
      message =
        "You finished the quiz! Your score is " +
        score +
        " / " +
        questions.length +
        ". You did decent but you can still improve!";
    } else {
      message =
        "You finished the quiz! Your score is " +
        score +
        " / " +
        questions.length +
        ". try again you need practice";
    }
    //end of list
  } else {
    loadQuestion();
  }

  // show the lightbox
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").innerHTML = message;
} // markIt

function closeLightBox() {
  document.getElementById("lightbox").style.display = "none";
} // closeLightbox

const closeBtn = document.getElementById("close-btn");
const lightbox = document.getElementById("lightbox");
const result = document.getElementById("result");

function showLightbox(text) {
    result.innerHTML = text;
    lightbox.style.display = "block";
}

function hideLightbox() {
    lightbox.style.display = "none";
}

closeBtn.addEventListener("click", hideLightbox);

// Show the lightbox when the user answers a question
document.getElementById("answer-btn").addEventListener("click", function() {
    showLightbox("Correct!");
});
