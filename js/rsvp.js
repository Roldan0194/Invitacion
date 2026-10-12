// Lógica del envío del formulario RSVP hacia Google Sheets
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvp-form');
    const msgDiv = document.getElementById('form-msg');
    const btnSubmit = document.getElementById('btn-submit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Bloquear múltiples envíos
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando...';
        msgDiv.className = 'form-msg';
        msgDiv.style.display = 'none';

        // Recolectar datos
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // Agregar fecha de envío
        data.fecha_envio = new Date().toLocaleString();

        try {
            // Si no hay URL configurada, simular éxito (Modo pruebas)
            if(!CONFIG.urlAppsScript || CONFIG.urlAppsScript.includes('TU_ID_AQUI')) {
                console.log("Datos capturados (Modo prueba local):", data);
                setTimeout(() => {
                    mostrarMensaje("¡Gracias! (Modo prueba: configura tu URL de Apps Script en config.js para guardarlo de verdad)", 'msg-success');
                    form.reset();
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = 'Enviar Confirmación';
                }, 1500);
                return;
            }

            // Enviar a Google Apps Script (usar fetch con no-cors o application/x-www-form-urlencoded)
            const response = await fetch(CONFIG.urlAppsScript, {
                method: 'POST',
                // Google Apps script requiere enviar como URL Encoded para evitar problemas de CORS complejos a veces
                body: new URLSearchParams(data)
            });

            if (response.ok || response.type === 'opaque') { // opaque se da cuando se usa mode: 'no-cors'
                mostrarMensaje('¡Gracias por confirmar tu asistencia!', 'msg-success');
                form.reset();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error("Error al enviar RSVP:", error);
            mostrarMensaje('Hubo un error al enviar tu confirmación. Intenta nuevamente.', 'msg-error');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Enviar Confirmación';
        }
    });

    function mostrarMensaje(texto, clase) {
        msgDiv.textContent = texto;
        msgDiv.className = `form-msg ${clase}`;
        msgDiv.style.display = 'block';
    }
});
