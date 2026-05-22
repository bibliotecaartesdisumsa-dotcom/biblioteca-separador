/**
 * ============================================
 * BIBLIOTECA CARLOS SALAZAR MOSTAJO - UMSA
 * Landing Page de Alto Rendimiento
 * Diseño moderno naranja
 * Versión: 4.0 con Modales
 * ============================================
 */

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todos los módulos
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScrollEffect();
    initImageErrorHandler();
    initCopyUrlButton();
    initPageLoadEffect();
    initCustomTooltips();
    initCounterAnimation();
    initBackToTop();
    initActiveNavHighlight();
    initModals();  // NUEVO: Inicializar modales
    
    // Mensajes de consola
    consoleMessages();
});

// ============================================
// 1. MENÚ HAMBURGUESA PARA MÓVIL
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                nav.style.display = 'flex';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                nav.style.display = '';
            }
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            if (window.innerWidth <= 768) {
                nav.style.display = '';
            }
        });
    });
    
    // Ajustar al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
            nav.style.display = '';
        }
    });
}

// ============================================
// 2. SCROLL SUAVE PARA ENLACES INTERNOS
// ============================================
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (!targetId || targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ============================================
// 3. ANIMACIONES DE ENTRADA AL HACER SCROLL
// ============================================
function initScrollAnimations() {
    // Excluir modales de la animación
    const animateElements = document.querySelectorAll(
        '.platform-card, .service-card, .requirement-card, .research-content, .contact-card'
    );
    
    if (animateElements.length === 0) return;
    
    // Configurar estado inicial
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
}

// ============================================
// 4. EFECTO NAVBAR AL HACER SCROLL
// ============================================
function initNavbarScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// 5. MANEJO DE ERRORES DE IMÁGENES
// ============================================
function initImageErrorHandler() {
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            const text = this.alt || 'Imagen';
            this.src = `https://placehold.co/80x80/F05A2B/FFFFFF?text=${encodeURIComponent(text.substring(0, 10))}`;
        });
    });
}

// ============================================
// 6. COPIAR URL AL PORTAPAPELES (botón QR)
// ============================================
function initCopyUrlButton() {
    const copyBtn = document.getElementById('copyUrlBtn');
    const qrUrlSpan = document.getElementById('qrUrl');
    
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', async () => {
        const currentUrl = window.location.href;
        
        try {
            await navigator.clipboard.writeText(currentUrl);
            showNotification('✅ ¡URL copiada al portapapeles!', 'success');
            
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ ¡Copiado!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            showNotification('❌ No se pudo copiar la URL', 'error');
        }
    });
    
    if (qrUrlSpan) {
        qrUrlSpan.style.cursor = 'pointer';
        qrUrlSpan.addEventListener('click', () => {
            const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl);
            showNotification('✅ URL copiada', 'success');
        });
    }
}

// ============================================
// 7. EFECTO DE CARGA SUAVE DE LA PÁGINA
// ============================================
function initPageLoadEffect() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    });
}

