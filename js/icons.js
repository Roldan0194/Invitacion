// Íconos de la invitación (SVG de línea, estilo ilustración color café).
// Todos usan "currentColor", así que el color se controla desde CSS (--color-brown).
// Para cambiar un ícono: edita aquí o reemplaza el SVG completo por el tuyo.

const ICON_ATTRS = 'viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img"';
const LINE = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
const HEART = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

const ICONS = {
    // Iglesia con cruz
    iglesia: `<svg ${ICON_ATTRS} aria-label="Iglesia">
        <g ${LINE}>
            <path d="M60 8v20M52 15h16"/>
            <path d="M38 52 60 34l22 18"/>
            <path d="M43 56 60 42l17 14"/>
            <path d="M45 56v46M75 56v46"/>
            <circle cx="60" cy="58" r="4.5"/>
            <path d="M52 102V84q0-12 8-18 8 6 8 18v18"/>
            <path d="M45 66 14 84M45 74 22 87M25 87v15M34 80v22"/>
            <path d="M75 66l31 18M75 74l23 13M95 87v15M86 80v22"/>
            <path d="M8 102h104" stroke-width="2.6"/>
        </g>
    </svg>`,

    // Finca / hacienda con luces (para la tarjeta de Recepción)
    finca: `<svg ${ICON_ATTRS} aria-label="Finca campestre">
        <g ${LINE}>
            <path d="M16 54 60 24l44 30"/>
            <path d="M24 54 60 31l36 23"/>
            <path d="M84 36V22h8v20"/>
            <path d="M28 54v48M92 54v48"/>
            <path d="M50 102V82q0-13 10-16 10 3 10 16v20"/>
            <rect x="33" y="72" width="11" height="14" rx="1"/>
            <rect x="76" y="72" width="11" height="14" rx="1"/>
            <path d="M28 58q16 12 32 0 16 12 32 0"/>
            <path d="M10 102h100" stroke-width="2.6"/>
            <path d="M12 102v-10M12 92l-6-6M12 94l6-6M108 102v-10M108 92l-6-6M108 94l6-6"/>
            <path d="M100 18l8-4M102 26h9M100 34l8 4" stroke-width="1.7"/>
        </g>
        <g fill="currentColor">
            <circle cx="44" cy="64" r="2.2"/><circle cx="60" cy="58.5" r="2.2"/><circle cx="76" cy="64" r="2.2"/>
        </g>
    </svg>`,

    // Caballete con letrero de bienvenida y argollas
    bienvenida: `<svg ${ICON_ATTRS} aria-label="Letrero de bienvenida">
        <g ${LINE}>
            <rect x="26" y="14" width="56" height="60" rx="2"/>
            <path d="M48 10h12"/>
            <circle cx="55" cy="40" r="10"/><circle cx="55" cy="40" r="6.5"/>
            <circle cx="67" cy="34" r="10"/><circle cx="67" cy="34" r="6.5"/>
            <path d="M36 60q4-9 8 0t8 0 8 0 8 0"/>
            <path d="M38 67h32"/>
            <path d="M40 74 32 108M68 74l8 34M54 74v30"/>
            <rect x="26" y="84" width="56" height="5" rx="1.5"/>
            <path d="M92 30l10-5M93 39h11M92 48l9 5" stroke-width="1.7"/>
        </g>
        <path d="${HEART}" fill="currentColor" transform="translate(32 17) scale(.75)"/>
    </svg>`,

    // Novios dentro de un arco (siluetas)
    novios: `<svg ${ICON_ATTRS} aria-label="Los novios">
        <path d="M28 108V48Q28 10 60 10t32 38v60" ${LINE}/>
        <g fill="currentColor">
            <circle cx="46" cy="40" r="5.2"/>
            <path d="M40 48q6-2.5 12 0l2 22-2 3v27h-4.5l-1.5-24-1.500 24H41V73l-2-3Z"/>
            <circle cx="76" cy="38" r="5"/>
            <path d="M80.500 33q4 3 1 9l-3 3 1 8q1 8 3 14 4 18 9 33H66q6-20 7-33 1-8 0-16 1-5 5-7"/>
            <path d="M52 58l14 3-.5 3.500L51 62Z"/>
            <rect x="28" y="100" width="64" height="8"/>
            <path d="M34 100q-3-10-1-15M38 100q0-8 4-12M31 100q-5-6-8-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </g>
    </svg>`,

    // Plato con cubiertos
    cena: `<svg ${ICON_ATTRS} aria-label="Cena">
        <g ${LINE}>
            <circle cx="56" cy="68" r="40"/>
            <circle cx="56" cy="68" r="30"/>
            <path d="M88 96A40 40 0 0 1 40 106" stroke-width="4"/>
            <g transform="translate(40 26) rotate(-22)"><ellipse cx="0" cy="0" rx="7" ry="10"/><path d="M0 10v38"/></g>
            <g transform="translate(82 22) rotate(30)"><path d="M-6 0v13M0 0v13M6 0v13"/><path d="M-6 13q0 7 6 7t6-7"/><path d="M0 20v30"/></g>
            <path d="M12 22l9 4M10 31h10M20 13l4 8" stroke-width="1.7"/>
        </g>
        <g transform="rotate(-35 58 72)">
            <rect x="44" y="52" width="28" height="42" rx="2" fill="currentColor"/>
            <path d="${HEART}" fill="var(--icon-cut, #F7F5F2)" transform="translate(51 66) scale(.58)"/>
        </g>
    </svg>`,

    // Disco de vinilo con corazones (fiesta)
    fiesta: `<svg ${ICON_ATTRS} aria-label="Fiesta">
        <g ${LINE}>
            <path d="M64 36A34 34 0 1 0 98 70"/>
            <path d="M64 49A21 21 0 0 0 43 70" stroke-dasharray="3 7"/>
            <circle cx="64" cy="70" r="11"/>
            <path d="M97 36v36q0 14-12 18" stroke-width="1.8"/>
            <rect x="76" y="90" width="12" height="7" rx="2" transform="rotate(-35 82 93)"/>
            <path d="M22 36l-5-4M18 46l-7-1M100 100l5 5M92 104l3 7" stroke-width="1.7"/>
        </g>
        <path d="${HEART}" fill="currentColor" transform="translate(32 6) scale(1.700)"/>
        <path d="${HEART}" fill="currentColor" transform="translate(8 46) scale(1.150)"/>
    </svg>`,

    // Carro de recién casados (vista trasera)
    auto: `<svg ${ICON_ATTRS} aria-label="Recién casados">
        <g ${LINE}>
            <path d="M34 34q0-12 12-12h28q12 0 12 12"/>
            <path d="M38 36q0-8 8-8h28q8 0 8 8"/>
            <path d="M22 58q0-18 14-22h48q14 4 14 22v14H22Z"/>
            <circle cx="30" cy="58" r="5.500"/><circle cx="90" cy="58" r="5.500"/>
            <path d="M14 56q-2 8 8 8M106 56q2 8-8 8"/>
            <path d="M20 72v12h14V72M86 72v12h14V72"/>
            <path d="M24 78h72" />
            <path d="M28 52l10 3 22-6 22 6 10-3-3 14-9-3-20 5-20-5-9 3Z" fill="var(--icon-cut, #F7F5F2)"/>
            <path d="M52 78q-6 12-16 20M60 78v22M68 78q6 12 16 20" stroke-width="1.7"/>
            <rect x="30" y="98" width="8" height="8" rx="2" transform="rotate(35 34 102)"/>
            <rect x="56" y="100" width="8" height="8" rx="2"/>
            <rect x="82" y="98" width="8" height="8" rx="2" transform="rotate(-35 86 102)"/>
        </g>
        <text x="60" y="63" text-anchor="middle" font-size="6.500" font-family="Georgia, serif" font-style="italic" fill="currentColor">Just Married</text>
    </svg>`
};

