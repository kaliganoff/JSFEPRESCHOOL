const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-container');
const burgerOpen = document.querySelector('.burger-open');
const burgerLink = document.querySelectorAll('.nav-list-link');
const icon = document.querySelector('.icon');
const initials = document.querySelector('.initials');
const pagi1 = document.querySelector('#pagi1');
const pagi2 = document.querySelector('#pagi2');
const pagi3 = document.querySelector('#pagi3');
const pagi4 = document.querySelector('#pagi4');
const pagi5 = document.querySelector('#pagi5');
const carousel = document.querySelector('.carousel');
const carretLeft = document.querySelector('#carret-left');
const carretRight = document.querySelector('#carret-right');
const leftCarretButton = document.querySelector('.left-carret-button');
const rightCarretButton = document.querySelector('.right-carret-button');
const favorites = document.querySelector('.favorites');
const seasons = document.querySelectorAll('.season');
const authorization = document.querySelectorAll('.authorization');
const registerForm = document.querySelector('#register-form');
const register = document.querySelector('.register');
const loginWindow = document.querySelector('.log-in');
const profile = document.querySelector('.my-profile');
const closeButton = document.querySelectorAll('.close-btn');
const buyButton = document.querySelectorAll('.buy-button');
const libraryCardForm = document.querySelector('.library-card-form');
const logout = document.querySelector('#logout');
const loginButton = document.querySelector('#login-button');
const registerButton = document.querySelector('#register-button');
const profileButton = document.querySelector('#profile-button');
const profileButton2 = document.querySelector('#profile-button2');
const registerButton2 = document.querySelector('#register-button2');
const loginButton2 = document.querySelector('#login-button2');
const registerButton3 = document.querySelector('#register-button3');
const loginButton3 = document.querySelector('#login-button3');
const overlay = document.querySelector('.overlay');
const profilePic = document.querySelector('.profile-pic');
const profileName = document.querySelector('.profile-name');
const loginForm = document.querySelector('#login-form');
const visitsWritten = document.querySelectorAll('.visits');
const booksWritten = document.querySelectorAll('.books');
const rentedList = document.querySelector('.rented-list');
const cardInput = document.querySelectorAll('.card-input');
const checkCard = document.querySelector('.check-card');
const smallStats = document.querySelector('#small-stats');
const cardNumber = document.querySelector('#card-number');
const buyCard = document.querySelector('.buy-card');
const buyCardForm = document.querySelector('.buy-card-form');
const buyCardFormInputs = document.querySelectorAll('.in-buy-card');
const buyCardFormButton = document.querySelector('.card-button');
const copy = document.querySelector('.copy');
const libraryCardHeader = document.querySelector('.library-card-header');
const getCardHeader = document.querySelector('.get-card');
const getCardInfo = document.querySelector('.get-card-info');
const expiration = document.querySelectorAll('.expiration');
const numberHeader = document.querySelector('#number-header');

let previousSeason = seasons[0];
let fadeInElement = document.querySelector('.favorites-wrapper.winter');
let fadeOutElement;
let carouselVariable = 0;
let isLoggedIn = false;
let hasCard = false;
let visits = 0;
let books = 0;

function login() {
    libraryCardForm.cardnumber.placeholder = localStorage['cardNumber'];
    cardNumber.textContent = localStorage['cardNumber'];
    numberHeader.textContent = localStorage['cardNumber'];
    libraryCardForm.cardnumber.disabled = true;
    libraryCardForm.readersname.placeholder = localStorage['first-name'] + ' ' + localStorage['last-name'];
    libraryCardForm.readersname.disabled = true;
    icon.hidden = true;
    initials.classList.remove('hidden');
    initials.innerHTML = localStorage['first-name'].slice(0, 1).toUpperCase() + localStorage['last-name'].slice(0, 1).toUpperCase();
    initials.title = localStorage['first-name'] + ' ' + localStorage['last-name'];
    profilePic.innerHTML = localStorage['first-name'].slice(0, 1) + localStorage['last-name'].slice(0, 1);
    profileName.innerHTML = localStorage['first-name'] + ' ' + localStorage['last-name'];
    visits++;
    visitsWritten.forEach (visit => visit.textContent = visits);

    buyButton.forEach((button) => {
        if (button.classList.contains('bought')) {
            button.classList.remove('buy-button');
            button.classList.add('own-button');
            button.textContent = 'Own';
            button.disabled = true; 
        }
    });

    cardInput.forEach((input) => {
        input.classList.add('orange');
        input.value = '';
    });

    checkCard.classList.add('hidden');
    smallStats.classList.remove('hidden');
    booksWritten.forEach(book => book.textContent = books);


    registerButton2.classList.add('hidden');
    loginButton2.classList.add('hidden');
    profileButton2.classList.remove('hidden');
    libraryCardHeader.textContent = 'Your Library card';
    getCardHeader.textContent = 'Visit your profile';
    getCardInfo.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
};

