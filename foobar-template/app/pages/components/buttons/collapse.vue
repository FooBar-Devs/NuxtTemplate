<script lang="ts" setup>
    const modelValue = ref(false);
    const modelValueBasic = ref(false);
    const disabled = ref(false);
    const rotate = ref(false);
    const flip = ref(false);

    const documentedProps = [
        { property: 'v-model / modelValue', description: 'Current collapsed state.', type: 'boolean', default: false, required: false },
        { property: 'disabled', description: 'Disables clicking and updates.', type: 'boolean', default: false, required: false },
        { property: 'rotate', description: 'Rotates the arrow 90 degrees.', type: 'boolean', default: false, required: false },
        { property: 'flip', description: 'Flips the arrow 180 degrees.', type: 'boolean', default: false, required: false },
        { property: 'wrapperClasses', description: 'Additional wrapper utility classes.', type: 'string', default: '', required: false },
        { property: 'butttonClasses', description: 'Additional button utility classes.', type: 'string', default: '', required: false },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'props', title: 'Props' },
    ];

    const basicExample =`                        
<div class="flex items-center gap-2 h-full overflow-hidden transition-300 bg-TBD-bg-light dark:bg-TBD-bg-dark rounded-md"
    :class="!modelValue ? 'w-3' : 'w-full'">

    <InputsCollapseButton v-model="modelValue"/>

    <span class="text-xs opacity-75">
        {{ modelValue ? 'Open' : 'Closed' }}
    </span>

</div>`;

const liveExample =`    
<div class="h-full w-full flex" 
    :class="rotate ? 
        flip ? 'flex-col-reverse' : 'flex-col' : 
        flip ? 'flex-row-reverse' : 'flex-row'">
    <!-- COLLAPSE BUTTON PREVIEW -->
    <div class="flex items-center gap-2 overflow-hidden transition-300
        bg-TBD-bg-light dark:bg-TBD-bg-dark rounded-md"
        :class="[

            // Adjusts the flex direction based on rotation and flip props
            rotate
                ? flip ? 'flex-col-reverse' : 'flex-col'
                : flip ? 'flex-row-reverse' : 'flex-row',

            // Adjusts the container size based on rotation and toggle state
            rotate
                ? !collapsed ? 'h-3' : 'h-full'
                : !collapsed ? 'w-3 h-full' : 'wh-full',
        ]">
        <!-- COLLAPSE BUTTON -->
        <InputsCollapseButton
            v-model="collapsed"
            :disabled="disabled"
            :rotate="rotate"
            :flip="flip"/>
        <!-- CURRENT STATE -->
        <span class="text-xs opacity-75">
            {{ collapsed ? 'Open' : 'Closed' }}
        </span>

    </div>
</div>`;
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsCollapseButton">

            <template #header>
                <b>InputsCollapseButton</b> is a compact control for expandable and collapsible
                UI elements. It supports <b>v-model</b>, disabled interaction, arrow rotation,
                and custom wrapper/button classes.
            </template>


            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the component with <b>v-model</b> to control its state.
                </template>

                <DocsCodeExample eyebrow="Example" title="Basic Template" description="Basic v-model usage with optional arrow rotation.">
                    {{ basicExample }}
                </DocsCodeExample>

                <div class="flex items-center gap-3 h-16">

                    <div class="flex items-center gap-2 h-full overflow-hidden transition-300 bg-TBD-bg-light dark:bg-TBD-bg-dark rounded-md"
                        :class="!modelValue ? 'w-3' : 'w-full'">

                        <InputsCollapseButton v-model="modelValue"/>

                        <span class="text-xs opacity-75">
                            {{ modelValue ? 'Open' : 'Closed' }}
                        </span>

                    </div>
                </div>
            </DocsArticleSection>


            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to toggle the component's state and adjust its rotation and flip properties.
                    You can also see the component in action with different configurations. 
                    Advanced usage can be achieved by combining the rotation and flip properties to create unique visual effects.
                </template>

                <div class="grid gap-4 grid-cols-3">

                    <DocsCodeExample class="col-span-3" eyebrow="Example" title="Advanced Template" description="Adjust the controls to see how the component behaves with different props.">
                        {{ liveExample }}
                    </DocsCodeExample>

                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">

                        <div class="grid gap-2 grid-cols-2">
                            <InputsCheckBox slim v-model="disabled" label="Disabled" name="disabled"/>
                            <InputsCheckBox slim v-model="rotate" label="Rotate" name="rotate"/>
                            <InputsCheckBox slim v-model="flip" label="Flip" name="flip"/>
                        </div>

                    </DocsPanel>


                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" class="col-span-2"
                        :body-class="'p-4 h-24 flex ' + (rotate ? flip ? 'flex-col-reverse' : 'flex-col' : flip ? 'flex-row-reverse' : 'flex-row')">
                        
                        <!-- COLLAPSE BUTTON PREVIEW -->
                        <div class="flex items-center gap-2 overflow-hidden transition-300
                            bg-TBD-bg-light dark:bg-TBD-bg-dark rounded-md"
                            :class="[

                                // Adjusts the flex direction based on rotation and flip props
                                rotate
                                    ? flip ? 'flex-col-reverse' : 'flex-col'
                                    : flip ? 'flex-row-reverse' : 'flex-row',

                                // Adjusts the container size based on rotation and toggle state
                                rotate
                                    ? !modelValueBasic ? 'h-3' : 'h-full'
                                    : !modelValueBasic ? 'w-3 h-full' : 'wh-full',
                            ]">

                            <!-- COLLAPSE BUTTON -->
                            <InputsCollapseButton
                                v-model="modelValueBasic"
                                :disabled="disabled"
                                :rotate="rotate"
                                :flip="flip"/>

                            <!-- CURRENT STATE -->
                            <span class="text-xs opacity-75">
                                {{ modelValueBasic ? 'Open' : 'Closed' }}
                            </span>

                        </div>

                    </DocsPanel>

                </div>
            </DocsArticleSection>


            <DocsArticleSection id="props" title="Props">
                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>