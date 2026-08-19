<script setup lang="ts">
    import hljs from 'highlight.js/lib/core';
    import javascript from 'highlight.js/lib/languages/javascript';
    import typescript from 'highlight.js/lib/languages/typescript';
    import xml from 'highlight.js/lib/languages/xml';
    import { nextTick, onMounted, onUpdated, ref } from 'vue';

    if (!hljs.getLanguage('javascript')) {
        hljs.registerLanguage('javascript', javascript);
    }
    if (!hljs.getLanguage('xml')) {
        hljs.registerLanguage('xml', xml);
    }
    if (!hljs.getLanguage('html')) {
        hljs.registerLanguage('html', xml);
    }
    if (!hljs.getLanguage('vue')) {
        hljs.registerLanguage('vue', xml);
    }
    if (!hljs.getLanguage('typescript')) {
        hljs.registerLanguage('typescript', typescript);
    }

    const props = defineProps({
        // content props
        eyebrow:     { type: String, default: "", required: false },
        title:       { type: String, default: "", required: true },
        description: { type: String, default: "", required: false },

        // behavior props
        sticky:   { type: Boolean, default: false, required: false },
        language: { type: String,  default: "vue",    required: false },
    });

    const codeElement = ref<HTMLElement | null>(null);

    const highlightCode = async () => {
        await nextTick();

        const element = codeElement.value;
        if (!element) {
            return;
        }

        const source = element.innerText.trim();
        if (!source) {
            return;
        }

        element.textContent = source;
        hljs.highlightElement(element);
    };

    onMounted(highlightCode);
    onUpdated(highlightCode);
</script>

<template>
    <DocsPanel :eyebrow="eyebrow" :title="title" tone="primary" :sticky="sticky" body-class="p-0">
        <template #header-right>
            <div class="flex items-center gap-3 text-[11px] opacity-70">
                <span class="size-3 ring-1 ring-TBD-bg-light dark:ring-TBD-bg-dark  rounded-full bg-TBD-error-light dark:bg-TBD-error-dark"/>
                <span class="size-3 ring-1 ring-TBD-bg-light dark:ring-TBD-bg-dark rounded-full bg-TBD-warning-light dark:bg-TBD-warning-dark"/>
                <span class="size-3 ring-1 ring-TBD-bg-light dark:ring-TBD-bg-dark rounded-full bg-TBD-confirm-light dark:bg-TBD-confirm-dark"/>
            </div>
        </template>

        <div class="border-b border-TBD-bg-dark/10 bg-TBD-bg-light/90 px-4 py-3 text-xs leading-5 text-TBD-text-dark dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/90 dark:text-TBD-text-light">
            {{ description }}
        </div>

<pre class="overflow-x-auto bg-TBD-bg-light/50 px-4 py-3 text-xs leading-6 text-TBD-text-dark dark:bg-TBD-bg-dark/50 dark:text-TBD-text-light">
<code ref="codeElement" :class="`language-${props.language}`"><slot/></code>
</pre>

    </DocsPanel>
</template>