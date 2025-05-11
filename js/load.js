for(let character in _characters){
    character = _characters[character];
    let element = createCharacterElement(character);
    document.getElementById(character.team).appendChild(element);
}

function createCharacterElement(character){
    let characterElement = document.createElement("div");
    characterElement.classList.add("small-character");
    characterElement.id = character.id;
    characterElement.innerHTML = `
        <img src="${character.image2}" alt="${character.name}">
        <div class = "character-info">
            <div class = "character-name">${character.name}</div>
            <div class = "character-ability">${character.ability}</div>
        </div>
    `;
    characterElement.onclick = () => {
        addCharacter(character)
        characterElement.classList.toggle("selected");
    };
    return characterElement;
}