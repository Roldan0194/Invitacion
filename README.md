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
