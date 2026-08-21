<script setup lang="ts">
    const slim = ref(false);
    const outline = ref(false);
    const underline = ref(false);
    const color = ref<'primary' | 'error' | 'warning' | 'confirm' | 'neutral'>('primary');
    const buttonDisableTime = ref(1);

    const documentedProps = [
        {
            property: 'color',
            description: 'Button color theme.',
            type: "'primary' | 'error' | 'warning' | 'confirm' | 'neutral'",
            default: 'primary',
            required: false,
        },
        {
            property: 'outline',
            description: 'Outline button style.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'slim',
            description: 'Compact button size.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'underline',
            description: 'Underline text on hover.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'hoverClass',
            description: 'Custom hover class.',
            type: 'string',
            default: "",
            required: false,
        },
        {
            property: 'textClass',
            description: 'Custom text classes.',
            type: 'string',
            default: "",
            required: false,
        },
    ];

    const documentedMethods = [
        {
            method: 'toggleButtonDisable',
            description: 'Temporarily disables button interaction for a short duration to prevent rapid repeated actions.',
            parameters: [ 
                {
                    name: 'duration',
                    type: 'number',
                    description: 'Duration in seconds for which the button should be disabled.',
                    required: false,
                    default: '1',
                }
            ],
            returns: 'Promise<void>',
        },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'Examples', title: 'Examples' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'props', title: 'Props' },
        { id: 'methods', title: 'Methods' },
    ];

    const basicUsageExample = `
<InputsButton slim outline underline color="confirm">
    Save Changes
</InputsButton>`;

</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsButton">

            <template #header>
                <b>InputsButton</b> is the shared action component used across forms, dialogs, and
                setting surfaces. It provides themed background variants, optional outline mode,
                compact sizing, and subtle hover motion while keeping interactions visually consistent.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Pass content through the slot and control visual style with <b>slim</b>,
                    <b>outline</b>, <b>underline</b>, and <b>color</b>. Keep labels concise and
                    action-oriented so button intent stays clear in dense layouts.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="Use InputsButton for primary actions, then layer style props for visual priority and compactness.">
                    {{ basicUsageExample }}
                </DocsCodeExample>

                <InputsButton slim outline underline color="confirm">
                    Save Changes
                </InputsButton>
            </DocsArticleSection>

            <DocsArticleSection id="Examples" title="Examples">
                <template #description>
                    The following examples show how to combine the available props to achieve different
                    visual styles. Use these as a reference for your own button usage.
                </template>

                <div class="grid gap-2 grid-cols-3">
                    <InputsButton color="primary"> Primary </InputsButton>
                    <InputsButton color="secondary"> Secondary </InputsButton>
                    <InputsButton color="error"> Error </InputsButton>
                    <InputsButton color="warning"> Warning </InputsButton>
                    <InputsButton color="confirm"> Confirm </InputsButton>
                    <InputsButton color="neutral"> Neutral </InputsButton>
                </div>

                <div class="grid gap-2 grid-cols-3">
                    <InputsButton outline color="primary"> Primary </InputsButton>
                    <InputsButton outline color="secondary"> Secondary </InputsButton>
                    <InputsButton outline color="error"> Error </InputsButton>
                    <InputsButton outline color="warning"> Warning </InputsButton>
                    <InputsButton outline color="confirm"> Confirm </InputsButton>
                    <InputsButton outline color="neutral"> Neutral </InputsButton>
                </div>

                <div class="grid gap-2 grid-cols-3">
                    <InputsButton slim color="primary"> Primary </InputsButton>
                    <InputsButton slim color="secondary"> Secondary </InputsButton>
                    <InputsButton slim color="error"> Error </InputsButton>
                    <InputsButton slim color="warning"> Warning </InputsButton>
                    <InputsButton slim color="confirm"> Confirm </InputsButton>
                    <InputsButton slim color="neutral"> Neutral </InputsButton>
                </div>

                <div class="grid gap-2 grid-cols-3">
                    <InputsButton slim outline color="primary"> Primary </InputsButton>
                    <InputsButton slim outline color="secondary"> Secondary </InputsButton>
                    <InputsButton slim outline color="error"> Error </InputsButton>
                    <InputsButton slim outline color="warning"> Warning </InputsButton>
                    <InputsButton slim outline color="confirm"> Confirm </InputsButton>
                    <InputsButton slim outline color="neutral"> Neutral </InputsButton>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to interactively change the button props and
                    immediately see the resulting component style.
                </template>

                <div class="grid gap-4 grid-cols-3">
                    
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-3 md:grid-cols-2">
                            <InputsCheckBox slim v-model="slim" label="Slim" name="buttonSlim"/>
                            <InputsCheckBox slim v-model="outline" label="Outline" name="buttonOutline"/>
                            <InputsCheckBox slim v-model="underline" label="Text hover underline" class="col-span-2" name="buttonUnderline"/>
                            <InputsDropdown v-model="color" slim name="buttonBackground" label="Color" class="col-span-2"
                                :list="['primary', 'error', 'warning', 'confirm', 'neutral']" :showItemsAmount="5"/>
                            <InputsNumber v-model="buttonDisableTime" slim name="buttonDisableTime" label="Disable time" description="(in seconds)"
                                :min="0.1" :max="5" :increment="0.1"/>
                            <InputsButton slim outline color="neutral" class="whitespace-nowrap self-end text-2xs pt-0.5"
                                @click="() => { $refs.buttonRef.toggleButtonDisable(buttonDisableTime); } ">
                                Toggle Disable
                            </InputsButton>
                        </div>
                    </DocsPanel>
                    
                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">
                        <InputsButton
                            ref="buttonRef"
                            :slim="slim"
                            :outline="outline"
                            :underline="underline"
                            :color="color">
                            Save Changes
                        </InputsButton>             
                    </DocsPanel>
                </div>

            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. All props are optional and
                    have sensible defaults for standard button usage.
                </template>

                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

            <DocsArticleSection id="methods" title="Methods">
                <template #description>
                    The following methods are available on the component. All methods are optional and
                    can be used to programmatically control button behavior.
                </template>

                <DocsMethodsTable :rows="documentedMethods"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>