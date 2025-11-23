export const defaultColors: RootColors = {
	light: [
		{
			name: "Pozadina",
			property: "--color-TBD-bg-gradient-light",
			value: "radial-gradient(175% 125% at 50% 0%, rgba(14, 165, 233, 0.45) 0%, rgba(235, 232, 230, 0.25) 66%, rgba(157, 136, 0, 0.15) 100%)",
		},
		{ name: "Druga pozadina", property: "--color-TBD-bg-light", value: "rgb(250, 250, 250)" },
		{ name: "Tekst", property: "--color-TBD-text-dark", value: "rgb(51, 47, 43)" },
		{ name: "Primarna", property: "--color-TBD-fipu-blue-default", value: "rgb(14, 165, 233)" },
		{ name: "Sekundarna", property: "--color-TBD-fipu-yellow-default", value: "rgb(157, 136, 0)" },
		{ name: "Potvrdi", property: "--color-TBD-fipu-green-default", value: "rgb(4, 175, 118)" },
		{ name: "Upozorenje", property: "--color-TBD-fipu-orange-default", value: "rgb(223, 111, 7)" },
		{ name: "Greška", property: "--color-TBD-fipu-red-default", value: "rgb(210, 15, 76)" },
		{ name: "Traka", property: "--thumb", value: "rgb(153, 153, 153)" },
		{ name: "Traka: hover", property: "--thumbhover", value: "rgb(123, 123, 123)" },
	],
	dark: [
		{
			name: "Pozadina",
			property: "--color-TBD-bg-gradient-dark",
			value: "radial-gradient(175% 125% at 50% 0%, rgba(15, 24, 36, 0.85) 0%, rgba(30, 34, 56, 0.85) 63%, rgba(20, 40, 45, 1) 100%)",
		},
		{ name: "Druga pozadina", property: "--color-TBD-bg-dark", value: "rgb(1, 5, 10)" },
		{ name: "Tekst", property: "--color-TBD-text-light", value: "rgb(216, 217, 218)" },
		{ name: "Primarna", property: "--color-TBD-fipu-blue-dark", value: "rgb(4, 100, 145)" },
		{ name: "Sekundarna", property: "--color-TBD-fipu-yellow-default", value: "rgb(157, 136, 0)" },
		{ name: "Potvrdi", property: "--color-TBD-fipu-green-dark", value: "rgb(6, 137, 65)" },
		{ name: "Upozorenje", property: "--color-TBD-fipu-orange-dark", value: "rgb(146, 81, 1)" },
		{ name: "Greška", property: "--color-TBD-fipu-red-dark", value: "rgb(169, 10, 68)" },
		{ name: "Traka", property: "--thumb", value: "rgb(0, 108, 161)" },
		{ name: "Traka: hover", property: "--thumbhover", value: "rgb(0, 134, 193)" },
	],
};

export const defaultColorTheme = { 
    name: "siinamota",
    colors: JSONIFY(defaultColors) as RootColors
} as ColorTheme;

