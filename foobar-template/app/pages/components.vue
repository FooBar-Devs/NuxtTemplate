<script setup lang="ts">
    const route = useRoute();

    const pageInfo = computed(() => {
        switch (route.path) {
            case '/components/textinput':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Text Input',
                    summary: 'Single-line field documentation with prop reference, usage guidance, and a live playground for testing validation, spacing, icons, and state handling.',
                };
            case '/components/checkbox':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'CheckBox',
                    summary: 'Boolean field documentation with usage patterns, prop reference, and a live playground for spacing, warnings, and visibility states.',
                };
            case '/components/numberinput':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Number Input',
                    summary: 'Numeric field documentation with bounds, stepping controls, and live behavior testing.',
                };
            case '/components/textarea':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Text Area',
                    summary: 'Multiline input documentation for long text values, limits, and state variations.',
                };
            case '/components/dropdown':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Dropdown',
                    summary: 'Selection input docs with object mapping, placeholder behavior, and viewport-aware list positioning.',
                };
            case '/components/toggle':
                return {
                    eyebrow: 'Components / Controls',
                    title: 'Toggle',
                    summary: 'Compact icon toggle documentation with animation variants and emitted click handling.',
                };
            case '/components/button':
                return {
                    eyebrow: 'Components / Actions',
                    title: 'Button',
                    summary: 'Action button docs covering style variants, compact mode, and hover behavior.',
                };
            case '/components/collapsebutton':
                return {
                    eyebrow: 'Components / Controls',
                    title: 'Collapse Button',
                    summary: 'Directional collapse trigger docs with disabled state and rotation variants.',
                };
            case '/components/color':
                return {
                    eyebrow: 'Components / Theme',
                    title: 'Color',
                    summary: 'Color swatch and picker trigger documentation used for theme editing flows.',
                };
            case '/components/errormessage':
                return {
                    eyebrow: 'Components / Feedback',
                    title: 'Error Message',
                    summary: 'Validation feedback component docs with inline and absolute display modes.',
                };
            case '/components/imagepreview':
                return {
                    eyebrow: 'Components / Media',
                    title: 'Image Preview',
                    summary: 'Image thumbnail preview documentation with automatic pixel-art rendering behavior.',
                };
            case '/components/inputwrapper':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Input Wrapper',
                    summary: 'Field wrapper docs for composing label, custom input content, and error handling.',
                };
            case '/components/label':
                return {
                    eyebrow: 'Components / Forms',
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
    <DocsAppShell
        :eyebrow="pageInfo.eyebrow"
        :title="pageInfo.title"
        :summary="pageInfo.summary">

        <NuxtPage
            :page-key="(r) => r.path"
            :transition="{ name: 'components-page', mode: 'out-in' }"/>
    </DocsAppShell>
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