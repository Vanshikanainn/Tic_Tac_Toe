let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO = true;  //playerX,playerO
const winPatterns=[
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
];

const resetGame=()=>{
  turnO=true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// disable all boxes
const disableBoxes=()=>{
  for(let box of boxes){
    box.disabled=true;
  }
};

// enable all boxes (reset state)
const enableBoxes=()=>{
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
    box.classList.remove("win");  // clear highlight if any
  }
};

const showWinner=(winner,pattern)=>{
  msg.innerText=`🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  // highlight winning boxes
  pattern.forEach((index)=>{
    boxes[index].classList.add("win");
  });

  disableBoxes();
};

// 👇 NEW: show draw
const showDraw=()=>{
  msg.innerText="😐 It's a Draw!";
  msgContainer.classList.remove("hide");
};

const checkWinner=()=>{
  for(let pattern of winPatterns){
    let pos1Val=boxes[pattern[0]].innerText;
    let pos2Val=boxes[pattern[1]].innerText;
    let pos3Val=boxes[pattern[2]].innerText;

    if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
      if(pos1Val==pos2Val && pos2Val==pos3Val){
        console.log("Winner "+pos1Val); 
        showWinner(pos1Val,pattern);
        return;
      }
    }
  }

  // 👇 check draw if no winner
  let allFilled=true;
  boxes.forEach((box)=>{
    if(box.innerText===""){
      allFilled=false;
    }
  });

  if(allFilled){
    showDraw();
  }
};

boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
    console.log("Box was clicked");
    if(turnO==true){
      box.innerText="O";   // better than "0"
      box.style.color="blue"; // optional color
      turnO=false;
    }else{
      box.innerText="X";
      box.style.color="red";  // optional color
      turnO=true;
    }
    box.disabled=true;
    checkWinner();
  });
});

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
