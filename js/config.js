// ============================================================================
// CONTENIDO DE LA INVITACIÓN  ·  Aquí se edita todo lo que dice la página
// (colores, tipografías y papel se cambian en css/theme.css)
// ============================================================================
const CONFIG = {
    // ---------- Datos principales ----------
    nombres: "Luis D. y Nelly M.",
    fecha: "2027-01-23T14:30:00",          // Fecha y hora de la ceremonia (YYYY-MM-DDTHH:MM:SS). De aquí salen la cuenta regresiva y el calendario.
    fechaLimiteRSVP: "20 de diciembre de 2026",

    // ---------- Mensaje ----------
    frasePortada: "De todos los caminos que pudimos recorrer, elegimos encontrarnos y hacer de nuestro amor un hogar.",
    mensajeTitulo: "Una unión bendecida, una alegría compartida",
    mensajeInvitacion: "Hay alegrías que se hacen más grandes cuando se comparten. Por eso, queremos invitarte a celebrar nuestra boda y este nuevo capítulo de nuestras vidas.\nNos hará muy felices contar con tu presencia y guardar juntos recuerdos inolvidables.",

    // ---------- Cuenta regresiva y calendario ----------
    cuentaRegresiva: { titulo: "Faltan" },
    calendario: {
        inicioSemana: 1,                      // 1 = la semana empieza en lunes · 0 = en domingo
        textoDia: "Nuestro día"               // etiqueta bajo el calendario
    },

    // ---------- Lugares ----------
    iglesia: {
        titulo: "Ceremonia Religiosa",
        nombre: "Iglesia La Plazuela Maria Auxiliadora",
        hora: "2:30 PM",
        direccion: "Via al Neusa, La Plazuela, Cogua, Cundinamarca",
        urlMapa: "https://maps.google.com/?q=Iglesia+La+Plazuela"   // ← reemplazar por el enlace real
    },
    recepcion: {
        titulo: "Recepción",
        nombre: "Finca La Milagrosa - Cogua",
        hora: "5:00 PM",
        direccion: "Via al Neusa, La Plazuela, Cogua, Cundinamarca",
        urlMapa: "https://maps.app.goo.gl/NDUiz6pAUAzsCrSi6"
    },

    // ---------- Galería ----------
    galeriaTitulo: "Siempre Nosotros",
    galeria: [
        "assets/images/image1.jpg",
        "assets/images/image2.jpg",
        "assets/images/image3.jpg",
        "assets/images/image4.jpg"
    ],
    galeriaFrases: [
        "Abrazar la vida contigo",
        "Paso a paso, de tu mano",
        "Mirar en la misma dirección",
        "Sí, acepto"
    ],

    // ---------- Itinerario ----------
    // "icono": iglesia | bienvenida | novios | cena | fiesta | auto  (ver js/icons.js)
    itinerarioTitulo: "Momentos de la Celebración",
    itinerario: [
        { hora: "2:30 PM", evento: "Ceremonia Religiosa",   icono: "iglesia" },
        { hora: "5:00 PM", evento: "Recepción y Coctel",    icono: "bienvenida" },
        { hora: "5:30 PM", evento: "Entrada de los novios", icono: "novios" },
        { hora: "7:00 PM", evento: "Cena",                  icono: "cena" },
        { hora: "9:00 PM", evento: "Fiesta",                icono: "fiesta" },
        { hora: "1:00 AM", evento: "Despedida",     icono: "auto" }
    ],

    // ---------- Código de vestimenta ----------
    vestimenta: {
        mostrar: true,
        titulo: "Código de Vestimenta",
        codigo: "FORMAL / ELEGANTE",
        descripcion: "Ponte tu mejor pinta para celebrar con nosotros.",
        detalles: [
            { etiqueta: "Ellas", texto: "Vestido formal de tarde-noche. Para tu comodidad y debido a las características del lugar, te sugerimos evitar los tacones de puntilla (¡queremos verte en la pista de baile!)." },
            { etiqueta: "Ellos", texto: "Traje formal o smoking." }
        ],
        imagen: "assets/images/codigo-vestimenta-pareja.png",
        imagenAlt: "Pareja de novios bailando",

        // Colores reservados. Cada grupo puede tener UNO o VARIOS colores.
        // Para agregar un color, añade otro { nombre, hex } dentro de "colores".
        // Para quitar toda la sección: mostrar: false
        coloresReservados: {
            mostrar: true,
            titulo: "Colores reservados",
            mensaje: "Estos colores están reservados para nuestra celebración; te agradecemos evitar estos tonos:",
            grupos: [
                { colores: [
                    { nombre: "Blanco", hex: "#FFFFFF" },
                    { nombre: "Azul oscuro", hex: "#1F3A5F" },
                    { nombre: "Verde oliva", hex: "#6B8E23" }
                ] }
            ]
        }
    },

    // ---------- Regalos ----------
    // Cada opción se muestra si "activo" no es false. Tipos: "sobre" | "cuenta" | "enlace"
    regalos: {
        mostrar: true,
        titulo: "Regalos",
        mensaje: "Para nosotros, el mejor regalo es compartir este día con ustedes; su presencia es lo más importante. Para quienes deseen tener un detalle adicional con nosotros, tendremos una lluvia de sobres.",
        opciones: [
            // EJEMPLO de transferencia (cambia "activo" a true y completa los datos)
            { tipo: "cuenta", activo: false,
              titulo: "Transferencia",
              texto: "Si prefieres, puedes hacernos tu regalo por transferencia:",
              datos: [
                  { etiqueta: "Banco",   valor: "Banco / Nequi / Daviplata" },
                  { etiqueta: "Cuenta",  valor: "000 000000 00", copiar: true },
                  { etiqueta: "Titular", valor: "Nombre Apellido" }
              ] },

            // EJEMPLO de lista de regalos online
            { tipo: "enlace", activo: false,
              titulo: "Lista de regalos",
              texto: "También puedes elegir algo de nuestra lista.",
              boton: "Ver lista", url: "https://" }
        ]
    },

    // ---------- Recomendaciones (solo puntualidad) ----------
    // En el texto, {hora} se reemplaza por la hora de la ceremonia.
    recomendaciones: {
        mostrar: true,
        titulo: "Recomendaciones",
        items: [
            { icono: "reloj", titulo: "Puntualidad",
              texto: "Te pedimos llegar con tiempo: la ceremonia comenzará a las {hora} en punto y queremos que no te pierdas ningún momento." }
        ]
    },

    // ---------- Cierre ----------
    cierre: "¡Gracias por ser parte de nuestra historia!",

    // ---------- Multimedia ----------
    musicaUrl: "assets/audio/cancion.mp3"
};
