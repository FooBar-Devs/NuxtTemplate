<script lang="ts" setup>
    defineProps<{
        title: string;
    }>();
</script>

<template>
    <article class="flex flex-col gap-4 text-sm">

        <header id="overview" class="scroll-mt-64 space-y-4">
            <TextMark color="primary" hasOutline> 
                <span class="normal-case">&lt;{{ title }}&gt;</span> 
            </TextMark>
            <slot name="header"/>
        </header>

        <slot/>
    </article>
</template>