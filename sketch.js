let snake;
let rez = 10;
let height = 200;
let width = 300;
let w = width / rez;
let h = height / rez;
let size = 10 / rez;
let textsize = 30 / rez;
let frameSpeed = 10;
let play = false;
let arrow_keys_handler = function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	e.preventDefault();
    }
};
function setup() {
    var canvas = createCanvas(width, height);
    canvas.parent("snake").mouseClicked(reset);

    frameRate(frameSpeed);
    snake = new Snake();
    textSize(textsize);
    textAlign(CENTER, CENTER);
    noLoop();
}

function keyPressed() {
    switch(keyCode){
    case UP_ARROW:
	snake.setDir(createVector(0,-1));
	break;

    case DOWN_ARROW:
	snake.setDir(createVector(0,1));
	break;

    case LEFT_ARROW:
	snake.setDir(createVector(-1,0));
	break;

    case RIGHT_ARROW:
	snake.setDir(createVector(1,0));
	break;
    }
}
function reset(){
    play = true;
    snake = new Snake();
    loop();
}
function draw() {
    background(220);
    scale(rez);

    if (play)
    {

        window.addEventListener("keydown", arrow_keys_handler, false);

        if (snake.eat())
        {
                snake.grow();
                frameSpeed ++;
                frameRate(frameSpeed);
                snake.makeFood();
        }

        snake.move();
        snake.show();
        snake.showFood();
        if (snake.end())
        {
            background(102,203,140);
            text('You lose !\n' + 'score = ' + snake.score, w / 2, w /2);
            noLoop();
            window.removeEventListener("keydown", arrow_keys_handler, false);
            play = false;
        }
    }
}
