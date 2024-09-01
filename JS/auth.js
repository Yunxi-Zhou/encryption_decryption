document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.querySelector('.login');
    const notebookSection = document.querySelector('.notebook');

    if (isLoggedIn) {
        loginButton.textContent = '登出';
        notebookSection.style.display = 'block';
    } else {
        loginButton.textContent = '登录';
        notebookSection.style.display = 'none';
    }

    loginButton.addEventListener('click', () => {
        if (isLoggedIn) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'lock.html'; // 修改这里，登出后跳转到 lock.html
        } else {
            window.location.href = 'lock.html';
        }
    });
});