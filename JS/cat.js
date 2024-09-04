document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleLight');
    const body = document.body;

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = 'TURN ON';
        } else {
            toggleButton.textContent = 'TURN OFF';
        }
    });
});