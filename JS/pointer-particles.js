class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 20;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;

        this.init();
    }

    init() {
        document.body.appendChild(this.canvas);
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', (e) => this.updateMousePosition(e));

        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    updateMousePosition(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.addParticle();
    }

    addParticle() {
        const size = Math.random() * 3 + 1;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.particles.push(new Particle(this.mouseX, this.mouseY, size, color));
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);

            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 创建粒子系统实例
const particleSystem = new ParticleSystem();
