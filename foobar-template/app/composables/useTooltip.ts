interface TooltipState {
    content: string;
    offsetx: number;
    offsety: number;
    css: string;
    type: "top" | "left" | "right" | "bottom";
    active: boolean;
}

// Define tooltip state
const tooltip = reactive<TooltipState>({
    content: "",
    offsetx: 0,
    offsety: 0,
    css: "",
    type: "top",
    active: false,
});

// Define the type for the setTooltip function
type SetTooltip = (
    content?: string,
    type?: "top" | "left" | "right" | "bottom",
    css?: string,
    offset?: [number, number]
) => void;

/**
 * Pushes a popup message to the popups queue.
 * 
 * @param {T_Message} popup - The popup object containing `type` and `message`.
 * @param {boolean | { [key: string]: any }} [store=false] - Optional store object or boolean to control additional logic. If `store` is an object with an `updating` property, it will be set to `false` after a delay.
 * @param {number} [time=0] - Time in milliseconds to wait before resetting the `store.updating` property.
 * @param {T_ErrorDetails} [error={ location: '', message: '' }] - Optional error details object for logging errors. Includes `location` and `message`.
 * 
 * @returns {Promise<void>} - A promise that resolves when the function is complete.
 */
const setTooltip: SetTooltip = (
    content = "",
    type = "top",
    css = "justify-center",
    offset = [0, 0]
    ) => {
    if (content) {
        Object.assign(tooltip, {
            content,
            offsetx: offset[0],
            offsety: offset[1],
            css,
            type,
            active: true,
        });
    } else {
        tooltip.active = false;
    }
};

// Provide tooltip and setTooltip
export function provideTooltip() {
    provide("tooltip", readonly(tooltip));
    provide("setTooltip", setTooltip);
}

export { tooltip, setTooltip }