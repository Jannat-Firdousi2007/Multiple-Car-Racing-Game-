var gameState = "START";
var bg, bgI;
var player, plr, cars, car1, car1I, car2, car2I, car3, car3I;
var arrows;
var names;
var greet;
var hearts, heart;

function preload(){
    bgI = loadImage("bg.png");
    plr = loadImage("car1.PNG");
    car1I = loadImage("car2.PNG");
    car2I = loadImage("car3.PNG");
    car3I = loadImage("car4.PNG");
    heartI = loadImage("life.png");
    arrow = loadImage("arrows.png");
}

function setup(){
    createCanvas(722,336);
     if(gameState==="PLAY"){

     }
     var name = createElement('h3'," Enter Your Name ");
     name.position(165,75);
     nameInput = createInput();
     nameInput.position(315,95);

     var nameBtn = createButton('Enter');
     nameBtn.position(495,95);

     nameBtn.mousePressed(function click(){
         name.hide();
         nameInput.hide();
         nameBtn.hide();
         nameInput.style('background-color',0);
         names = nameInput.value();
         greet = createElement('h2'," Hello ! "+names);
         greet.position(285,70);
         console.log(nameInput.value());

         if(names.length===0||names.length>10){
             name.show();
             nameInput.show();
             nameBtn.show();
             greet.value = undefined
             greet.hide();
         }
     })

     bg = createSprite(width-5,127,0,0);
     bg.addImage(bgI);
     car2 = createSprite(60,303,50,30);
     car2.scale = 0.1;
     car2.addImage(car2I);

     car3 = createSprite(160,313,50,30);
     car3.scale = 0.1;
     car3.addImage(car3I);

     car1 = createSprite(120,303,50,30);
     car1.scale = 0.1;
     car1.addImage(car1I);

     player = createSprite(23,313,50,30);
     player.scale = 0.1;
     player.addImage(plr);

     hearts = createGroup();
     
     for(var i=25;hearts.length<5;i+=40){
         heart = createSprite(i,70,30,30);
         heart.addImage(heartI);
         heart.scale = 0.07;
         hearts.add(heart);
     }
    }

    function start(){
        drawSprite(bg);
        drawSprite(car2);
        drawSprite(car3);
        drawSprite(car1);
        drawSprite(player);

        fill(0);
        textSize(40);
        textFont('Raleway');
        text(" Car Racing Game ",width/2-188,height/2-90);
        textStyle(BOLD);
        textSize(18);

        player.x+=1.3;
        car1.x+=1.5;
        car2.x+=1;
        car3.x+=2.5;
        
        if(names !== undefined && names.length<=10 && names.length !== 0){
            text(" Playing for the First Time ? \n\n Press 'Enter' to check out the rules.\n Press 'ESC' to learn the controls ",width/2-170,height/2-20);
            text(" Played Before ? \n\n Press 'Space' to start. ",width/2-100,height/2+80);

            if(player.x>=width+23){
                player.x = -23;
            }

            if(car1.x>=width+23){
                car1.x = -23;
            }

            if(car2.x>=width+23){
                car2.x = -23;
            }

            if(car3.x>=width+23){
                car3.x = -23;
            }

            if(car1.x<=car2.x-30){
                car1.x -= 0.5;
                car2.x += 0.5;
            }

            if(keyDown('Space')){
                gameState = "PLAY";
                player.x = 23;
                car1.x = 0;
                car2.x = 150;
                car3.x = 250;
            }

            if(keyCode===ESCAPE){
                greet.hide();
                tint(60);
                image(bgI,-147,-220);
                fill(255);
                textSize(40);
                textFont('Raleway');
                text(" Car Racing Game ",width/2-182,height/2-80);
                textStyle(NORMAL);
                textSize(20);
                text(" Press 'Space' to start. ",width/2-110,height-20);

                arrow.resize(240,140);
                noTint();
                image(arrow,width/2-140,height/2-40);
                text(" Switch to Left lane. ",258,127);
                text(" Move Backward. ",107,219);
                text(" Move Forward. ",430,213);
                text(" Switch to Right lane. ",255,262);
                textSize(15);
                text(" Press 'Enter' to look at the rules. ",485,20);
            }

            else if(keyCode===Enter){
                textFont('Raleway');
                greet.hide();
                fill(255);
                textSize(40);
                tint(60);
                image(bgI,-147,-220);
                text(" Car Racing Game ",width/2-182,height/2-100);
                textSize(20);
                textStyle(NORMAL);
                text(" Rule\n 1. To overtake all other cars and reach the finish line. \n ");
                text(" Press 'Space' to start. ",width/2-110,height-20);
           }
        }

        else{
            text(" Enter a name less than 10 characters long. ",175,150);
        }
    }

    function play(){
        // Displaying the names 
        greet.show();
        greet.html(names);
        greet.position(10,-15);
        
        // Infinte Background
        if(bg.x<=97){
            bg.x = width-5;
        }

        // Movement Forward
        if(keyDown(RIGHT_ARROW)){
            bg.x -= 350;
            player.x = player.x+1.5;
        }

        // MOve Backward
        if(keyDown(LEFT_ARROW) && bg.x<715){
            bg += 3;
            player.x = player.x-=0.5;
            console.log(bg.x);
            
            if(bg.x>=710){
                bg.x = 710;
                player.x -= 0.5;

                if(player.x<23){
                    player.x = 23;
                }
            }
        }

        // Switch to Left lane
        if(keyDown(UP_ARROW) && player.x===313){
            player.y = 303;

            if(player.x>car1.x-50 && player.x<car1.x+50){
                player.x = 313;
            }

            if(player.x>car2.x-50 && player.x<car2.x+50){
                player.x = 313;
            }

            if(player.x>car3.x-50 && player.x<car3.x+50){
                player.x = 313;
            }
        }

        // Switch to Right lane
        if(keyDown(DOWN_ARROW) && player.y===303){
            player.y = 313;
            
            if(player.x>car1.x-50 && player.x<car1.x+50){
                player.y = 303;
            }

            if(player.x>car2.x-50 && player.x<car2.x+50){
                player.y = 303;
            }

            if(player.x>car3.x-50 && player.x<car3.x+50){
                player.y = 303;
            }
        }

        // Movements
        car1.x += random(0.1,0.8);
        car2.x += random(0.5,0.7);
        car3.x += random(0.7,0.9);

        // Increasing speed of the car crosses them
        if(car1.x+70<player.x){
            car1.x += 0.9;
        }

        if(car2.x+30<player.x){
            car2.x += 0.3;
       }

       // Drawing sprites to prevent overlapping of the images
       if(car1.y===313){
           drawSprite(bg);
           drawSprites(heart);
           drawSprite(car2);
           drawSprite(car1);
           drawSprite(car3);
           drawSprite(player);
       }

       if(player.y===313){
           drawSprite(bg);
           drawSprites(heart);
           drawSprite(car2);
           drawSprite(car1);
           drawSprite(car3);
           drawSprite(player);
       }

       else if(player.y===303){
           drawSprite(bg);
           drawSprites(hearts);

           // Heart.scale = 0.07;
           
           drawSprite(player);
           drawSprite(car2);
           drawSprite(car1);
           drawSprite(car3);
       }

       if(player.x<car2.x-60 && car2.x>player.x && car2.x-150<player.x){
           car2.y = player.y;
       }

       else if(player.y>313 && car1.y===303){
        drawSprite(bg);
        drawSprites(hearts);
        drawSprite(car2);
        drawSprite(car1);
        drawSprite(car3);
       }

       if(player.x<=car3.x-60 && player.x>car2.x){
           car3.y = player.y;
       }

       else if(player.x>620){
           car3.x += 0.3;

           if(player.x===313){
            drawSprite(bg);
            drawSprites(hearts);
            drawSprite(car2);
            drawSprite(car1);
            drawSprite(car3);
            drawSprite(player);
           }

           else if(player.y===303){
            drawSprite(bg);
            drawSprites(hearts);
            drawSprite(car2);
            drawSprite(car1);
            drawSprite(car3);
            drawSprite(player);
           }
       }

       // Bumping into cars
       if(car1.x>player.x-40 && player.y===car1.y && player.x>car1.x){
           car1.x -= 3;
           player.x += 3;
           hearts.pop();
           console.log(hearts);
       }

       if(player.x>car1.x-40 && player.y===car1.y && car1.x>player.x){
           car1.x += 3;
           player.x -= 3;
           hearts.pop();
           console.log(hearts);
       }

       if(car2.x>player.x-40 && player.y===car2.y && player.x>car2.x){
        car2.x -= 3;
        player.x += 3;
        hearts.pop();
        console.log(hearts);
    }

        if(player.x>car2.x-50 && player.y===car2.y && car2.x>player.x){
        car2.x += 3;
        player.x -= 3;
        hearts.pop();
        console.log(hearts);
    }

        if(car3.x>player.x-50 && player.y===car3.y && player.x>car3.x){
        car3.x -= 3;
        player.x += 3;
        hearts.pop();
        console.log(hearts);
    }

        if(player.x>car3.x-50 && player.y===car3.y && car3.x>player.x){
        car3.x += 3;
        player.x -= 3;
        hearts.pop();
        console.log(hearts);
    }

    if(car3.x>=player.x-40 && player.y===car3.y && player.x>car3.x){
        player.x += 3;
        car3.x -= 3;
        hearts.pop();
    }

    if(car1.x>=car2.x-50 && car1.y===car2.y){
        car1.x -= 0.3;
        car1.y = 313;
        car2.y = 303;
        car2.x += 1.3;
    }

    if(car1.x>car3.x-50 && car1.y===car3.y){
        car1.x -= 0.3;
        car3.x += 1;
    }

    if(car2.x>car3.x-50){
        car2.x -= 0.3;
        car3.x += 1;
    }

    if(player.x>=width-10 || hearts.length===0 || car3.x>=width-10){
        gameState = "END";
    }
}

function end(){
    tint(60);
    image(bgI,-147,-220);
    fill(255);
    textSize(40);
    
    if(hearts.length===0){
        text(" You Are Disqualified ",width/2-170,150);
    }

    if(car3.x>=width-10){
        if(player.x<car1.x){
            text(" You Placed \n Fourth ",width/2-130,150);
        }
        
        if(player.x>car1.x && player.x<car2.x){
            text(" You Placed \n Second ",width/2-130,150);
        }

        if(player.x>car2.x && player.x<car3.x){
            text(" You Placed \n First ",width/2-130,150);
        }
    }

    function draw(){
        background(0);

        if(gameState==="START"){
            start();
        }

        if(gameState==="PLAY"){
            play();
        }

        if(gameState==="END"){
            end();
        }

        textSize(15);
        text(mouseX+ ","+mouseY,5,15);
    }
}
