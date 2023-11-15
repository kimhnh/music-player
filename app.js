const coverArt = document.getElementById('coverArt');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');

const countUp = document.querySelector('.count-up');
const duration = document.querySelector('.duration');
const progress = document.querySelector('.play-progress');

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

function playStop() {
  audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
  if (audio) audio.pause();
  if (track == 0) {
    track++;
  } else if (track == 1) {
    track = 0;
  }
  audio = new Audio(`${playlist[track].url}`);
  audio.play();
  setContent(track);
}

function previousSong() {
  if (audio) audio.pause();
  if (track == 1) {
    track--;
  } else if (track == 0) {
    track = 1;
  }
  audio = new Audio(`${playlist[track].url}`);
  audio.play();
  setContent(track);
}

playBtn.addEventListener('click', playStop);
nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', previousSong);

// Dynamically update page to match current song
function setContent(index) {
  coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
  title.textContent = `${playlist[index].title}`;
  artist.textContent = `${playlist[index].artist}`;
}

// Fire-up at page load
setContent(track);
