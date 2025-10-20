function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const toggleBtn = document.querySelector('.theme-toggle');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'light') {
        html.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
        if (toggleBtn) toggleBtn.setAttribute('aria-pressed', 'false');
    } else {
        html.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
        if (toggleBtn) toggleBtn.setAttribute('aria-pressed', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    const toggleBtn = document.querySelector('.theme-toggle');

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        if (toggleBtn) toggleBtn.setAttribute('aria-pressed', 'true');
    } else {
        if (toggleBtn) toggleBtn.setAttribute('aria-pressed', 'false');
    }

    // Set dynamic year on all pages with span#current-year
    document.querySelectorAll('#current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Active nav link highlight based on current path
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(a => {
        if (a.getAttribute('href') === path) {
            a.classList.add('active');
        }
    });
});