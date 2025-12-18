<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

type MapOfStr = Record<string, string>
type OutlineEntry = { ring: string; text: string }
type OutlineMap = Record<string, OutlineEntry>

const defaultBackgrounds: MapOfStr = {
    default: 'bg-TBD-fipu-blue-default dark:bg-TBD-fipu-blue-default/50',
    error: 'bg-TBD-bg-dark/75 dark:bg-TBD-bg-light/15',
    warning: 'bg-TBD-fipu-orange-default dark:bg-TBD-fipu-orange-dark/90',
}
const defaultHovers: MapOfStr = {
    default: 'bg-TBD-fipu-yellow-default dark:bg-TBD-fipu-yellow-default/75',
    error: 'bg-TBD-fipu-red-default dark:bg-TBD-fipu-red-default/75',
    warning: 'bg-TBD-fipu-green-default/75 dark:bg-TBD-fipu-green-dark/75',
}
const defaultOutlines: OutlineMap = {
    default: {
        ring: 'ring-TBD-fipu-blue-default hover:ring-TBD-fipu-yellow-default dark:ring-TBD-fipu-blue-default/60 dark:hover:ring-TBD-fipu-yellow-default/80',
        text: 'text-TBD-fipu-blue-default not-group-disabled:group-hover:text-TBD-fipu-yellow-default',
    },
    error: {
        ring: 'ring-TBD-fipu-red-default hover:ring-TBD-fipu-red-default dark:ring-TBD-fipu-red-default/60 dark:hover:ring-TBD-fipu-red-default/80',
        text: 'text-TBD-fipu-red-default not-group-disabled:group-hover:text-TBD-fipu-red-default',
    },
}

const props = defineProps({
    // Styling overrides
    hoverClass: { type: String, default: '' },
    textClass: { type: String, default: '' },

    // Behavior flags
    outline: { type: Boolean, default: false },
    textUnderline: { type: Boolean, default: false },
    slim: { type: Boolean, default: false },

    // Theme keys
    colorBackground: { type: String, default: 'default' },
    colorHover: { type: String, default: 'default' },
    colorOutline: { type: String, default: 'default' },

    // Allow consumers to override color maps (merge with defaults)
    customBackgrounds: { type: Object as () => Partial<MapOfStr>, default: () => ({}) },
    customHovers: { type: Object as () => Partial<MapOfStr>, default: () => ({}) },
    customOutlines: { type: Object as () => Partial<OutlineMap>, default: () => ({}) },
})

const attrs = useAttrs()
const updating = ref(false)

function sleep(ms = 250) {
    return new Promise<void>((res) => setTimeout(res, ms))
}

const toggleButtonDisable = async (ms = 250) => {
    updating.value = true
    await sleep(ms)
    updating.value = false
}

defineExpose({ toggleButtonDisable })

// Merge defaults with custom maps so it's easy to extend from outside
const mergedBackgrounds = computed(() => ({ ...defaultBackgrounds, ...(props.customBackgrounds || {}) }))
const mergedHovers = computed(() => ({ ...defaultHovers, ...(props.customHovers || {}) }))
const mergedOutlines = computed(() => ({ ...defaultOutlines, ...(props.customOutlines || {}) }))

// Safe accessor helpers
function getBackground(key: string) {
    return mergedBackgrounds.value[key] ?? mergedBackgrounds.value.default ?? ''
}
function getHover(key: string) {
    return mergedHovers.value[key] ?? mergedHovers.value.default ?? ''
}
function getOutline(key: string): OutlineEntry {
    return mergedOutlines.value[key] ?? mergedOutlines.value.default ?? { ring: '', text: '' }
}

// Computed classes to keep the template clean and adjustable
const sizeClass = computed(() => (props.slim ? 'h-7 text-xs px-4' : 'h-12 px-6'))
const baseButtonClasses =
    'active:scale-95 disabled:opacity-25 dark:disabled:opacity-25 disabled:cursor-not-allowed transition-300 group relative overflow-hidden rounded-md cursor-pointer text-TBD-bg-light dark:text-TBD-text-light'
const outlineClasses = computed(() => `ring-1 hover:ring-2 ring-inset ${getOutline(props.colorOutline).ring}`)
const backgroundClasses = computed(() => getBackground(props.colorBackground))
const hoverLayerClasses = computed(() => `${props.hoverClass} ${getHover(props.colorHover)}`)

const contentTextClasses = computed(() => {
    const base = [props.textClass, props.textUnderline ? 'not-group-disabled:group-hover:scale-105 not-group-disabled:group-hover:underline' : '', props.outline ? getOutline(props.colorOutline).text : 'font-bold']
    return base.filter(Boolean).join(' ')
})
</script>

<template>
    <button
        v-bind="attrs"
        :disabled="updating"
        :class="[baseButtonClasses, sizeClass, props.outline ? outlineClasses : backgroundClasses]"
    >
        <!-- Hover layer (only when not outlined) -->
        <div
            v-if="!props.outline"
            class="not-group-disabled:group-hover:w-full h-full w-1/3 absolute-center transition-500 opacity-0 not-group-disabled:group-hover:opacity-100"
            :class="hoverLayerClasses"
        />

        <!-- Content -->
        <div class="relative flex-full-center transition-300" :class="contentTextClasses">
            <slot />
        </div>
    </button>
</template>