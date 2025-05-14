let list = [];
let jinx = {};
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
    updateJinx();
    updateJSON();
}

function havejinx(a, b){
    if(a in _jinx) if(b in _jinx[a]) return true;
    return false;
}

function getjinx(a, b){
    if(havejinx(a, b)) return _jinx[a][b];
    return "";
}

function updateJinx(){
    jinx = {};
    for(let i of list){
        for(let j of list){
            if(havejinx(i.name, j.name)){
                if(!(i.id in jinx)) jinx[i.id] = {};
                if(!(j.id in jinx[i.id])) jinx[i.id][j.id] = getjinx(i.name, j.name);
            }
        }
    }
    for(let i in jinx){
        let element = document.getElementById("bigimg-" + i);
        let jinxElement = element.getElementsByClassName("jinx")[0];
        jinxElement.innerHTML = "";
        for(let j in jinx[i]){
            jinxElement.classList.add("visible");
            jinxElement.appendChild(createJinxElement(_characters[i], _characters[j], getjinx(_characters[i].name, _characters[j].name)));
        }
    }
}

function createJinxElement(a, b, ajinx){
    let jinxElement = document.createElement("div");
    jinxElement.classList.add("jinx-item");
    jinxElement.classList.id = "jinx-" + a.id + "-and-" + b.id;
    jinxElement.innerHTML = `
        <img src="${b.image2}">
        <div class = "jinx-info">
            （相克规则：${ajinx}）
        </div>
    `;

    return jinxElement;
}

function updateJSON(){
    let finallist = [];
    for(let i of list){
        let character = {...i};
        character.id = i.id + "_zsbd";
        finallist.push(character);
    }
    let cnt = 0;
    for(let i in jinx){
        let c;
        for(let j of list){
            if(j.name == i){
                c = i;
                break;
            }
        }
        for(let j in jinx){
            finallist.push({
                "id": `jinx_${cnt++}`,
                "image": c.image,
                "name": `${i} & ${j}`,
                "team": "a jinxed",
                "ability": jinx[i][j]
            });
        }
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

function useJSON(){
    let json = JSON.parse(jsonbox.value);
    for(let i of document.getElementsByClassName("small-character")){
        i.classList.remove("selected");
    }
    if(Array.isArray(json)){
        for(let i of json){
            if(i.id == "_meta"){
                author.value = i.author;
                title.value = i.name;
            }else{
                let character = {};
                if(i.id in _characters){
                    character = {
                        ..._characters[i.id],
                        ...i
                    }
                }else{
                    character = {
                        ...i,
                        image2: i.image
                    }
                }
                for(let i in _characters){
                    if(_characters[i].name == character.name){
                        character.id = _characters[i].id;
                        character.image2 = _characters[i].image2;
                        break;
                    }
                }
                addCharacter(character);
                document.getElementById(character.id).classList.add("selected");
            }
        }
        updateText();
    }else{
        alert("JSON格式错误");
        return;
    }
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
    characterElement.id = "bigimg-" + character.id;
    characterElement.classList.add("big-character");
    characterElement.innerHTML = `
        <div class = "character-self flex-column">
            <div class = "flex-row">
                <img src = "${character.image2}" alt="${character.name}">
                <div class = "character-info">
                    <div class = "character-name">${character.name}</div>
                    <div class = "character-ability">${character.ability}</div>
                </div>
            </div>
            <div class = "jinx"></div>
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