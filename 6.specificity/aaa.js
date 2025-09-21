
let header = document.querySelector('.head');
let aaaImg = document.querySelector('.aaa');
let triggerColor = 'rgb(255, 0, 0)';
let aaaSnd = new Audio('aaa.mp3');

aaaSnd.currentTime = 15;

let headerColor = window.getComputedStyle(header, null).color;

if (headerColor == triggerColor && aaaImg) {
    aaaImg.style.display = 'inline-block';
    aaaSnd.play();

    // setTimeout(()=>{aaaSnd.pause();}, 3500);
}