// ============================================
// 8. TOOLTIPS PERSONALIZADOS PARA ENLACES
// ============================================
function initCustomTooltips() {
    const links = document.querySelectorAll('.platform-link, .btn-primary, .btn-secondary, .btn-contact');
    
    let tooltipTimeout;
    
    links.forEach(link => {
        let tooltip = null;
        
        link.addEventListener('mouseenter', (e) => {
            if (window.innerWidth < 768) return;
            
            tooltipTimeout = setTimeout(() => {
                tooltip = document.createElement('span');
                tooltip.textContent = link.classList.contains('platform-link') ? '🔗 Abrir en nueva pestaña' : '📎 Ir a sección';
                tooltip.style.cssText = `
                    position: fixed;
                    background: #F05A2B;
                    color: white;
                    padding: 5px 14px;
                    border-radius: 30px;
                    font-size: 0.7rem;
                    pointer-events: none;
                    z-index: 10000;
                    white-space: nowrap;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    box-shadow: 0 4px 15px rgba(240, 90, 43, 0.3);
                    letter-spacing: 0.3px;
                `;
                document.body.appendChild(tooltip);
                tooltip.style.left = `${e.pageX + 15}px`;
                tooltip.style.top = `${e.pageY - 30}px`;
            }, 300);
        });
        
        link.addEventListener('mousemove', (e) => {
            if (tooltip && window.innerWidth >= 768) {
                tooltip.style.left = `${e.pageX + 15}px`;
                tooltip.style.top = `${e.pageY - 30}px`;
            }
        });
        
        link.addEventListener('mouseleave', () => {
            clearTimeout(tooltipTimeout);
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
}

// ============================================
// 9. ANIMACIÓN DE CONTADORES (estadísticas)
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat span, .stat-circle span');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.hasAttribute('data-counted')) return;
                
                const targetText = element.textContent;
                const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
                
                if (!isNaN(targetNumber) && targetNumber > 0) {
                    element.setAttribute('data-counted', 'true');
                    let current = 0;
                    const increment = targetNumber / 50;
                    const originalText = element.textContent;
                    const hasPlus = originalText.includes('+');
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            element.textContent = hasPlus ? `${targetNumber}+` : targetNumber;
                            clearInterval(timer);
                        } else {
                            element.textContent = hasPlus ? `${Math.floor(current)}+` : Math.floor(current);
                        }
                    }, 25);
                }
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// 10. BOTÓN VOLVER ARRIBA (BACK TO TOP)
// ============================================
function initBackToTop() {
    let backBtn = document.querySelector('.back-to-top');
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.className = 'back-to-top';
        backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 45px;
            height: 45px;
            background: #F05A2B;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(240, 90, 43, 0.3);
            font-size: 1.2rem;
        `;
        document.body.appendChild(backBtn);
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backBtn.style.opacity = '1';
            backBtn.style.visibility = 'visible';
        } else {
            backBtn.style.opacity = '0';
            backBtn.style.visibility = 'hidden';
        }
    });
    
    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backBtn.addEventListener('mouseenter', () => {
        backBtn.style.transform = 'translateY(-3px)';
        backBtn.style.background = '#e04a1a';
    });
    backBtn.addEventListener('mouseleave', () => {
        backBtn.style.transform = 'translateY(0)';
        backBtn.style.background = '#F05A2B';
    });
}

// ============================================
// 11. RESALTAR ENLACE ACTIVO EN NAVBAR
// ============================================
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// 12. MODALES PARA SERVICIOS
// ============================================

// Función para abrir modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar modal
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Inicializar modales
function initModals() {
    // Botones "Ver más" dentro de las tarjetas de servicio
    const modalTriggers = document.querySelectorAll('.service-card .btn-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const serviceCard = trigger.closest('.service-card');
            const modalId = serviceCard ? serviceCard.getAttribute('data-modal') : null;
            if (modalId) {
                openModal(modalId);
            }
        });
    });
    
    // Botones de cerrar (X)
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });
    
    // Cerrar al hacer clic fuera del contenido
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="display: flex"]');
            openModals.forEach(modal => {
                closeModal(modal);
            });
        }
    });
}

// ============================================
// 13. NOTIFICACIONES EMERGENTES
// ============================================
function showNotification(message, type = 'success') {
    const oldNotification = document.querySelector('.custom-notification');
    if (oldNotification) oldNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#F05A2B' : '#1F2937'};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 0.85rem;
        z-index: 10001;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        letter-spacing: 0.3px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 14. MENSAJES PERSONALIZADOS EN CONSOLA
// ============================================
function consoleMessages() {
    const currentUrl = window.location.href;
    
    console.log('%c╔════════════════════════════════════════════════════════════════╗', 'color: #F05A2B');
    console.log('%c║     🎨 BIBLIOTECA CARLOS SALAZAR MOSTAJO - UMSA                ║', 'color: #F05A2B');
    console.log('%c╠════════════════════════════════════════════════════════════════╣', 'color: #F05A2B');
    console.log('%c║  📚 Landing Page con Modales                                   ║', 'color: #FF8A4C');
    console.log('%c║  🟠 Paleta naranja · Diseño moderno · Responsive               ║', 'color: #FF8A4C');
    console.log('%c║  🔗 URL: ' + currentUrl, 'color: #6B7280');
    console.log('%c║  📱 Escanea el QR para acceder desde tu celular                ║', 'color: #6B7280');
    console.log('%c║  💡 Haz clic en "Ver más" para más información de servicios    ║', 'color: #6B7280');
    console.log('%c╚════════════════════════════════════════════════════════════════╝', 'color: #F05A2B');
}

// ============================================
// 15. ANIMACIONES CSS DINÁMICAS
// ============================================
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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
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
    
    /* Smooth scroll */
    html {
        scroll-behavior: smooth;
    }
    
    /* Accesibilidad */
    a:focus, button:focus {
        outline: 2px solid #F05A2B;
        outline-offset: 3px;
    }
    
    /* Transiciones suaves */
    .platform-card, .service-card {
        transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// 16. PREVENIR ENVÍO DE FORMULARIOS VACÍOS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let empty = false;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    empty = true;
                    input.style.borderColor = '#F05A2B';
                    input.style.borderWidth = '2px';
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
});

// ============================================
// EXPORTAR FUNCIONES PARA DEBUG
// ============================================
if (typeof window !== 'undefined') {
    window.bibliotecaScripts = {
        showNotification,
        openModal,
        closeModal,
        copyToClipboard: () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            showNotification('✅ URL copiada', 'success');
        },
        version: '4.0'
    };
}

console.log('%c✅ Scripts de Biblioteca ART&DIS cargados correctamente | Versión 4.0 con Modales', 'color: #10B981; font-weight: bold;');