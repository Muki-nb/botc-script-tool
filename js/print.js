const options = {
    bgcolor: '#fefefe' // 背景颜色
};

function toJSON(){
    let text = updateJSON();
    let blob = new Blob([text], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = document.getElementById("script-title").value + '.json';
    a.click();
}

async function toPNG(){
    let panel = document.getElementById('panel');
    domtoimage.toPng(panel, options)
    .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = document.getElementById("script-title").value + '.png';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('截图失败:', error);
    });
}