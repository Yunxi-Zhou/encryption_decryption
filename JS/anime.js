import PointerParticle from './pointer-particles.js'; // 导入 PointerParticle 类

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let pointer = { x: 0, y: 0, mx: 0, my: 0 };

    // 监听鼠标移动事件
    canvas.addEventListener('mousemove', (event) => {
        const { clientX, clientY, movementX, movementY } = event;
        pointer.x = clientX;
        pointer.y = clientY;
        pointer.mx = movementX;
        pointer.my = movementY;

        // 创建一个新的粒子
        particles.push(new PointerParticle(30, 0.5, { ctx, pointer, hue: Math.random() * 360 }));
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 更新和绘制每个粒子
        particles.forEach((particle, index) => {
            particle.update();
            if (particle.size <= 0) {
                particles.splice(index, 1); // 移除消失的粒子
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});





