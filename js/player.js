window.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const playlistItems = document.querySelectorAll('li.playlist-item');
    /*console.log(playlistItems);*/

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
    });

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="bi bi-volume-mute-fill"></i>' : '<i class="bi bi-volume-up-fill"></i>';
    });

    fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });


    playlistItems.forEach(function (item) {
        item.addEventListener('click', function () {
            /*console.log(item.dataset.videosrc);*/
            video.setAttribute('src', item.dataset.videosrc);
            video.currentTime = 0;
            progressBar.value = 0;
            playlistItems.forEach(function (item) {
                item.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    fetch('./ressources/media.json').then(function (reponse) {
        console.log(reponse);
        return reponse.json();
    }).then(function (data) {
        console.log(data);
        data.map(function (media) {
            console.log(media);

        });
    })

});