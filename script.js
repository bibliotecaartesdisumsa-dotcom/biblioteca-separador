/**
 * ============================================
 * BIBLIOTECA CARLOS SALAZAR MOSTAJO - UMSA
 * Diseño moderno naranja
 * Versión: Definitiva 2.0
 * ============================================
 */

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. MENÚ HAMBURGUESA PARA MÓVIL =====
    initMobileMenu();
    
    // ===== 2. SCROLL SUAVE PARA ENLACES INTERNOS =====
    initSmoothScroll();
    
    // ===== 3. ANIMACIONES DE ENTRADA (Intersection Observer) =====
    initScrollAnimations();
    
    // ===== 4. EFECTO NAVBAR AL HACER SCROLL =====
    initNavbarScrollEffect();
    
    // ===== 5. MANEJO DE ERRORES DE IMÁGENES =====
    initImageErrorHandler();
    
    // ===== 6. COPIAR URL (BOTÓN QR) =====
    initCopyUrlButton();
    
    // ===== 7. EFECTO DE CARGA SUAVE =====
    initPageLoadEffect();
    
    // ===== 8. TOOLTIPS PERSONALIZADOS PARA ENLACES =====
    initCustomTooltips();
    
    // ===== 9. CONTADOR DE VISITAS SIMULADO =====
    initVisitCounter();
    
    // ===== 10. MENSAJES DE CONSOLA (personalizados) =====
    consoleMessages();
    
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * 1. MENÚ HAMBURGUESA PARA DISPOSITIVOS MÓVILES
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
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

/**
 * 2. SCROLL SUAVE PARA ENLACES INTERNOS
 */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Validar que no sea solo "#" o esté vacío
            if (!targetId || targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar (opcional)
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * 3. ANIMACIONES DE ENTRADA AL HACER SCROLL
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.platform-card, .collection-card, .service-card, .requirements-card, .research-content, .contact-card'
    );
    
    if (animateElements.length === 0) return;
    
    // Configurar estado inicial
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pequeño retraso para efecto cascada
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
}

/**
 * 4. EFECTO NAVBAR AL HACER SCROLL
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
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

/**
 * 5. MANEJO DE ERRORES DE IMÁGENES
 */
function initImageErrorHandler() {
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://placehold.co/600x400/F05A2B/FFFFFF?text=Imagen+no+disponible';
            this.alt = 'Imagen no disponible';
        });
    });
}

/**
 * 6. COPIAR URL AL PORTAPAPELES (botón QR)
 */
function initCopyUrlButton() {
    const copyBtn = document.getElementById('copyUrlBtn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', async () => {
        const currentUrl = window.location.href;
        
        try {
            await navigator.clipboard.writeText(currentUrl);
            showNotification('✅ ¡URL copiada al portapapeles!', 'success');
            
            // Cambiar texto del botón temporalmente
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ ¡Copiado!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            showNotification('❌ No se pudo copiar la URL', 'error');
        }
    });
    
    // También hacer clickeable el texto del QR
    const qrSmall = document.querySelector('.contact-card small');
    if (qrSmall) {
        qrSmall.style.cursor = 'pointer';
        qrSmall.addEventListener('click', () => {
            const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl);
            showNotification('✅ URL copiada', 'success');
        });
    }
}

/**
 * 7. EFECTO DE CARGA SUAVE DE LA PÁGINA
 */
