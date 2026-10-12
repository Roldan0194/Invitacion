// Lógica del reproductor de música
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const progress = document.getElementById('music-progress');
    
    // Cargar ruta del audio desde config
    audio.src = CONFIG.musicaUrl;
    audio.volume = 0.5; // Volumen moderado
    audio.load();

    const updateMusicButton = () => {
        const isPlaying = !audio.paused;
        iconPlay.style.display = isPlaying ? 'none' : 'block';
        iconPause.style.display = isPlaying ? 'block' : 'none';
        btnMusic.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
    };

    const updateProgress = () => {
        const duration = audio.duration;
        if (!Number.isFinite(duration) || duration <= 0) {
            progress.disabled = true;
            progress.value = '0';
            progress.style.setProperty('--progress', '0%');
            return;
        }

        const percentage = (audio.currentTime / duration) * 100;
        progress.disabled = false;
        progress.value = String(percentage);
        progress.style.setProperty('--progress', `${percentage}%`);
    };

    audio.addEventListener('play', updateMusicButton);
    audio.addEventListener('pause', updateMusicButton);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('durationchange', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);
    progress.addEventListener('input', () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = (Number(progress.value) / 100) * audio.duration;
            updateProgress();
        }
    });
    audio.addEventListener('error', () => {
        console.error(`No se pudo cargar la música: ${audio.currentSrc}`);
    });

    btnMusic.addEventListener('click', async () => {
        if (!audio.paused) {
            audio.pause();
        } else {
            try {
                await audio.play();
            } catch (error) {
                console.error('No se pudo iniciar la reproducción de música:', error);
            }
        }
    });
});
