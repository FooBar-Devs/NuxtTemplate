<script lang="ts" setup>

    const label = ref('Example Dropdown');
    const description = ref('Select an option from the list.');
    const placeholder = ref('Choose an option...');
    const icon = ref('tabler:number');

    const selectedExample = ref('');

    const required = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);
    const slim = ref(false);
    const onlyPlaceholder = ref(false);
    const showEmittedValue = ref(false);
    const showSelectedHighlight = ref(true);
    const hideDefaultItemLabel = ref(false);
    const multiselect = ref(false);

    const dropdownHeight = ref(48);
    const itemHeight = ref(0);
    const showItemsAmount = ref(3);

    const selectedBasic = ref('first');

    const documentedProps = [
        {
            property: 'v-model / modelValue',
            description: 'Current selected value synchronized with the parent component.',
            type: 'object | string | number | boolean | null',
            default: '',
            required: true,
        },
        {
            property: 'list',
            description: 'Array of selectable dropdown items.',
            type: 'array',
            default: "['Option 1', 'Option 2', 'Option 3']",
            required: false,
        },
        {
            property: 'labelName',
            description: 'Object property used to display the item label.',
            type: 'string',
            default: null,
            required: false,
        },
        {
            property: 'emitName',
            description: 'Object property used as the emitted value.',
            type: 'string',
            default: null,
            required: false,
        },
        {
            property: 'multiselect',
            description: 'Enables multi-select mode for the dropdown.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'disabled',
            description: 'Disables interaction with the dropdown.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'readonly',
            description: 'Makes the dropdown read-only and prevents editing.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'required',
            description: 'Marks the dropdown as required.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'name',
            description: 'Input name and id used for form registration and validation.',
            type: 'string',
            default: 'nameNeeded',
            required: true,
        },
        {
            property: 'label',
            description: 'Label text displayed above the dropdown.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'description',
            description: 'Optional helper text displayed below the label.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'placeholder',
            description: 'Text displayed when no item is selected.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'errorAbsolute',
            description: 'Controls the positioning mode of the validation error.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'icon',
            description: 'Icon displayed inside the dropdown.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'slim',
            description: 'Uses the compact dropdown sizing and spacing.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'inputClass',
            description: 'Additional classes applied to the dropdown input.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'listClass',
            description: 'Additional classes applied to the dropdown list.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'itemClass',
            description: 'Additional classes applied to dropdown items.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'height',
            description: 'Height of the dropdown input and items.',
            type: 'number',
            default: 48,
            required: false,
        },
        {
            property: 'dropdownItemHeight',
            description: 'Custom height of individual dropdown items.',
            type: 'number',
            default: 0,
            required: false,
        },
        {
            property: 'dropdownHeight',
            description: 'Additional height applied to the dropdown list.',
            type: 'number',
            default: 0,
            required: false,
        },
        {
            property: 'showItemsAmount',
            description: 'Maximum number of visible items before the list scrolls.',
            type: 'number',
            default: 3,
            required: false,
        },
        {
            property: 'showEmittedValue',
            description: 'Displays the emitted object value instead of the default selected label.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'showSelectedHighlight',
            description: 'Highlights the currently selected dropdown item.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'hideDefaultLabel',
            description: 'Hides the default item label when using the item slot.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'onlyPlaceholder',
            description: 'Always displays the placeholder instead of the selected value.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'itemSelected',
            description: 'Event emitted when an item is selected.',
            type: 'function',
            default: '(value) => {}',
            required: false,
        }
    ];

    const documentedSlots = [
        {
            name: 'item',
            description: 'Custom content used to render each dropdown item.',
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
<InputsDropdown
    v-model="selected"
    name="status"
    label="Status"
    description="Choose a status"
    :list="['First', 'Second', 'Third']"
/>`;

    const customItemExample = `
<InputsDropdown v-model="dropdownValue"
    name="dropdownCustomContent" label="Status"
    placeholder="Select value..." hideDefaultItemLabel
    :list="[
        { name: 'First', value: { number: 1 } },
        { name: 'Second', value: { number: 2 } },
        { name: 'Third', value: { number: 3 } },
    ]"
    multiselect labelName="name" emit-name="value">

    <template #item="{ item, selected }">
        <div class="flex items-center gap-2">

            <Icon :name="item.name == 'First' ? 
                'tabler:circle-number-1' : 
                item.name == 'Second' ? 'tabler:circle-number-2' :
                'tabler:circle-number-3'" 
                class="text-lg"/>

            <span>{{ item.name }}</span>

            <Icon v-if="selected" name="tabler:check"
                class="text-xl absolute right-4"/>
        </div>
    </template>

</InputsDropdown>`;

    const customContentDropdownValue = ref([{number: 1}]);
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsDropdown">
            <template #header>
                <b>InputsDropdown</b> is the shared select component used across forms, dialogs,
                and settings. It supports <b>v-model</b>, <b>vee-validate</b>, object-based
                options, labels and descriptions, placeholders, required indicators, compact
                sizing, selected-item highlighting, and custom item content.
            </template>

            <!-- Basic usage section -->
            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the dropdown with <b>v-model</b> and provide a unique <b>name</b>.
                    Pass the available options through <b>list</b>. For object-based options,
                    use <b>labelName</b> and <b>emitName</b> to control displayed and emitted values.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="A typical dropdown with a bound value, label, description, and object-based options.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsDropdown
                    v-model="selectedBasic"
                    name="dropdownBasic"
                    label="Status"
                    description="Choose a status"
                    :list="['First', 'Second', 'Third']"
                >
                </InputsDropdown>
            </DocsArticleSection>

            <!-- Live example section -->
            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    Change the dropdown properties below to preview the component interactively.
                </template>

                <div class="flex flex-col gap-4">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-2 grid-cols-4">
                            <InputsText slim label="Label" v-model="label" name="dropdownLabel" />
                            <InputsText slim label="Description" v-model="description" name="dropdownDescription" />
                            <InputsText slim label="Placeholder" v-model="placeholder" name="dropdownPlaceholder" />
                            <InputsText slim label="Icon" v-model="icon" name="dropdownIcon" />

                            <InputsCheckBox slim v-model="required" label="Required" name="dropdownRequired" />
                            <InputsCheckBox slim v-model="slim" label="Slim" name="dropdownSlim" />
                            <InputsCheckBox slim v-model="readonly" label="Readonly" name="dropdownReadonly" />
                            <InputsCheckBox slim v-model="disabled" label="Disabled" name="dropdownDisabled" />
                            <InputsCheckBox slim v-model="showSelectedHighlight" label="Show Selected Highlight" name="dropdownHighlight" />
                            <InputsCheckBox slim v-model="hideDefaultItemLabel" label="Hide Default Item Label" name="dropdownHideLabel" />
                            <InputsCheckBox slim v-model="onlyPlaceholder" label="Only Placeholder" name="dropdownOnlyPlaceholder"/>
                            <InputsCheckBox slim v-model="showEmittedValue" label="Show Emitted Value" name="dropdownEmittedValue"/>

                            <InputsNumber slim label="Dropdown Height" v-model="dropdownHeight" name="dropdownHeight" :min="0" />
                            <InputsNumber slim label="Item Height" v-model="itemHeight" name="itemHeight" :min="0" />
                            <InputsNumber slim label="Visible Items" v-model="showItemsAmount" name="dropdownItems" :min="1"/>
                            <InputsCheckBox slim v-model="multiselect" label="Multiselect" name="dropdownMultiselect"/>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">
                        <InputsDropdown
                            v-model="selectedExample"
                            name="dropdownPreview"
                            :label="label"
                            :description="description"
                            :placeholder="placeholder"
                            :required="required"
                            :disabled="disabled"
                            :readonly="readonly"
                            :slim="slim"
                            :icon="icon"
                            :dropdown-height="dropdownHeight"
                            :item-height="itemHeight"
                            :show-items-amount="showItemsAmount"
                            :show-emitted-value="showEmittedValue"
                            :show-selected-highlight="showSelectedHighlight"
                            :hide-default-item-label="hideDefaultItemLabel"
                            :only-placeholder="onlyPlaceholder"
                            :list="[
                                { name: 'First', value: '1' },
                                { name: 'Second', value: '2' },
                                { name: 'Third', value: '3' },
                            ]"
                            :multiselect="multiselect"
                            label-name="name"
                            emit-name="value"
                        />

                        <p class="mt-3 text-xs opacity-75">
                            Selected value: {{ selectedExample }}
                        </p>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <!-- Slots section -->
            <DocsArticleSection id="slots" title="Slots">
                <template #description>
                    The dropdown supports a default slot and an <b>item</b> slot for custom
                    content. The item slot receives the current item, its index, and selected state.
                </template>

                <DocsCodeExample
                    title="Custom Item Example"
                    eyebrow="Example"
                    description="Customize how individual dropdown options are rendered.">
                    {{ customItemExample }}
                </DocsCodeExample>

                <InputsDropdown v-model="customContentDropdownValue"
                    name="dropdownCustomContent" label="Status"
                    :list="[
                        { name: 'First', value: { number: 1 } },
                        { name: 'Second', value: { number: 2 } },
                        { name: 'Third', value: { number: 3 } },
                    ]"
                    label-name="name" emit-name="value"
                    hideDefaultItemLabel
                    placeholder="Select value..."
                    multiselect>
                    <template #item="{ item, selected }">
                        <div class="flex items-center gap-2">

                            <Icon :name="item.name == 'First' ? 
                                'tabler:circle-number-1' : 
                                item.name == 'Second' ? 'tabler:circle-number-2' :
                                'tabler:circle-number-3'" 
                                class="text-lg"/>

                            <span>{{ item.name }}</span>

                            <Icon v-if="selected" name="tabler:check"
                                class="text-xl absolute right-4"/>
                        </div>
                    </template>
                </InputsDropdown>

                <p> Selected values: {{ customContentDropdownValue }} </p>

                <DocsSlotsTable :rows="documentedSlots" class="mt-6"/>
            </DocsArticleSection>

            <!-- Props section -->
            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. The <b>name</b> prop is
                    required, while all other props are optional.
                </template>

                <DocsPropsTable :rows="documentedProps" class="mt-6"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>