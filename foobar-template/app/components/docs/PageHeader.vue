<script setup lang="ts">
    const props = withDefaults(defineProps<{
        title: string;
        backTo?: string;
        backLabel?: string;
    }>(), {
        backTo: '/',
        backLabel: 'Go Back',
    });

    const router = useRouter();
</script>

<template>
    <div class="flex flex-wrap items-center gap-4 text-TBD-text-dark dark:text-TBD-text-light transition-300">
        <h1 class="text-3xl font-bold">
            {{ title }}
        </h1>

        <InputsButton slim outline class="my-2" @click="router.push(props.backTo)">
            {{ backLabel }}
        </InputsButton>
    </div>
</template>