function logOut() {
    libraryCardForm.cardnumber.placeholder = 'Card number';
    libraryCardForm.cardnumber.disabled = false;
    libraryCardForm.readersname.placeholder = "Reader's name";
    libraryCardForm.readersname.disabled = false;
    icon.hidden = false;
    initials.classList.add('hidden');
    authorization[1].classList.remove('active');
    
    buyButton.forEach((button) => {
        button.classList.remove('own-button');
        button.classList.add('buy-button');
        button.textContent = 'Buy';
        button.disabled = false;
    });

    cardInput.forEach(input => input.classList.remove('orange'));

    checkCard.classList.remove('hidden');
    smallStats.classList.add('hidden');

    registerButton2.classList.remove('hidden');
    loginButton2.classList.remove('hidden');
    profileButton2.classList.add('hidden');
    libraryCardHeader.textContent = 'Find your Library card';
    getCardHeader.textContent = 'Get a reader card';
    getCardInfo.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
};


(function() {
burger.addEventListener('click', () => {
    nav.classList.add('nav-container-active');
    burger.classList.add('hidden-tablet');
    burger.classList.remove('hidden-desktop');
    burgerOpen.classList.add('burger-open-active');
});
burgerOpen.addEventListener('click', () =>{
    nav.classList.remove('nav-container-active');
    burger.classList.remove('hidden-tablet');
    burger.classList.add('hidden-desktop');
    burgerOpen.classList.remove('burger-open-active');
});
burgerLink.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('nav-container-active');
    burger.classList.remove('hidden-tablet');
    burger.classList.add('hidden-desktop');
    burgerOpen.classList.remove('burger-open-active');
}));
}());

document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(nav);
    const burgerClick = e.composedPath().includes(burger);
    const iconClick = e.composedPath().includes(icon);
    const initialsClick = e.composedPath().includes(initials);
    if (!click && !burgerClick) {
        nav.classList.remove('nav-container-active');
        burger.classList.remove('hidden-tablet');
        burger.classList.add('hidden-desktop');
        burgerOpen.classList.remove('burger-open-active'); 
    };
    const authClick = e.composedPath().includes(authorization[0]);
    const authClick2 = e.composedPath().includes(authorization[1]);
    if (!authClick && !authClick2 && !iconClick && !initialsClick) {
        authorization.forEach(window => window.classList.remove('active'));
    };
});

pagi2.addEventListener('click', () => {
    if (carouselVariable === 0) {
    carousel.classList.add('left');
    carousel.classList.remove('right');
    carouselVariable = 1;
    pagi1.firstElementChild.classList.remove('checked');
    pagi1.disabled = false;
    pagi2.firstElementChild.classList.add('checked');
    pagi2.disabled = true;
    leftCarretButton.disabled = false;
    }
    else if (carouselVariable === 2) {
    carousel.classList.add('right-right');
    carousel.classList.remove('left-left');
    carousel.classList.remove('right3');
    carouselVariable = 1;
    pagi3.firstElementChild.classList.remove('checked');
    pagi3.disabled = false;
    pagi2.firstElementChild.classList.add('checked');
    pagi2.disabled = true;
    }
});

pagi1.addEventListener('click', () => {
    if (carouselVariable === 1) {
    carousel.classList.add('right');
    carousel.classList.remove('left');
    carousel.classList.remove('right-right');
    carouselVariable = 0;
    pagi1.firstElementChild.classList.add('checked');
    pagi1.disabled = true;
    pagi2.firstElementChild.classList.remove('checked');
    pagi2.disabled = false;
    leftCarretButton.disabled = true;
    }
});

