var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  foodObj = new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  feed=createButton("Feed!");
  feed.position(550,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Food!");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("green");
  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  dog.addImage(happyDog);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//Ma'am please can you tell me again the uses of [ref] command and the [firebase] command in the next class?