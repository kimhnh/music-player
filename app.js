const coverArt = document.getElementById('coverArt');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');

const countUp = document.querySelector('.count-up');
const duration = document.querySelector('.duration');
const progress = document.querySelector('.play-progress');

const playBtn = document.getElementById('play');
const forwardBtn = document.getElementById('forward');
const reverseBtn = document.getElementById('reverse');

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

playBtn.addEventListener('click', loadAudio);

function loadAudio() {
  playAudio(0);
}

const audio = new Audio('./assets/lost-in-city-lights-145038.mp3');
function playAudio(index) {
  coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
  title.textContent = `${playlist[index].title}`;
  artist.textContent = `${playlist[index].artist}`;

  return audio.paused ? audio.play() : audio.pause();
}

// Fire-up at page load
function preloadData(index) {
  coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
  title.textContent = `${playlist[index].title}`;
  artist.textContent = `${playlist[index].artist}`;
}

preloadData(0);
