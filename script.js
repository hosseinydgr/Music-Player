"use strict";

let play = document.querySelector(".play");
let progress = document.querySelector("#progress");
let current = document.querySelector(".current");
let audio = document.querySelector(".audio1");
let playIcon = document.querySelector(".play-icon");
let pauseIcon = document.querySelector(".pause-icon");
let totalTime = document.querySelector(".total-time");
let audioSource = document.querySelector(".audio-source");
let next = document.querySelector(".next");
let previous = document.querySelector(".previous");
let volumeRange = document.querySelector(".volume-range");
let mainCont = document.querySelector(".main-container");

let playIsClicked = false;
let c = 0;
let currentAudio = 1;
// progress.value = 50;

if (
  document.documentElement.clientHeight >
  mainCont.getBoundingClientRect().height
) {
  mainCont.style.margin = `${
    (document.documentElement.clientHeight -
      mainCont.getBoundingClientRect().height) /
      2 -
    1
  }px auto`;
} else {
  mainCont.style.margin = "50px auto";
}

play.addEventListener("click", function () {
  if (c === 0) {
    totalTime.textContent = edit(Math.floor(audio.duration));
    audio.volume = volumeRange.value / 100;
    setInterval(function () {
      current.textContent = edit(Math.floor(audio.currentTime));
      progress.value =
        (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100;
      progress.style.background = `linear-gradient(to right, #c80000 0% ${progress.value}%, #999 ${progress.value}% 100%)`;
      if (audio.currentTime === audio.duration) next.click();
    }, 1000);
  }
  if (!playIsClicked) {
    audio.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    playIsClicked = true;
    c++;
  } else {
    audio.pause();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    playIsClicked = false;
    c++;
  }
});

next.addEventListener("click", function () {
  audio.pause();
  audio.currentTime = 0;
  document.querySelector(`.img${currentAudio}`).classList.add("hidden");
  if (currentAudio < 4) {
    currentAudio++;
  } else {
    currentAudio = 1;
  }
  document.querySelector(`.img${currentAudio}`).classList.remove("hidden");
  audio = document.querySelector(`.audio${currentAudio}`);
  audio.volume = volumeRange.value / 100;
  totalTime.textContent = edit(Math.floor(audio.duration));
  if (playIsClicked) {
    audio.play();
  }
});

previous.addEventListener("click", function () {
  audio.pause();
  audio.currentTime = 0;
  document.querySelector(`.img${currentAudio}`).classList.add("hidden");
  if (currentAudio > 1) {
    currentAudio--;
  } else {
    currentAudio = 4;
  }
  document.querySelector(`.img${currentAudio}`).classList.remove("hidden");
  audio = document.querySelector(`.audio${currentAudio}`);
  audio.volume = volumeRange.value / 100;
  totalTime.textContent = edit(Math.floor(audio.duration));
  if (playIsClicked) {
    audio.play();
  }
});

volumeRange.addEventListener("mousemove", volumeRangeUserHandler);
volumeRange.addEventListener("click", volumeRangeUserHandler);
volumeRange.addEventListener("touchmove", volumeRangeUserHandler);
volumeRange.addEventListener("touchend", volumeRangeUserHandler);

progress.addEventListener("mouseup", progressUserHandler);
progress.addEventListener("touchend", progressUserHandler);

window.addEventListener("resize", function () {
  if (
    document.documentElement.clientHeight >
    mainCont.getBoundingClientRect().height
  ) {
    mainCont.style.margin = `${
      (document.documentElement.clientHeight -
        mainCont.getBoundingClientRect().height) /
        2 -
      1
    }px auto`;
  } else {
    mainCont.style.margin = "50px auto";
  }
});

function volumeRangeUserHandler() {
  audio.volume = volumeRange.value / 100;
  volumeRange.style.background = `linear-gradient(to right, #c80000 0% ${volumeRange.value}%, #999 ${volumeRange.value}% 100%)`;
}

function progressUserHandler() {
  audio.currentTime = (progress.value * Math.floor(audio.duration)) / 100;
  progress.style.background = `linear-gradient(to right, #c80000 0% ${progress.value}%, #999 ${progress.value}% 100%)`;
}

function edit(num) {
  let minute = Math.floor(num / 60).toString();
  let second = (num % 60).toString();
  if (minute.length === 1) {
    minute = "0" + minute;
  }
  if (second.length === 1) {
    second = "0" + second;
  }
  return `${minute}:${second}`;
}
