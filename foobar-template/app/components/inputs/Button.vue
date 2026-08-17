<script setup lang="ts">
    const props = defineProps({
        // button color theme
        color: {
            type: String as () => keyof typeof ButtonBackground,
            default: "primary",
        },

        // button style modifiers
        outline:    { type: Boolean, default: false, required: false },     // outline button style
        slim:       { type: Boolean, default: false, required: false },     // compact button size
        underline:  { type: Boolean, default: false, required: false },     // underline text on hover

        // visual customization props
        hoverClass: { type: String, default: "", required: false },         // custom hover class
        textClass:  { type: String, default: "", required: false },         // custom text classes
    });

    // temporary disabled state used to prevent rapid repeated actions
    const updating = ref(false);

    // Temporarily disables button interaction in seconds
    const toggleButtonDisable = async ( duration = 1 ) => {
        updating.value = true;
        await wait(duration);
        updating.value = false;
    }

    // Expose method for parent components
    defineExpose({
        toggleButtonDisable
    });

    // Solid button background styles
    const ButtonBackground = {
        primary: "bg-TBD-primary-light dark:bg-TBD-primary-dark text-TBD-text-light dark:text-TBD-text-dark",
        secondary: "bg-TBD-secondary-light dark:bg-TBD-secondary-dark text-TBD-text-light dark:text-TBD-text-dark",
        error: "bg-TBD-error-light/75 dark:bg-TBD-error-dark/75 text-TBD-text-light dark:text-TBD-text-dark",
        warning: "bg-TBD-warning-light/75 dark:bg-TBD-warning-dark/75 text-TBD-text-light dark:text-TBD-text-dark",
        confirm: "bg-TBD-confirm-light/75 dark:bg-TBD-confirm-dark/75 text-TBD-text-light dark:text-TBD-text-dark",
        neutral: `bg-TBD-bg-dark/10 dark:bg-TBD-bg-light/10 
            text-TBD-bg-dark/80 dark:text-TBD-bg-light/80
            hover:text-TBD-text-dark dark:hover:text-TBD-bg-light`,
    };

    // Hover overlay styles for filled buttons
    const ButtonHover = {
        primary: "bg-TBD-secondary-light dark:bg-TBD-secondary-dark",
        secondary: "bg-TBD-primary-light dark:bg-TBD-primary-dark",
        error: "bg-TBD-error-light dark:bg-TBD-error-dark",
        warning: "bg-TBD-warning-light dark:bg-TBD-warning-dark",
        confirm: "bg-TBD-confirm-light dark:bg-TBD-confirm-dark",
        neutral: "bg-TBD-bg-dark/10 dark:bg-TBD-bg-light/10",
    };

    // Outline button styles (ring + text)
    const ButtonOutline = {
        primary: {
            ring: "ring-TBD-primary-light not-disabled:hover:ring-TBD-secondary-light dark:ring-TBD-primary-dark dark:not-disabled:hover:ring-TBD-secondary-dark",
            text: "text-TBD-primary-light dark:text-TBD-primary-dark not-group-disabled:group-hover:text-TBD-secondary-light dark:not-group-disabled:group-hover:text-TBD-secondary-dark"
        },
        secondary: {
            ring: "ring-TBD-secondary-light not-disabled:hover:ring-TBD-primary-light dark:ring-TBD-secondary-dark dark:not-disabled:hover:ring-TBD-primary-dark",
            text: "text-TBD-secondary-light dark:text-TBD-secondary-dark not-group-disabled:group-hover:text-TBD-primary-light dark:not-group-disabled:group-hover:text-TBD-primary-dark"
        },
        error: {
            ring: "ring-TBD-error-light not-disabled:hover:ring-TBD-error-light dark:ring-TBD-error-dark/75 dark:not-disabled:hover:ring-TBD-error-dark/75",
            text: "text-TBD-error-light not-group-disabled:group-hover:text-TBD-error-light dark:text-TBD-error-dark/75 not-group-disabled:dark:group-hover:text-TBD-error-dark/75"
        },
        warning: {
            ring: "ring-TBD-warning-light not-disabled:hover:ring-TBD-warning-light dark:ring-TBD-warning-dark/75 dark:not-disabled:hover:ring-TBD-warning-dark/75",
            text: "text-TBD-warning-light not-group-disabled:group-hover:text-TBD-warning-light dark:text-TBD-warning-dark/75 not-group-disabled:dark:group-hover:text-TBD-warning-dark/75"
        },
        confirm: {
            ring: "ring-TBD-confirm-light not-disabled:hover:ring-TBD-confirm-light dark:ring-TBD-confirm-dark/75 dark:not-disabled:hover:ring-TBD-confirm-dark/75",
            text: "text-TBD-confirm-light not-group-disabled:group-hover:text-TBD-confirm-light dark:text-TBD-confirm-dark/75 not-group-disabled:dark:group-hover:text-TBD-confirm-dark/75"
        },
        neutral: {
            ring: "ring-TBD-bg-dark/20 not-disabled:hover:ring-TBD-bg-dark/25 dark:ring-TBD-bg-light/20 dark:not-disabled:hover:ring-TBD-bg-light/50",
            text: "text-TBD-bg-dark/75 not-group-disabled:group-hover:text-TBD-bg-dark dark:text-TBD-bg-light/75 not-group-disabled:dark:group-hover:text-TBD-bg-light"
        }
    };
</script>

<template>
    <button :disabled="updating" type="button"
        class="active:scale-95 disabled:opacity-25 dark:disabled:opacity-25 disabled:cursor-not-allowed
            transition-300 group relative overflow-hidden rounded-md cursor-pointer"
        :class="[
            slim ? 'h-7 px-3 text-xs' : 'h-12 px-6',

            // outline vs filled style
            outline
                ? 'ring-1 not-disabled:hover:ring-2 ring-inset ' + ButtonOutline[color].ring
                : ButtonBackground[color]
        ]">

        <!-- HOVER OVERLAY -->
        <div
            v-if="!outline"
            class="not-group-disabled:group-hover:w-full h-full w-1/3 absolute-center transition-500 opacity-0 not-group-disabled:group-hover:opacity-100"
            :class="[hoverClass, ButtonHover[color]]">
        </div>


        <!-- BUTTON CONTENT -->
        <div
            class="relative flex-center-full transition-300"
            :class="[
                textClass,

                // optional hover effects
                {
                    ['not-group-disabled:group-hover:scale-105 not-group-disabled:group-hover:underline']: underline
                },

                // outline vs filled text styles
                outline ? ButtonOutline[color].text : 'font-bold'
            ]">

            <slot/>

        </div>

    </button>
</template>