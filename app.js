const coverArt = document.getElementById('coverArt');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');

const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs');
const duration = document.querySelector('.duration');
const progress = document.querySelector('.play-progress');
let bar = document.getElementById('bar');

const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const previousBtn = document.getElementById('previous');

const playlist = [
  {
    title: 'Lost in the City Lights',
    artist: 'Cosmo Sheldrake',
    thumbnail: './assets/cover-1.png',
    url: './assets/lost-in-city-lights-145038.mp3',
  },
  {
    title: 'Forest Lullaby',
    artist: 'Lesfm',
    thumbnail: './assets/cover-2.png',
    url: './assets/forest-lullaby-110624.mp3',
  },
];

let track = 0;
let audio = new Audio(`${playlist[track].url}`);
let seconds = 0;
let minutes = 0;

playBtn.addEventListener('click', playStop);
nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', nextSong);

// Main menu functions (play/stop)
function playStop() {
  audio.paused ? audio.play() : audio.pause();
  audio.addEventListener('ended', (e) => {
    nextSong();
  });
  songDuration(audio.duration);
  showProgress();
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
  setContent(track);
}

// (forward/previous)
function nextSong() {
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

// Update page to match current song data
function setContent(index) {
  coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
  title.textContent = `${playlist[index].title}`;
  artist.textContent = `${playlist[index].artist}`;
  secs.textContent = '00';
  mins.textContent = '00';
}

// Fire-up at page load
setContent(track);
