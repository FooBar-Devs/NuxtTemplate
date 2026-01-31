export const defaultUISettings : UISettings = {
    // TEME
    selectedTheme: 'siinamota' as string,
    colorThemes: [] as ColorTheme[],

    // IZBORNIK
    fixedSidebar: true as boolean,
    showSidebarOnHover: false as boolean,
    showSettingsOnHover: false as boolean,

    // AKCIJE
    showQuickActionsOnHover: false as boolean,
    showThemeButton: true as boolean,
    showPixelartButton: true as boolean,

    // EFEKTI
    glassEffect: true as boolean,
    blurStrength: 8 as number,
    cardOpacity: 0.25 as number,
    radiusSize: 1 as number,
};

export const defaultColors: RootColors = {
    "light": [
        {
            "name":"Pozadina",
            "property":"--color-TBD-bg-gradient-light",
            "value":"radial-gradient(175% 125% at 50% 0%, rgba(14, 165, 233, 0.45) 0%, rgba(235, 232, 230, 0.25) 66%, rgba(157, 136, 0, 0.15) 100%)"
        },
        {
            "name":"Druga pozadina",
            "property":"--color-TBD-bg-light",
            "value":"rgb(250, 250, 250)"
        },
        {
            "name":"Tekst na pozadini",
            "property":"--color-TBD-text-dark",
            "value":"rgb(51, 47, 43)"
        },
        {
            "name":"Tekst na primarnoj",
            "property":"--color-TBD-text-light",
            "value":"rgb(250, 250, 250)"
        },
        {
            "name":"Primarna",
            "property":"--color-TBD-primary-light",
            "value":"rgb(14, 165, 233)"
        },
        {
            "name":"Sekundarna",
            "property":"--color-TBD-secondary-light",
            "value":"rgb(0, 151, 157)"
        },
        {
            "name":"Potvrdi",
            "property":"--color-TBD-confirm-light",
            "value":"rgb(4, 175, 118)"
        },
        {
            "name":"Upozorenje",
            "property":"--color-TBD-warning-light",
            "value":"rgb(223, 111, 7)"
        },
        {
            "name":"Greška",
            "property":"--color-TBD-error-light",
            "value":"rgb(210, 15, 76)"
        },
        {
            "name":"Traka",
            "property":"--color-TBD-thumb",
            "value":"rgb(153, 153, 153)"
        },
        {
            "name":"Traka: hover",
            "property":"--color-TBD-thumbhover",
            "value":"rgb(123, 123, 123)"
        }
    ],
    "dark":[
        {
            "name":"Pozadina",
            "property":"--color-TBD-bg-gradient-dark",
            "value":"radial-gradient(175% 125% at 50% 0%, rgba(15, 24, 36, 0.85) 0%, rgba(30, 34, 56, 0.85) 63%, rgba(20, 40, 45, 1) 100%)"
        },
        {
            "name":"Druga pozadina",
            "property":"--color-TBD-bg-dark",
            "value":"rgb(1, 5, 10)"
        },
        {
            "name":"Tekst na pozadini",
            "property":"--color-TBD-text-light",
            "value":"rgb(216, 217, 218)"
        },
        {
            "name":"Tekst na primarnoj",
            "property":"--color-TBD-text-dark",
            "value":"rgb(216, 217, 218)"
        },
        {
            "name":"Primarna",
            "property":"--color-TBD-primary-dark",
            "value":"rgb(4, 100, 145)"
        },
        {
            "name":"Sekundarna",
            "property":"--color-TBD-secondary-dark",
            "value":"rgb(4, 135, 144)"
        },
        {
            "name":"Potvrdi",
            "property":"--color-TBD-confirm-dark",
            "value":"rgb(6, 137, 65)"
        },
        {
            "name":"Upozorenje",
            "property":"--color-TBD-warning-dark",
            "value":"rgb(146, 81, 1)"
        },
        {
            "name":"Greška",
            "property":"--color-TBD-error-dark",
            "value":"rgb(169, 10, 68)"
        },
        {
            "name":"Traka",
            "property":"--color-TBD-thumb",
            "value":"rgb(0, 108, 161)"
        },
        {
            "name":"Traka: hover",
            "property":"--color-TBD-thumbhover",
            "value":"rgb(0, 134, 193)"
        }
    ]
};

export const defaultImages: ThemeImages = {
    "light": [
        {
            "url": "/images/fun/cat_2.gif",
            "style": "z-index: 1;\nscale: 400%;\nheight: auto;\nbottom: 48px;\nleft: 10%;\nfilter: drop-shadow(4px 0 0 rgb(0 0 0 / 0.125));\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/birds_1.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:25%;\nleft: 90%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/birds_2.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:65%;\nleft: 30%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/birds_3.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:95%;\nleft: 70%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/seagull_1.gif",
            "style": "z-index: 10;\nscale: 400%;\nheight: auto;\nbottom:80%;\nleft: 0%;\nfilter: drop-shadow(4px 0 0 rgb(0 0 0 / 0.125));\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/seagull_2.gif",
            "style": "z-index: 10;\nscale: 400%;\nheight: auto;\nbottom:40%;\nleft: 0%;\nfilter: drop-shadow(4px 0 0 rgb(0 0 0 / 0.125));\nimage-rendering: pixelated;\nz-index: 999;"
        },
        {
            "url": "/images/fun/falling_star_1.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:80%;\nleft: 15%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/falling_star_2.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:60%;\nleft: 80%;\nimage-rendering: pixelated;"
        }
    ],
    "dark": [
        {
            "url": "transparent",
            "style": "z-index: -10;\nheight: 100%;\nwidth: 100%;\nbackground: 100% 100% repeat url('/images/fun/night_sky.gif'); \nscale: 150%;\nimage-rendering: pixelated;\nopacity: 25%;"
        },
        {
            "url": "/images/fun/cat_sleeping.gif",
            "style": "z-index: 1;\nscale: 400%;\nheight: auto;\nbottom: 48px;\nleft: 10%;\nfilter: drop-shadow(4px 0 0 rgb(0 0 0 / 0.125));\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/stars_1.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:25%;\nleft: 90%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/star_2.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:65%;\nleft: 30%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/star_1.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:95%;\nleft: 70%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/falling_star_1.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:80%;\nleft: 15%;\nimage-rendering: pixelated;"
        },
        {
            "url": "/images/fun/falling_star_2.gif",
            "style": "z-index: -10;\nscale: 200%;\nheight: auto;\nbottom:60%;\nleft: 80%;\nimage-rendering: pixelated;"
        }
    ]
};

export const defaultColorTheme = {
    "name": "siinamota",
    "colors": defaultColors,
    "images": defaultImages
} as ColorTheme;

export const defaultColorThemes = [
    defaultColorTheme,
    inabakumoriTheme,
    takTheme,
    matrixTheme,
    r906Theme,
    iyowaTheme,
    ztmyTheme,
    gyariTheme,
    yukopiTheme,
    starWarsTheme,
    bwTheme,
    rainyTheme
]