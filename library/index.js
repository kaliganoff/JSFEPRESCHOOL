(function() {
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-container');
const burgerOpen = document.querySelector('.burger-open');
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
}) 
}())

console.log('1. 26/26;\n2. 12/12;\n3. 12/12;\n\nTotal: 50.');