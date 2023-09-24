const audio1 = document.querySelector('.audio1');
const audio2 = document.querySelector('.audio2');
const playButton = document.querySelector('.play');
const progress = document.querySelector('.progress');
const prevTrack = document.querySelector('.prev-track');
const nextTrack = document.querySelector('.next-track');
const cover = document.querySelector('.cover');
const currentTime = document.querySelector('.current');
const duration = document.querySelector('.duration');

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
}, 500);

prevTrack.addEventListener('click', () => {
    audio.pause();
    if (audio === audio1) {
        audio = audio2;
    } else {
        audio = audio1;
    };
    audio.currentTime = 0;
    cover.classList.toggle('freestyler');
    duration.textContent = formatTime(audio.duration);
    if (playButton.classList.contains('ing'))
    audio.play();
})

nextTrack.addEventListener('click', () => {
    audio.pause();
    if (audio === audio1) {
        audio = audio2;
    } else {
        audio = audio1;
    };
    audio.currentTime = 0;
    cover.classList.toggle('freestyler');
    duration.textContent = formatTime(audio.duration);
    if (playButton.classList.contains('ing'))
    audio.play();
})

const formatTime = (time) => {
    let seconds = Math.trunc(time);
    let minutes = Math.trunc(seconds / 60);
    seconds = (seconds - minutes * 60);
    if (seconds < 10)
    seconds = `0${seconds}`;
    return minutes + ':' + seconds;
}