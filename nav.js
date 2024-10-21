window.onscroll = function () {
    scrollProgress();
};

function scrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = scrolled + "%";

    // 更新進度條和波浪顏色
    progressBar.style.backgroundColor = BgColor[currentColorIndex];
    const waves = document.querySelectorAll('.wave');
    waves.forEach(wave => wave.style.backgroundColor = BgColor[currentColorIndex]);
}

const BgColor = ['#47DDFA', '#47fae9', '#33f3e0', '#3ed7f5', '#13f5cb', '#71f2ff', '#a1e7ef', '#8cffdf'];
let currentColorIndex = 0;

function BubbleEffect() {
    if (currentColorIndex < BgColor.length) {
        document.querySelector('.progress-bar').style.backgroundColor = BgColor[currentColorIndex]; 
        const waves = document.querySelectorAll('.wave');
        waves.forEach(wave => wave.style.backgroundColor = BgColor[currentColorIndex]);
    } else {
        currentColorIndex = 0;
    }
    currentColorIndex++;
}

setInterval(BubbleEffect, 3750);
