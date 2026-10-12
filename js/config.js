// ============================================================================
// CONTENIDO DE LA INVITACIÓN  ·  Aquí se edita todo lo que dice la página
// (colores, tipografías y papel se cambian en css/theme.css)
// ============================================================================
const CONFIG = {
    // ---------- Datos principales ----------
    nombres: "Luis D. y Nelly M.",
    fecha: "2027-01-23T14:30:00",          // Fecha y hora de la ceremonia (YYYY-MM-DDTHH:MM:SS). De aquí salen la cuenta regresiva y el calendario.
    fechaLimiteRSVP: "20 de diciembre",

    // ---------- Mensaje ----------
    frasePortada: "De todos los caminos que pudimos recorrer, elegimos encontrarnos y convertir nuestro amor en hogar.",
    mensajeTitulo: "Una unión bendecida, una alegría compartida",
    mensajeInvitacion: "Hay alegrías que se multiplican cuando se comparten, y esta es una de ellas.\nCon el corazón lleno de felicidad, queremos celebrar este paso tan importante en nuestras vidas, acompañados de quienes han hecho parte de nuestro camino.\nSerá un honor y una inmensa alegría contar con tu presencia en este día tan especial, compartir juntos este momento y crear recuerdos que atesoraremos por siempre.",

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
    galeriaTitulo: "Nuestra Historia",
    galeria: [
        "assets/images/image1.jpeg",
        "assets/images/image2.jpg",
        "assets/images/image3.jpeg",
        "assets/images/image1.jpeg"
    ],
    galeriaFrases: [
        "Nuestros comienzos",
        "Siempre juntos",
        "Nuevas aventuras",
        "Siempre tú y yo"
    ],

    // ---------- Itinerario ----------
    // "icono": iglesia | bienvenida | novios | cena | fiesta | auto  (ver js/icons.js)
    itinerarioTitulo: "Momentos de la Celebración",
    itinerario: [
        { hora: "2:30 PM", evento: "Ceremonia Religiosa",   icono: "iglesia" },
        { hora: "5:00 PM", evento: "Recepción y Coctel",    icono: "bienvenida" },
        { hora: "5:30 PM", evento: "Entrada de los novios", icono: "novios" },
        { hora: "6:00 PM", evento: "Cena",                  icono: "cena" },
        { hora: "7:00 PM", evento: "Fiesta",                icono: "fiesta" },
        { hora: "1:00 AM", evento: "Fin",                   icono: "auto" }
    ],

    // ---------- Código de vestimenta ----------
    vestimenta: {
        mostrar: true,
        titulo: "Código de Vestimenta",
        codigo: "Formal de día / Elegante",
        descripcion: "Queremos verte elegante y cómodo para disfrutar con nosotros de principio a fin.",
        imagen: "assets/images/codigo-vestimenta-pareja.png",
        imagenAlt: "Pareja de novios bailando",

        // Colores reservados. Cada grupo puede tener UNO o VARIOS colores.
        // Para agregar un color, añade otro { nombre, hex } dentro de "colores".
        // Para quitar toda la sección: mostrar: false
        coloresReservados: {
            mostrar: true,
            titulo: "Colores reservados",
            mensaje: "Para que los novios y su cortejo luzcan en las fotos, te pedimos evitar estos colores:",
            grupos: [
                { etiqueta: "Novia",           colores: [ { nombre: "Blanco", hex: "#FFFFFF" }, { nombre: "Marfil", hex: "#F3EAD2" } ] },
                { etiqueta: "Damas de honor",  colores: [ { nombre: "Verde salvia", hex: "#9CAF88" } ] }
            ]
        }
    },

    // ---------- Regalos ----------
    // Cada opción se muestra si "activo" no es false. Tipos: "sobre" | "cuenta" | "enlace"
    regalos: {
        mostrar: true,
        titulo: "Regalos",
        mensaje: "Tu presencia es nuestro mejor regalo. Si además deseas tener un detalle con nosotros, lo recibiremos con todo el cariño.",
        opciones: [
            { tipo: "sobre", activo: true,
              titulo: "Lluvia de sobres",
              texto: "El día de la boda tendremos un buzón dispuesto para recibir tu sobre con cariño." },

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
