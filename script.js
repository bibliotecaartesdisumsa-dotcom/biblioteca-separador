// script.js - Biblioteca ART&DIS
console.log("📚 Separadores Biblioteca UMSA - Paleta Rosa/Magenta");

// Mostrar un mensaje bonito en consola
const style = "color: #AA2A7A; font-size: 14px; font-weight: bold;";
console.log("%c✨ Biblioteca Especializada Carlos Salazar Mostajo ✨", style);
console.log("%c🎨 Paleta: Blanco rosado | Magenta | Rosa lavanda | Negro profundo | Morado medio", "color: #6D5894");

// Si querés generar QR dinámicamente (opcional)
// Podés mostrar la URL actual para copiar
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    console.log(`🔗 URL para QR: ${currentUrl}`);
    
    // Podés agregar un tooltip o aviso
    const footer = document.querySelector("footer");
    if (footer) {
        const qrHint = document.createElement("div");
        qrHint.style.marginTop = "12px";
        qrHint.style.fontSize = "0.7rem";
        qrHint.style.color = "#AA2A7A";
        qrHint.innerHTML = `📱 Escaneá el QR que generaste con esta URL: <strong>${currentUrl}</strong>`;
        footer.appendChild(qrHint);
    }
});