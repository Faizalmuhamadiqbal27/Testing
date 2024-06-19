document.addEventListener('DOMContentLoaded', () => {
    const loadText = document.querySelector('.loading-text');
    const bg = document.querySelector('.container');
    const counters = document.querySelectorAll('.counter');
    const labels = document.querySelectorAll('.form-control label');
    const loginForm = document.getElementById('login-form');

    let load = 0;
    let int = setInterval(blurring, 30);

    // Animasi label input
    labels.forEach(label => {
        label.innerHTML = label.innerText
            .split('')
            .map((letter, idx) => `<span style="transition-delay:${idx * 100}ms">${letter}</span>`)
            .join('');
    });

    // Fungsi untuk animasi loading
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

    // Fungsi untuk scaling nilai
    function scale(num, in_min, in_max, out_min, out_max) {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }

    // Animasi counter
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

    // Handle submit form login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Username dan password yang valid
        const validUsername = 'admin';
        const validPassword = 'admin123';

        // Validasi username dan password
        if (username === validUsername && password === validPassword) {
            // Redirect ke halaman dashboard
            window.location.href = 'dash.html';
        } else {
            // Tampilkan pesan error
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Username atau password salah';
            errorMessage.classList.add('error-message');
            loginForm.appendChild(errorMessage);

            // Hapus pesan error setelah beberapa detik
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
});
