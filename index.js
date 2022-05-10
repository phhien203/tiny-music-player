const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Good Night, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', () => {
   isPlaying ? pauseSong() : playSong();
});

let songIndex = 0;

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    // artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

loadSong(songs[songIndex]);

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function calculateDurationTime(duration) {
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    return {
        durationMinutes,
        durationSeconds
    };
}

function calculateCurrentTIme(currentTime) {
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }

    return {
        currentMinutes,
        currentSeconds
    };
}

function updateProgress(e) {
    const { currentTime, duration } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const { durationMinutes, durationSeconds } = calculateDurationTime(duration);

    if (durationMinutes) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const { currentMinutes, currentSeconds } = calculateCurrentTIme(currentTime);

    if (currentSeconds) {
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function updateProgressBar(e) {
    const progressBarWidth = e.target.clientWidth;
    const { duration } = music;
    music.currentTime = (e.offsetX / progressBarWidth) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progressContainer.addEventListener('click', updateProgressBar);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', nextSong);
