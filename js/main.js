// Construye la invitación a partir de js/config.js
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DIAS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const $ = (id) => document.getElementById(id);
const setText = (id, txt) => { const el = $(id); if (el) el.textContent = txt; };

document.addEventListener('DOMContentLoaded', () => {
    const fecha = new Date(CONFIG.fecha);
    const dia = fecha.getDate(), mes = MESES[fecha.getMonth()], anio = fecha.getFullYear();
    const fechaLarga = `${dia} de ${cap(mes)} de ${anio}`;

    document.title = `Invitación de Boda - ${CONFIG.nombres}`;
    $('fecha-boda').dateTime = CONFIG.fecha;
    setText('fecha-dia-semana', DIAS[fecha.getDay()].toUpperCase());
    setText('fecha-mes', mes.toUpperCase());
    setText('fecha-dia', String(dia).padStart(2, '0'));
    setText('fecha-anio', anio);

    // 1. Mensaje
    setText('txt-frase', CONFIG.frasePortada);
    setText('txt-mensaje-titulo', CONFIG.mensajeTitulo);
    const mensaje = $('txt-mensaje');
    CONFIG.mensajeInvitacion.split(/\r?\n/).forEach(linea => {
        const renglon = document.createElement('span');
        renglon.className = 'mensaje-linea';
        renglon.textContent = linea;
        mensaje.appendChild(renglon);
    });
    setText('txt-fecha-limite', CONFIG.fechaLimiteRSVP);

    // 2. Cuenta regresiva + calendario
    setText('txt-faltan', CONFIG.cuentaRegresiva.titulo);
    renderCalendario(fecha);
    initCountdown(CONFIG.fecha);

    // 3. Lugares
    document.querySelectorAll('.lugar-icon[data-icon]').forEach(el => { el.innerHTML = ICONS[el.dataset.icon] || ''; });
    [['iglesia', CONFIG.iglesia], ['recepcion', CONFIG.recepcion]].forEach(([k, d]) => {
        setText(`txt-${k}-titulo`, d.titulo);
        setText(`txt-${k}-nombre`, d.nombre);
        setText(`txt-${k}-hora`, d.hora);
        setText(`txt-${k}-dir`, d.direccion);
        $(`link-${k}-map`).href = d.urlMapa;
    });

    // 4. Galería (polaroids)
    setText('txt-galeria-titulo', CONFIG.galeriaTitulo);
    const galeria = $('gallery-container');
    CONFIG.galeria.forEach((url, i) => {
        const fig = document.createElement('figure');
        fig.className = `polaroid-g papel g${i % 4}`;
        fig.dataset.torn = '0.5';
        fig.innerHTML = `<span class="cinta cinta-g"></span><img loading="lazy" alt="Nuestra foto" src="${url}"><figcaption></figcaption>`;
        fig.querySelector('figcaption').textContent = CONFIG.galeriaFrases[i];
        galeria.appendChild(fig);
    });

    // 5. Itinerario
    setText('txt-itinerario-titulo', CONFIG.itinerarioTitulo || 'Itinerario');
    const timeline = $('timeline-container');
    CONFIG.itinerario.forEach((item, i) => {
        const lado = i % 2 === 0 ? 'icono-izq' : 'icono-der';
        const div = document.createElement('div');
        div.className = `timeline-item ${lado} fade-in`;
        div.innerHTML = `
            <div class="timeline-icon" aria-hidden="true">${ICONS[item.icono] || ''}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-text"><span class="timeline-event"></span><span class="timeline-time"></span></div>`;
        div.querySelector('.timeline-event').textContent = item.evento;
        div.querySelector('.timeline-time').textContent = item.hora;
        timeline.appendChild(div);
    });

    // 6. Vestimenta + colores reservados
    renderVestimenta(CONFIG.vestimenta);

    // 7. Regalos
    renderRegalos(CONFIG.regalos);

    // 8. Recomendaciones
    renderRecomendaciones(CONFIG.recomendaciones);

    // 9. Cierre
    setText('txt-nombres-footer', CONFIG.nombres);
    setText('txt-cierre', CONFIG.cierre);

    // Pequeña rama decorativa al inicio de cada sección con título
    document.querySelectorAll('#cuenta-regresiva, #galeria, #itinerario, #vestimenta, #regalos, #recomendaciones, #rsvp').forEach(sec => {
        sec.querySelector('.contenido').insertAdjacentHTML('afterbegin', '<div class="rama" data-ornament="sprigDivider"></div>');
    });

    // Ornamentos, papel rasgado y animaciones
    pintarOrnamentos();
    aplicarPapelRasgado();
    initScrollAnimations();
});

