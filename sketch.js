//Create variables here
var dog, happyDog
var database 
var foodS, foodStock;
var foodObj
var feedTime, lastFed,feed, addFood
function preload()
{
	//load images here
  dogImg=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png")
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  foodObj=new Food();

  dog=createSprite(800,200)
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46, 139, 87)

 foodObj.display();

 feedTime= database.ref('feedTime');
 feedTime.on("value",function(data){
   lastFed=data.val();
 })

 fill (255,255,254);
 textSize(25)
 if(lastFed>=12){
   text("Last Feed : "+ lastFed%12 + " PM ", 350,30)
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM",350,30)
 }

  drawSprites();
  //add styles here
 

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



