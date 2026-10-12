// Ornamentos decorativos (flores, hojas, sello de cera, matasellos, pueblito…).
// Se dibujan en SVG y toman sus colores de css/theme.css, así que cambian con el tema.
// Uso en el HTML:  <div data-ornament="floralTL"></div>   (main.js los inserta)

const ORNAMENTS = (() => {
    // --- utilidades ---------------------------------------------------------
    const rng = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
    const f = (n) => Math.round(n * 10) / 10;
    const bez = (p, t) => { const u = 1 - t; return [u*u*u*p[0] + 3*u*u*t*p[2] + 3*u*t*t*p[4] + t*t*t*p[6], u*u*u*p[1] + 3*u*u*t*p[3] + 3*u*t*t*p[5] + t*t*t*p[7]]; };
    const ang = (p, t) => { const u = 1 - t; const dx = 3*u*u*(p[2]-p[0]) + 6*u*t*(p[4]-p[2]) + 3*t*t*(p[6]-p[4]); const dy = 3*u*u*(p[3]-p[1]) + 6*u*t*(p[5]-p[3]) + 3*t*t*(p[7]-p[5]); return Math.atan2(dy, dx) * 180 / Math.PI; };
    const svg = (vb, body, cls = '', extra = '') => `<svg class="orn-svg ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ${extra}>${body}</svg>`;

    // --- piezas básicas -----------------------------------------------------
    const leaf = (x, y, len, a, cls = 'o-hoja') => {
        const w = len * 0.32;
        return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><path class="${cls}" d="M0 0C${f(len*.22)} ${f(-w)} ${f(len*.7)} ${f(-w*.95)} ${f(len)} 0C${f(len*.7)} ${f(w*.95)} ${f(len*.22)} ${f(w)} 0 0Z"/><path class="o-vena" d="M2 0L${f(len*.88)} 0"/></g>`;
    };

    const daisy = (x, y, r, rot = 0, n = 14) => {
        let p = '';
        for (let i = 0; i < n; i++) {
            const a = rot + (i * 360) / n;
            p += `<path class="o-petalo" transform="rotate(${f(a)})" d="M0 ${f(-r*.2)}C${f(r*.21)} ${f(-r*.38)} ${f(r*.2)} ${f(-r*.86)} 0 ${f(-r)}C${f(-r*.2)} ${f(-r*.86)} ${f(-r*.21)} ${f(-r*.38)} 0 ${f(-r*.2)}Z"/>`;
            if (i % 2 === 0) p += `<path class="o-vena" transform="rotate(${f(a)})" d="M0 ${f(-r*.34)}L0 ${f(-r*.78)}"/>`;
        }
        let dots = '';
        for (let i = 0; i < 9; i++) { const aa = (i * 40 + rot) * Math.PI / 180; dots += `<circle cx="${f(Math.cos(aa)*r*.15)}" cy="${f(Math.sin(aa)*r*.15)}" r="${f(r*.03)}" fill="#8A6414" opacity=".7"/>`; }
        return `<g transform="translate(${f(x)} ${f(y)})">${p}<circle class="o-centro" r="${f(r*.27)}"/>${dots}</g>`;
    };

    const bud = (x, y, r, a = 0) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><ellipse class="o-boton" cx="0" cy="${f(-r*1.1)}" rx="${f(r*.62)}" ry="${f(r*1.1)}"/><path class="o-caliz" d="M${f(-r*.62)} ${f(-r*.55)}Q0 ${f(r*.3)} ${f(r*.62)} ${f(-r*.55)}Z"/></g>`;

    const berries = (x, y, n, spread, seed) => {
        const R = rng(seed); let s = '';
        for (let i = 0; i < n; i++) s += `<circle class="o-boton" cx="${f(x + (R()-.5)*spread)}" cy="${f(y + (R()-.5)*spread)}" r="${f(2 + R()*2.2)}"/>`;
        return s;
    };

    // Rama con hojas alternas a lo largo de una curva
    const sprig = (p, o = {}) => {
        const { n = 6, len = 28, seed = 1, buds = true, cls = ['o-hoja', 'o-hoja2'] } = o;
        const R = rng(seed);
        let s = `<path class="o-tallo" d="M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}"/>`;
        for (let i = 1; i <= n; i++) {
            const t = 0.1 + (i / (n + 1)) * 0.82;
            const [x, y] = bez(p, t), a = ang(p, t), side = i % 2 ? 1 : -1;
            const L = len * (1.05 - t * 0.35) * (0.82 + R() * 0.36);
            s += leaf(x, y, L, a + side * (34 + R() * 20), cls[i % cls.length]);
            if (buds && i % 3 === 0) { const [bx, by] = bez(p, Math.min(.98, t + .03)); s += bud(bx, by, 3.4, a - side * 70 + 90); }
        }
        const [ex, ey] = [p[6], p[7]], ea = ang(p, 1);
        s += leaf(ex, ey, len * .8, ea, cls[0]);
        if (buds) { s += bud(ex, ey, 4.2, ea + 90 - 40); s += bud(ex, ey, 3.6, ea + 90 + 25); s += bud(ex, ey, 3, ea + 90 + 80); }
        return s;
    };

    // --- composiciones ------------------------------------------------------
    const floralTL = () => svg('0 0 400 420', [
        sprig([-20, 70, 90, 150, 230, 40, 392, 36], { n: 7, len: 36, seed: 3 }),
        sprig([14, 30, 62, 170, -10, 270, 32, 408], { n: 8, len: 32, seed: 8 }),
        sprig([-10, 150, 70, 235, 135, 160, 215, 118], { n: 4, len: 26, seed: 5 }),
        leaf(30, 54, 120, 28, 'o-hoja2'), leaf(60, 110, 100, 62, 'o-hoja'), leaf(130, 70, 90, -8, 'o-hoja2'),
        leaf(10, 200, 70, 24, 'o-hoja'),
        berries(300, 60, 6, 40, 4), berries(140, 190, 5, 40, 2),
        daisy(80, 120, 58, 12), daisy(236, 62, 46, 190, 13), daisy(150, 30, 26, 70, 12), daisy(28, 268, 34, 40, 12), daisy(50, 376, 28, 80, 12), daisy(300, 120, 20, 20, 11)
    ].join(''));

    const floralBL = () => svg('0 0 600 480', [
        sprig([170, 450, 300, 400, 420, 478, 592, 424], { n: 9, len: 34, seed: 11 }),
        sprig([150, 470, 120, 350, 40, 250, 50, 110], { n: 7, len: 34, seed: 21 }),
        sprig([150, 470, 150, 330, 150, 200, 142, 60], { n: 6, len: 32, seed: 31 }),
        sprig([150, 470, 172, 360, 230, 262, 258, 150], { n: 6, len: 30, seed: 41 }),
        sprig([150, 470, 90, 430, 40, 392, 0, 334], { n: 4, len: 30, seed: 51 }),
        leaf(130, 410, 150, -150, 'o-hoja2'), leaf(160, 400, 140, -42, 'o-hoja'), leaf(120, 360, 120, -110, 'o-hoja'),
        leaf(190, 420, 120, -20, 'o-hoja2'), leaf(80, 330, 90, -165, 'o-hoja'),
        daisy(66, 150, 54, 20), daisy(152, 262, 46, 100, 13), daisy(256, 178, 36, 60, 12), daisy(146, 92, 30, 10, 12), daisy(22, 300, 22, 40, 11),
        berries(40, 60, 6, 40, 7), berries(300, 100, 5, 40, 8),
        `<path d="M138 446C120 430 112 452 138 458C162 462 168 440 150 434M150 452C180 468 200 470 214 490M144 458C130 476 124 486 120 496" fill="none" stroke="var(--cordel)" stroke-width="3.2" stroke-linecap="round"/>`
    ].join(''));

    // Rama horizontal con simetría (divisor bajo la fecha)
    const sprigDivider = () => {
        const half = sprig([0, 22, 30, 12, 60, 30, 100, 18], { n: 4, len: 18, seed: 14, buds: false });
        return svg('0 0 220 44', `<g transform="translate(110 4)"><g>${half}</g><g transform="scale(-1 1)">${half}</g></g>`, 'orn-divider');
    };

    const dividerHeart = () => svg('0 0 300 24', `<path class="o-linea" d="M8 12H122M178 12H292"/><path d="M150 18.4l-1-.9C144 13 141 10.4 141 7.5 141 5.3 142.8 4 144.6 4c1.9 0 3.5 1 5.4 3 1.9-2 3.500-3 5.400-3C157.200 4 159 5.300 159 7.500c0 2.900-3 5.500-8 10Z" fill="var(--tinta)"/>`, 'orn-divider');

    const sello = () => {
        const R = rng(9); let d = '';
        for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2, r = 46 + R() * 4 + (i % 2 ? 1.5 : 0); d += `${i ? 'L' : 'M'}${f(60 + Math.cos(a) * r)} ${f(60 + Math.sin(a) * r)}`; }
        return svg('0 0 120 120', `
            <defs><radialGradient id="selloGrad" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="var(--sello-claro)"/><stop offset=".7" stop-color="var(--sello)"/><stop offset="1" stop-color="var(--sello-sombra)"/></radialGradient></defs>
            <path d="${d}Z" fill="url(#selloGrad)"/>
            <circle cx="60" cy="60" r="35" fill="none" stroke="var(--sello-sombra)" stroke-opacity=".55" stroke-width="2"/>
            <circle cx="60" cy="60" r="37.500" fill="none" stroke="var(--sello-claro)" stroke-opacity=".5" stroke-width="1"/>
            <path d="M60 80.500 47 68c-6-6-7-12-3-16 4-3.500 10-2.500 14 2l2 2.500 2-2.500c4-4.500 10-5.500 14-2 4 4 3 10-3 16Z" fill="none" stroke="var(--sello-sombra)" stroke-opacity=".7" stroke-width="3" stroke-linejoin="round"/>
            <path d="M60 80.500 47 68c-6-6-7-12-3-16 4-3.500 10-2.500 14 2l2 2.500 2-2.500c4-4.500 10-5.500 14-2 4 4 3 10-3 16Z" fill="none" stroke="var(--sello-claro)" stroke-opacity=".6" stroke-width="1.200" transform="translate(-1 -1)"/>`, 'orn-sello');
    };

    const matasellos = () => svg('0 0 230 130', `
        <g fill="none" stroke="var(--tinta-suave)" stroke-width="2.2" stroke-linecap="round" opacity=".75" filter="url(#aspero)">
            <path d="M2 30q9-6 18 0t18 0 18 0 18 0 18 0"/><path d="M2 46q9-6 18 0t18 0 18 0 18 0 18 0"/><path d="M2 62q9-6 18 0t18 0 18 0 18 0 18 0"/><path d="M2 78q9-6 18 0t18 0 18 0 18 0 18 0"/><path d="M2 94q9-6 18 0t18 0 18 0 18 0 18 0"/>
            <circle cx="165" cy="64" r="54" stroke-width="2.600"/><circle cx="165" cy="64" r="42" stroke-width="1.400"/>
            <path d="M165 88l-14-13c-7-7-8-14-3.500-18.500 4.500-4 11-3 15.500 2l2 2.500 2-2.500c4.500-5 11-6 15.500-2 4.500 4.500 3.500 11.500-3.500 18.500Z" stroke-width="2.600" stroke-linejoin="round"/>
            <path d="M138 64h-3M195 64h3M165 36v-3M165 94v3" stroke-width="1.600"/>
        </g>`, 'orn-matasellos');

    const pueblo = () => {
        const casas = [[40,128,34,22],[84,132,30,18],[128,126,36,24],[330,128,34,22],[376,132,32,18],[418,126,36,24],[290,138,26,14],[456,136,28,16]];
        let c = '';
        casas.forEach(([x, y, w, h], i) => { c += `<rect x="${x}" y="${y}" width="${w}" height="${h}"/><path d="M${x-3} ${y}L${x+w/2} ${y-11}L${x+w+3} ${y}"/><path d="M${x+w*.3} ${y+h}v-${h*.5}h${w*.22}v${h*.5}"/>`; });
        let arboles = '';
        [[22,140],[112,146],[170,138],[312,146],[404,146],[470,144],[500,140]].forEach(([x, y]) => { arboles += `<circle cx="${x}" cy="${y-12}" r="9"/><circle cx="${x+7}" cy="${y-8}" r="7"/><path d="M${x} ${y}v-5"/>`; });
        const hatch = Array.from({ length: 16 }, (_, i) => `<path d="M${120 + i*9} ${86 - (i%5)*2}l-10 24" />`).join('');
        return svg('0 0 520 200', `
            <g fill="none" stroke="var(--tinta-suave)" stroke-width="1.400" stroke-linecap="round" stroke-linejoin="round" opacity=".9">
                <path d="M0 126L60 78l30 28 52-58 54 62 36-30 58 54"/>
                <path d="M270 126L330 66l34 38 40-48 52 56 44-42 40 32"/>
                <g opacity=".55">${hatch}</g>
                <path d="M0 154H520"/><path d="M0 164H520" opacity=".5"/>
                ${c}${arboles}
                <rect x="224" y="76" width="30" height="74"/><path d="M220 76L239 50l19 26"/><path d="M239 50V36M233 42h12"/><path d="M231 90a8 8 0 0 1 16 0v14h-16Z"/><rect x="232" y="120" width="14" height="30"/>
                <path d="M254 150v-30l22 12v18"/>
            </g>`, 'orn-pueblo');
    };

    const mapa = { floralTL, floralBL, sprigDivider, dividerHeart, sello, matasellos, pueblo };
    return mapa;
})();

// Inserta cada ornamento donde haya <div data-ornament="nombre"></div>
function pintarOrnamentos(root = document) {
    root.querySelectorAll('[data-ornament]').forEach(el => {
        const fn = ORNAMENTS[el.dataset.ornament];
        if (fn) el.innerHTML = fn();
    });
}
