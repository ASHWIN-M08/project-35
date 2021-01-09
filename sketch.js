//Create variables here
var dog;
var happyDog;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg=loadImage("images/Dog (1).png");
  dogHappy=loadImage("images/happydog (1).png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();

  dog=createSprite(250,250,5,5);
  dog.addImage(dogImg);

  
  foodStock=database.ref('Food');
   foodStock.on("value",readStock);
   
  
}


function draw() {


background(46,139,87);

 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
 }
 readStock();
 writeStock();
 drawSprites();

  //add styles here
  stroke(255);
  textSize(30);
  fill("red");
text("Note: press UP_ARROW to feed drago Milk!",250, 450);
  
stroke(255);
textSize(40);
fill("blue");
text("food: " + foodS,30,50);
  

}

//function to read values from DB
function readStock(data){
   foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



