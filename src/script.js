import { playlist } from '../src/data.js';

const coverArt = document.getElementById('coverArt');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs');
const duration = document.querySelector('.duration');
let bar = document.getElementById('bar');

export const playBtn = document.getElementById('play');
export const nextBtn = document.getElementById('next');
export const previousBtn = document.getElementById('previous');

export let track = 0;
let audio = new Audio(`${playlist[track].url}`);
let seconds = 0;
let minutes = 0;

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
function songDuration(seconds) {
  minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  duration.textContent = `0${minutes}:${seconds}`;
}

function updateTime(seconds) {
  minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  if (seconds < 10) {
    secs.textContent = `0${seconds}`;
  } else if (seconds >= 10 && seconds < 60) {
    secs.textContent = `${seconds}`;
  }

  if (minutes === 1 || minutes > 1) {
    mins.textContent = `0${minutes}`;
  }
}

function showProgress() {
  audio.addEventListener('timeupdate', (e) => {
    updateTime(audio.currentTime);
    bar.setAttribute('value', (audio.currentTime / audio.duration) * 100);
  });
}

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
  secs.textContent = '00';
  mins.textContent = '00';
}
