var player, playerAnimation, playerJumping, playerImg;
var ground, invisibleGround, groundImg, ground2, invisibleGround2, groundImg2, groundImg3,ground3,ground4,ground4Img;
var policeGun, policeGunImg;
var bullet, bulletImg, bulletGroup;
var score=0
var wheel,wheelA,wheel1;
var reset;
var Play, End;
var gameState = "Play"
//var bg;
var death;
var shotS;
var bGMusic;

function preload(){
  playerAnimation=loadAnimation("p1.png","p2.png");
  playerJumping=loadAnimation("jumping.png");
  playerImg = loadAnimation("shot.png");
  groundImg=loadImage("ground.png");
  policeGunImg=loadImage("rpk.png");
  bulletImg=loadImage("bullet.png");
  wheelA=loadAnimation("2.png","3.png","4.png")
  //bg=loadImage("bg.jpg");
  death=loadSound("death.mp3");
  shotS=loadSound("shot.mp3");
  bGMusic=loadSound("BG.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
   
   
   ground=createSprite(400,450,10000,100);
   ground.addImage(groundImg);
   ground2=createSprite(900,450,10000,100);
   ground2.addImage(groundImg);
   ground3=createSprite(1400,450,10000,100);
   ground3.addImage(groundImg);
   ground4=createSprite(1900,450,10000,100);
   ground4.addImage(groundImg);
   ground.velocityX=-8;
   ground2.velocityX=-8;
   ground3.velocityX=-8;
   ground4.velocityX=-8;

   bulletGroup = new Group ();
   
   reset=createImg("reset.png");
   reset.position(1300,20);
   reset.size(50,50);
   reset.mouseClicked(redo);



   invisibleGround=createSprite(800,460,100000,100);
   invisibleGround.visible=false;
 
   policeGun=createSprite(200,330,10,10);
   policeGun.addImage(policeGunImg);

   wheel=createSprite(320,380,10,10);
   wheel.scale=0.2
   wheel.addAnimation("wheelRotation",wheelA);

   wheel1=createSprite(125,395,10,10);
   wheel1.scale=0.2
   wheel1.addAnimation("wheelRotation",wheelA);


   player=createSprite(1000,450,10,10);
   player.addAnimation("running",playerAnimation);
   player.addAnimation("jumping",playerJumping);
   player.addAnimation("dead",playerImg);
  
   
}

function draw() {
background("red");
bGMusic.play();
bGMusic.setVolume(0.5);
 
if (gameState=="Play"){

  if(frameCount%150==0){
 
    bullet=createSprite(410,320,2,2);
    bullet.addImage(bulletImg);
    bullet.velocityX=5+score/10;
    bullet.scale=0.5
    bulletGroup.add(bullet);
    shotS.play();
   }
   if(keyIsDown(32) && player.y<=450 && player.y>=300 ){
    player.velocityY=-15
    score=score+1
   }
   
   if(player.y<150){
      player.changeAnimation("jumping",playerJumping);
    }
   if(player.y>300){
      player.changeAnimation("running",playerAnimation);
   }
  if(ground2.x<400){
    ground2.x=ground2.x+ground2.width/2
  }
  if(ground.x<0){
    ground.x=ground.x+ground.width/2
  }
  if(ground3.x<800){
    ground3.x=ground3.x+ground3.width/2
  }
  if(ground4.x<1200){
    ground4.x=ground4.x+ground4.width/2
    invisibleGround.x=invisibleGround.x
  }
  
  player.velocityY+=0.4;
}




 if(bulletGroup.isTouching(player)){
   
  gameState="End"

 }

 if(gameState==="End"){
  ground.velocityX=0;
  ground2.velocityX=0;
  ground3.velocityX=0;
  ground4.velocityX=0;
  player.changeAnimation("dead");
  player.y=400
  player.scale=0.5
  death.play();
  bGMusic.stop();
}



player.collide(invisibleGround);

drawSprites();
}

function redo(){
  window.location.reload();
}