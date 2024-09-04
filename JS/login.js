document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 获取存储的密码
        const storedPassword = localStorage.getItem(`password_${username}`);
        const initialPassword = username === 'admin1' ? '123456' : '654321';

        if (password === (storedPassword || initialPassword)) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            window.location.href = 'main.html';
        } else {
            alert('The username and/or passwords you specified do not match');
        }
    });
});