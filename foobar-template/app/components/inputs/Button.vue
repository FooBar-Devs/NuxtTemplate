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
        default: "bg-TBD-fipu-blue-default dark:bg-TBD-fipu-blue-default/50",
        error: "bg-TBD-bg-dark/75 dark:bg-TBD-bg-light/15",
        warning: "bg-TBD-fipu-orange-default dark:bg-TBD-fipu-orange-dark/90",
    }
    const ECHover = {
        default: "bg-TBD-fipu-yellow-default dark:bg-TBD-fipu-yellow-default/75",
        error: "bg-TBD-fipu-red-default dark:bg-TBD-fipu-red-default/75",
        warning: "bg-TBD-fipu-green-default/75 dark:bg-TBD-fipu-green-dark/75",
    }
    const ECOutline = {
        default: {
            ring: "ring-TBD-fipu-blue-default hover:ring-TBD-fipu-yellow-default dark:ring-TBD-fipu-blue-default/60 dark:hover:ring-TBD-fipu-yellow-default/80",
            text: "text-TBD-fipu-blue-default not-group-disabled:group-hover:text-TBD-fipu-yellow-default"
        },
        error: {
            ring: "ring-TBD-fipu-red-default hover:ring-TBD-fipu-red-default dark:ring-TBD-fipu-red-default/60 dark:hover:ring-TBD-fipu-red-default/80",
            text: "text-TBD-fipu-red-default not-group-disabled:group-hover:text-TBD-fipu-red-default"
        }
    }
</script>

<template>
    <button :disabled="updating" class="active:scale-95 disabled:opacity-25 dark:disabled:opacity-25 disabled:cursor-not-allowed transition-300 group relative overflow-hidden px-6 rounded-md cursor-pointer
        text-TBD-bg-light dark:text-TBD-text-light" :class="[slim ? 'h-7 text-xs' : 'h-12', outline ? 'ring-1 hover:ring-2 ring-inset ' + ECOutline[colorOutline].ring : ECbackground[colorBackground]]">

        <div v-if="!outline" class="not-group-disabled:group-hover:w-full h-full w-1/3 absolute-center transition-500 opacity-0 not-group-disabled:group-hover:opacity-100" :class="[hoverClass, ECHover[colorHover]]"></div>

        <div class="relative flex-full-center transition-300" :class="[textClass, {['not-group-disabled:group-hover:scale-105 not-group-disabled:group-hover:underline'] : textUnderline},
            outline ? ECOutline[colorOutline].text : 'font-bold']">
            <slot/>
        </div>

    </button>
</template>