function initPageLoadEffect() {
    // Ocultar body inicialmente
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

/**
 * 8. TOOLTIPS PERSONALIZADOS PARA ENLACES
 */
function initCustomTooltips() {
    const links = document.querySelectorAll('.platform-link, .resource-link');
    
    links.forEach(link => {
        let tooltip = null;
        
        link.addEventListener('mouseenter', (e) => {
            tooltip = document.createElement('span');
            tooltip.textContent = '🔗 Abrir en nueva pestaña';
            tooltip.style.cssText = `
                position: fixed;
                background: #F05A2B;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.7rem;
                pointer-events: none;
                z-index: 10000;
                white-space: nowrap;
                font-family: 'Inter', sans-serif;
                font-weight: 500;
                box-shadow: 0 2px 10px rgba(0,0,0,0.15);
            `;
            document.body.appendChild(tooltip);
            tooltip.style.left = `${e.pageX + 15}px`;
            tooltip.style.top = `${e.pageY - 25}px`;
        });
        
        link.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.left = `${e.pageX + 15}px`;
                tooltip.style.top = `${e.pageY - 25}px`;
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
}

/**
 * 9. CONTADOR DE VISITAS SIMULADO (EFECTO VISUAL)
 */
function initVisitCounter() {
    const footer = document.querySelector('footer .footer-content');
    if (!footer || document.querySelector('.visit-counter')) return;
    
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
        flex-wrap: wrap;
    `;
    
    // Simular contador de visitas (estático, solo decorativo)
    counterDiv.innerHTML = `
        <i class="fas fa-chart-line"></i>
        Recurso educativo · Biblioteca UMSA 
        <i class="fas fa-circle" style="font-size: 4px;"></i>
        Acceso gratuito
        <i class="fas fa-circle" style="font-size: 4px;"></i>
        +7000 editoriales
    `;
    
    footer.appendChild(counterDiv);
}

/**
 * 10. NOTIFICACIONES EMERGENTES
 */
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
        background: ${type === 'success' ? '#F05A2B' : '#1F2937'};
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

/**
 * 11. MENSAJES PERSONALIZADOS EN CONSOLA
 */
function consoleMessages() {
    const currentUrl = window.location.href;
    
    console.log('%c╔════════════════════════════════════════════════════════════╗', 'color: #F05A2B');
    console.log('%c║     BIBLIOTECA CARLOS SALAZAR MOSTAJO - UMSA              ║', 'color: #F05A2B');
    console.log('%c╠════════════════════════════════════════════════════════════╣', 'color: #F05A2B');
    console.log('%c║  🎨 Diseño moderno · Paleta naranja                        ║', 'color: #FF8A4C');
    console.log('%c║  📚 Recursos académicos para Artes Plásticas y Diseño      ║', 'color: #6B7280');
    console.log('%c║  🔗 URL: ' + currentUrl, 'color: #F05A2B');
    console.log('%c║  📱 Escanea el QR para acceder desde tu celular            ║', 'color: #6B7280');
    console.log('%c╚════════════════════════════════════════════════════════════╝', 'color: #F05A2B');
}

// ============================================
// ANIMACIONES CSS DINÁMICAS
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
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
    
    /* Animación de carga para tarjetas */
    .platform-card, .collection-card, .service-card {
        transition: all 0.3s ease;
    }
    
    /* Efecto hover mejorado para botones */
    .btn-primary, .btn-secondary, .btn-nav {
        transition: all 0.3s ease;
    }
    
    /* Mejora de accesibilidad para focus */
    a:focus, button:focus {
        outline: 2px solid #F05A2B;
        outline-offset: 2px;
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// FUNCIONES ADICIONALES PARA MEJOR EXPERIENCIA
// ============================================

/**
 * Prevenir envío de formularios vacíos (si existen en el futuro)
 */
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

/**
 * Efecto de resaltado al hacer clic en enlaces de plataformas
 */
document.addEventListener('DOMContentLoaded', () => {
    const platformLinks = document.querySelectorAll('.platform-link');
    platformLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`🔗 Abriendo: ${this.textContent}`);
        });
    });
});

/**
 * Mostrar año actual en el footer si es necesario
 */
document.addEventListener('DOMContentLoaded', () => {
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        if (!copyright.textContent.includes(year)) {
            copyright.textContent = copyright.textContent.replace('2025', year);
        }
    }
});

// ============================================
// EXPORTAR FUNCIONES PARA DEBUG (opcional)
// ============================================
if (typeof window !== 'undefined') {
    window.bibliotecaScripts = {
        showNotification,
        copyToClipboard: () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            showNotification('✅ URL copiada', 'success');
        }
    };
}

console.log('%c✅ Scripts de Biblioteca ART&DIS cargados correctamente', 'color: #10B981; font-weight: bold;');