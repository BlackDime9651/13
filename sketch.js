var PLAY = 1
var END = 0 
var gameState = PLAY
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var newImage;
var obstacle1, obstacle2, obstacle3, obstacle4
var obstacle5, obstacle6
var score = 0
var cloudsGroup, obstaclesGroup


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");  
  cloudImage = loadImage("cloud.png"); 
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;  
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
}

function draw() {
  background(180); 

  //play state
  if(gameState == PLAY){
    //increment score
    score = score + Math.round(frameCount/60)
    //trex jump condition
    if(keyDown("space") && trex.y>=160) {
      trex.velocityY = -10;
    }
    //adding gravity
    trex.velocityY = trex.velocityY + 0.8
    //resetting the ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //spawn the clouds
    spawnClouds();
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)){
      gameState = END    
    }
  }

  else if(gameState == END){
    ground.velocityX = 0
  }S

  text("score: " + score, 500,50)   
  //support for the trex
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 == 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime = 205
    cloudsGroup.add(cloud)
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function spawnObstacles(){
  if(frameCount % 60 == 0){
    var obstacle = createSprite (600,160,5,40)
    obstacle.velocityX = -6
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
        break;
      case 2: obstacle.addImage(obstacle2)
        break;
      case 3: obstacle.addImage(obstacle3)
        break;
      case 4: obstacle.addImage(obstacle4)
        break;
      case 5: obstacle.addImage(obstacle5)
        break;
      case 6: obstacle.addImage(obstacle6)
        break;
      default: break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 105
    obstaclesGroup.add(obstacle)
  }
}

