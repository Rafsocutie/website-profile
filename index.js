// music funcitonalities
const prev = document.querySelector('.prev');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const next = document.querySelector('.next');
const audioPlayer = document.getElementById('player');
const progressBar = document.querySelector('.range');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const container = document.querySelector('.container');
const videoPlayer = document.getElementById('videoPlayer');

play.addEventListener('click', () => {
    pause.style.display = 'inline';
    play.style.display = 'none';
    playMusic();
});

pause.addEventListener('click', () => {
    pause.style.display = 'none';
    play.style.display = 'inline';
    stopMusic();
});

next.addEventListener('click', () => {
    nextMusic();
});

prev.addEventListener('click', () => {
    prevMusic();
});

audioPlayer.addEventListener('ended', () => {
    nextMusic();
});

const songs = {
    "Title" : ["Consume", "Swim", "Friends"],
    "Artist" : ["Chase Atlantic", "Chase Atlantic", "Chase Atlantic"],
    "File" : ["Download.mp4", "Swim.mp4", "Friends.mp4"],
    "Video" : ["Video1.mp4", "Video2.mp4", "ja.mp4"]
};

let currentIndex = 0;

function defaultMusic() {
    currentIndex = 0;
    audioPlayer.src = songs.File[currentIndex];
    songTitle.textContent = songs.Title[currentIndex];
    songArtist.textContent = songs.File[currentIndex];
    audioPlayer.play();
    changeBackground();
}

function playMusic() {
    if (!audioPlayer.src.endsWith(songs.File[currentIndex])) {
        audioPlayer.src = songs.File[currentIndex];
    }
    audioPlayer.play();
    changeBackground(true);
}

function stopMusic() {
    audioPlayer.pause();
    changeBackground(false);
}

function nextMusic() {
    if (currentIndex < songs.File.length - 1) {
        currentIndex++;
        audioPlayer.src = songs.File[currentIndex];
        audioPlayer.play();
        songTitle.textContent = songs.Title[currentIndex];
        songArtist.textContent = songs.Artist[currentIndex];
        pause.style.display = 'inline';
        play.style.display = 'none';
        changeBackground(true);
    } else {
        defaultMusic();
        changeBackground(true);
    }
}

function prevMusic() {
    if (currentIndex > 0) {
        currentIndex--;
        audioPlayer.src = songs.File[currentIndex];
        songTitle.textContent = songs.Title[currentIndex];
        songArtist.textContent = songs.Artist[currentIndex];
        audioPlayer.play();
        pause.style.display = 'inline';
        play.style.display = 'none';
        changeBackground(true);
    }
}

audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    } 
});

progressBar.addEventListener('input', () => {
    if (audioPlayer.duration) {
        const newTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    }
});

function changeBackground(showVideo) {
  if (showVideo && songs.Video[currentIndex]) {
    if (!videoPlayer.src.includes(songs.Video[currentIndex])) {
      videoPlayer.src = songs.Video[currentIndex];
    }
    videoPlayer.muted = true;
    videoPlayer.loop = true;
    videoPlayer.style.opacity = 1;
    videoPlayer.play().catch(err => console.log(err));
  } else {
    videoPlayer.pause();
    videoPlayer.style.opacity = 0;
  }
}
