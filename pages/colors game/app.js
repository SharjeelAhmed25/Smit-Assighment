var colors = [
  "red",'blue','yellow','purpule','pink','green','aqua',
];

var maindiv = document.getElementById("main");
var scorespan = document.getElementById("scorespan");
var matchBox = document.getElementById("matchbox");
var score = 0;

scorespan.innerText = "Score: " + score;

function randomColor(){

  var randomindex = Math.floor(Math.random() * colors.length);
  return(randomindex)
      
}

function changecolor(){
  matchBox.style.backgroundColor = randomColor();

}

function randomColor(){
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// /* 🔁 Saare colors dubara change karne ka function */
function changeAllColors(){
  matchBox.style.backgroundColor = randomColor();

  var allBoxes = document.getElementsByClassName("box");
  for(var i = 0; i < allBoxes.length; i++){
    allBoxes[i].style.backgroundColor = randomColor();
  }
}

function handlecolor(event){
  var clickbox = event.target;

  if(clickbox.style.backgroundColor === matchBox.style.backgroundColor){
    score++;
    scorespan.innerText = "Score: " + score;

//     // ✅ match hone par colors change
    changeAllColors();
  }
  else if(score > 0){
 score--;
    scorespan.innerText = "Score: " + score;
  }
 
}

// /* initial match box color */
matchBox.style.backgroundColor = randomColor();
matchBox.style.borderRadius = "50%"

// /* boxes create karna */
for (var i = 1; i <= 14; i++) {
  var box = document.createElement("div");
  box.className = "box";
  box.style.borderRadius ="100%"
  box.style.backgroundColor = randomColor();
  box.style.width = "150px"
   box.style.height = "150px"
  box.addEventListener("click", handlecolor);
  maindiv.appendChild(box);
}