pagi3.addEventListener('click', () => {
    if (carouselVariable === 1) {
    carousel.classList.add('left-left');
    carousel.classList.remove('right');
    carousel.classList.remove('right-right');
    carouselVariable = 2;
    pagi3.firstElementChild.classList.add('checked');
    pagi3.disabled = true;
    pagi2.firstElementChild.classList.remove('checked');
    pagi2.disabled = false;
    }
    else if (carouselVariable === 3) {
        carousel.classList.add('right3');
        carousel.classList.remove('left3');
        carousel.classList.remove('right4');
        carouselVariable = 2;
        pagi4.firstElementChild.classList.remove('checked');
        pagi4.disabled = false;
        pagi3.firstElementChild.classList.add('checked');
        pagi3.disabled = true;
    }
});

pagi4.addEventListener('click', () => {
    if (carouselVariable === 2) {
    carousel.classList.add('left3');
    carousel.classList.remove('left-left');
    carousel.classList.remove('right3');
    carouselVariable = 3;
    pagi4.firstElementChild.classList.add('checked');
    pagi4.disabled = true;
    pagi3.firstElementChild.classList.remove('checked');
    pagi3.disabled = false;
    }
    else if (carouselVariable === 4) {
        carousel.classList.add('right4');
        carousel.classList.remove('left4');
        carouselVariable = 3;
        pagi5.firstElementChild.classList.remove('checked');
        pagi5.disabled = false;
        pagi4.firstElementChild.classList.add('checked');
        pagi4.disabled = true;
        rightCarretButton.disabled = false;
    }
});

pagi5.addEventListener('click', () => {
    if (carouselVariable === 3) {
    carousel.classList.add('left4');
    carousel.classList.remove('left3');
    carousel.classList.remove('right4');
    carouselVariable = 4;
    pagi5.firstElementChild.classList.add('checked');
    pagi5.disabled = true;
    pagi4.firstElementChild.classList.remove('checked');
    pagi4.disabled = false;
    rightCarretButton.disabled = true;
    }
});

rightCarretButton.addEventListener('click', () => {
    switch (String(carouselVariable)) {
        case '0':
            carousel.classList.add('left');
            carousel.classList.remove('right');
            carouselVariable = 1;
            pagi1.firstElementChild.classList.remove('checked');
            pagi1.disabled = false;
            pagi2.firstElementChild.classList.add('checked');
            pagi2.disabled = true;
            leftCarretButton.disabled = false;
            break;
        case '1':
            carousel.classList.add('left-left');
            carousel.classList.remove('right');
            carousel.classList.remove('right-right');
            carouselVariable = 2;
            pagi3.firstElementChild.classList.add('checked');
            pagi3.disabled = true;
            pagi2.firstElementChild.classList.remove('checked');
            pagi2.disabled = false;
            break;
        case '2':
            carousel.classList.add('left3');
            carousel.classList.remove('left-left');
            carousel.classList.remove('right3');
            carouselVariable = 3;
            pagi4.firstElementChild.classList.add('checked');
            pagi4.disabled = true;
            pagi3.firstElementChild.classList.remove('checked');
            pagi3.disabled = false;
            break;
        case '3':
            carousel.classList.add('left4');
            carousel.classList.remove('left3');
            carousel.classList.remove('right4');
            carouselVariable = 4;
            pagi5.firstElementChild.classList.add('checked');
            pagi5.disabled = true;
            pagi4.firstElementChild.classList.remove('checked');
            pagi4.disabled = false;
            rightCarretButton.disabled = true;
            break;
    }
});

leftCarretButton.addEventListener('click', () => {
    switch (String(carouselVariable)) {
        case '1':
            carousel.classList.add('right');
            carousel.classList.remove('left');
            carousel.classList.remove('right-right');
            carouselVariable = 0;
            pagi1.firstElementChild.classList.add('checked');
            pagi1.disabled = true;
            pagi2.firstElementChild.classList.remove('checked');
            pagi2.disabled = false;
            leftCarretButton.disabled = true;
            break;
        case '2':
            carousel.classList.add('right-right');
            carousel.classList.remove('left-left');
            carousel.classList.remove('right3');
            carouselVariable = 1;
            pagi3.firstElementChild.classList.remove('checked');
            pagi3.disabled = false;
            pagi2.firstElementChild.classList.add('checked');
            pagi2.disabled = true;
            break;
        case '3':
            carousel.classList.add('right3');
            carousel.classList.remove('left3');
            carousel.classList.remove('right4');
            carouselVariable = 2;
            pagi4.firstElementChild.classList.remove('checked');
            pagi4.disabled = false;
            pagi3.firstElementChild.classList.add('checked');
            pagi3.disabled = true;
            break;
        case '4':
            carousel.classList.add('right4');
            carousel.classList.remove('left4');
            carouselVariable = 3;
            pagi5.firstElementChild.classList.remove('checked');
            pagi5.disabled = false;
            pagi4.firstElementChild.classList.add('checked');
            pagi4.disabled = true;
            rightCarretButton.disabled = false;
            break;
    }
});