// ---------------------------------------------------------------------------
// Papel rasgado: genera un contorno irregular (clip-path) para cada [data-torn]
// ---------------------------------------------------------------------------
function aplicarPapelRasgado() {
    const mulberry = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const poligono = (amp, seed) => {
        const R = mulberry(seed), pts = [], j = () => R() * amp;
        const paso = () => 1.6 + R() * 2.6;
        for (let x = 0; x < 100; x += paso()) pts.push([x, j()]);
        for (let y = 0; y < 100; y += paso()) pts.push([100 - j(), y]);
        for (let x = 100; x > 0; x -= paso()) pts.push([x, 100 - j()]);
        for (let y = 100; y > 0; y -= paso()) pts.push([j(), y]);
        return 'polygon(' + pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(',') + ')';
    };
    document.querySelectorAll('[data-torn]').forEach((el, i) => {
        const amp = parseFloat(el.dataset.torn) || 1;
        el.style.setProperty('--clip-a', poligono(amp, 101 + i * 17));
        el.style.setProperty('--clip-b', poligono(amp * 0.8, 733 + i * 31));
    });
}

// ---------------------------------------------------------------------------
// Calendario del mes con el día de la boda marcado
// ---------------------------------------------------------------------------
function renderCalendario(fecha) {
    const cont = $('calendario');
    const cfg = CONFIG.calendario || {};
    const inicio = cfg.inicioSemana ?? 1;
    const y = fecha.getFullYear(), m = fecha.getMonth(), dia = fecha.getDate();
    const iniciales = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const cabecera = Array.from({ length: 7 }, (_, i) => iniciales[(inicio + i) % 7]);
    const vacios = (new Date(y, m, 1).getDay() - inicio + 7) % 7;
    const total = new Date(y, m + 1, 0).getDate();

    let celdas = cabecera.map(d => `<span class="cal-dow">${d}</span>`).join('');
    celdas += '<span class="cal-vacio"></span>'.repeat(vacios);
    for (let d = 1; d <= total; d++) {
        if (d === dia) {
            celdas += `<span class="cal-dia cal-marcado" aria-label="${dia} de ${mes(m)}: día de la boda">
                <svg class="cal-marca" viewBox="0 0 60 60" aria-hidden="true"><path d="M31 5C46 4 57 17 55 32 53 46 42 56 27 54 13 52 4 41 6 27 8 14 19 7 34 9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
                <b>${d}</b>
                <svg class="cal-corazon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.350 10.550 20.030C5.400 15.360 2 12.280 2 8.500 2 5.420 4.420 3 7.500 3c1.740 0 3.410.81 4.500 2.090C13.090 3.810 14.760 3 16.500 3 19.580 3 22 5.420 22 8.500c0 3.780-3.400 6.860-8.550 11.540Z" fill="currentColor"/></svg>
            </span>`;
        } else celdas += `<span class="cal-dia">${d}</span>`;
    }
    const h24 = fecha.getHours(), hora = `${h24 % 12 || 12}:${String(fecha.getMinutes()).padStart(2, '0')} ${h24 >= 12 ? 'PM' : 'AM'}`;
    cont.innerHTML = `
        <span class="cinta cinta-c"></span>
        <p class="cal-mes">${cap(mes(m))} <span>${y}</span></p>
        <div class="cal-grid" role="grid">${celdas}</div>
        <p class="cal-leyenda"><em>${cfg.textoDia || ''}</em> ${cap(DIAS[fecha.getDay()])} ${dia} de ${mes(m)} · ${hora}</p>`;
    function mes(i) { return MESES[i]; }
}

// ---------------------------------------------------------------------------
// Cuenta regresiva
// ---------------------------------------------------------------------------
function initCountdown(targetDateStr) {
    const target = new Date(targetDateStr).getTime();
    const tick = () => {
        const distance = target - Date.now();
        if (distance < 0) {
            clearInterval(interval);
            $('countdown-container').innerHTML = '<h3 class="llego">¡El gran día ha llegado!</h3>';
            return;
        }
        const d = Math.floor(distance / 86400000), h = Math.floor((distance % 86400000) / 3600000),
              mi = Math.floor((distance % 3600000) / 60000), s = Math.floor((distance % 60000) / 1000);
        $('cd-dias').textContent = String(d).padStart(2, '0');
        $('cd-horas').textContent = String(h).padStart(2, '0');
        $('cd-min').textContent = String(mi).padStart(2, '0');
        $('cd-seg').textContent = String(s).padStart(2, '0');
    };
    const interval = setInterval(tick, 1000);
    tick();
}

