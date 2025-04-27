const openButton = document.getElementById('openButton');
const birthdayScreen = document.getElementById('birthdayScreen');
const startScreen = document.getElementById('startScreen');
const surpriseButton = document.getElementById('surpriseButton');
const surpriseScreen = document.getElementById('surpriseScreen');
const balloonsContainer = document.getElementById('balloons');

// Confetti Setup
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

for (let i = 0; i < 300; i++) {
  confetti.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 6 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10
  });
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(p => {
    confettiCtx.beginPath();
    confettiCtx.lineWidth = p.r;
    confettiCtx.strokeStyle = p.color;
    confettiCtx.moveTo(p.x, p.y);
    confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt);
    confettiCtx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(p => {
    p.y += Math.cos(p.d) + 1 + p.r/2;
    p.x += Math.sin(p.d);
    p.tilt += Math.sin(p.d) * 2;
    if (p.y > confettiCanvas.height) {
      p.x = Math.random() * confettiCanvas.width;
      p.y = -10;
    }
  });
}

setInterval(drawConfetti, 20);

openButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  birthdayScreen.classList.remove('hidden');
  createBalloons();
});

surpriseButton.addEventListener('click', () => {
  birthdayScreen.classList.add('hidden');
  surpriseScreen.classList.remove('hidden');
});

function createBalloons() {
  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    balloon.style.animationDuration = (5 + Math.random() * 5) + 's';
    balloonsContainer.appendChild(balloon);
  }
}