<script setup lang="ts">
    const required = ref(true);
    const slim = ref(false);
    const errorAbsolute = ref(false);
    const errorMessage = ref('Example wrapper error');
    const inputValue = ref('');

    const documentedProps = [
        { property: 'required', description: 'Marks the field as required.', type: 'boolean', default: false, required: false },
        { property: 'label', description: 'Label text displayed above the input.', type: 'string', default: '', required: false },
        { property: 'description', description: 'Optional helper text displayed below the label.', type: 'string', default: '', required: false },
        { property: 'slim', description: 'Uses the compact variant.', type: 'boolean', default: false, required: false },
        { property: 'errorMessage', description: 'Validation error message displayed below the input.', type: 'string', default: '', required: false },
        { property: 'errorAbsolute', description: 'Controls error message positioning mode.', type: 'boolean', default: false, required: false },
    ];

    const documentedSlots = [
        { name: 'label', description: 'Custom content rendered after the label text.' },
        { name: 'description', description: 'Custom content rendered after the description text.' },
        { name: 'input', description: 'Input control rendered inside the wrapper.' },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'slots', title: 'Slots' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample = `
<InputsInputWrapper
    label="Wrapped Input"
    :error-message="errorMessage"
>

    <template #input>
        // text input...
    </template>

</InputsInputWrapper>`;

    const slotsExample = `
<InputsInputWrapper>

    <template #label>
        Custom Label
    </template>

    <template #description>
        Custom Description
    </template>

    <template #input>
        Custom Input
    </template>

</InputsInputWrapper>`;
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsInputWrapper">

            <template #header>
                <b>InputsInputWrapper</b> is the shared scaffold used across form controls.
                It combines labels, descriptions, input content, and validation feedback
                into a single reusable structure for building custom input components.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Pass label-related props directly to the wrapper and provide the control
                    through the <b>input</b> slot. This keeps labeling and validation logic
                    consistent across inputs.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="Wrap an input control with shared label and validation behavior.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsInputWrapper
                    label="Wrapped Input"
                    description="Input injected via slot"
                    :required="true"
                    error-message="Example wrapper error"
                >
                    <template #input>
                        <input
                            class="h-9 w-full rounded-md input-bg input-ring px-3 outline-none"
                            placeholder="Type here"
                        >
                    </template>
                </InputsInputWrapper>

            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to interactively change the component props
                    and immediately see how the wrapper is rendered.
                </template>

                <div class="grid gap-4 grid-cols-3">

                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-2 grid-cols-2">

                            <InputsText v-model="errorMessage" :maxlength="200" slim label="Error Message" name="errorMessage" class="col-span-2" >
                            </InputsText>

                            <InputsCheckBox v-model="required" slim label="Required" name="required" >
                            </InputsCheckBox>

                            <InputsCheckBox v-model="slim" slim label="Slim" name="slim" >
                            </InputsCheckBox>

                            <InputsCheckBox v-model="errorAbsolute" slim label="Error Absolute" name="errorAbsolute" class="col-span-2" >
                            </InputsCheckBox>

                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Wrapper" body-class="p-4" class="col-span-2">

                        <InputsInputWrapper
                            label="Wrapped Input"
                            description="Input injected via slot"
                            :required="required"
                            :slim="slim"
                            :error-message="errorMessage"
                            :error-absolute="errorAbsolute"
                        >
                            <template #input>
                                <input
                                    v-model="inputValue"
                                    class="h-9 w-full rounded-md px-3 border"
                                    placeholder="Some input..."
                                >
                            </template>
                        </InputsInputWrapper>

                    </DocsPanel>

                </div>
            </DocsArticleSection>

            <DocsArticleSection id="slots" title="Slots">
                <template #description>
                    The component exposes slots for customizing label content, description
                    content, and the rendered input control.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Custom Content"
                    description="Use slots to customize the wrapper content.">
                    {{ slotsExample }}
                </DocsCodeExample>

                <InputsInputWrapper>
                    <template #label>
                        Custom Labels
                    </template>

                    <template #description>
                        Custom Description
                    </template>

                    <template #input>
                        Custom Input
                    </template>
                </InputsInputWrapper>

                <DocsSlotsTable :rows="documentedSlots"/>

            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. All props are optional
                    unless otherwise noted.
                </template>

                <DocsPropsTable :rows="documentedProps" >
                </DocsPropsTable>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections" >
        </DocsOnThisPage>
    </div>
</template>