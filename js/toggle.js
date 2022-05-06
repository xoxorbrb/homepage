const toggleBtn = document.querySelector('.navbar_toggleBtn');
const link = document.querySelector('.navbar_link');
const menu = document.querySelector('.navbar_menu');

toggleBtn.addEventListener('click', () => {
    link.classList.toggle('c');
    menu.classList.toggle('c');
})