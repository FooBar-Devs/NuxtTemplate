<script setup lang="ts">
    const label = ref('Display Name');
    const description = ref('Shown under the label as helper text.');
    const required = ref(true);
    const slim = ref(false);
    const descriptionClass = ref('');
    const descriptionMarkClass = ref('');
    const customLabelSlot = ref('');
    const customDescriptionSlot = ref('');

    const documentedProps = [
        {
            property: 'label',
            description: 'Main label text. A single space is treated as empty.',
            type: 'string',
            default: ' ',
            required: false,
        },
        {
            property: 'description',
            description: 'Helper or description text displayed below the label.',
            type: 'string',
            default: ' ',
            required: false,
        },
        {
            property: 'required',
            description: 'Displays the required indicator (*).',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'slim',
            description: 'Uses the compact label variant.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'descriptionClass',
            description: 'Additional classes applied to the description container.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'descriptionMarkClass',
            description: 'Additional classes applied to the required mark shown beside a description-only label.',
            type: 'string',
            default: '',
            required: false,
        },
    ];

    const documentedSlots = [
        {
            name: 'label',
            description: 'Custom content rendered after the label text.',
        },
        {
            name: 'description',
            description: 'Custom content rendered after the description text.',
        },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'slots', title: 'Slots' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample = `
<InputsLabel 
    label="Display Name" 
    description="Shown under the label as helper text." 
    :required="true"
/>`;

    const slotsExample = `
<InputsLabel label="" description="">

    <template #label>
        <span class="font-medium">Slot Label</span>
    </template>

    <template #description>
        <span>Slot description</span>
    </template>

</InputsLabel>`;
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsLabel">
            <template #header>
                <b>InputsLabel</b> is the shared label component used across forms, dialogs, and
                setting surfaces. It provides a consistent interface for displaying labels,
                descriptions, and required indicators. It supports compact styling and custom
                label and description content through slots.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Provide a <b>label</b> and optional <b>description</b>. Use <b>required</b>
                    for mandatory fields and <b>slim</b> for compact layouts.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="A typical setup combines a label, helper text, and required indicator.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsLabel label="Display Name" description="Shown under the label as helper text." :required="true" >
                </InputsLabel>
            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to interactively change the component props
                    and immediately see how the label is rendered.
                </template>

                <div class="grid gap-4 grid-cols-3">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-2 grid-cols-2">
                            <InputsText :maxlength="100" slim label="Label" v-model="label" name="label" class="col-span-2" >
                            </InputsText>

                            <InputsText :maxlength="100" slim label="Description" v-model="description" name="description" class="col-span-2" >
                            </InputsText>

                            <InputsText :maxlength="100" slim label="Description Class" v-model="descriptionClass" name="descriptionClass" class="col-span-2" >
                            </InputsText>

                            <InputsText :maxlength="100" slim label="Description Mark Class" v-model="descriptionMarkClass" name="descriptionMarkClass" class="col-span-2" >
                            </InputsText>

                            <InputsCheckBox v-model="required" slim label="Required" name="required" >
                            </InputsCheckBox>

                            <InputsCheckBox v-model="slim" slim label="Slim" name="slim" >
                            </InputsCheckBox>

                            <InputsText v-model="customLabelSlot" :maxlength="100" slim label="Custom Label Slot" name="customLabelSlot" class="col-span-2"/>
                            <InputsText v-model="customDescriptionSlot" :maxlength="100" slim label="Custom Description Slot" name="customDescriptionSlot" class="col-span-2"/>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">
                        <InputsLabel
                            :label="label"
                            :description="description"
                            :required="required"
                            :slim="slim"
                            :description-class="descriptionClass"
                            :description-mark-class="descriptionMarkClass"
                        >
                            <template v-if="customLabelSlot" #label>
                                {{ customLabelSlot }}
                            </template>

                            <template v-if="customDescriptionSlot" #description>
                                {{ customDescriptionSlot }}
                            </template>
                        </InputsLabel>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="slots" title="Slots">
                <template #description>
                    The component provides <b>label</b> and <b>description</b> slots for custom
                    content such as links, icons, or additional inline elements.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Custom Content"
                    description="Use the available slots to customize label and description content.">
                    {{ slotsExample }}
                </DocsCodeExample>

                <InputsLabel label="" description="">

                    <template #label>
                        <span class="font-bold">Slot Label</span>
                    </template>

                    <template #description>
                        <span>Slot description</span>
                    </template>

                </InputsLabel>

                <DocsSlotsTable :rows="documentedSlots" class="mt-6"/>

            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. All props are optional
                    unless otherwise noted.
                </template>

                <DocsPropsTable :rows="documentedProps">
                </DocsPropsTable>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections">
        </DocsOnThisPage>
    </div>
</template>