var overzichtScherm = document.getElementById("overzicht");
var winkelmandjeScherm = document.getElementById("winkelmandje");
var switchButton = document.getElementById("switchButton");
var priceFilterButton = document.getElementById("priceFilterButton");
var priceFilterInput = document.getElementById("priceFilterInput");
var ratingFilterButton = document.getElementById("ratingFilterButton");
var ratingFilterInput = document.getElementById("ratingFilterInput");

switchButton.addEventListener("click", switchScreens);
priceFilterButton.addEventListener("click", filterPrice);
ratingFilterButton.addEventListener("click", filterRating);

var winkelmand = [];

winkelmandjeScherm.style.display = "none";
// console.log(games);

function DisplayGames(TheInput){

    overzichtScherm.innerHTML = " "

    TheInput.forEach((game)=>{
        var gameBox = document.createElement("div");
        gameBox.classList.add("gameBoxStyle");

        var titelElem = document.createElement("h2");
        var selectGameButton = document.createElement("input");

        selectGameButton.type = "checkbox"; 

        titelElem.innerHTML = game.title + " - " + game.rating + " ☆";
        gameBox.innerText = game.price;

        selectGameButton.dataset.name = game.title;
        selectGameButton.dataset.price = game.price;
        selectGameButton.dataset.rating = game.rating;
        selectGameButton.addEventListener("click", addToCart);

        overzichtScherm.appendChild(gameBox);
        gameBox.appendChild(selectGameButton);
        gameBox.appendChild(titelElem);
        console.log(game.title);
    });
}

DisplayGames(games);

function switchScreens() {
    if (overzichtScherm.style.display == "none"){
        overzichtScherm.style.display = "block";
        winkelmandjeScherm.style.display = "none";
    } else {
        overzichtScherm.style.display = "none";
        winkelmandjeScherm.style.display = "block";
        renderWinkelmandjeContent();
    }
}

function addToCart() {
    
    var foundAtIndex = winkelmand.findIndex(wantedGame => wantedGame.name === this.dataset.name)
    if (foundAtIndex > -1){
        winkelmand.splice(foundAtIndex, 1);
    }
    else{
    winkelmand.push({name: this.dataset.name, price: this.dataset.price});
    }
}

function renderWinkelmandjeContent(){

winkelmandjeScherm.innerHTML = "<h1>Dit is het scherm voor het winkelmandje</h1>";
var totalPrice = 0;

    var winkelmandList = document.createElement("ul");
    winkelmand.forEach((winkelmandItem)=>{
        var winkelmandElem = document.createElement("li");

        winkelmandElem.innerText = winkelmandItem.name + " - " + winkelmandItem.price;
        winkelmandList.appendChild(winkelmandElem);

        totalPrice += parseFloat(winkelmandItem.price);
    });
    winkelmandjeScherm.appendChild(winkelmandList);

    var prijsElem = document.createElement('p');
    prijsElem.innerText = totalPrice;
    winkelmandjeScherm.appendChild(prijsElem);
}

function filterPrice(){
    var maxPrice = priceFilterInput.value;
    console.log(maxPrice);
    var result = games.filter((game)=>{
        return game.price < maxPrice;
    })
    
    DisplayGames(result);
}

function filterRating(){
    var setRating = ratingFilterInput.value;
    console.log(games);
    var result = games.filter((game)=>{
        return game.rating == setRating;
    })
    console.log(result)
    
    DisplayGames(result);
}