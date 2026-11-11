const scenes = Array.from(document.querySelectorAll('.scene'));
const sceneCounter = document.getElementById('sceneCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');
const restartBtn = document.getElementById('restartBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let currentIndex = 0;
let autoplayTimer = null;
let isPlaying = true;

function updateScene(index) {
  currentIndex = (index + scenes.length) % scenes.length;

  scenes.forEach((scene, idx) => {
    scene.classList.toggle('active', idx === currentIndex);
  });

  sceneCounter.textContent = String(currentIndex + 1);
}

function nextScene() {
  updateScene(currentIndex + 1);
  restartAutoplay();
}

function prevScene() {
  updateScene(currentIndex - 1);
  restartAutoplay();
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    updateScene(currentIndex + 1);
  }, 6000);
}

function restartAutoplay() {
  if (isPlaying) startAutoplay();
}

function toggleAutoplay() {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? 'Pause' : 'Play';

  if (isPlaying) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
}

function handleRestart() {
  updateScene(0);
  if (isPlaying) startAutoplay();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

prevBtn.addEventListener('click', prevScene);
nextBtn.addEventListener('click', nextScene);
playBtn.addEventListener('click', toggleAutoplay);
restartBtn.addEventListener('click', handleRestart);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') nextScene();
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') prevScene();
  if (event.key === ' ') {
    event.preventDefault();
    toggleAutoplay();
  }
  if (event.key.toLowerCase() === 'r') handleRestart();
  if (event.key === 'f') toggleFullscreen();
});

updateScene(0);
startAutoplay();
