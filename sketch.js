var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImage, zombieGroup
var bullets, bulletsImage, bulletsGroup
var score=0;


function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImage = loadImage("assets/zombie.png")

  bulletsImage = loadImage("assets/bullets.jpg")


}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  zombieGroup=new Group()
  bulletsGroup=new Group()


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)




}

function draw() {
  background(0);

  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    spawnBullets();
    bullets.y=player.y
    player.addImage(shooter_shooting)

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

    if(bulletsGroup.isTouching(zombieGroup)){

      bulletsGroup.destroyEach();
      zombieGroup.destroyEach();

    }
    
    spawnZombie();
    
    drawSprites();
    
    textSize(15)
    fill("red");
    text("score:"+score,displayWidth-100, 50);  
  }
  
  function spawnZombie() {
  if (frameCount % 150 === 0) {
    zombie = createSprite(displayWidth - 1200, displayHeight - 300, 50, 50)
    zombieGroup.add(zombie)
    zombie.x = Math.round(random(displayWidth - 1000, displayWidth - 300))
    zombie.y = Math.round(random(displayHeight - 800, displayHeight - 300))
    zombie.addImage(zombieImage)
    zombie.scale = 0.2
    zombie.velocityX = -0.5
  }
}

function spawnBullets(){
  bullets = createSprite(displayWidth - 1150 , 200 , 9 , 9)
  bulletsGroup.add(bullets)
  bullets.addImage(bulletsImage)
  bullets.velocityX = 3 
  bullets.scale = 0.2
  
  
 

}

