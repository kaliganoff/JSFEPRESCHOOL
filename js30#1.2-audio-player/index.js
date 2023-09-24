const audio1 = document.querySelector('.audio1');
const audio2 = document.querySelector('.audio2');
const playButton = document.querySelector('.play');
const progress = document.querySelector('.progress');
const prevTrack = document.querySelector('.prev-track');
const nextTrack = document.querySelector('.next-track');
const cover = document.querySelector('.cover');
const currentTime = document.querySelector('.current');
const duration = document.querySelector('.duration');
const artistName = document.querySelector('.artist-name');
const songName = document.querySelector('.song-name');
const textButton = document.querySelector('.text');
const closeButton = document.querySelector('.close-btn');
const textWindow = document.querySelector('.text-window');

let audio = audio1;

playButton.addEventListener('click', () => {
    if (!playButton.classList.contains('ing')) {
        audio.play();
        playButton.src = 'assets/pause.png';
        playButton.classList.toggle('ing');
    } else {
        audio.pause();
        playButton.src = 'assets/play.png';
        playButton.classList.toggle('ing');
    }
});

progress.addEventListener('change', () => {
    audio.currentTime = progress.value * audio.duration / 100;
    currentTime.textContent = formatTime(audio.currentTime);
});

setInterval(() => {
    progress.value = audio.currentTime * 100 / audio.duration;
    currentTime.textContent = formatTime(audio.currentTime);
    if (audio.ended) {
        switchTrack();
    }
}, 500);

prevTrack.addEventListener('click', switchTrack);

nextTrack.addEventListener('click', switchTrack);

textButton.addEventListener('click', () => {
    if (audio === audio2)
    textWindow.classList.remove('hidden')
});

document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(textWindow);
    const buttonClick = e.composedPath().includes(textButton);
    if (!click && !buttonClick) {
    close();
    }
})

closeButton.addEventListener('click', close);

function close() {
    textWindow.classList.add('hidden');
}

function switchTrack() {
    audio.pause();
    if (audio === audio1) {
        audio = audio2;
        artistName.textContent = "Bomfunk MC's";
        songName.textContent = 'Freestyler';
        document.body.style.backgroundImage = 'url(assets/FreestylerBackground.jpg';
    } else {
        audio = audio1;
        artistName.textContent = 'Art Tatum';
        songName.textContent = 'Tea For Two';
        document.body.style.backgroundImage = 'url(assets/TeaForTwoBackground.jpg';
    };
    audio.currentTime = 0;
    cover.classList.toggle('freestyler');
    textButton.classList.toggle('no-hover');
    duration.textContent = formatTime(audio.duration);
    if (playButton.classList.contains('ing'))
    audio.play();
}

const formatTime = (time) => {
    let seconds = Math.trunc(time);
    let minutes = Math.trunc(seconds / 60);
    seconds = (seconds - minutes * 60);
    if (seconds < 10)
    seconds = `0${seconds}`;
    return minutes + ':' + seconds;
}