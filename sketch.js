var player,player_left,player_right,zombieAnimation,bg,bulletGroup,bulletImg,button1,button2,zombie1,zombie2,zombie3,zombie4;
var kills,coins,deaths,reloadSpeed,bulletSpeed,zombieSpeed,playerCoolDown,gameTime;
var gun,button3,button4,hearts,heart1,heart2,heart3,heartImg,concreteWall;

function preload(){
    player_left=loadImage("hunter_left.png");
    player_right=loadImage("hunter_right.png");

    zombieAnimation=loadAnimation("zombie1.png","zombie2.png","zombie3.png");

    concreteWall=loadImage("zombie_concrete.png");
    
    bulletImg=loadImage("bullet.png");
    heartImg=loadImage("heart.png");
    bg=loadImage("zombie_background.png");
}

function setup(){

        player=createSprite(200,300,20,20); //player
        player.addImage("hunter_right",player_right);
        player.addImage("hunter_left",player_left);
        player.scale=0.5;

        zombie1=createSprite(1536,100,20,20); //enemies
        zombie1.addAnimation("zombie",zombieAnimation);
        zombie1.scale=0.5;
        zombie2=createSprite(1536,300,20,20);
        zombie2.addAnimation("zombie",zombieAnimation);
        zombie2.scale=0.5;
        zombie3=createSprite(1536,200,20,20);
        zombie3.addAnimation("zombie",zombieAnimation);
        zombie3.scale=0.5;
        zombie4=createSprite(1536,250,20,20);
        zombie4.addAnimation("zombie",zombieAnimation);
        zombie4.scale=0.5;
        
        edges=createEdgeSprites(); //edges

        heart1=createSprite(130,380,20,20);
        heart1.addImage("heart",heartImg);
        heart1.scale=0.1;
        heart2=createSprite(180,380,20,20);
        heart2.addImage("heart",heartImg);
        heart2.scale=0.1;
        heart3=createSprite(180+50,380,20,20);
        heart3.addImage("heart",heartImg);
        heart3.scale=0.1;

        bulletGroup=new Group(); //to use the bullets

        button1=createButton('Bullet speed,20 coins'); //button to increase bullet speed
        button1.position(200,10);
        button1.mousePressed(function(){
            if(coins>=20){
            bulletSpeed+=1;
            coins-=20;
            }
        })
        button2=createButton('Reload time,10 coins'); //button to decrease reload time
        button2.position(200,30);
        button2.mousePressed(function(){
            if(coins>=10){
                reloadSpeed+=0.1;
                coins-=10;
            }
        })
        button3=createButton('Buy shotgun, 75 coins');
        button3.position(500,10);
        button3.mousePressed(function(){
            if(coins>=75){
                gun=shotgun;
                coins-=75;
            }
        })
        button4=createButton('Buy AK47,200 coins');
        button4.position(500,30);
        button4.mousePressed(function(){
            if(coins>=200){
                gun=ak47;
                coins-=200;
            }
        })

        playerCoolDown=10; //imp maths
        zombieSpeed=1.2;
        bulletSpeed=10;
        reloadSpeed=0.1;
        deaths=0;
        kills=0;
        coins=0;
        gameTime=0;
        normal=0;
        shotgun=1;
        ak47=2;
        hearts=3;
        gun=normal;
}