// ---------------------------------------------------------------------------
// Íconos adicionales (v3): código de vestimenta, regalos y puntualidad
// ---------------------------------------------------------------------------
Object.assign(ICONS, {
    // Pareja con vestimenta formal de día (ilustración para la sección Código de Vestimenta).
    // Para usar tu propia imagen, pon su ruta en CONFIG.vestimenta.imagen
    vestimenta: `<svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de vestimenta formal de día">
        <g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <!-- Él: traje -->
            <path d="M52 72Q54 59 72 56L78 68 84 56Q102 59 104 72L108 158 48 158Z" fill="var(--icon-cut, #F1E7CF)"/>
            <path d="M72 56L78 104 84 56" fill="var(--icon-cut2, #FBF6E9)"/>
            <path d="M78 66l-3.500 6 3.500 24 3.500-24Z" fill="currentColor" opacity=".85"/>
            <path d="M52 74L40 150l12 3 8-44M104 74l12 76-12 3-8-44"/>
            <path d="M78 104v50M92 112h11"/>
            <circle cx="95" cy="88" r="3.200" fill="var(--flor-petalo)"/>
            <path d="M50 158L48 266h24l6-76 6 76h24l-2-108Z" fill="var(--icon-cut, #F1E7CF)"/>
            <path d="M62 170v90M94 170v90" opacity=".45"/>
            <ellipse cx="60" cy="273" rx="15" ry="5.500" fill="currentColor"/><ellipse cx="96" cy="273" rx="15" ry="5.500" fill="currentColor"/>
            <ellipse cx="78" cy="35" rx="13" ry="16" fill="var(--icon-cut2, #FBF6E9)"/>
            <path d="M64 33Q64 15 78 15Q92 15 92 31Q88 22 78 22Q69 22 64 33Z" fill="currentColor"/>
            <path d="M72 48v9M84 48v9"/>
            <!-- Ella: vestido midi -->
            <path d="M150 66Q168 58 186 66L184 112 152 112Z" fill="var(--acento)" fill-opacity=".28"/>
            <path d="M152 112Q132 186 124 238Q168 252 212 238 204 186 184 112Z" fill="var(--acento)" fill-opacity=".28"/>
            <path d="M152 112H184M156 112Q150 180 140 236M168 112V246M180 112Q186 180 196 236" opacity=".5"/>
            <path d="M150 66L140 96l10 4M186 66l10 30-10 4"/>
            <path d="M158 62Q168 78 178 62"/>
            <path d="M150 246L147 270M186 246L189 270"/>
            <path d="M140 272h12l-2-5M184 272h12l-4-5" fill="currentColor"/>
            <rect x="193" y="126" width="22" height="13" rx="3" fill="var(--icon-cut2, #FBF6E9)" transform="rotate(-12 204 132)"/>
            <ellipse cx="168" cy="40" rx="12" ry="15" fill="var(--icon-cut2, #FBF6E9)"/>
            <path d="M155 40Q154 22 168 22Q182 22 181 40Q176 30 168 31Q160 30 155 40Z" fill="currentColor"/>
            <circle cx="168" cy="20" r="8.500" fill="currentColor"/>
            <path d="M163 52v9M173 52v9"/>
            <path d="M24 281Q120 292 216 281" opacity=".35"/>
        </g>
    </svg>`,

    sobre: `<svg ${ICON_ATTRS} aria-label="Sobre">
        <g ${LINE}>
            <rect x="14" y="34" width="92" height="62" rx="3"/>
            <path d="M14 38 60 72l46-34"/><path d="M14 96 50 62M106 96 70 62"/>
            <path d="M92 14l4-4M100 22l6-2M84 10v-5" stroke-width="1.700"/>
        </g>
        <circle cx="60" cy="72" r="10.500" fill="currentColor"/>
        <path d="${HEART}" fill="var(--icon-cut, #F1E7CF)" transform="translate(53.500 65.500) scale(.54)"/>
    </svg>`,

    reloj: `<svg ${ICON_ATTRS} aria-label="Reloj de bolsillo">
        <g ${LINE}>
            <circle cx="60" cy="70" r="32"/><circle cx="60" cy="70" r="27"/>
            <rect x="53" y="30" width="14" height="8" rx="2"/>
            <circle cx="60" cy="20" r="7"/>
            <path d="M60 43v5M60 92v5M33 70h5M82 70h5"/>
            <path d="M60 70V54M60 70l12 7" stroke-width="2.300"/>
            <path d="M52 18Q38 10 24 22Q12 34 22 44" stroke-width="1.700"/>
            <path d="M94 28l7-4M98 38h8M92 20l3-6" stroke-width="1.700"/>
        </g>
        <circle cx="60" cy="70" r="2.600" fill="currentColor"/>
    </svg>`,

    regalo: `<svg ${ICON_ATTRS} aria-label="Regalo">
        <g ${LINE}>
            <rect x="24" y="58" width="72" height="46"/><rect x="18" y="44" width="84" height="15" rx="1.500"/>
            <path d="M54 44v60M66 44v60"/>
            <path d="M60 44C46 40 34 36 40 26c6-8 18 2 20 18 2-16 14-26 20-18 6 10-6 14-20 18Z"/>
        </g>
    </svg>`,

    cuenta: `<svg ${ICON_ATTRS} aria-label="Transferencia">
        <g ${LINE}>
            <rect x="14" y="32" width="92" height="60" rx="6"/>
            <path d="M14 48h92" stroke-width="7"/><rect x="24" y="64" width="16" height="12" rx="2"/>
            <path d="M50 70h20M50 80h32M24 84h0"/>
            <path d="M92 14l4-4M100 22l6-2" stroke-width="1.700"/>
        </g>
    </svg>`
});
