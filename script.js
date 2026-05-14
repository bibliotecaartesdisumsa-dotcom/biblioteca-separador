/**
 * BIBLIOTECA ART&DIS - UMSA
 * Scripts modernos para experiencia interactiva
 * Paleta: #F9F6F9, #AA2A7A, #C78BB4, #1D131C, #6D5894
 */

// ===== ESPERAR A QUE EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. ANIMACIÓN DE ENTRADA PARA TARJETAS =====
    const cards = document.querySelectorAll('.separator-card, .gallery-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = `all 0.5s ease ${index * 0.05}s`;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => observer.observe(card));
    
    // ===== 2. EFECTO DE PARALLAX EN HERO =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }
    
    // ===== 3. BOTÓN DE SCROLL SUAVE =====
    const scrollButtons = document.querySelectorAll('a[href^="#"]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== 4. EFECTO DE GLOW EN TARJETAS AL HOVER =====
    const cardsGlow = document.querySelectorAll('.separator-card');
    cardsGlow.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // ===== 5. TOOLTIP DINÁMICO PARA ENLACES =====
    const links = document.querySelectorAll('.resource-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('span');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = '🔗 Clic para abrir';
            tooltip.style.cssText = `
                position: fixed;
                background: var(--magenta, #AA2A7A);
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.7rem;
                pointer-events: none;
                z-index: 1000;
                white-space: nowrap;
                font-family: 'Inter', sans-serif;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            `;
            document.body.appendChild(tooltip);
            
            const updateTooltip = (e) => {
                tooltip.style.left = `${e.pageX + 15}px`;
                tooltip.style.top = `${e.pageY - 25}px`;
            };
            
            updateTooltip(event);
            
            link.addEventListener('mousemove', updateTooltip);
            
            link.addEventListener('mouseleave', () => {
                tooltip.remove();
                link.removeEventListener('mousemove', updateTooltip);
            }, { once: true });
        });
    });
    
    // ===== 6. CONTADOR DE VISITAS SIMULADO (EFECTO VISUAL) =====
    const footer = document.querySelector('footer');
    if (footer && !document.querySelector('.visit-counter')) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'visit-counter';
        counterDiv.style.cssText = `
            margin-top: 1rem;
            font-size: 0.7rem;
            opacity: 0.7;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        `;
        counterDiv.innerHTML = `<i class="fas fa-chart-line"></i> Recurso educativo · Biblioteca UMSA`;
        footer.querySelector('.footer-content').appendChild(counterDiv);
    }
    
    // ===== 7. EFECTO DE TIPEO EN TÍTULO HERO =====
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 0.8s ease';
        }, 300);
    }
    
    // ===== 8. MANEJO DE ERRORES DE IMÁGENES =====
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://placehold.co/600x400/6D5894/F9F6F9?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });
    
    // ===== 9. EFECTO DE OLA EN BADGES =====
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // ===== 10. DETECTOR DE TEMA OSCURO/CLARO (opcional) =====
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
        console.log('🌙 Usuario prefiere tema oscuro - mantenemos paleta original');
    }
    
    // ===== 11. MOSTRAR URL ACTUAL PARA QR =====
    const currentUrl = window.location.href;
    console.log(`%c📱 URL para generar QR: ${currentUrl}`, 'color: #AA2A7A; font-weight: bold;');
    
    // Agregar un pequeño indicador en la sección QR si existe
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    if (qrPlaceholder && !document.querySelector('.qr-url-display')) {
        const urlDisplay = document.createElement('div');
        urlDisplay.className = 'qr-url-display';
        urlDisplay.style.cssText = `
            margin-top: 10px;
            font-size: 0.7rem;
            color: var(--morado-medio, #6D5894);
            word-break: break-all;
            text-align: center;
        `;
        urlDisplay.innerHTML = `<i class="fas fa-link"></i> ${currentUrl}`;
        qrPlaceholder.appendChild(urlDisplay);
    }
    
    // ===== 12. EFECTO DE CARGA PROGRESIVA =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    document.body.style.opacity = '0';
    
    // ===== 13. ANIMACIÓN DE NÚMEROS (estadísticas ficticias) =====
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (target && !stat.hasAttribute('data-animated')) {
                        stat.setAttribute('data-animated', 'true');
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }, 20);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    // Buscar elementos con estadísticas (puedes agregarlos después)
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => statsObserver.observe(section));
    
    // ===== 14. MENSAJE DE BIENVENIDA EN CONSOLA =====
    console.log('%c✨ Biblioteca ART&DIS - UMSA ✨', 'color: #AA2A7A; font-size: 16px; font-weight: bold;');
    console.log('%c🎨 Paleta: Blanco rosado | Magenta | Rosa lavanda | Negro profundo | Morado medio', 'color: #6D5894; font-size: 12px;');
    console.log('%c📚 Recursos académicos disponibles para toda la comunidad', 'color: #C78BB4;');
    console.log('%c🔗 https://bibliotecaartesdisumsa-dotcom.github.io/biblioteca-separador', 'color: #AA2A7A; text-decoration: underline;');
    
    // ===== 15. EFECTO DE RESALTADO AL COPIAR URL =====
    const qrDisplay = document.querySelector('.qr-url-display');
    if (qrDisplay) {
        qrDisplay.style.cursor = 'pointer';
        qrDisplay.addEventListener('click', () => {
            navigator.clipboard.writeText(currentUrl).then(() => {
                const originalText = qrDisplay.innerHTML;
                qrDisplay.innerHTML = '<i class="fas fa-check"></i> ¡URL copiada!';
                setTimeout(() => {
                    qrDisplay.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});

// ===== EFECTO DE CARGA INICIAL (preloader visual suave) =====
window.addEventListener('load', () => {
    // Remover cualquier clase de carga si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// ===== FUNCIÓN PARA COPIAR TEXTO (utilidad) =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('📋 ¡Copiado al portapapeles!');
    }).catch(() => {
        showNotification('❌ No se pudo copiar', 'error');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#AA2A7A' : '#1D131C'};
        color: white;
        padding: 10px 20px;
        border-radius: 40px;
        font-size: 0.85rem;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Agregar animaciones CSS adicionales al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Efecto de shimmer para carga */
    .shimmer {
        background: linear-gradient(90deg, #F9F6F9 25%, #C78BB4 50%, #F9F6F9 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    /* Scrollbar personalizada */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--blanco-rosado, #F9F6F9);
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--magenta, #AA2A7A);
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--morado-medio, #6D5894);
    }
`;
document.head.appendChild(styleSheet);