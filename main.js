//Menu de navegação
const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");
const tabMenu = document.querySelector(".tab-menu");


const IconVisib = () => {
    let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;

    btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
    btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
}

btnRight.addEventListener("click", () => {
    tabMenu.scrollLeft += 150;
    setTimeout(() => IconVisib(), 50);

});


btnLeft.addEventListener("click", () => {
    tabMenu.scrollLeft -= 150;
    setTimeout(() => IconVisib(), 50);

});

window.onload = function () {
    btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";
}

window.onresize = function () {
    btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
    btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";

    let scrollLeftValue = Math.round(tabMenu.scrollLeft);
    btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
}

// Função para rolar o menu de navegação para a esquerda
function scrollMenuLeft() {
    tabMenu.scrollLeft -= 150;
    setTimeout(() => IconVisib(), 50);
}

// Função para rolar o menu de navegação para a direita
function scrollMenuRight() {
    tabMenu.scrollLeft += 150;
    setTimeout(() => IconVisib(), 50);
}

// Evento de rolagem da página
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var tabNav = document.getElementById('tabNav');
    var tabNavPosition = tabNav.offsetTop;
    if (scrollPosition > tabNavPosition) {
        scrollMenuRight();
    } else {
        scrollMenuLeft();
    }
});


window.addEventListener('scroll', function() {
    var tabNav = document.getElementById('tabNav');
    var scrollPosition = window.scrollY;
    
    if (scrollPosition > tabNav.offsetTop) {
        tabNav.classList.add('fixed');
    } else {
       
        tabNav.classList.remove('fixed');
    }
});

//----------------------------------------------------------------------


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para encontrar o botão de navegação correspondente à seção atualmente visível
function findActiveTabButton() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    let activeButton = null;

    tabButtons.forEach(button => {
        const sectionId = button.querySelector('a').getAttribute('href');
        const section = document.querySelector(sectionId);

        if (isElementInViewport(section)) {
            activeButton = button;
        }
    });

    return activeButton;
}

// Função para rolar o menu de navegação para a seção atualmente visível
function scrollToActiveTabButton() {
    const activeButton = findActiveTabButton();
    if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Evento de rolagem da página
window.addEventListener('scroll', scrollToActiveTabButton);

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
// Função para ativar o botão de navegação correspondente com base na posição da página
function activateTabButton() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.classList.remove('active');

        const sectionId = button.querySelector('a').getAttribute('href');
        const section = document.querySelector(sectionId);

        if (isElementInViewport(section)) {
            button.classList.add('active');
        }
    });

    // Se for um dispositivo móvel, aplicar estilo para permitir a rolagem horizontal do menu de navegação
    if (isMobileDevice()) {
        const navigationMenu = document.querySelector('.navigation-menu');
        if (navigationMenu) {
            navigationMenu.style.overflowX = 'auto';
            navigationMenu.style.whiteSpace = 'nowrap';
        }
    }
}



// Adiciona um event listener para verificar a posição da página sempre que a página for rolada
window.addEventListener('scroll', activateTabButton);
window.addEventListener('load', activateTabButton);

//----------------------------------------------------------------------------------------------------------------------------------------//
//Botão de UP pagina

window.addEventListener('scroll', function () {
    let scroll = document.querySelector('.up-btn')
    scroll.classList.toggle('active', window.scrollY > 450)
})

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//Promoções 

function carregarPromocaoPorDiaDaSemana() {
    const data = new Date();
    const diaDaSemana = data.getDay(); 
    document.getElementById('promocao-container').innerHTML = '';
    document.getElementById('promocao-text').innerHTML = '';

    switch (diaDaSemana) {
        case 2: // Terça-feira
            document.getElementById('promocao-text').innerText = 'Promoções - Terça a quinta';
            carregarConteudoDaPagina('./pages/promocao1.html');
            break;
        case 3: // quarta
            document.getElementById('promocao-text').innerText = 'Promoções - Terça a quinta';
            carregarConteudoDaPagina('./pages/promocao1.html');
            break;
        case 4: // Quinta-feira
            document.getElementById('promocao-text').innerText = 'Promoções - Terça a quinta';
            carregarConteudoDaPagina('./pages/promocao1.html');
            break;
            default:
            document.getElementById('promocao-btn').querySelector('a').innerText = 'Drinks';
            document.getElementById('promocao-btn').querySelector('a').setAttribute('href', '#promocao-text');
            document.getElementById('promocao-container').innerHTML = '';
            document.getElementById('promocao-img').src = './assets/alcool.png';
            carregarConteudoDaPagina('./pages/drinks.html');
            document.getElementById('all-drinks-container').style.display = 'none';
            document.getElementById('drink-btn').style.display = 'none';

            document.getElementById('promocao-text').innerText = 'Drinks';
            break;
    }
}

function carregarConteudoDaPagina(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('promocao-container').innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", url, true);

    xhttp.send();
}

carregarPromocaoPorDiaDaSemana();

window.onload = function () {
    carregarPromocaoPorDiaDaSemana();
};

function includeHTML(url, containerId) {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
    
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(containerId).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

includeHTML('./pages/destilados.html', 'destilados-container');
includeHTML('./pages/drinks.html', 'drinks-container');
includeHTML('./pages/espetinhos.html', 'espetinhos-container');
includeHTML('./pages/caldinhos.html', 'caldinhos-container');
includeHTML('./pages/petiscos.html', 'petiscos-container');
includeHTML('./pages/bebidas.html', 'bebidas-container');



