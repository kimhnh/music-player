import {
  playBtn,
  nextBtn,
  previousBtn,
  track,
  playStop,
  nextSong,
  setContent,
} from '../src/script.js';

playBtn.addEventListener('click', playStop);
nextBtn.addEventListener('click', nextSong);
previousBtn.addEventListener('click', nextSong);

// Fire-up at page load
setContent(track);
