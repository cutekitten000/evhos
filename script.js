// Seleciona todos os slides e botões
const slides = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.nav-btn');
let currentSlide = 0;

// Função para navegar manualmente (clicando nos pontos)
function manualNav(manual) {
    // Remove a classe 'active' de tudo
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    btns.forEach((btn) => {
        btn.classList.remove('active');
    });

    // Adiciona 'active' no índice escolhido
    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
    
    // Atualiza o contador atual para o slide clicado
    currentSlide = manual; 
}

// Função para passar os slides automaticamente
function repeat() {
    let active = document.getElementsByClassName('active');
    let i = 1;

    var repeater = () => {
        setTimeout(function(){
            // Remove active dos atuais
            [...active].forEach((activeSlide) => {
                activeSlide.classList.remove('active');
            });

            // Avança o slide
            currentSlide++; 
            
            // Se chegar no fim, volta para o zero
            if(slides.length == currentSlide){
                currentSlide = 0;
            }

            // Se o slide for maior ou igual ao total, volta pro zero
            if(currentSlide >= slides.length){
                return;
            }

            slides[currentSlide].classList.add('active');
            btns[currentSlide].classList.add('active');
            
            repeater();
        }, 5000); // 5000ms = 5 segundos por slide
    }
    repeater();
}

// Inicia o loop automático
repeat();



const form = document.getElementById('formEvhos');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    const btn = document.querySelector('.btn-enviar');
    const originalText = btn.innerText;
    
    // Muda o texto do botão para avisar que está enviando
    btn.innerText = "ENVIANDO...";
    btn.style.opacity = "0.7";

    // Coleta os dados do formulário
    const formData = new FormData(form);

    // Envia para o FormSubmit (seu email) via AJAX
    fetch("https://formsubmit.co/ajax/danilo.aguiar6757@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Sucesso!
        alert("Sucesso! Sua mensagem foi enviada para a equipe EVHOS.");
        form.reset(); // Limpa os campos
        btn.innerText = originalText; // Volta o botão ao normal
        btn.style.opacity = "1";
    })
    .catch(error => {
        // Erro
        alert("Houve um erro ao enviar. Por favor, tente novamente ou contate-nos pelo WhatsApp.");
        console.log(error);
        btn.innerText = originalText;
        btn.style.opacity = "1";
    });
});


// --- Menu Hambúrguer Mobile ---
const hamburger = document.querySelector('.menu-hamburger');
const navMenu = document.querySelector('.menu-navegacao ul');
const navLinks = document.querySelectorAll('.menu-navegacao a');

// Abre e fecha o menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fecha o menu quando clicar em um link (para não ficar aberto na frente do site)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// --- Dark Mode Toggle com LocalStorage ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// 1. Verificar se já existe preferência salva
const currentTheme = localStorage.getItem('theme');

// Se tiver salvo "dark", aplica a classe logo ao carregar
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

// 2. Evento de Clique no Botão
themeBtn.addEventListener('click', () => {
    // Alterna a classe no body
    body.classList.toggle('dark-mode');

    // Verifica qual o tema atual depois da troca
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
    }

    // Salva no LocalStorage
    localStorage.setItem('theme', theme);
});