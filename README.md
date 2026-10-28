# Invitación de boda · Versión 3 (estilo carta / pergamino)

## ¿Dónde se cambia cada cosa?
| Quiero cambiar…                                   | Archivo            |
|---------------------------------------------------|--------------------|
| **Colores, tipografías, intensidad del papel**    | `css/theme.css`    |
| Textos, fecha, lugares, itinerario, fotos         | `js/config.js`     |
| Código de vestimenta y colores reservados         | `js/config.js` → `vestimenta` |
| Regalos (sobre / transferencia / lista online)    | `js/config.js` → `regalos`    |
| Recomendaciones (hoy solo puntualidad)            | `js/config.js` → `recomendaciones` |
| Íconos e ilustraciones                            | `js/icons.js`, `js/ornaments.js` |
| Diseño y tamaños                                  | `css/styles.css`   |
| Portada del sobre                                 | `index.html`, `js/cover.js`, `assets/images/` |

## Tema (css/theme.css)
- Cambia una tipografía: edita la línea `@import` (Google Fonts) y la variable `--fuente-*` correspondiente.
- Cambia la paleta: edita los hex (`--papel`, `--tinta`, `--acento`, `--cafe`, `--sello`, flores y hojas…).
- `--textura-intensidad`: 0 = papel liso · 1 = normal · 1.6 = muy envejecido.

## Colores reservados (config.js)
Cada grupo admite uno o varios colores:
```js
grupos: [
  { etiqueta: "Novia", colores: [ { nombre: "Blanco", hex: "#FFFFFF" }, { nombre: "Marfil", hex: "#F3EAD2" } ] },
  { etiqueta: "Damas de honor", colores: [ { nombre: "Verde salvia", hex: "#9CAF88" } ] }
]
```
`mostrar: false` oculta la sección. Imagen propia de vestimenta: `vestimenta.imagen = "assets/images/dresscode.png"`.

## Regalos
Opciones con `tipo`: `sobre`, `cuenta` (con botón Copiar) o `enlace`. Actívalas con `activo: true`.

## Calendario y cuenta regresiva
Salen automáticamente de `CONFIG.fecha`. `calendario.inicioSemana`: 1 = lunes, 0 = domingo.

## RSVP
Sin cambios: `CONFIG.urlAppsScript` + `backend/codigo-apps-script.js`.

## Portada del sobre
- La portada es la primera pantalla al abrir `index.html`; el sello permite entrar a la invitación original.
- La invitación aparece 3 segundos después de pulsar el sello, cuando termina la animación del sobre. Con movimiento reducido, la transición es más breve.
- Para mostrar nombres de invitados en la parte superior de la portada, repite el parámetro `nombre` en el enlace: `index.html?nombre=Ana%20Garc%C3%ADa&nombre=Luis%20P%C3%A9rez`. Se mostrarán separados por comas.
- Para reemplazar el sobre cerrado, conserva el nombre `assets/images/sobre-cerrado.png` y sus proporciones. La imagen actual ya tiene transparencia.
- La imagen de sobre abierto es opcional. Cuando esté disponible, guárdala en `assets/images/sobre-abierto.png` y asigna esa ruta al atributo `data-open-src` de la imagen `sobre-imagen--cerrado` en `index.html`. La animación y navegación detectarán el recurso sin cambiar el flujo de apertura.
- El proyecto no requiere compilación. Se puede abrir `index.html` desde un navegador o publicar la carpeta completa en el hosting estático habitual.
