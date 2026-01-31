export const THEME_MSGS = {
	THEME__ERROR: {
		type: popupType.error,
		message: `Greška pri učitavanju teme!`,
	},
	THEME_NAME_ALREADY_EXISTS__WARNING: {
		type: popupType.warning,
		message: `Tema s istim nazivom već postoji!`,
	},
	INVALID_THEME_FORMAT__WARNING: {
		type: popupType.warning,
		message: `Neispravan format teme!`,
	},
} satisfies Record<string, T_MessageType>;