seasons.forEach(season => season.addEventListener('click', () => {
    previousSeason.classList.remove('picked');
    season.classList.add('picked');
    previousSeason = season;
    fadeOutElementClass = `.${season.firstElementChild.id}`;
    fadeOutElement = document.querySelector(fadeOutElementClass);
    fadeInElement.classList.remove('fade-out');
    fadeInElement.classList.add('fade-in');
    fadeInElement.addEventListener('animationend' , () => {
        console.log('done');
        fadeInElement.classList.add('hidden');
        fadeOutElement.classList.remove('hidden');
        fadeOutElement.classList.add('fade-out');
        fadeInElement.classList.remove('fade-in');
        fadeInElement = fadeOutElement;
    })
        }));

icon.addEventListener('click', () => {
    if (authorization[0].classList.contains('active') || authorization[1].classList.contains('active')){
        authorization[0].classList.remove('active');
        authorization[1].classList.remove('active');
        }
    else if (!isLoggedIn) {
        authorization[0].classList.add('active');
    }
    else if (isLoggedIn) {
        authorization[1].classList.add('active');
    }
});

initials.addEventListener('click', () => {
    if (authorization[0].classList.contains('active') || authorization[1].classList.contains('active')){
        authorization[0].classList.remove('active');
        authorization[1].classList.remove('active');
        }
    else if (!isLoggedIn) {
        authorization[0].classList.add('active');
    }
    else if (isLoggedIn) {
        authorization[1].classList.add('active');
    }
});

registerForm.addEventListener('submit', (event) => {
event.preventDefault();
localStorage['first-name'] = registerForm['first-name'].value;
localStorage['last-name'] = registerForm['last-name'].value;
localStorage['email'] = registerForm['email'].value;
localStorage['password'] = registerForm['password'].value;
localStorage['cardNumber'] = (Math.random() * 10000000000000000).toString(16).slice(0, 9).toUpperCase();
isLoggedIn = true;
register.classList.add('hidden');
overlay.classList.add('hidden');

buyButton.forEach((button) => {
    button.classList.remove('bought');
    });

visits = 0;
books = 0;
login();
hasCard = false;
rentedList.innerHTML = '';
});

closeButton.forEach (button => button.addEventListener('click', () => {
    register.classList.add('hidden');
    overlay.classList.add('hidden');
    loginWindow.classList.add('hidden')
    profile.classList.add('hidden');
    buyCard.classList.add('hidden');
}));

overlay.addEventListener('click', () => {
    register.classList.add('hidden');
    overlay.classList.add('hidden');
    loginWindow.classList.add('hidden')
    profile.classList.add('hidden');
    buyCard.classList.add('hidden');
});

logout.addEventListener('click', () => {
    isLoggedIn = false;
    logOut();
});

registerButton.addEventListener('click', () => {
    register.classList.remove('hidden');
    overlay.classList.remove('hidden');
    authorization[0].classList.remove('active');
});

registerButton2.addEventListener('click', () => {
    register.classList.remove('hidden');
    overlay.classList.remove('hidden');
    authorization[0].classList.remove('active');
});

registerButton3.addEventListener('click', () => {
    register.classList.remove('hidden');
    overlay.classList.remove('hidden');
    authorization[0].classList.remove('active');
    loginWindow.classList.add('hidden');
});

loginButton.addEventListener('click', () => {
loginWindow.classList.remove('hidden');
overlay.classList.remove('hidden');
authorization[0].classList.remove('active');
});

loginButton2.addEventListener('click', () => {
    loginWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
    authorization[0].classList.remove('active');
    });

loginButton3.addEventListener('click', () => {
        loginWindow.classList.remove('hidden');
        overlay.classList.remove('hidden');
        authorization[0].classList.remove('active');
        register.classList.add('hidden');
        });

