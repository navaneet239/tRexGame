var END = 1;
var PLAY = 0;
var gameState = PLAY;


var sky;
var skybk;

var over,overbk;
var restart,restartbk;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obst1,obst2,obst3,obst4,obst5,obst6;

var cactus,cactusGroup;

var newImage;



var score = 0;

function preload(){
  trex_running = loadImage("trex orginal.png");

  
  groundImage = loadImage("trexground.png");
  
  cloudImage = loadImage("cloud(orginal).png");
  
  obst1 = loadImage("manpieceBlack_multi03.png");
  obst2 = loadImage("alienGreen.png");
  obst3 = loadImage("gnome.png");
  obst4 = loadImage("fence_wood.png");
  obst5 = loadImage("pieceBlack_border10.png");
  obst6 = loadImage("rockGrass.png");
  
  skybk = loadImage("bkk night.jpg")
  
  overbk = loadImage("game over(orginal).png")
  
  restartbk = loadImage("restart dude.png")
 
}

function setup() {
  createCanvas(600, 200);

  sky = createSprite(350,200,600,200);
  sky.addImage(skybk);
  sky.scale = 2.5;
  sky.x = sky.width /2;

  trex = createSprite(50,160,20,50);
  trex.addImage("running", trex_running);
  trex.scale = 0.5;
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  trex.depth = ground.depth;
  trex.depth = trex.depth + 1;
  
  invisibleGround = createSprite(200,190,600,4);
  invisibleGround.visible = false;
  
  cactusGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello"+ 5)
  
  trex.setCollider("circle",0,0,40);
  
  over = createSprite(300,75,100,50);
  over.addImage("game_over",overbk);
  over.scale = 0.5
  
  restart = createSprite(300,145,100,50);
  restart.addImage("button",restartbk);
  restart.scale = 0.06
  //restart.debug = true;
  restart.setCollider("circle",0,0,505);
  
}

function draw() {
  background("white");
    drawSprites();
  text("Score: " + score,520,35,fill("white"))
  trex.collide(invisibleGround);

  
    if(gameState === PLAY){
      over.visible = false;
      restart.visible = false;

    score = score + Math.round(setFrameRate()/60);
    ground.velocityX = -(4 + 3 * score/100);
    sky.velocityX = -(4 + 3 * score/100);

    
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
      if (sky.x < 0){
    sky.x = sky.width/2;
  }
      
      if (ground.x < 0){
    ground.x = ground.width/2;
  }
    

  spawnClouds();
  spawnCacti();

    
if (cactusGroup.isTouching(trex)){
  gameState = END;
  trex.velocityY = 0;
}
    
  }
  else if(gameState === END){
    over.visible = true;
    restart.visible = true;
    
    //stop the ground
    ground.velocityX = 0;
    sky.velocityX = 0;
    cactusGroup.setVelocityXEach(0);
    cactusGroup.destroyEach();
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.destroyEach();
    
    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      
      replay();
      
    }
  }

  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale=random(0.25,0.30);
    cloud.velocityX = -(4 + 3 * score/100);
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    }
  
     
  
}

function spawnCacti(){
    
  if (frameCount % 100 === 0) {
      cactus = createSprite(600,165,50,102);
      cactus.velocityX = -(4 + 3 * score/100);
      var rand = Math.round(random(1,6));
      switch(rand){
        case 1: cactus.addImage(obst1);
          break;
        case 2: cactus.addImage(obst2);
          break;
        case 3: cactus.addImage(obst3);
          break;
        case 4: cactus.addImage(obst4);
          break;
        case 5: cactus.addImage(obst5);
          break;
        case 6: cactus.addImage(obst6);
          break;
          default:break;
       
      }
    cactus.scale = 0.5;
    cactus.lifetime = 120;
    
    cactusGroup.add(cactus);
  }

      
  
}

function replay(){
  
  gameState = PLAY;
  score = 0;
  
  
}