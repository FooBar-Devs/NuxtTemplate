<script setup lang="ts">
    const toggled = ref(false);
    const toggledBasic = ref(false);
    const altAnimation = ref(false);

    const documentedProps = [
        { property: 'modelValue', description: 'Current toggle state used by v-model.', type: 'boolean', default: false, required: true },
        { property: 'manualUpdate', description: 'If true, the toggle will not automatically update the v-model value when clicked. The parent must handle the update manually.', type: 'boolean', default: false, required: false },
        { property: 'toggledIcon', description: 'Icon displayed for toggled state.', type: 'string', default: 'line-md:sunny-loop', required: false },
        { property: 'unToggledIcon', description: 'Icon displayed for untoggled state.', type: 'string', default: 'line-md:moon-loop', required: false },
        { property: 'altAnimation', description: 'Uses cross-fade animation.', type: 'boolean', default: false, required: false },
    ];

    const documentedEvents = [
        { method: 'onToggle', description: 'Emitted when the toggle is clicked.', parameters: [], returns: 'void' },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'events', title: 'Events' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample =
`<InputsToggle
    v-model="isDark"
    @on-toggle="isDark = !isDark"
/>`;
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsToggle">

            <template #header>
                <b>InputsToggle</b> is a compact icon-based toggle for binary
                actions. The parent owns the <b>toggled</b> state, while the
                component emits <b>onToggle</b> when clicked. Custom icons and
                an alternative cross-fade animation are supported.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Pass the current state through <b>toggled</b> and update it
                    in response to <b>onToggle</b>. Custom icons and animation
                    behavior can be configured through the optional props.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="Keep toggle state in the parent and update it when the event is emitted.">
                    {{ basicExample }}
                </DocsCodeExample>

                <div class="mt-4 flex items-center gap-3">
                    <InputsToggle v-model="toggledBasic"/>
                    <span class="text-xs opacity-75">
                        State: {{ toggledBasic ? 'On' : 'Off' }}
                    </span>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    Change the toggle state and animation mode to preview the component.
                </template>

                <div class="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="flex flex-col gap-2">
                            <InputsCheckBox slim name="altAnimation" v-model="altAnimation" label="Alt Animation" />
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Toggle" body-class="p-5">

                        <div class="flex items-center gap-3">
                            <InputsToggle
                                v-model="toggled"
                                :alt-animation="altAnimation"
                            />
                            <span class="text-xs opacity-75">
                                State: {{ toggled ? 'On' : 'Off' }}
                            </span>
                        </div>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="events" title="Events">
                <template #description>
                    The component emits an event when clicked. The parent is
                    responsible for updating <b>toggled</b>.
                </template>

                <DocsMethodsTable :rows="documentedEvents"/>
            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    Configure the toggle state, icons, and animation behavior.
                </template>

                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>