// ---------------------------------------------------------------------------
// Código de vestimenta + colores reservados
// ---------------------------------------------------------------------------
function renderVestimenta(v) {
    if (!v || v.mostrar === false) return;
    $('vestimenta').hidden = false;
    setText('txt-vestimenta-titulo', v.titulo);
    setText('txt-dresscode', v.codigo);
    setText('txt-dresscode-desc', v.descripcion || '');

    const fig = $('dresscode-fig');
    if (v.imagen) {
        fig.classList.add('imagen-integrada');
        const img = document.createElement('img');
        img.src = v.imagen; img.alt = v.imagenAlt || ''; img.loading = 'lazy';
        fig.appendChild(img);
    } else {
        fig.innerHTML = ICONS.vestimenta;
        fig.classList.add('es-ilustracion');
    }

    const r = v.coloresReservados;
    if (!r || r.mostrar === false || !r.grupos || !r.grupos.length) return;
    const cont = $('colores-reservados');
    cont.hidden = false;
    cont.innerHTML = `<h3 class="reservados-titulo"></h3><p class="reservados-msg"></p><div class="reservados-grupos"></div>`;
    cont.querySelector('.reservados-titulo').textContent = r.titulo || 'Colores reservados';
    cont.querySelector('.reservados-msg').textContent = r.mensaje || '';
    const grupos = cont.querySelector('.reservados-grupos');
    r.grupos.forEach(g => {
        const gDiv = document.createElement('div');
        gDiv.className = 'grupo-color';
        const etiqueta = document.createElement('span');
        etiqueta.className = 'grupo-etiqueta';
        etiqueta.textContent = g.etiqueta || '';
        const muestras = document.createElement('div');
        muestras.className = 'muestras';
        (g.colores || []).forEach(c => {
            const fg = document.createElement('figure');
            fg.className = 'muestra';
            fg.innerHTML = '<span class="circulo"></span><figcaption></figcaption>';
            fg.querySelector('.circulo').style.setProperty('--c', c.hex);
            fg.querySelector('figcaption').textContent = c.nombre || '';
            muestras.appendChild(fg);
        });
        if (g.etiqueta) gDiv.appendChild(etiqueta);
        gDiv.appendChild(muestras);
        grupos.appendChild(gDiv);
    });
}

// ---------------------------------------------------------------------------
// Regalos (sobre / cuenta / enlace)
// ---------------------------------------------------------------------------
function renderRegalos(r) {
    if (!r || r.mostrar === false) return;
    const activas = (r.opciones || []).filter(o => o.activo !== false);
    if (!activas.length && !r.mensaje) return;
    $('regalos').hidden = false;
    $('regalos').querySelectorAll('.icono-seccion[data-icon]').forEach(el => { el.innerHTML = ICONS[el.dataset.icon] || ''; });
    setText('txt-regalos-titulo', r.titulo);
    setText('txt-regalos-mensaje', r.mensaje || '');
    const lista = $('regalos-lista');
    lista.hidden = activas.length === 0;
    if (!activas.length) return;
    lista.dataset.cantidad = activas.length;
    activas.forEach(o => {
        const card = document.createElement('article');
        card.className = 'regalo papel rasgado';
        card.dataset.torn = '0.9';
        const icono = { sobre: 'sobre', cuenta: 'cuenta', enlace: 'regalo' }[o.tipo] || 'regalo';
        card.innerHTML = `<span class="cinta cinta-c"></span><div class="regalo-icono">${ICONS[icono]}</div><h3></h3><p class="regalo-texto"></p>`;
        card.querySelector('h3').textContent = o.titulo || '';
        card.querySelector('.regalo-texto').textContent = o.texto || '';
        if (o.tipo === 'cuenta' && o.datos) {
            const dl = document.createElement('dl');
            dl.className = 'regalo-datos';
            o.datos.forEach(d => {
                const fila = document.createElement('div');
                fila.innerHTML = '<dt></dt><dd></dd>';
                fila.querySelector('dt').textContent = d.etiqueta;
                const dd = fila.querySelector('dd');
                dd.textContent = d.valor;
                if (d.copiar) {
                    const b = document.createElement('button');
                    b.type = 'button'; b.className = 'btn-copiar'; b.textContent = 'Copiar';
                    b.addEventListener('click', async () => {
                        try { await navigator.clipboard.writeText(d.valor); } catch (e) {
                            const t = document.createElement('textarea'); t.value = d.valor; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
                        }
                        b.textContent = '¡Copiado!'; setTimeout(() => b.textContent = 'Copiar', 1800);
                    });
                    dd.appendChild(b);
                }
                dl.appendChild(fila);
            });
            card.appendChild(dl);
        }
        if (o.tipo === 'enlace' && o.url) {
            const a = document.createElement('a');
            a.className = 'btn-outline'; a.href = o.url; a.target = '_blank'; a.rel = 'noopener';
            a.textContent = o.boton || 'Ver';
            card.appendChild(a);
        }
        lista.appendChild(card);
    });
}

// ---------------------------------------------------------------------------
// Recomendaciones (puntualidad)
// ---------------------------------------------------------------------------
function renderRecomendaciones(r) {
    if (!r || r.mostrar === false || !r.items || !r.items.length) return;
    $('recomendaciones').hidden = false;
    setText('txt-recomendaciones-titulo', r.titulo);
    const lista = $('reco-lista');
    r.items.forEach(it => {
        const div = document.createElement('div');
        div.className = 'reco';
        div.innerHTML = `<div class="reco-icono">${ICONS[it.icono] || ''}</div><h3></h3><p></p>`;
        div.querySelector('h3').textContent = it.titulo || '';
        div.querySelector('p').textContent = (it.texto || '').replace('{hora}', CONFIG.iglesia.hora);
        lista.appendChild(div);
    });
}

// ---------------------------------------------------------------------------
// Animaciones al hacer scroll
// ---------------------------------------------------------------------------
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
}
