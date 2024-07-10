document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;

    // Função para rolar para a seção alvo
    function scrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Função para encontrar a próxima seção com base na direção do scroll
    function getNextSection(currentIndex, direction) {
        if (direction === 'down') {
            return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
        } else if (direction === 'up') {
            return currentIndex > 0 ? sections[currentIndex - 1] : null;
        }
        return null;
    }

    // Função para detectar a seção atual
    function getCurrentSectionIndex() {
        let index = 0;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, i) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                index = i;
            }
        });

        return index;
    }

    // Adiciona um listener para o evento de rotação do mouse
    window.addEventListener('wheel', (event) => {
        if (isScrolling) return;

        const currentIndex = getCurrentSectionIndex();
        let direction = event.deltaY > 0 ? 'down' : 'up';

        const nextSection = getNextSection(currentIndex, direction);
        if (nextSection) {
            isScrolling = true;
            scrollToSection(nextSection);
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    });

    // Adiciona um listener para detectar a mudança de seção com IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 }); // 50% da seção precisa estar visível

    sections.forEach(section => observer.observe(section));

    // Inicializa a rolagem na seção "Introdução" ao carregar
    const introducaoSection = document.getElementById('introducao');
    if (introducaoSection) {
        scrollToSection(introducaoSection);
    }

    const image1 = document.getElementById('gitjs');
    image1.addEventListener('click', function() {
        const url1 = 'https://github.com/ArthurBellato?tab=repositories';
        window.location.href = url1;
    });

    const image2 = document.getElementById('linkedinjs');
    image2.addEventListener('click', function() {
        const url2 = 'https://www.linkedin.com/in/arthur-de-souza-bellato-pereira-095642260/';
        window.location.href = url2;
    });

    // Adicionando funcionalidade de imagem em tela cheia
    const projectImages = document.querySelectorAll('.exs');
    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            const fullScreenDiv = document.createElement('div');
            fullScreenDiv.classList.add('full-screen-image');
            const fullScreenImg = document.createElement('img');
            fullScreenImg.src = image.src;
            fullScreenDiv.appendChild(fullScreenImg);
            document.body.appendChild(fullScreenDiv);

            fullScreenDiv.addEventListener('click', () => {
                document.body.removeChild(fullScreenDiv);
            });
        });
    });
});
