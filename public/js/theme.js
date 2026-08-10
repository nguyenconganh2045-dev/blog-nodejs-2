const themeButtons = document.querySelectorAll('.theme-btn');
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

function setTheme(theme) {
    const isDark = theme === 'dark';

    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);

    themeButtons.forEach((button) => {
        button.classList.toggle('dark', isDark);
        button.classList.toggle('light', !isDark);
        button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    });

    localStorage.setItem('theme', theme);
}

setTheme(initialTheme);

themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        setTheme(nextTheme);
    });
});
