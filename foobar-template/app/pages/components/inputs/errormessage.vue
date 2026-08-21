<script setup lang="ts">
    const errorMessage = ref('Field is required.');
    const errorAbsolute = ref(false);

    const documentedProps = [
        { property: 'errorMessage', description: 'Displayed validation or error text.', type: 'string', default: '', required: false },
        { property: 'errorAbsolute', description: 'Displays the error using absolute positioning.', type: 'boolean', default: false, required: false },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample = `
<InputsErrorMessage error-message="Field is required.">`;
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsErrorMessage">

            <template #header>
                <b>InputsErrorMessage</b> is the shared validation feedback component used across
                form inputs. It supports animated inline expansion and absolute positioning for
                compact layouts.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Pass the validation text through <b>errorMessage</b>. Enable
                    <b>errorAbsolute</b> when the message should not affect layout flow.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="Display validation feedback below an input field.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsErrorMessage error-message="Field is required." >
                </InputsErrorMessage>

            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to interactively change the component props
                    and immediately see how the error message is rendered.
                </template>

                <div class="grid gap-4 grid-cols-3">

                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-2 grid-cols-2">

                            <InputsText v-model="errorMessage" :maxlength="200" slim label="Error Message" name="errorMessage" class="col-span-2" >
                            </InputsText>

                            <InputsCheckBox v-model="errorAbsolute" slim label="Absolute" name="errorAbsolute" >
                            </InputsCheckBox>

                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">

                        <div class="relative min-h-14 rounded-md border border-TBD-bg-dark/10 p-4 dark:border-TBD-bg-light/10">

                            <InputsErrorMessage
                                :error-message="errorMessage"
                                :error-absolute="errorAbsolute"
                            >
                            </InputsErrorMessage>

                        </div>

                    </DocsPanel>

                </div>
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