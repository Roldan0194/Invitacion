/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT
 * 
 * Sigue estos pasos para implementarlo:
 * 1. Ve a Google Drive y crea un nuevo Google Sheets (Hoja de cálculo).
 * 2. En la fila 1, crea las columnas: 
 *    fecha_envio | nombre | asistencia | acompanantes | restricciones | mensaje_novios
 * 3. Ve a Extensiones > Apps Script.
 * 4. Borra el código que haya y pega todo este archivo.
 * 5. Haz clic en "Implementar" (Deploy) > "Nueva implementación".
 * 6. Selecciona tipo "Aplicación web" (Web App).
 * 7. Ejecutar como: "Tú (tu correo)".
 * 8. Quién tiene acceso: "Cualquier persona" (Anyone).
 * 9. Autoriza los permisos requeridos por Google.
 * 10. Copia la URL de la aplicación web que te genera.
 * 11. Pega esa URL en tu archivo js/config.js en la variable `urlAppsScript`.
 */

const sheetName = 'Hoja 1'; // Cambia esto si el nombre de tu hoja inferior es diferente

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(sheetName) || doc.getSheets()[0];
    
    // Obtener datos del request POST (URLSearchParams desde el JS del frontend)
    const data = e.parameter;
    
    // Mapear los campos (deben coincidir con el atributo 'name' del HTML)
    const fechaEnvio = data.fecha_envio || new Date();
    const nombre = data.nombre || '';
    const asistencia = data.asistencia || '';
    const acompanantes = data.acompanantes || '0';
    const restricciones = data.restricciones || '';
    const mensaje = data.mensaje_novios || '';

    // Agregar fila
    sheet.appendRow([fechaEnvio, nombre, asistencia, acompanantes, restricciones, mensaje]);

    // Retornar JSON de éxito. (El navegador lo procesará gracias al manejo de CORS del Apps Script si se hace bien, 
    // o el frontEnd lo manejará de forma silenciosa).
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
