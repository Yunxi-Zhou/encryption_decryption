let logoutTimer;

function startLogoutTimer() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'lock.html';
    }, 10 * 60 * 1000); // 10分钟
}

function resetLogoutTimer() {
    startLogoutTimer();
}

document.addEventListener('DOMContentLoaded', () => {
    startLogoutTimer();
    
    // 监听用户活动，重置计时器
    ['click', 'mousemove', 'keypress'].forEach(event => {
        document.addEventListener(event, resetLogoutTimer);
    });
});