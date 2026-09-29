// ==========================================
// 1. CÓDIGO DEL CONTADOR
// ==========================================
const targetDate = new Date("April 24, 2027 00:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (difference <= 0) {
        clearInterval(countdown);
        daysEl.innerText = "0";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = hours < 10 ? "0" + hours : hours;
    minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);


// ==========================================
// 2. LÓGICA DE LOS PÉTALOS (NACIMIENTO EN EL ÁRBOL)
// ==========================================
function createHeartDrop() {
    const tree = document.querySelector('.heart-tree');
    const background = document.body; 
    if (!tree || !background) return;

    // Medimos la posición exacta del árbol en pantalla
    const rect = tree.getBoundingClientRect();

    const heart = document.createElement('div');
    heart.classList.add('heart-drop');
    
    const models = ['❤️', '❤️', '❤️', '❤️', '💕'];
    heart.innerText = models[Math.floor(Math.random() * models.length)];
    
    // Nacen de la mitad superior del árbol para asegurar una buena trayectoria de caída
    const startX = rect.left + (Math.random() * rect.width);
    const startY = rect.top + (Math.random() * (rect.height * 0.5));
    
    heart.style.left = startX + "px";
    heart.style.top = startY + "px";
    
    // Velocidades aleatorias de caída (entre 4 y 6 segundos para que se aprecie la espiral)
    const duration = Math.random() * 2 + 4;
    heart.style.animationDuration = duration + "s";
    
    // Tamaños variados
    const size = Math.random() * 8 + 12;
    heart.style.fontSize = size + "px";

    background.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Generar pétalos continuamente cada 120 milisegundos para que sople constante
setInterval(createHeartDrop, 120);

// Generar pétalos continuamente cada 100 milisegundos
setInterval(createHeartDrop, 100);
// Esperamos a que el usuario haga clic en cualquier parte de la página
document.addEventListener('click', function iniciarMusica() {
    const audio = document.getElementById('musica-fondo');
    
    // Bajamos el volumen a la mitad (0.5) para que sea una música de fondo suave
    audio.volume = 0.5; 
    
    // Intentamos reproducir el audio
    audio.play().then(() => {
        console.log("Música de fondo iniciada con éxito.");
        // Una vez que ya está sonando, removemos este "escuchador" para que no intente
        // reiniciar la canción cada vez que el usuario vuelva a hacer clic.
        document.removeEventListener('click', iniciarMusica);
    }).catch(error => {
        console.log("El navegador bloqueó el audio temporalmente:", error);
    });
});