export const defaultColorThemes = [
    {
        "name": "siinamota",
        "colors": {
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
                    "name":"Tekst",
                    "property":"--color-TBD-text-dark",
                    "value":"rgb(51, 47, 43)"
                },
                {
                    "name":"Primarna",
                    "property":"--color-TBD-fipu-blue-default",
                    "value":"rgb(14, 165, 233)"
                },
                {
                    "name":"Sekundarna",
                    "property":"--color-TBD-fipu-yellow-default",
                    "value":"rgb(157, 136, 0)"
                },
                {
                    "name":"Potvrdi",
                    "property":"--color-TBD-fipu-green-default",
                    "value":"rgb(4, 175, 118)"
                },
                {
                    "name":"Upozorenje",
                    "property":"--color-TBD-fipu-orange-default",
                    "value":"rgb(223, 111, 7)"
                },
                {
                    "name":"Greška",
                    "property":"--color-TBD-fipu-red-default",
                    "value":"rgb(210, 15, 76)"
                },
                {
                    "name":"Traka",
                    "property":"--thumb",
                    "value":"rgb(153, 153, 153)"
                },
                {
                    "name":"Traka: hover",
                    "property":"--thumbhover",
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
                    "name":"Tekst",
                    "property":"--color-TBD-text-light",
                    "value":"rgb(216, 217, 218)"
                },
                {
                    "name":"Primarna",
                    "property":"--color-TBD-fipu-blue-dark",
                    "value":"rgb(4, 100, 145)"
                },
                {
                    "name":"Sekundarna",
                    "property":"--color-TBD-fipu-yellow-default",
                    "value":"rgb(157, 136, 0)"
                },
                {
                    "name":"Potvrdi",
                    "property":"--color-TBD-fipu-green-dark",
                    "value":"rgb(6, 137, 65)"
                },
                {
                    "name":"Upozorenje",
                    "property":"--color-TBD-fipu-orange-dark",
                    "value":"rgb(146, 81, 1)"
                },
                {
                    "name":"Greška",
                    "property":"--color-TBD-fipu-red-dark",
                    "value":"rgb(169, 10, 68)"
                },
                {
                    "name":"Traka",
                    "property":"--thumb",
                    "value":"rgb(0, 108, 161)"
                },
                {
                    "name":"Traka: hover",
                    "property":"--thumbhover",
                    "value":"rgb(0, 134, 193)"
                }
            ]
        }
    },
    {
        "name": "inabakumori",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "linear-gradient(180deg, rgba(178, 178, 178, 0.5) 0%, rgb(178, 178, 178) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(249,246,241)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(14,12,6)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(185,157,90)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(233,193,99)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(103,179,150)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(221,198,142)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(241,70,112)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(0,0,0)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(185,157,90)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "linear-gradient(180deg, rgba(14, 12, 6, 0.5) 0%, rgb(14, 12, 6) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(18,19,12)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(249,246,241)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(185,157,90)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(234,185,72)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(51,98,82)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(153,115,19)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(222,51,96)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(255,255,255)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(185,157,90)"
                }
            ]
        }
    },
    {
        "name": "tak",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(252, 239, 81, 0.5) 25%, rgba(46, 228, 204, 0.16) 80%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(255,255,255)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(6,31,28)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(47,228,204)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(119,98,84)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(102,204,51)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(254,218,64)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(228,47,47)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(136,112,97)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(72,53,39)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(20, 18, 0, 0.5) 20%, rgba(11, 65, 57, 0.5) 73%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(0,0,0)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(216, 217, 218)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(37,187,167)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(119,98,84)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(82,163,41)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(217,186,48)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(187,37,37)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(72,53,39)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(136,112,97)"
                }
            ]
        }
    },
    {
        "name": "Matrix",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(91, 130, 72, 0.5) 21%, rgba(203, 217, 148, 0.16) 73%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(246,251,239)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(13,17,9)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(186,207,98)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(255,194,130)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(4, 175, 118)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(210,126,35)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(181,110,111)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(153, 153, 153)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(123, 123, 123)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(13, 17, 9, 0.5) 18%, rgba(100, 129, 71, 0.5) 73%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(13,17,9)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(175,220,116)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(154,169,91)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(210,126,35)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(6, 137, 65)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(210,126,35)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(153,31,60)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(189,240,125)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(250,255,170)"
                }
            ]
        }
    },
    {
        "name": "r-906",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(169, 206, 213, 0.45) 0%, rgba(235, 232, 230, 0.25) 66%, rgba(222, 215, 163, 0.15) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(238,238,238)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(46,67,71)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(134,187,197)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(205,195,116)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(163,182,220)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(201,163,127)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(165,82,108)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(169,206,213)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(118,162,171)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(8, 26, 36, 0.85) 0%, rgba(31, 39, 58, 0.85) 64%, rgb(34, 42, 56) 89%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(9,16,17)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(168,198,203)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(76,123,132)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(52, 111, 229)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(53,146,142)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(123,89,56)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(90,31,31)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(118,162,171)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(169,206,213)"
                }
            ]
        }
    },
    {
        "name": "iyowa",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(1, 48, 33, 0.33) 0%, rgba(228, 228, 228, 0.33) 51%, rgba(217, 47, 0, 0.33) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(255,246,245)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(50,16,10)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(217,47,0)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(141,179,161)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(141,179,161)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(243,105,4)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(146,4,132)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(203,0,1)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(106,0,1)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(1, 48, 33, 0.25) 0%, rgba(145, 0, 251, 0.1) 59%, rgba(171, 16, 53, 0.2) 89%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(24,6,3)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(242,183,187)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(217,47,0)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(141,179,161)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(141,179,161)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(233,77,1)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(106,0,1)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(106,0,1)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(203,0,1)"
                }
            ]
        }
    },
    {
        "name": "ZTMY",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(74, 3, 180, 0.12) 12%, rgba(251, 239, 255, 0.16) 67%, rgba(153, 37, 197, 0.32) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(245,242,248)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(52,22,95)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(115,34,188)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(45,100,161)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(109,211,13)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(216,65,213)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(183,9,6)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(115,34,188)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(168,58,217)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(5, 2, 8, 0.75) 0%, rgba(145, 0, 251, 0.23) 59%, rgba(115, 34, 188, 0.56) 89%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(19,7,21)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(233,203,255)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(115,34,188)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(1,119,254)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(110,190,35)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(173,31,171)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(183,9,6)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(115,34,188)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(168,58,217)"
                }
            ]
        }
    },
    {
        "name": "gyari",
        "colors": {
            "light": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-light",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(223, 144, 0, 0.15) 0%, rgba(255, 255, 255, 0.25) 66%, rgba(193, 174, 203, 0.45) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-light",
                    "value": "rgb(250, 250, 250)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(81,56,12)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(223,144,0)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(193,174,203)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(100,187,211)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(221,207,3)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(186,38,112)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(223,144,0)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(193,174,203)"
                }
            ],
            "dark": [
                {
                    "name": "Pozadina",
                    "property": "--color-TBD-bg-gradient-dark",
                    "value": "radial-gradient(175% 125% at 50% 0%, rgba(112, 73, 0, 0.2) 1%, rgba(22, 15, 3, 0.5) 63%, rgba(128, 93, 146, 0.4) 100%)"
                },
                {
                    "name": "Druga pozadina",
                    "property": "--color-TBD-bg-dark",
                    "value": "rgb(32,24,37)"
                },
                {
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(216, 217, 218)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(204,133,0)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(180,141,201)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(84,180,207)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(160,157,64)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(186,38,95)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(176,152,189)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(204,133,0)"
                }
            ]
        },
    },
    {
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
                    "name": "Tekst",
                    "property": "--color-TBD-text-dark",
                    "value": "rgb(62,60,58)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-default",
                    "value": "rgb(244,172,45)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(100,193,249)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-default",
                    "value": "rgb(141,172,47)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-default",
                    "value": "rgb(158,128,57)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-default",
                    "value": "rgb(218,56,29)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(244,172,45)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
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
                    "name": "Tekst",
                    "property": "--color-TBD-text-light",
                    "value": "rgb(252,237,229)"
                },
                {
                    "name": "Primarna",
                    "property": "--color-TBD-fipu-blue-dark",
                    "value": "rgb(223,145,12)"
                },
                {
                    "name": "Sekundarna",
                    "property": "--color-TBD-fipu-yellow-default",
                    "value": "rgb(9,152,241)"
                },
                {
                    "name": "Potvrdi",
                    "property": "--color-TBD-fipu-green-dark",
                    "value": "rgb(128,156,43)"
                },
                {
                    "name": "Upozorenje",
                    "property": "--color-TBD-fipu-orange-dark",
                    "value": "rgb(101,82,36)"
                },
                {
                    "name": "Greška",
                    "property": "--color-TBD-fipu-red-dark",
                    "value": "rgb(194,53,31)"
                },
                {
                    "name": "Traka",
                    "property": "--thumb",
                    "value": "rgb(9,152,241)"
                },
                {
                    "name": "Traka: hover",
                    "property": "--thumbhover",
                    "value": "rgb(223,145,12)"
                }
            ]
        }
    }
] as ColorTheme[]