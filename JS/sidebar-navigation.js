document.addEventListener('DOMContentLoaded', () => {
    const sidebarIcons = document.querySelectorAll('.sidebar .icon');

    sidebarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetPage = icon.getAttribute('data-page');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });
});