profileButton.addEventListener('click', () => {
    profile.classList.remove('hidden');
    overlay.classList.remove('hidden');
    authorization[1].classList.remove('active');
    });

profileButton2.addEventListener('click', () => {
    profile.classList.remove('hidden');
    overlay.classList.remove('hidden');
    authorization[1].classList.remove('active');
});

buyButton.forEach (button => button.addEventListener('click', () => {
    if (!isLoggedIn) {
        loginWindow.classList.remove('hidden');
        overlay.classList.remove('hidden');
    } else if (isLoggedIn && !hasCard) {
        buyCard.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
    else if (isLoggedIn && hasCard) {
    let bookname = button.parentElement.children[2].innerHTML + ', ' + button.parentElement.children[3].innerHTML.slice(3);
    let li = document.createElement('li');
    books++;
    booksWritten.forEach(book => book.textContent = books);
    rentedList.appendChild(li);
    li.textContent = bookname;
    button.classList.remove('buy-button');
    button.classList.add('own-button');
    button.textContent = 'Own';
    button.disabled = true;
    button.classList.add('bought');
}
}));

loginForm.addEventListener('submit', (event) => {
event.preventDefault();
if ((loginForm.emailcard.value === localStorage['email'] || loginForm.emailcard.value === localStorage['cardNumber']) && loginForm.password.value === localStorage['password']) {
    isLoggedIn = true;
    loginWindow.classList.add('hidden');
    overlay.classList.add('hidden');
    login();
}
});

libraryCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (libraryCardForm.readersname.value === localStorage['first-name'] + ' ' + localStorage['last-name'] && libraryCardForm.cardnumber.value === localStorage['cardNumber']) {
        checkCard.classList.add('hidden');
        smallStats.classList.remove('hidden');
        
        setTimeout(() => {
            checkCard.classList.remove('hidden');
            smallStats.classList.add('hidden');
            cardInput.forEach((input) => {
                input.value = '';
            });
        }, 10000)
    }
});

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(localStorage['cardNumber']);
    alert('The card number has been copied to the cliboard')
});

buyCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (buyCardForm.bankcardnumber.value.length < 16) {
        alert('The bank card number must have 16 digits')
    } else if (expiration[0].value.length < 2 || expiration[1].value.length < 2) {
        alert('The expiration code must have 4 digits')
    } else if (buyCardForm.cvc.value.length < 3) {
        alert('The CVC must have 3 digits')
    } else {
    hasCard = true;
    buyCard.classList.add('hidden');
    overlay.classList.add('hidden');
    }
})

buyCardForm.bankcardnumber.addEventListener('input', () => {
    if (!Number.isInteger(Number(buyCardForm.bankcardnumber.value)) || buyCardForm.bankcardnumber.value.length > 16)    
    buyCardForm.bankcardnumber.value = buyCardForm.bankcardnumber.value.slice(0, -1);

    if (buyCardForm.bankcardnumber.value.includes(' '))
    buyCardForm.bankcardnumber.value = buyCardForm.bankcardnumber.value.replace(/ /g, '');
})

expiration.forEach(input => input.addEventListener('input', () => {
    if (!Number.isInteger(Number(input.value)) || input.value.length > 2)
    input.value = input.value.slice(0, -1);

    if (input.value.includes(''))
    input.value = input.value.replace(/ /g, '');
}))

buyCardForm.cvc.addEventListener('input', () => {
    if (!Number.isInteger(Number(buyCardForm.cvc.value)) || buyCardForm.cvc.value.length > 3)    
    buyCardForm.cvc.value = buyCardForm.cvc.value.slice(0, -1);

    if (buyCardForm.cvc.value.includes(' '))
    buyCardForm.cvc.value = buyCardForm.cvc.value.replace(/ /g, '');
})

buyCardForm.addEventListener('input', () => {
    if (buyCardFormInputs[0].value.length > 0 && buyCardFormInputs[1].value.length > 0 && buyCardFormInputs[2].value.length > 0 && buyCardFormInputs[3].value.length > 0 && buyCardFormInputs[4].value.length > 0 && buyCardFormInputs[5].value.length > 0 && buyCardFormInputs[6].value.length > 0) {
        buyCardFormButton.disabled = false;
        } else {
            buyCardFormButton.disabled = true;
        }
}) 

console.log('1: 50/50;\n2: 49/49;\n3: 49/49;\n4: 76/76\n\nTotal: 224/200');