let root = document.querySelector(':root');
let themeToggle = document.querySelector('#themeToggle');

themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    if (themeToggle.textContent === '🌙')
    {
        themeToggle.textContent = '🔆'
    } else {
        themeToggle.textContent = '🌙'
    }
});
