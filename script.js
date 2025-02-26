const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const gravity = 0.05;
const friction = 0.99;

// Membuat titik (dot)
class Dot {
    constructor(x, y) {
        this.pos = { x: x, y: y };
        this.vel = { x: 0, y: 0 };
        this.mass = Math.random() * 5 + 1;
        this.radius = this.mass * 2;
        this.color = 'yellow';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.vel.y += gravity * this.mass;
        this.vel.x *= friction;
        this.vel.y *= friction;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        // Pantulan dari bawah
        if (this.pos.y + this.radius > canvas.height) {
            this.pos.y = canvas.height - this.radius;
            this.vel.y *= -1;
        }

        // Batasan di tepi layar
        if (this.pos.x + this.radius > canvas.width || this.pos.x - this.radius < 0) {
            this.vel.x *= -1;
        }

        this.draw();
    }
}

// Membuat banyak titik
function init() {
    dots.length = 0;
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        dots.push(new Dot(x, y));
    }
}

// Animasi frame
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => dot.update());
    requestAnimationFrame(animate);
}

// Resize canvas saat ukuran jendela berubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
