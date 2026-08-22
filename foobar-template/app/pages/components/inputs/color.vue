<script setup lang="ts">
    const colorValue = ref('rgb(255, 255, 255)');
    const hoverColor = ref<number | undefined>();
    const hoverVariant = ref<number | undefined>();    

    const documentedProps = [
        {
            property: 'v-model / modelValue',
            description: 'Current color value.',
            type: 'string',
            default: 'rgb(255, 255, 255)',
            required: true,
        },
        {
            property: 'i',
            description: 'Color index within the parent matrix.',
            type: 'number',
            default: 0,
            required: false,
        },
        {
            property: 'j',
            description: 'Variant index within the parent matrix.',
            type: 'number',
            default: 0,
            required: false,
        },
        {
            property: 'hoverColor',
            description: 'Currently active color index.',
            type: 'number',
            default: undefined,
            required: false,
        },
        {
            property: 'hoverVariant',
            description: 'Currently active variant index.',
            type: 'number',
            default: undefined,
            required: false,
        },
        {
            property: 'property',
            description: 'Unique identifier used for the teleported picker.',
            type: 'string',
            default: '',
            required: true,
        },
    ];

    const documentedEvents = [
        {
            method: 'click-color',
            description: 'Triggered when the color swatch is clicked.',
            parameters: [],
            returns: 'void',
        },
        {
            method: 'leave-color-picker',
            description: 'Triggered when the cursor leaves the color picker.',
            parameters: [],
            returns: 'void',
        },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'events', title: 'Events' },
        { id: 'props', title: 'Props' },
    ];    
    
    const basicExample =
`<InputsColor
    v-model="colorValue"
    :i="1" :j="0"
    :hover-color="hoverColor"
    :hover-variant="hoverVariant"
    property="docsColor" 
    @click-color="hoverColor = 1; hoverVariant = 0"
    @leave-color-picker="hoverColor = undefined; hoverVariant = undefined"
/>`;

</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsColor">

            <template #header>
                <b>InputsColor</b> provides a compact color swatch that opens an
                advanced color picker through teleportation. It is designed for
                theme editors, palette builders, and other tooling where large
                groups of colors must remain easy to edit while preserving
                screen space. The component exposes hover state helpers and
                emits events that allow parent components to coordinate picker
                visibility and focus.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the component using <b>v-model</b> and provide unique
                    <b>i</b>, <b>j</b>, and <b>property</b> values. Use
                    <b>hoverColor</b> and <b>hoverVariant</b> to track the
                    active picker and listen to emitted events to manage
                    visibility state.
                </template>

                <DocsCodeExample eyebrow="Example" title="Basic Template"
                    description="A typical setup binds a color value and tracks the active picker through hover indices.">
                    {{ basicExample }}
                </DocsCodeExample>

                <div class="flex items-center gap-3">
                    <InputsColor
                        v-model="colorValue"
                        :i="1" :j="0"
                        :hover-color="hoverColor"
                        :hover-variant="hoverVariant"
                        property="--color-TBD-bg-light"
                        @click-color="hoverColor = 1; hoverVariant = 0"
                        @leave-color-picker="hoverColor = undefined; hoverVariant = undefined"
                    />

                    <span class="text-xs opacity-75">
                        Current value: {{ colorValue }}
                    </span>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="events" title="Events">
                <template #description>
                    The component emits events that allow parent components to
                    manage active picker state and user interaction.
                </template>

                <DocsMethodsTable :rows="documentedEvents"/>
            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. The
                    <b>property</b> value should remain unique when multiple
                    color pickers exist on the same page.
                </template>

                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>