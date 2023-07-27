/* ----- PRELOADER ----- */

if (document.querySelector('.preloader')) {
    document.body.classList.add('modal-open');
    const preloader = document.querySelector('.preloader');
    const animatePreloader = function () {
        preloader.classList.add('loaded');
        preloader.addEventListener('transitionend', () => {
            document.body.classList.remove('modal-open');
            preloader.remove();
        })
    }
    window.addEventListener('load', animatePreloader);
}


/* ----- MAIN MENU ----- */

const header = document.querySelector('.header');
const menu = header.querySelector('.header nav');
const mq = window.matchMedia('(min-width: 40em)');

function configMenu() {
    header.insertAdjacentHTML('beforeend', '<button aria-label="Open Menu" class="menu-link"><img src="../img/icon-menu-open.svg" alt=""></button>');
    menu.insertAdjacentHTML('beforeend', '<button aria-label="Close Menu" class="menu-close"><img src="../img/icon-menu-close.svg" alt=""></button>');
}

function showHideMenu(mql) {
    const menuLink = document.querySelector('.menu-link');
    const menuClose = document.querySelector('.menu-close');
    if (mql.matches) {
        menu.classList.remove('hidden');
        menu.classList.remove('overlay');
        menuLink.classList.add('hidden');
        menuClose.classList.add('hidden');
    } else {
        menu.classList.add('hidden');
        menuLink.classList.remove('hidden');
        menuClose.classList.remove('hidden');
    }
    handleMenuClicks(menuLink,menuClose);
}

function handleMenuClicks(menuLink, menuClose) {
    menuLink.addEventListener('click', function (e) {
        e.preventDefault();
        openMenu();
    });
    menuClose.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
    });
}

function openMenu() {
    menu.classList.add('overlay');
    // wait a bit before revealing menu
    setTimeout(() => {
        menu.classList.add('overlay-transition');
    }, 100)
    // prevent body from scrolling when overlay is open
    document.body.classList.add('modal-open');
}

function closeMenu() {
    menu.classList.remove('overlay-transition');
    // use once option to prevent transitionend from firing when menu is opened
    menu.addEventListener('transitionend', () => {
        menu.classList.remove('overlay');
    }, { once: true })
    // enable body to scroll when overlay is close
    document.body.classList.remove('modal-open');
}

configMenu();
showHideMenu(mq);

// home page links are in-page, so need to close menu first
if (document.querySelector('.page-home')) {
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(function (l) {
        l.addEventListener('click', function () {
            closeMenu();
        })
    })
}

// fallback for browsers (Safari) that don't recognize mq.addEventListener()
if (mq.addEventListener) {
    mq.addEventListener('change', showHideMenu);
} else {
    mq.addListener(showHideMenu);
}


/* ----- GSAP ANIMATIONS ----- */

// header animations
gsap.from('.header a', { y: '5rem', opacity: 0, delay: 0.5, duration: 0.4, rotation: 45, stagger: 0.15 });

// scroll animations
document.querySelector('.card') ? doScrollAnim('.card') : doScrollAnim('.design-details .image-block');

function doScrollAnim(el) {
    ScrollTrigger.batch(el, {
        onEnter: elements => {
            gsap.from(elements, {
                autoAlpha: 0,
                y: '5rem',
                duration: 0.4,
                rotation: 5,
                stagger: 0.15
            });
        }
    });
}

/* ----- CONTROL VIDEO ----- */

if (document.querySelector('figure video')) {
    const figureVideos = document.querySelectorAll('figure video');
    figureVideos.forEach(function (v) {
        v.addEventListener('click', function () {
            if (v.paused) {
                v.play();
            } else {
                v.pause();
            }
        })
    })
}

/* ----- CAROUSEL ----- */

if (document.querySelector('.carousel-block')) {
    const carousel = document.querySelector('.carousel-block');
    const images = carousel.querySelectorAll('.carousel-block .image-block');
    const dots = document.querySelectorAll('.carousel-dot-nav button');
    let currentSlide = 0;
    const showSlide = function (index) {
        images.forEach(image => {
            image.style.display = 'none';
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        images[index].style.display = 'block';
        dots[index].classList.add('active');
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        });
    });
    showSlide(currentSlide);
}

/* ----- ADD COPYRIGHT DATE ----- */

if (document.querySelector('.copydate')) {
    const copydate = document.querySelector('.copydate');
    copydate.textContent = new Date().getFullYear();
}

/* ----- ONLY LOAD VIDEO ON LARGER SCREENS ----- */

if (document.querySelector('video')) {
    // hat tip: https://speakofthedevrel.cloud/2020/01/06/hiding-videos-on-the-mbile-web/
    const videoLocation = document.querySelectorAll('figure video');
    const addAutoplay = function () {
        videoLocation.forEach(function (v) {
            if (window.innerWidth > 640) {
                v.setAttribute('autoplay', '');
                v.play();
            }
        })
    }
    window.addEventListener('load', addAutoplay);
}