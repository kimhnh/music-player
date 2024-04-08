import { playlist } from './src/data.js';

const artist = document.querySelector('.label__artist');
const bar = document.querySelector('.bar');
const coverArt = document.querySelector('.thumbnail__cover-art');
const menuContainer = document.querySelector('.menu');
const min = document.querySelector('.progress__timer--min');
const play = document.querySelector('.play');
const progressDuration = document.querySelector('.progress__timer--duration');
const sec = document.querySelector('.progress__timer--sec');
const title = document.querySelector('.label__title');

let track = 0;
let audio = new Audio(`${playlist[track].url}`);

// Functions
// Update info
function setTrackInfo(index) {
  coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
  title.textContent = `${playlist[index].title}`;
  artist.textContent = `${playlist[index].artist}`;
  sec.textContent = '00';
  min.textContent = '00';
}
setTrackInfo(0); // init

// Audio
function playStop() {
  audio.paused ? audio.play() : audio.pause();
  audio.addEventListener('ended', nextSong);
  displayTime();
  toggleIcon();
}

function nextSong() {
  if (audio) audio.pause();
  if (track === 0) track++;
  else track = 0;
  setTrackInfo(track);

  audio = new Audio(`${playlist[track].url}`);
  audio.play();
  audio.addEventListener('ended', nextSong);
  audio.addEventListener('durationchange', () => calcTime(audio.duration));
  displayTime();
  toggleIcon();
}

// Calculate and Display Time
function calcTime(audioInSec) {
  const mins = `${Math.floor(audioInSec / 60)}`.padStart(2, 0);
  const secs = `${Math.floor(audioInSec % 60)}`.padStart(2, 0);

  // Print Time
  if (audioInSec === audio.duration) progressDuration.textContent = `${mins}:${secs}`;
  if (audioInSec === audio.currentTime) {
    min.textContent = mins;
    sec.textContent = secs;
  }
}

function displayTime() {
  //Static (redundant in nextSong())
  calcTime(audio.duration);

  // Dynamic
  audio.addEventListener('timeupdate', () => {
    calcTime(audio.currentTime);
    bar.setAttribute('value', (audio.currentTime / audio.duration) * 100);
  });
}

// Toggle Icons
function toggleIcon() {
  if (audio.paused) play.innerHTML = `<img src="./public/svg/Play_fill.svg" alt="">`;
  else play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// Event listeners
bar.addEventListener('click', function (e) {
  const x = e.offsetX; // get x coordinate
  const getProgress = x / bar.clientWidth;
  const newCurrentTime = getProgress * audio.duration;
  audio.currentTime = newCurrentTime;
});

menuContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('play')) playStop();
  if (e.target.classList.contains('previous') || e.target.classList.contains('next')) nextSong();
});
