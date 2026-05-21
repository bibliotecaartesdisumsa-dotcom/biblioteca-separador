/**
 * BIBLIOTECA ART&DIS - UMSA
 * Scripts modernos para diseño naranja
 * Versión corregida y optimizada
 */

// ===== ESPERAR A QUE EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. MENÚ HAMBURGUESA PARA MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Cambiar ícono del menú
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ===== 2. SCROLL SUAVE PARA ENLACES INTERNOS =====
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '' && targetId !== '#recursos' && targetId !== '#programas' && targetId !== '#galeria' && targetId !== '#contacto') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== 3. ANIMACIÓN DE ENTRADA PARA TARJETAS (Intersection Observer) =====
    const animateElements = document.querySelectorAll('.resource-card, .feature-card, .gallery-card, .program-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
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
    
    animateElements.forEach(el => observer.observe(el));
    
    // ===== 4. EFECTO DE PARALLAX EN HERO =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < hero.offsetHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
            }
        });
    }
    
    // ===== 5. NAVBAR SCROLL EFFECT (cambia fondo al hacer scroll) =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
            }
        });
    }
    
    // ===== 6. MANEJO DE ERRORES DE IMÁGENES =====
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://placehold.co/600x400/F05A2B/FFFFFF?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });
    
    // ===== 7. EFECTO HOVER MEJORADO PARA TARJETAS =====
    const cards = document.querySelectorAll('.resource-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // ===== 8. MOSTRAR URL ACTUAL PARA QR =====
    const currentUrl = window.location.href;
    console.log(`%c📱 URL para generar QR: ${currentUrl}`, 'color: #F05A2B; font-weight: bold; font-size: 12px;');
    
    // Agregar URL clickeable en la sección QR
    const qrSmall = document.querySelector('.qr-placeholder small');
    if (qrSmall && qrSmall.textContent.includes('https://')) {
        qrSmall.style.cursor = 'pointer';
        qrSmall.addEventListener('click', () => {
            navigator.clipboard.writeText(currentUrl).then(() => {
                showNotification('✅ ¡URL copiada al portapapeles!', 'success');
            }).catch(() => {
                showNotification('❌ No se pudo copiar la URL', 'error');
            });
        });
    }
    
    // ===== 9. FUNCIÓN DE NOTIFICACIONES =====
    function showNotification(message, type = 'success') {
        // Remover notificaciones existentes
        const oldNotification = document.querySelector('.custom-notification');
        if (oldNotification) oldNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#F05A2B' : '#2D2D2D'};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 0.85rem;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ===== 10. CONTADOR DE VISITAS SIMULADO (efecto visual) =====
    const footer = document.querySelector('footer');
    if (footer && !document.querySelector('.visit-counter')) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'visit-counter';
        counterDiv.style.cssText = `
            margin-top: 1.5rem;
            font-size: 0.7rem;
            opacity: 0.7;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `;
        counterDiv.innerHTML = `<i class="fas fa-chart-line"></i> Recurso educativo · Biblioteca UMSA · Acceso gratuito`;
        const footerContent = footer.querySelector('.footer-content');
        if (footerContent) footerContent.appendChild(counterDiv);
    }
    
    // ===== 11. EFECTO DE RESALTADO EN ENLACES DE RECURSOS =====
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // No prevenir default, solo registrar el clic
            console.log(`🔗 Accediendo a: ${this.getAttribute('href')}`);
        });
    });
    
    // ===== 12. ANIMACIÓN DE NÚMEROS (opcional - para futuras estadísticas) =====
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(stat => {
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
    
    // Buscar elementos con estadísticas (si existen en el futuro)
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => statsObserver.observe(section));
    
    // ===== 13. MENSAJE DE BIENVENIDA EN CONSOLA =====
    console.log('%c🔥 Biblioteca ART&DIS - UMSA 🔥', 'color: #F05A2B; font-size: 16px; font-weight: bold;');
    console.log('%c🎨 Diseño moderno · Paleta naranja · Acceso libre', 'color: #FF8A4C; font-size: 12px;');
    console.log('%c📚 Recursos académicos para Artes Plásticas, Diseño Gráfico y Música', 'color: #6B7280;');
    console.log('%c🔗 ' + currentUrl, 'color: #F05A2B; text-decoration: underline;');
    
    // ===== 14. PREVENIR QUE EL FORMULARIO (si existe) SE ENVÍE VACÍO =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let empty = false;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    empty = true;
                    input.style.borderColor = '#F05A2B';
                } else {
                    input.style.borderColor = '';
                }
            });
            if (empty) {
                e.preventDefault();
                showNotification('⚠️ Por favor completa los campos requeridos', 'error');
            }
        });
    });
    
    // ===== 15. EFECTO DE CARGA SUAVE =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    document.body.style.opacity = '0';
});

// ===== ESTILOS DINÁMICOS PARA ANIMACIONES =====
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Scrollbar personalizada naranja */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #F8F9FA;
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #F05A2B;
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #e04a1a;
    }
    
    /* Selección de texto */
    ::selection {
        background: #F05A2B;
        color: white;
    }
    
    ::-moz-selection {
        background: #F05A2B;
        color: white;
    }
    
    /* Efecto de carga shimmer */
    .shimmer {
        background: linear-gradient(90deg, #F8F9FA 25%, #E5E7EB 50%, #F8F9FA 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(dynamicStyles);