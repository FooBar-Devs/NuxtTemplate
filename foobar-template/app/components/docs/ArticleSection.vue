<script lang="ts" setup>
    defineProps<{
        title: string;
    }>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <TextLine slim/>

        <section id="basic-usage" class="scroll-mt-8 space-y-4">
            <div class="space-y-2">
                <h2 class="text-lg font-bold"> {{ title }} </h2>
                <p> <slot name="description"/> </p>
            </div>
            <slot/>
        </section>
    </div>
</template>