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
    // Calcula a posição atual de rolagem da página
    var scrollPosition = window.scrollY;

    // Calcula a posição do menu de navegação
    var tabNav = document.getElementById('tabNav');
    var tabNavPosition = tabNav.offsetTop;

    // Se a posição do scroll for maior que a posição do menu de navegação,
    // rola o menu de navegação para a direita
    if (scrollPosition > tabNavPosition) {
        scrollMenuRight();
    } else {
        // Caso contrário, rola o menu de navegação para a esquerda
        scrollMenuLeft();
    }
});


window.addEventListener('scroll', function() {
    var tabNav = document.getElementById('tabNav');
    var scrollPosition = window.scrollY;

    // Se a posição do scroll for maior que a altura inicial do menu
    // Adiciona a classe "fixed" ao menu
    if (scrollPosition > tabNav.offsetTop) {
        tabNav.classList.add('fixed');
    } else {
        // Caso contrário, remove a classe "fixed"
        tabNav.classList.remove('fixed');
    }
});

//----------------------------------------------------------------------

// Função para verificar se um elemento está visível na tela
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
    // Obtém todos os botões de navegação
    const tabButtons = document.querySelectorAll('.tab-btn');

    // Itera sobre os botões de navegação
    tabButtons.forEach(button => {
        // Remove a classe ativa de todos os botões de navegação
        button.classList.remove('active');

        // Obtém o ID da seção correspondente ao botão de navegação
        const sectionId = button.querySelector('a').getAttribute('href');
        const section = document.querySelector(sectionId);

        // Verifica se a seção está visível na tela
        if (isElementInViewport(section)) {
            // Adiciona a classe ativa ao botão de navegação correspondente
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
// Ativa o botão de navegação correspondente quando a página é carregada
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
    const diaDaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda-feira, ..., 6 = Sábado
    //const diaDaSemana = 2;
    // Limpa o contêiner de promoção antes de carregar uma nova promoção
    document.getElementById('promocao-container').innerHTML = '';
    document.getElementById('promocao-text').innerHTML = '';

    // Carrega o contêiner de promoção correspondente ao dia da semana
    switch (diaDaSemana) {
        case 2: // Terça-feira
            document.getElementById('promocao-text').innerText = 'Promoções - Terça a quinta';
            // Carrega o conteúdo da página promocao1.html usando AJAX
            carregarConteudoDaPagina('./pages/promocao1.html');
            break;
        case 3: // quarta
            document.getElementById('promocao-text').innerText = 'Promoções - Terça a quinta';
            // Carrega o conteúdo da página promocao1.html usando AJAX
            carregarConteudoDaPagina('./pages/promocao1.html');
            break;
        case 4: // Quinta-feira
            document.getElementById('promocao-text').innerText = 'Promoções - Terça a quinta';
            carregarConteudoDaPagina('./pages/promocao1.html');
            break;
            default: // Para outros dias, você pode adicionar casos adicionais conforme necessário
            // Define o texto do botão de promoção para "Drinks"
            document.getElementById('promocao-btn').querySelector('a').innerText = 'Drinks';
            // Define o atributo href do botão de promoção para a seção de drinks
            document.getElementById('promocao-btn').querySelector('a').setAttribute('href', '#promocao-text');
            // Oculta o contêiner de promoção
            document.getElementById('promocao-container').innerHTML = '';
            // Altera a imagem do elemento
            document.getElementById('promocao-img').src = './assets/alcool.png';
            // Carrega o conteúdo da página de drinks
            carregarConteudoDaPagina('./pages/drinks.html');
            // Oculta o contêiner de todos os drinks
            document.getElementById('all-drinks-container').style.display = 'none';
            // Oculta o botão de drinks
            document.getElementById('drink-btn').style.display = 'none';

            document.getElementById('promocao-text').innerText = 'Drinks';
            break;
    }
}

function carregarConteudoDaPagina(url) {
    // Cria uma instância do objeto XMLHttpRequest
    var xhttp = new XMLHttpRequest();
    // Define a função a ser chamada quando a resposta do servidor estiver pronta
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Atualiza o conteúdo do contêiner com o conteúdo da página
            document.getElementById('promocao-container').innerHTML = this.responseText;
        }
    };
    // Abre uma conexão com a página especificada
    xhttp.open("GET", url, true);
    // Envia a requisição para o servidor
    xhttp.send();
}

// Chama a função para carregar a promoção com base no dia da semana ao carregar a página
carregarPromocaoPorDiaDaSemana();

window.onload = function () {
    carregarPromocaoPorDiaDaSemana();
};

function includeHTML(url, containerId) {
    var xhttp;
    if (window.XMLHttpRequest) {
        // Cria um objeto XMLHttpRequest para navegadores modernos
        xhttp = new XMLHttpRequest();
    } else {
        // Cria um objeto ActiveXObject para navegadores antigos (IE)
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Insere o conteúdo da página HTML no contêiner correspondente
            document.getElementById(containerId).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
// Importar destilados.html e drinks.html nos contêineres correspondentes
includeHTML('./pages/destilados.html', 'destilados-container');
includeHTML('./pages/drinks.html', 'drinks-container');
includeHTML('./pages/espetinhos.html', 'espetinhos-container');
includeHTML('./pages/caldinhos.html', 'caldinhos-container');
includeHTML('./pages/petiscos.html', 'petiscos-container');
includeHTML('./pages/bebidas.html', 'bebidas-container');



