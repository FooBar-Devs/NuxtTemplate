export const yukopiTheme: ColorTheme = {
    "name": "Yukopi",
    "colors": {
        "light": [
            {
                "name": "Pozadina",
                "property": "--color-TBD-bg-gradient-light",
                "value": "radial-gradient(175% 125% at 50% 0%, rgb(255, 211, 55) 0%, rgba(247, 215, 101, 0.75) 100%)"
            },
            {
                "name": "Druga pozadina",
                "property": "--color-TBD-bg-light",
                "value": "rgb(251,236,228)"
            },
            {
                "name": "Tekst na pozadini",
                "property": "--color-TBD-text-dark",
                "value": "rgb(62,60,58)"
            },
            {
                "name": "Tekst na primarnoj",
                "property": "--color-TBD-text-light",
                "value": "rgb(251,236,228)"
            },
            {
                "name": "Primarna",
                "property": "--color-TBD-primary-light",
                "value": "rgb(244,172,45)"
            },
            {
                "name": "Sekundarna",
                "property": "--color-TBD-secondary-light",
                "value": "rgb(100,193,249)"
            },
            {
                "name": "Potvrdi",
                "property": "--color-TBD-confirm-light",
                "value": "rgb(141,172,47)"
            },
            {
                "name": "Upozorenje",
                "property": "--color-TBD-warning-light",
                "value": "rgb(158,128,57)"
            },
            {
                "name": "Greška",
                "property": "--color-TBD-error-light",
                "value": "rgb(218,56,29)"
            },
            {
                "name": "Traka",
                "property": "--color-TBD-thumb",
                "value": "rgb(244,172,45)"
            },
            {
                "name": "Traka: hover",
                "property": "--color-TBD-thumbhover",
                "value": "rgb(100,193,249)"
            }
        ],
        "dark": [
            {
                "name": "Pozadina",
                "property": "--color-TBD-bg-gradient-dark",
                "value": "radial-gradient(175% 125% at 50% 10%, rgba(60, 41, 38, 0.25) 0%, rgba(60, 58, 56, 0.5) 51%, rgba(156, 129, 55, 0.35) 100%)"
            },
            {
                "name": "Druga pozadina",
                "property": "--color-TBD-bg-dark",
                "value": "rgb(60,58,56)"
            },
            {
                "name": "Tekst na pozadini",
                "property": "--color-TBD-text-light",
                "value": "rgb(252,237,229)"
            },
            {
                "name": "Tekst na primarnoj",
                "property": "--color-TBD-text-dark",
                "value": "rgb(252,237,229)"
            },
            {
                "name": "Primarna",
                "property": "--color-TBD-primary-dark",
                "value": "rgb(223,145,12)"
            },
            {
                "name": "Sekundarna",
                "property": "--color-TBD-secondary-dark",
                "value": "rgb(9,152,241)"
            },
            {
                "name": "Potvrdi",
                "property": "--color-TBD-confirm-dark",
                "value": "rgb(128,156,43)"
            },
            {
                "name": "Upozorenje",
                "property": "--color-TBD-warning-dark",
                "value": "rgb(101,82,36)"
            },
            {
                "name": "Greška",
                "property": "--color-TBD-error-dark",
                "value": "rgb(194,53,31)"
            },
            {
                "name": "Traka",
                "property": "--color-TBD-thumb",
                "value": "rgb(9,152,241)"
            },
            {
                "name": "Traka: hover",
                "property": "--color-TBD-thumbhover",
                "value": "rgb(223,145,12)"
            }
        ]
    },
    "images": {
        "light": [
            {
                "url": "/images/fun/sky.svg",
                "style": "z-index: -10;\nwidth: 100%;\nheight: 100%;\nscale: 150%;\nopacity: 50%;\n"
            }
        ],
        "dark": [      
            {
                "url": "transparent",
                "style": "z-index: -10;\nheight: 100%;\nwidth: 100%;\nbackground: 100% 100% repeat url('/images/fun/night_sky.gif'); \nscale: 150%;\nimage-rendering: pixelated;\nopacity: 25%;"
            }
        ]
    }
};