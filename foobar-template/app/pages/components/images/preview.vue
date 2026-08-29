<script setup lang="ts">
    const imageExample = ref('https://upload.wikimedia.org/wikipedia/sco/7/70/Bob_at_Easel.jpg');
    const image = ref('https://fipu-educoder-nuxt.netlify.app/images/fun/cat_2.gif');
    const background = ref(false);
    const pixelThreshold = ref(32);

    const documentedProps = [
        { property: 'image', description: 'Image URL/path.', type: 'string', default: null, required: true },
        { property: 'background', description: 'Optional background rendering mode.', type: 'boolean', default: false, required: false },
        { property: 'pixelThreshold', description: 'Maximum dimensions for pixel-art detection.', type: 'number', default: 128, required: false },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample =
`<InputsImagePreview
    :image="image"
/>`;
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsImagePreview">

            <template #header>
                <b>InputsImagePreview</b> displays an image preview and automatically uses
                pixelated rendering for small images.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Provide an image URL or path through <b>image</b>.
                </template>

                <DocsCodeExample eyebrow="Example" title="Basic Template" description="Render an image preview.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsImagePreview :image="imageExample" class="size-32"/>
            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    Test the image and pixel-art detection threshold.
                </template>

                <div class="grid grid-cols-3 gap-4">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">

                        <div class="grid grid-cols-2 gap-2">
                            <InputsText slim v-model="image" name="image" label="Image" class="col-span-2"/>
                            <InputsNumber slim v-model="pixelThreshold" name="pixelThreshold" label="Pixel Threshold"/>
                            <InputsCheckBox slim v-model="background" name="background" label="Background" class="self-end mb-2.25"/>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">

                        <InputsImagePreview :image="image" :pixel-threshold="pixelThreshold" :background="background" class="size-32"/>

                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following table lists the component's props, their types, default values, and whether they are required.
                </template>
                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>