let list = [];
let jsonbox = document.getElementById("json");
let title = document.getElementById("script-title");
let author = document.getElementById("script-author");
function addCharacter(character){
    if(list.includes(character)){
        list.splice(list.indexOf(character), 1);
    }else{
        list.push(character);
    }
    updateBigImg();
    updateJSON();
}

function updateJSON(){
    let finallist = [];
    for(let i of list){
        let character = {...i};
        character.id = i.id + "_zsbd";
        finallist.push(character);
    }
    let result = JSON.stringify([
        {
            "id": "_meta",
            "name": title.value,
            "author": author.value
        },
        ...finallist
    ], null, 4);
    jsonbox.value = result;
    return result;
}

let traveler = document.getElementById("traveler");
let townsfolk = document.getElementById("townsfolk");
let outsider = document.getElementById("outsider");
let minion = document.getElementById("minion");
let demon = document.getElementById("demon");
let firstnightContainer = document.getElementById("firstnight-container");
let othernightContainer = document.getElementById("othernight-container");

function updateBigImg(){
    let groups = document.getElementsByClassName("character-group");
    for(let group of groups){
        group.innerHTML = "";
    }
    firstnightContainer.innerHTML = "";
    othernightContainer.innerHTML = "";
    for(let character of list){
        let element = createBigCharacterElement(character);
        document.getElementById(character.team + "-2").appendChild(element);
    }
    let firstnight = [
        {"image" : "./assets/Dusk.png", "index" : 0},
        {"image" : "./assets/Mi.png", "index" : 2000},
        {"image" : "./assets/Di.png", "index" : 3000},
        {"image" : "./assets/Dawn.png", "index" : 9000}
    ],
    othernight = [
        {"image" : "./assets/Dusk.png", "index" : 0},
        {"image" : "./assets/Dawn.png", "index" : 9000}
    ];
    for(let character of list){
        if(character.team == "traveler") continue;
        if(character.firstNight){
            firstnight.push({
                "image" : character.image2,
                "index" : character.firstNight
            });
        }
    }
    firstnight.sort((a, b) => a.index - b.index);

    for(let i of firstnight){
        let element = document.createElement("img");
        element.src = i.image;
        element.classList.add("night-icon");
        firstnightContainer.appendChild(element);
    }

    for(let character of list){
        if(character.team == "traveler") continue;
        if(character.otherNight){
            othernight.push({
                "image" : character.image2,
                "index" : character.otherNight
            });
        }
    }
    othernight.sort((a, b) => a.index - b.index);

    for(let i of othernight){
        let element = document.createElement("img");
        element.src = i.image;
        element.classList.add("night-icon");
        othernightContainer.appendChild(element);
    }
}

const panelTitle = document.getElementById("panel-title");
const panelAuthor = document.getElementById("panel-author");
function updateText(){
    panelTitle.innerText = document.getElementById("script-title").value;
    if(document.getElementById("script-author").value == "") panelAuthor.innerText = "";
    else panelAuthor.innerText = "剧本作者：" + document.getElementById("script-author").value;
    updateJSON();
}

function createBigCharacterElement(character){
    let characterElement = document.createElement("div");
    characterElement.classList.add("big-character");
    characterElement.innerHTML = `
        <img src="${character.image2}" alt="${character.name}">
        <div class = "character-info">
            <div class = "character-name">${character.name}</div>
            <div class = "character-ability">${character.ability}</div>
        </div>
    `;
    characterElement.onclick = () => {
        console.log(character);
        document.getElementById(character.id).classList.toggle("selected");
        characterElement.classList.toggle("selected");
        addCharacter(character);
    };
    return characterElement;
}