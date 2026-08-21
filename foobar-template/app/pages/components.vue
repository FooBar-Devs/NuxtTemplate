<script setup lang="ts">
    const route = useRoute();

    const pageInfo = computed(() => {
        switch (route.path) {
            case '/components/inputs/text':
                return {
                    eyebrow: 'Components / Inputs',
                    title: 'Text Input',
                    summary: 'Single-line text input documentation with validation, label, and description handling.',
                };
            case '/components/inputs/checkbox':
                return {
                    eyebrow: 'Components / Inputs',
                    title: 'Checkbox Input',
                    summary: 'Single-line checkbox input with vee-validate integration.',
                };
            case '/components/inputs/number':
                return {
                    eyebrow: 'Components / Inputs',
                    title: 'Number Input',
                    summary: 'Single-line number input documentation with min/max limits, step increments, and validation handling.',
                };
            case '/components/inputs/textarea':
                return {
                    eyebrow: 'Components / Inputs',
                    title: 'Text Area Input',
                    summary: 'Multi-line text area documentation with auto-resizing, validation, and label/description handling.',
                };
            case '/components/inputs/dropdown':
                return {
                    eyebrow: 'Components / Inputs',
                    title: 'Dropdown',
                    summary: 'Selection input docs with object mapping, placeholder behavior, and viewport-aware list positioning.',
                };
            case '/components/buttons/toggle':
                return {
                    eyebrow: 'Components / Buttons',
                    title: 'Toggle',
                    summary: 'Compact icon toggle documentation with animation variants and emitted click handling.',
                };
            case '/components/buttons':
                return {
                    eyebrow: 'Components / Buttons',
                    title: 'Button',
                    summary: 'Action button docs covering style variants, compact mode, and hover behavior.',
                };
            case '/components/buttons/collapse':
                return {
                    eyebrow: 'Components / Buttons',
                    title: 'Collapse Button',
                    summary: 'Directional collapse trigger docs with disabled state and rotation variants.',
                };
            case '/components/inputs/color':
                return {
                    eyebrow: 'Components / Inputs',
                    title: 'Color',
                    summary: 'Color swatch and picker trigger documentation used for theme editing flows.',
                };
            case '/components/inputs/errormessage':
                return {
                    eyebrow: 'Components / Input / Helpers',
                    title: 'Error Message',
                    summary: 'Validation feedback component docs with inline and absolute display modes.',
                };
            case '/components/images/preview':
                return {
                    eyebrow: 'Components / Images',
                    title: 'Image Preview',
                    summary: 'Image thumbnail preview documentation with automatic pixel-art rendering behavior.',
                };
            case '/components/inputs/wrapper':
                return {
                    eyebrow: 'Components / Input / Helpers',
                    title: 'Input Wrapper',
                    summary: 'Field wrapper docs for composing label, custom input content, and error handling.',
                };
            case '/components/inputs/label':
                return {
                    eyebrow: 'Components / Input / Helpers',
                    title: 'Label',
                    summary: 'Reusable field label docs with helper text and required indicators.',
                };
            default:
                return {
                    eyebrow: 'Component Docs',
                    title: 'Inputs Documentation',
                    summary: 'A reference space for the shared input components, with API notes, live examples, and route-based docs pages similar to a real package documentation site.',
                };
        }
    });
</script>

<template>
    <DocsShell
        :eyebrow="pageInfo.eyebrow"
        :title="pageInfo.title"
        :summary="pageInfo.summary">

        <NuxtPage
            :page-key="(r) => r.path"
            :transition="{ name: 'components-page', mode: 'out-in' }"/>
    </DocsShell>
</template>

<style scoped>
    .components-page-enter-active,
    .components-page-leave-active {
        transition: opacity 180ms ease, transform 180ms ease;
    }

    .components-page-enter-from,
    .components-page-leave-to {
        opacity: 0;
        transform: translateY(6px);
    }
</style>