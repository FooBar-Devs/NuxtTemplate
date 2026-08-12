<script setup lang="ts">
    const route = useRoute();

    const pageInfo = computed(() => {
        switch (route.path) {
            case '/testing/textinput':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Text Input',
                    summary: 'Single-line field documentation with prop reference, usage guidance, and a live playground for testing validation, spacing, icons, and state handling.',
                };
            case '/testing/checkbox':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'CheckBox',
                    summary: 'Boolean field documentation with usage patterns, prop reference, and a live playground for spacing, warnings, and visibility states.',
                };
            case '/testing/numberinput':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Number Input',
                    summary: 'Numeric field documentation with bounds, stepping controls, and live behavior testing.',
                };
            case '/testing/textarea':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Text Area',
                    summary: 'Multiline input documentation for long text values, limits, and state variations.',
                };
            case '/testing/dropdown':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Dropdown',
                    summary: 'Selection input docs with object mapping, placeholder behavior, and viewport-aware list positioning.',
                };
            case '/testing/toggle':
                return {
                    eyebrow: 'Components / Controls',
                    title: 'Toggle',
                    summary: 'Compact icon toggle documentation with animation variants and emitted click handling.',
                };
            case '/testing/button':
                return {
                    eyebrow: 'Components / Actions',
                    title: 'Button',
                    summary: 'Action button docs covering style variants, compact mode, and hover behavior.',
                };
            case '/testing/collapsebutton':
                return {
                    eyebrow: 'Components / Controls',
                    title: 'Collapse Button',
                    summary: 'Directional collapse trigger docs with disabled state and rotation variants.',
                };
            case '/testing/color':
                return {
                    eyebrow: 'Components / Theme',
                    title: 'Color',
                    summary: 'Color swatch and picker trigger documentation used for theme editing flows.',
                };
            case '/testing/errormessage':
                return {
                    eyebrow: 'Components / Feedback',
                    title: 'Error Message',
                    summary: 'Validation feedback component docs with inline and absolute display modes.',
                };
            case '/testing/imagepreview':
                return {
                    eyebrow: 'Components / Media',
                    title: 'Image Preview',
                    summary: 'Image thumbnail preview documentation with automatic pixel-art rendering behavior.',
                };
            case '/testing/inputwrapper':
                return {
                    eyebrow: 'Components / Forms',
                    title: 'Input Wrapper',
                    summary: 'Field wrapper docs for composing label, custom input content, and error handling.',
                };
            case '/testing/label':
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
            :transition="{ name: 'testing-page', mode: 'out-in' }"/>
    </DocsAppShell>
</template>

<style scoped>
    .testing-page-enter-active,
    .testing-page-leave-active {
        transition: opacity 180ms ease, transform 180ms ease;
    }

    .testing-page-enter-from,
    .testing-page-leave-to {
        opacity: 0;
        transform: translateY(6px);
    }
</style>