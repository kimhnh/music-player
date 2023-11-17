/* TODO LIST
1. progress bar to match audio.currentTime (logic + css)
*/

document.addEventListener('DOMContentLoaded', () => {
  const coverArt = document.getElementById('coverArt');
  const title = document.querySelector('.title');
  const artist = document.querySelector('.artist');

  const mins = document.querySelector('.mins');
  const secs = document.querySelector('.secs');
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
  let seconds = 0;
  let minutes = 0;

  playBtn.addEventListener('click', playStop);
  nextBtn.addEventListener('click', nextSong);
  previousBtn.addEventListener('click', previousSong);

  // Main menu functions (play/stop, forward, previous)
  function playStop() {
    audio.paused ? audio.play() : audio.pause();
    songDuration(audio.duration);
    audio.addEventListener('timeupdate', (e) => {
      updateTime(audio.currentTime);
    });
  }

  function playSong() {
    audio = new Audio(`${playlist[track].url}`);
    audio.play();
    audio.addEventListener('durationchange', (e) => {
      songDuration(audio.duration);
    });
    audio.addEventListener('timeupdate', (e) => {
      updateTime(audio.currentTime);
    });
    setContent(track);
  }

  function nextSong() {
    if (audio) audio.pause();
    if (track == 0) {
      track++;
    } else if (track == 1) {
      track = 0;
    }
    playSong();
  }

  function previousSong() {
    if (audio) audio.pause();
    if (track == 1) {
      track--;
    } else if (track == 0) {
      track = 1;
    }
    playSong();
  }

  // Time-related functions
  function updateTime(seconds) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    if (seconds < 10) {
      secs.textContent = `0${seconds}`;
    } else if (seconds >= 10 && seconds < 60) {
      secs.textContent = `${seconds}`;
    }

    if (minutes === 1) {
      mins.textContent = `${minutes}`;
    }
  }

  function songDuration(seconds) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    duration.textContent = `${minutes}:${seconds}`;
  }

  // Update page to match current song data
  function setContent(index) {
    coverArt.setAttribute('src', `${playlist[index].thumbnail}`);
    title.textContent = `${playlist[index].title}`;
    artist.textContent = `${playlist[index].artist}`;
  }

  // Fire-up at page load
  setContent(track);
});
