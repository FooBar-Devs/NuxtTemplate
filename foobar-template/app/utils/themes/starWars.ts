export const starWarsTheme: ColorTheme = {
    "name": "Star Wars",
    "colors": {
        "light": [
            {
                "name": "Pozadina",
                "property": "--color-TBD-bg-gradient-light",
                "value": "radial-gradient(300% 125% at 95% 0%, rgba(238, 159, 27, 0.75) 0%, rgba(236, 98, 26, 0.75) 9%, rgba(197, 67, 138, 0.75) 28%, rgba(192, 29, 95, 0.78) 52%, rgba(75, 5, 105, 0.85) 71%, rgb(26, 3, 63) 89%, rgb(2, 0, 12) 96%)"
            },
            {
                "name": "Druga pozadina",
                "property": "--color-TBD-bg-light",
                "value": "rgb(209,191,195)"
            },
            {
                "name": "Tekst na pozadini",
                "property": "--color-TBD-text-dark",
                "value": "rgb(28,28,63)"
            },
            {
                "name": "Tekst na primarnoj",
                "property": "--color-TBD-text-light",
                "value": "rgb(255,255,255)"
            },
            {
                "name": "Primarna",
                "property": "--color-TBD-primary-light",
                "value": "rgb(232,72,29)"
            },
            {
                "name": "Sekundarna",
                "property": "--color-TBD-secondary-light",
                "value": "rgb(30,144,255)"
            },
            {
                "name": "Potvrdi",
                "property": "--color-TBD-confirm-light",
                "value": "rgb(0, 150, 136)"
            },
            {
                "name": "Upozorenje",
                "property": "--color-TBD-warning-light",
                "value": "rgb(253,203,98)"
            },
            {
                "name": "Greška",
                "property": "--color-TBD-error-light",
                "value": "rgb(199,32,48)"
            },
            {
                "name": "Traka",
                "property": "--color-TBD-thumb",
                "value": "rgb(33, 33, 33)"
            },
            {
                "name": "Traka: hover",
                "property": "--color-TBD-thumbhover",
                "value": "rgb(244,67,54)"
            }
        ],
        "dark": [
            {
                "name": "Pozadina",
                "property": "--color-TBD-bg-gradient-dark",
                "value": "linear-gradient(199deg, rgba(37, 42, 7, 0.8) 0%, rgba(4, 11, 38, 0.9) 21%, rgba(0, 4, 2, 0.9) 80%, rgb(23, 1, 4) 100%)"
            },
            {
                "name": "Druga pozadina",
                "property": "--color-TBD-bg-dark",
                "value": "rgb(17,17,25)"
            },
            {
                "name": "Tekst na pozadini",
                "property": "--color-TBD-text-light",
                "value": "rgb(224,224,224)"
            },
            {
                "name": "Tekst na primarnoj",
                "property": "--color-TBD-text-dark",
                "value": "rgb(0,0,0)"
            },
            {
                "name": "Primarna",
                "property": "--color-TBD-primary-dark",
                "value": "rgb(255,215,0)"
            },
            {
                "name": "Sekundarna",
                "property": "--color-TBD-secondary-dark",
                "value": "rgb(244,67,54)"
            },
            {
                "name": "Potvrdi",
                "property": "--color-TBD-confirm-dark",
                "value": "rgb(30,144,255)"
            },
            {
                "name": "Upozorenje",
                "property": "--color-TBD-warning-dark",
                "value": "rgb(230,97,96)"
            },
            {
                "name": "Greška",
                "property": "--color-TBD-error-dark",
                "value": "rgb(199,32,48)"
            },
            {
                "name": "Traka",
                "property": "--color-TBD-thumb",
                "value": "rgb(224,233,240)"
            },
            {
                "name": "Traka: hover",
                "property": "--color-TBD-thumbhover",
                "value": "rgb(255,215,0)"
            }
        ]
    },
    "images": {
        "light": [
            {
                "url": "/images/fun/moons.svg",
                "style": "z-index: -10;\nheight: 100%;"
            }
        ],
        "dark": [
            {
                "url": "/images/fun/sw_sky.jpg",
                "style": "z-index: -10;\nwidth: 100%;\nheight: 100%;\nbackground-size: cover;\nbackground-position: center;\nopacity: 15%;"
            },
            {
                "url": "/images/fun/sw.png",
                "style": "z-index: -10;\nbottom: 11.111%;\nleft: 11.111%;\nwidth: 20%;\nfilter: brightness(0.75) contrast(1.5) blur(8px);\nopacity: 75%;"
            },
            {
                "url": "/images/fun/sw.png",
                "style": "z-index: -10;\nbottom: 11.111%;\nleft: 11.111%;\nwidth: 20%;\nfilter: brightness(0.95) contrast(2);\nopacity: 75%;"
            },
            {
                "url": "/images/fun/sw.png",
                "style": "z-index: -10;\nbottom: 11.111%;\nleft: 11.111%;\nwidth: 20%;\nfilter: brightness(1.25) contrast(1.5) blur(2px);\nmix-blend-mode: color-dodge;\nopacity: 25%;"
            },
            {
                "url": "/images/fun/sw_planet.webp",
                "style": "z-index: -10;\ntop: 11.111%;\nright: 11.111%;\nwidth: 25%;\nfilter: brightness(0.75) contrast(1.5) blur(16px);\nopacity: 75%;\n"
            },
            {
                "url": "/images/fun/sw_planet.webp",
                "style": "z-index: -10;\ntop: 11.111%;\nright: 11.111%;\nwidth: 25%;\nfilter: brightness(0.95) contrast(2);\nopacity: 75%;"
            }
        ]
    }
};