<script setup lang="ts">
    defineProps<{
        eyebrow?: string;
        title: string;
        summary?: string;
    }>();
</script>

<template>
    
    <main class="flex flex-col gap-4">
        
        <div class="flex flex-col gap-2">
            <p class="text-2xs font-semibold uppercase tracking-ultrawide opacity-55">
                {{ eyebrow }}
            </p>
            
            <h1 class="text-3xl font-bold">
                {{ title }}
            </h1>

            <p v-if="summary" class="text-base opacity-80">
                {{ summary }}
            </p>
        </div>

        <slot/>

    </main>

</template>