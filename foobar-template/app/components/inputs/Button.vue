<script setup lang="ts">
    const props = defineProps({
        hoverClass: { type: String, default: "" },
        textClass: { type: String, default: "" },
        outline: { type: Boolean, default: false },
        textUnderline: { type: Boolean, default: false },
        colorBackground: { type: String as () => keyof typeof ECbackground, default: "default" },
        colorHover: { type: String as () => keyof typeof ECHover, default: "default" },
        colorOutline: { type: String as () => keyof typeof ECOutline, default: "default" },
        slim: { type: Boolean, default: false },
    });

    const updating = ref(false);

    const toggleButtonDisable = async () => {
        updating.value = true;
        await wait(1);
        updating.value = false;
    }

    defineExpose({
        toggleButtonDisable
    })

    const ECbackground = {
        default: "bg-TBD-primary-light dark:bg-TBD-primary-dark/90",
        error: "bg-TBD-bg-dark/75 dark:bg-TBD-bg-light/15",
        warning: "bg-TBD-warning-light dark:bg-TBD-warning-dark/90",
        neutral: "bg-TBD-bg-light/50 dark:bg-TBD-bg-dark/50",
    }
    const ECHover = {
        default: "bg-TBD-secondary-light dark:bg-TBD-secondary-dark/75",
        error: "bg-TBD-error-light dark:bg-TBD-error-dark/75",
        warning: "bg-TBD-confirm-light/75 dark:bg-TBD-confirm-dark/75",
        neutral: "bg-TBD-bg-light/50 dark:bg-TBD-bg-dark/50",
    }
    const ECOutline = {
        default: {
            ring: "ring-TBD-primary-light not-disabled:hover:ring-TBD-secondary-light dark:ring-TBD-primary-dark dark:not-disabled:hover:ring-TBD-secondary-dark",
            text: "text-TBD-primary-light dark:text-TBD-primary-dark not-group-disabled:group-hover:text-TBD-secondary-light dark:not-group-disabled:group-hover:text-TBD-secondary-dark"
        },
        error: {
            ring: "ring-TBD-error-light hover:ring-TBD-error-light dark:ring-TBD-error-dark/75 dark:hover:ring-TBD-error-dark/75",
            text: "text-TBD-error-light not-group-disabled:group-hover:text-TBD-error-light dark:text-TBD-error-dark/75 not-group-disabled:dark:group-hover:text-TBD-error-dark/75"
        }
    }
</script>

<template>
    <button :disabled="updating" class="active:scale-95 disabled:opacity-25 dark:disabled:opacity-25 disabled:cursor-not-allowed transition-300 group relative overflow-hidden px-6 rounded-md cursor-pointer
        text-TBD-text-light dark:text-TBD-text-dark" :class="[slim ? 'h-7 text-xs' : 'h-12', outline ? 'ring-1 not-disabled:hover:ring-2 ring-inset ' + ECOutline[colorOutline].ring : ECbackground[colorBackground]]">

        <div v-if="!outline" class="not-group-disabled:group-hover:w-full h-full w-1/3 absolute-center transition-500 opacity-0 not-group-disabled:group-hover:opacity-100" :class="[hoverClass, ECHover[colorHover]]"></div>

        <div class="relative flex-center-full transition-300" :class="[textClass, {['not-group-disabled:group-hover:scale-105 not-group-disabled:group-hover:underline'] : textUnderline},
            outline ? ECOutline[colorOutline].text : 'font-bold']">
            <slot/>
        </div>

    </button>
</template>