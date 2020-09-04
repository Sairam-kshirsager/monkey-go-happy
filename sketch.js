var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadImage("sprite_1.png");
 
}



function setup() {
 createCanvas(400,400); 

  monkey=createSprite(100,320,20,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,800,10);
   
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0;
  
  monkey.setCollider("circle",0,0,300)
 // monkey.debug=true;
  
  
}


function draw() {
 background("white");
  
  stroke("black");
  textSize(20);  
  fill("black");
  text("Survival Time: "+score,110,100);
  
  if(gameState===PLAY){
    text("Get bonus 100 points for banana",50,50);
    
    
   score=score + Math.round(frameCount/200); 
    
    ground.velocityX=-(4 + score/100);
    
    
  if(ground.x<0){
   ground.x=ground.width/2; 
  }
    
    if(keyDown("space")&&monkey.y>310){
   monkey.velocityY=-8; 
  }
   
    monkey.velocityY=monkey.velocityY+0.3;
    
    
    obstacles();
    food();
   
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+100;  
  }
  
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
   }  
  
}else if(gameState===END){
  
  
 ground.velocityX=0;
 monkey.velocityY=0; 
  
 FoodGroup.setVelocityXEach(0);
 obstacleGroup.setVelocityXEach(0);
  
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  
  text("Click on monkey to restart",90,200);
  
  if(mousePressedOver(monkey)){
   reset(); 
  }
}
  
  monkey.collide(ground);
  
  drawSprites();
}

function reset(){
  
 score=0;
 FoodGroup.destroyEach();
 obstacleGroup.destroyEach();
  gameState=PLAY;
  frameCount=0;
  
  
} 

function food(){
 if(frameCount%80===0){
   banana=createSprite(390,300,50,50);
   banana.y=Math.round(random(200,250));
   banana.addImage(bananaImage);
   banana.scale=0.05;
   banana.velocityX=-(3 + score/300);
   banana.lifetime=100;
   
   monkey.depth=banana.depth;
   monkey.depth=monkey.depth+1;
   
   FoodGroup.add(banana);
   
 }
}

function obstacles(){
 
 if(frameCount%200===0){
  obstacle=createSprite(390,320,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-(3 + score/300);
  obstacle.lifetime=100;
   
   monkey.depth=obstacle.depth;
   
   
   obstacleGroup.add(obstacle);
   
   obstacle.setCollider("circle",0,0,200)
  // obstacle.debug=true;
   
   
 } 
}




