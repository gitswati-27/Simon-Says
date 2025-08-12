let gameSeq=[];
let userSeq=[];

let keys = ['key1', 'key2', 'key3', 'key4', 'key5', 'key6', 'key7', 'key8', 'key9']

let acceptingInput = false;
let started = false;
let level = 0;
let score = document.querySelector('#score');
let highScore = 0;

let h2 = document.querySelector("h2");
let glass = document.querySelector(".tablet");

document.addEventListener("keypress", function(){
    if (started==false){
        console.log("Game has started!");
        glass.style.height = '575px';
        started = true;
        levelUp();
    }
});

async function levelUp(){
    level++;
    h2.innerText = `Level ${level}`;
    let randInd = Math.floor(Math.random()*keys.length);
    let randKey = keys[randInd];
    gameSeq.push(randKey);
    //let randBtn = document.querySelector(`#${randKey}`);
    acceptingInput = false;           
    await gameSeqFlash(gameSeq);
    acceptingInput = true;         
    userMove();
    console.log(gameSeq);
    //console.log(userSeq);
    //Flash(randBtn);
}

function userMove(){
    // let clicks = 0;
    userSeq = [];
    // while(clicks!=gameSeq.length){
    //     let key = keyPress();
    //     userSeq.push(key);
    //     clicks++;
    // }
    // checkAns(userSeq,gameSeq);
}

function Flash(btn){
    return new Promise((resolve,reject)=>{
        btn.classList.add("flash");
        setTimeout(function(){
            btn.classList.remove("flash");
            resolve();
        },250);
        
    });
}

function userFlash(btn){
    return new Promise((resolve,reject)=>{
        btn.classList.add("userFlash");
        setTimeout(function(){
            btn.classList.remove("userFlash");
            resolve();
        },250);
        
    });
}



async function gameSeqFlash(gameSeq){
    for (key of gameSeq){
        let randBtn = document.querySelector(`#${key}`);
        await Flash(randBtn);
        await new Promise(res => setTimeout(res, 150)); //ek flash aur dusre flash ke beech ka duration so that single key par consecutive flashes are clearly differentiated
    }
}

function keyPress(event){
    if (!acceptingInput) return; 
    let key = this;
    userFlash(key);
    //let clicks = 1;
    //userSeq = [];
    //while(clicks != gameSeq.length){
     //   userKey = key.getAttribute("id");
     //   userSeq.push(userKey);
     //   clicks++;
   // }

    let userKey = key.getAttribute("id");
    //console.log(userKey);
    userSeq.push(userKey);
    let curSize = userSeq.length - 1;
    checkAns(userSeq,gameSeq,curSize);
}

function flashAll(keys){
    for(key of keys){
        let btn = document.querySelector(`#${key}`);
        Flash(btn);
    }
}

function checkAns(userSeq,gameSeq,curSize){
    if (userSeq[curSize] !== gameSeq[curSize]) {
        acceptingInput = false;
        glass.style.height = '605px';
        flashAll(keys);
        h2.innerHTML = `Game Over! Your score was <span style="color: red">${level-1}</span>. <br> Press any key to start.`;
        if(level-1>highScore){
            highScore = level-1;
            score.innerHTML = `Highest Score : ${highScore}`;
        }
        document.body.style.background = 'url("bgrev.jpg") center center / cover no-repeat';
        setTimeout(() => document.body.style.background = 'url("bg4.jpg") center center / cover no-repeat', 500);
        reset();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        acceptingInput = false;
        setTimeout(levelUp, 1000);
    }
}

// function Equal(userSeq, gameSeq) {
//     return userSeq.length === gameSeq.length &&
//            userSeq.every((val, index) => val === gameSeq[index]);
// }


let allKeys = document.querySelectorAll(".key");
for (key of allKeys){
    key.addEventListener("click", keyPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq=[];
    level = 0;
}