

export default class PointerParticle {
    constructor(spread, speed, component) {
        const { ctx, pointer, hue } = component;

        this.ctx = ctx;
        this.x = pointer.x; // 使用鼠标位置初始化粒子的 x 坐标
        this.y = pointer.y; // 使用鼠标位置初始化粒子的 y 坐标
        this.mx = pointer.mx * 0.1;
        this.my = pointer.my * 0.1;
        this.size = Math.random() + 1;
        this.decay = 0.01;
        this.speed = speed * 0.08;
        this.spread = spread * this.speed;
        this.spreadX = (Math.random() - 0.5) * this.spread - this.mx;
        this.spreadY = (Math.random() - 0.5) * this.spread - this.my;
        this.color = `hsl(${hue},90%,60%)`;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    collapse() {
        this.size -= this.decay;
    }

    trail() {
        this.x += this.spreadX * this.size;
        this.y += this.spreadY * this.size;
    }

    update() {
        this.draw();
        this.trail();
        this.collapse();
    }
}