function draw(){
       createCanvas(1536,400);
       background(bg);

        if(keyDown('w')){  //player controls
            player.y-=10;
        }
        if(keyDown('a')){
            player.x-=10;
            player.changeImage("hunter_left",player_left);
        }
        if(keyDown('s')){
            player.y+=10;
        }
        if(keyDown('d')){
            player.x+=10;
            player.changeImage("hunter_right",player_right);
        }
        if(keyDown(UP_ARROW)){
            player.y-=10;
        }
        if(keyDown(LEFT_ARROW)){
            player.x-=10;
            player.changeImage("hunter_left",player_left);
        }
        if(keyDown(DOWN_ARROW)){
            player.y+=10;
        }
        if(keyDown(RIGHT_ARROW)){
            player.x+=10;
            player.changeImage("hunter_right",player_right);
        }
        

        if(zombie1.x>player.x){ //zombie AI
            zombie1.x-=zombieSpeed;
        }
        if(zombie1.x<player.x){
            zombie1.x+=zombieSpeed;
        }
        if(zombie1.y>player.y){
            zombie1.y-=zombieSpeed/3;
        }
        if(zombie1.y<player.y){
            zombie1.y+=zombieSpeed/3;
        }
        if(zombie2.x>player.x){
            zombie2.x-=zombieSpeed;
        }
        if(zombie2.x<player.x){
            zombie2.x+=zombieSpeed;
        }
        if(zombie2.y>player.y){
            zombie2.y-=zombieSpeed/3;
        }
        if(zombie2.y<player.y){
            zombie2.y+=zombieSpeed/3;
        }
        if(zombie3.x>player.x){
            zombie3.x-=zombieSpeed;
        }
        if(zombie3.x<player.x){
            zombie3.x+=zombieSpeed;
        }
        if(zombie3.y>player.y){
            zombie3.y-=zombieSpeed/3;
        }
        if(zombie3.y<player.y){
            zombie3.y+=zombieSpeed/3;
        }
        if(zombie4.x>player.x){
            zombie4.x-=zombieSpeed;
        }
        if(zombie4.x<player.x){
            zombie4.x+=zombieSpeed;
        }
        if(zombie4.y>player.y){
            zombie4.y-=zombieSpeed/3;
        }
        if(zombie4.y<player.y){
            zombie4.y+=zombieSpeed/3;
        }

        if(player.collide(zombie1)|| //to reset if player dies;
           player.collide(zombie2)||
           player.collide(zombie3)||
           player.collide(zombie4)){

           if(player.x<500){
               hearts-=1;
           }
           zombie1.x=random(500,500);
           zombie1.y=random(0,400);
           zombie2.x=random(500,500);
           zombie2.y=random(0,400);
           zombie3.x=random(500,500);
           zombie3.y=random(0,400);
           zombie4.x=random(500,500);
           zombie4.y=random(0,400);

            if(hearts===0){
                zombie1.x=random(1550,1560);
                zombie1.y=random(0,400);
                zombie2.x=random(1550,1560);
                zombie2.y=random(0,400);
                zombie3.x=random(1550,1560);
                zombie3.y=random(0,400);
                zombie4.x=random(1550,1560);
                zombie4.y=random(0,400);
                bulletGroup.destroyEach();

                deaths+=1;

                player.x=500;
                player.y=200;

                playerCoolDown=10;
                hearts=3;
                zombieSpeed=2;
                bulletSpeed=10;
                reloadSpeed=0.1;
                kills=0;
                coins=0;
                gameTime=0;
                gun=normal;
            }
        }

        if(hearts===3){
            heart1.visible=true;
            heart2.visible=true;
            heart3.visible=true;
        }
        if(hearts===2){
            heart1.visible=false;
            heart2.visible=true;
            heart3.visible=true;
        }
        if(hearts===1){
            heart1.visible=false;
            heart2.visible=false;
            heart3.visible=true;
        }
        if(hearts===0){
            heart1.visible=false;
            heart2.visible=false;
            heart3.visible=false;
        }

                if(mouseIsPressed&&playerCoolDown<=0&&gun===normal){ //to shoot the bullet
                    fill(0,0,0);
                    bullet=createSprite(player.x,player.y+10,10,10);
                    bullet.addImage(bulletImg);
                    bullet.scale=0.2;
                    if(mouseX>player.x){
                    bullet.velocityX=bulletSpeed;
                    }
                    if(mouseX<player.x){
                    bullet.velocityX=-bulletSpeed;
                    bullet.changeImage()
                    }
                    playerCoolDown=10;
                    bulletGroup.add(bullet);
                    if(frameCount%600===0){
                        bulletGroup.destroyEach();
                    }
                }
                else if(mouseIsPressed&&playerCoolDown<=0&&gun===shotgun){
                    bullet1=createSprite(player.x,player.y+10,10,10);
                    bullet1.addImage(bulletImg);
                    bullet1.scale=0.2;
                    bullet2=createSprite(player.x,player.y+10,10,10);
                    bullet2.addImage(bulletImg);
                    bullet2.scale=0.2;
                    bullet3=createSprite(player.x,player.y+10,10,10);
                    bullet3.addImage(bulletImg);
                    bullet3.scale=0.2;
                    if(mouseX>player.x){
                        bullet1.velocityX=bulletSpeed;
                        bullet2.velocityX=bulletSpeed;
                        bullet2.velocityY=2;
                        bullet3.velocityX=bulletSpeed;
                        bullet3.velocityY=-2;
                    }
                    if(mouseX<player.x){
                        bullet1.velocityX=-bulletSpeed;
                        bullet2.velocityX=-bulletSpeed;
                        bullet2.velocityY=2;
                        bullet3.velocityX=-bulletSpeed;
                        bullet3.velocityY=-2;
                    }
                    playerCoolDown=10;
                    bulletGroup.add(bullet1);
                    bulletGroup.add(bullet2);
                    bulletGroup.add(bullet3);
                    if(frameCount%300===0){
                        bulletGroup.destroyEach();
                    }
                }
                else if(mouseIsPressed&&gun===ak47&&playerCoolDown<=2){
                    fill(0,0,0);
                    bullet=createSprite(player.x,player.y+10,10,10);
                    bullet.addImage(bulletImg);
                    bullet.scale=0.2;
                    if(mouseX>player.x){
                    bullet.velocityX=bulletSpeed;
                    }
                    if(mouseX<player.x){
                    bullet.velocityX=-bulletSpeed;
                    bullet.changeImage()
                    }
                    playerCoolDown=7;
                    bulletGroup.add(bullet);
                    if(frameCount%300===0){
                        bulletGroup.destroyEach();
                    }
                }


        fill(255); //to show the cool down
        textSize(10);
        text("Attack cool down: "+Math.round(playerCoolDown),50,20);

        if(bulletGroup.isTouching(zombie1)){ //to kill the enimeis
            zombie1.x=random(150,1550);
            zombie1.y=random(50,250);
            kills+=1;
            coins+=1;
        } 
        if(bulletGroup.isTouching(zombie2)){
            zombie2.x=random(150,1550);
            zombie2.y=random(50,250);
            kills+=1;
            coins+=1;
        }
        if(bulletGroup.isTouching(zombie3)){
            zombie3.x=random(150,1550);
            zombie3.y=random(50,250);
            kills+=1;
            coins+=1;
        }
        if(bulletGroup.isTouching(zombie4)){
            kills+=1;
            coins+=1;
            rand=random(1,4);
            if(rand===4){
            zombie4.x=random(150,100);
            zombie4.y=random(10,50);
            }
            else{
            zombie4.x=random(200,1550);
            zombie4.y=random(50,250);
            }
        }

        if(kills>=10&&player.x>500){ //to make the player escape after killing 10 zombies
            player.x=200;
            player.y=200;
        }
        
        if(playerCoolDown>0){  //to decrease cool down if it is more than zero
            playerCoolDown-=reloadSpeed;
        }

        text("Kills: "+kills,50,40); //to show the kills and coins and deaths
        text("Coins: "+coins,50,60);
        text("Deaths: "+deaths,20,380);

        zombie1.bounceOff(zombie2); //to make sure they dont merge
        zombie1.bounceOff(zombie3);
        zombie1.bounceOff(zombie4);

        zombie2.bounceOff(zombie1);
        zombie2.bounceOff(zombie3);
        zombie2.bounceOff(zombie4);

        zombie3.bounceOff(zombie1);
        zombie3.bounceOff(zombie2);
        zombie3.bounceOff(zombie4);

        zombie4.bounceOff(zombie2);
        zombie4.bounceOff(zombie3);
        zombie4.bounceOff(zombie4);

        player.bounceOff(edges);

        gameTime+=1;     //to make game harder as time goes one
        if(gameTime%1===0&&zombieSpeed<=20){
         zombieSpeed+=0.0005;
        }

        drawSprites();
  }  