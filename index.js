const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')
const sky = document.querySelector('.sky')

let birdLeft = 220
let birdBottom = 200
let gravity = 2;
let isGameOver = false;   
let gap = 450;


function startGame(){

    birdBottom -= gravity;

    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
    

    
}
 

let gameTimerId = setInterval(startGame, 20)


document.addEventListener('keyup', control);

function control(e){

    if(e.keyCode === 32){
        birdUp();
    }

}

function birdUp(){
    if(birdBottom < 500) birdBottom += 50;

    bird.style.bottom = birdBottom + 'px';
    // console.log(birdBottom)
    
}

function generateObstracle(){
    let obstracleLeft = 800;
    let randomHeight = Math.random() * 60; 
    let obstracleBottom = randomHeight;
    const obstracle = document.createElement('div');
    const topObstracle = document.createElement('div');

    if (! isGameOver){
        obstracle.classList.add('obstracle');
        topObstracle.classList.add('topObstracle');
    }    

    gameDisplay.appendChild(obstracle)
    gameDisplay.appendChild(topObstracle)
    obstracle.style.left = obstracleLeft + 'px'
    topObstracle.style.left = obstracleLeft + 'px'
    obstracle.style.bottom = obstracleBottom + 'px'
    topObstracle.style.bottom = obstracleBottom + gap + 'px' 

    function moveObstracle(){
        obstracleLeft -= 2;
        obstracle.style.left = obstracleLeft + 'px'
        topObstracle.style.left = obstracleLeft + 'px'

        if(obstracleLeft === -50){
            clearInterval(timeId);
            gameDisplay.removeChild(obstracle);
            gameDisplay.removeChild(topObstracle);
        }

        if((obstracleLeft > 180 && obstracleLeft < 280 && birdLeft === 220 &&  ((birdBottom < obstracleBottom + 153) || (birdBottom > obstracleBottom + gap - 180))) || 
            birdBottom === 0){
            
            gameOver();
            clearInterval(timeId)
        }
    }

    let timeId = setInterval(moveObstracle, 20)
    if (! isGameOver) setTimeout(generateObstracle, 3000)
}



generateObstracle()

function gameOver(){
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
}
