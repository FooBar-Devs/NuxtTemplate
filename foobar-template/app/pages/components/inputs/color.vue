<script setup lang="ts">
    const colorValue = ref('rgb(255, 255, 255)');
    const label = ref('Color Swatch');
    const type = ref('RGB' as 'HEX8' | 'RGBA' | 'RGB' | 'HEX');
    const inputType = ref('RGB' as 'RGB' | 'HSL' | 'HEX' | 'HSV' | 'CMYK');
    const showAlpha = ref(false);
    const showColorList = ref(true);
    const showEyeDrop = ref(true);
    const showPickerMode = ref(true);
    const showInputMenu = ref(true);
    const showInputSet = ref(true);
    const mode = ref<'solid' | 'gradient'>('solid');

    const documentedProps = [
        {
            property: 'v-model / modelValue',
            description: 'Current color value.',
            type: 'string',
            default: 'rgb(255, 255, 255)',
            required: true,
        },
        {
            property: 'name',
            description: 'Unique identifier used for the color item and teleported picker.',
            type: 'string',
            default: '',
            required: true,
        },
        {
            property: 'label',
            description: 'Optional label for the color item.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'type',
            description: 'Defines the color value type returned by the component.',
            type: 'HEX8 | RGBA | RGB | HEX',
            default: 'RGB',
            required: false,
        },
        {
            property: 'inputType',
            description: 'Defines the input type used for color values.',
            type: 'RGB | HSL | HEX | HSV | CMYK',
            default: 'RGB',
            required: false,
        },
        {
            property: 'mode',
            description: 'Color picker mode (solid or gradient).',
            type: 'solid | gradient',
            default: 'solid',
            required: false,
        },
        {
            property: 'showAlpha',
            description: 'Indicates if the alpha channel should be shown in the color picker.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'showColorList',
            description: 'Controls whether the color list is displayed in the color picker.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'showEyeDrop',
            description: 'Controls whether the eyedropper tool is displayed in the color picker.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'showPickerMode',
            description: 'Controls whether the picker mode toggle is displayed in the color picker.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'showInputMenu',
            description: 'Controls whether the input menu is displayed in the color picker.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'showInputSet',
            description: 'Controls whether the input set is displayed in the color picker.',
            type: 'boolean',
            default: true,
            required: false,
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
            method: 'leave-color',
            description: 'Triggered when the cursor leaves the color picker.',
            parameters: [],
            returns: 'void',
        },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'events', title: 'Events' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample =
`<InputsColor
    v-model="colorValue"
    name="docsColor"
    label="Color Swatch"
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
                screen space. The component supports solid and gradient color
                modes, configurable input formats, optional alpha selection,
                picker tools, and events that allow parent components to
                coordinate picker interaction.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the component using <b>v-model</b> and provide a unique
                    <b>name</b>. Use <b>label</b> when the swatch needs additional
                    context, and configure the picker using the available props.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="A typical setup binds a color value and provides a unique name for the picker.">
                    {{ basicExample }}
                </DocsCodeExample>

                <div class="mt-4 flex items-center gap-3">
                    <InputsColor v-model="colorValue" name="docsColorBasic" label="Color Swatch"/>
                    <span class="text-xs opacity-75">Current value: {{ colorValue }}</span>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    Configure the color picker interactively using the available
                    props and preview the resulting color.
                </template>

                <div class="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid grid-cols-2 gap-3">
                            <InputsDropdown slim name="colorType" label="Value Type" :list="['HEX8', 'RGBA', 'RGB', 'HEX']" v-model="type" :show-items-amount="4"/>
                            <InputsDropdown slim name="colorInputType" label="Input Type" :list="['RGB', 'HSL','HEX', 'HSV', 'CMYK']" v-model="inputType" :show-items-amount="4"/>
                            <InputsDropdown slim name="colorMode" label="Mode" :list="['solid', 'gradient']" v-model="mode"/>
                            <InputsText slim :maxlength="100" name="colorLabel" label="Label" v-model="label"/>
                            <InputsCheckBox slim name="showAlpha" label="Alpha" v-model="showAlpha"/>
                            <InputsCheckBox slim name="showColorList" label="Color List" v-model="showColorList"/>
                            <InputsCheckBox slim name="showEyeDrop" label="Eyedropper" v-model="showEyeDrop"/>
                            <InputsCheckBox slim name="showPickerMode" label="Picker Mode" v-model="showPickerMode"/>
                            <InputsCheckBox slim name="showInputMenu" label="Input Menu" v-model="showInputMenu"/>
                            <InputsCheckBox slim name="showInputSet" label="Input Set" v-model="showInputSet"/>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-5">
                        <div class="flex flex-col gap-3">
                            <InputsColor
                                v-model="colorValue"
                                name="docsColorLive"
                                :label="label"
                                :valueType="type"
                                :input-type="inputType"
                                :mode="mode"
                                :show-alpha="showAlpha"
                                :show-color-list="showColorList"
                                :show-eye-drop="showEyeDrop"
                                :show-picker-mode="showPickerMode"
                                :show-input-menu="showInputMenu"
                                :show-input-set="showInputSet"
                            />

                            <span class="text-xs opacity-50">{{ colorValue }}</span>

                            <InputsLabel label="Current Color" description="The value updates as the picker changes."/>

                            <div class="h-12 w-full rounded-md ring" :style="{ background: colorValue }"></div>
                        </div>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="events" title="Events">
                <template #description>
                    The component emits events that allow parent components to
                    respond to picker interaction.
                </template>

                <DocsMethodsTable :rows="documentedEvents"/>
            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. The
                    <b>name</b> value should remain unique when multiple color
                    pickers exist on the same page.
                </template>

                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>