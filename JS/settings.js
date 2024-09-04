document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('changePasswordForm');

    changePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const currentUser = localStorage.getItem('currentUser');

        if (newPassword !== confirmPassword) {
            alert('new password and confirm password do not match');
            return;
        }

        // 获取存储的密码
        const storedPassword = localStorage.getItem(`password_${currentUser}`);
        const initialPassword = currentUser === 'admin1' ? '123456' : '654321';

        if (currentPassword === (storedPassword || initialPassword)) {
            // 更新密码
            localStorage.setItem(`password_${currentUser}`, newPassword);
            alert('change password successfully');
        } else {
            alert('currently using wrong password');
        }
    });
});