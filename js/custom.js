let iconInput = document.getElementById("custom-icon-file");

function uploadCustomIcon(){
    iconInput.click();
}

iconInput.onchange = function(){
    let file = iconInput.files[0];
}