import { playlist } from '../src/data.js';

const coverArt = document.getElementById('coverArt');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const duration = document.querySelector('.duration');
let bar = document.getElementById('bar');

export const playBtn = document.getElementById('play');
export const nextBtn = document.getElementById('next');
export const previousBtn = document.getElementById('previous');

export let track = 0;
let audio = new Audio(`${playlist[track].url}`);
let secs = 0;
let mins = 0;

// Main menu functions (play/stop)
export function playStop() {
  audio.paused ? audio.play() : audio.pause();
  audio.addEventListener('ended', (e) => {
    nextSong();
  });
  songDuration(audio.duration);
  showProgress();
  toggleIcon();
}

function playSong() {
  audio = new Audio(`${playlist[track].url}`);
  audio.play();
  audio.addEventListener('ended', (e) => {
    nextSong();
  });
  audio.addEventListener('durationchange', (e) => {
    songDuration(audio.duration);
  });
  showProgress();
  toggleIcon();
  setContent(track);
}

// (forward/previous)
export function nextSong() {
  if (audio) audio.pause();
  if (track === 0) {
    track++;
  } else if (track === 1) {
    track = 0;
  }
  playSong();
}

// Time-related functions
function songDuration(secs) {
  mins = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  duration.textContent = `0${mins}:${secs}`;
}

function updateTime(secs) {
  mins = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);

  if (secs < 10) {
    sec.textContent = `0${secs}`;
  } else if (secs >= 10 && secs < 60) {
    sec.textContent = `${secs}`;
  }

  if (mins === 1 || mins > 1) {
    min.textContent = `0${mins}`;
  }
}

function showProgress() {
  audio.addEventListener('timeupdate', (e) => {
    updateTime(audio.currentTime);
    bar.setAttribute('value', (audio.currentTime / audio.duration) * 100);
  });
}

//update currentTime on progress bar
bar.addEventListener('click', function (e) {
  const x = e.offsetX; // get x coordinate
  const getProgress = x / bar.clientWidth;
  const newCurrentTime = getProgress * audio.duration;
  audio.currentTime = newCurrentTime;
});

function toggleIcon() {
  if (audio.paused == true) {
    playBtn.innerHTML = `<img src="./public/svg/Play_fill.svg" alt="">`;
  } else {
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
}

// Update page to match current song data
export function setContent(index) {
  coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
  title.textContent = `${playlist[index].title}`;
  artist.textContent = `${playlist[index].artist}`;
  sec.textContent = '00';
  min.textContent = '00';
}
