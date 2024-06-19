// Panggil fungsi checkLogin pada saat halaman dimuat
document.addEventListener('DOMContentLoaded', checkLogin);
// Saat login berhasil
localStorage.setItem('isLoggedIn', 'true');
const APIURL = 'https://api.github.com/users/';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.container');
const counters = document.querySelectorAll('.counter');
const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

let load = 0;
let int = setInterval(blurring, 30);

async function getUser(username) {
    try {
        const response = await axios.get(APIURL + username);
        createUserCard(response.data);
        getRepos(username);
    } catch (err) {
        if (err.response && err.response.status === 404) {
            createErrorCard('Akun Tidak Ditemukan');
        }
    }
}

async function getRepos(username) {
    try {
        const response = await axios.get(APIURL + username + '/repos?sort=created');
        addReposToCard(response.data);
    } catch (err) {
        createErrorCard('Repo Tidak Dapat Ditemukan');
    }
}

function createUserCard(user) {
    const userID = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : '';
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${userID}</h2>
                ${userBio}
                <ul>
                    <li>${user.followers} <strong>Pengikut</strong></li>
                    <li>${user.following} <strong>Mengikuti</strong></li>
                    <li>${user.public_repos} <strong>Repository</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    repos.slice(0, 5).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value.trim();
    if (user) {
        getUser(user);
        search.value = '';
    }
});

function blurring() {
    load++;
    if (load > 99) {
        clearInterval(int);
    }
    if (loadText) {
        loadText.innerText = `${load}%`;
        loadText.style.opacity = scale(load, 0, 100, 1, 0);
    }
    if (bg) {
        bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    }
}

function scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

counters.forEach(counter => {
    counter.innerText = '0';
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;
        const increment = target / 200;
        if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
});

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
        window.location.href = '/login.html';
    }
}