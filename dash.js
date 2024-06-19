
// Panggil fungsi checkLogin pada saat halaman dimuat
document.addEventListener('DOMContentLoaded', checkLogin);
// Saat login berhasil
localStorage.setItem('isLoggedIn', 'true');

const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)
function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        // Jika tidak ada status login, redirect ke halaman login
        window.location.href = 'index.html';
    }
}
