<script setup lang="ts">
    import type { NuxtError } from "#app";
    const themeStore = useThemeStore();

    const props = defineProps({
        error: Object as () => NuxtError,
    });
</script>

<template>
    <div :class="themeStore.isDarkMode ? 'dark bg-dark-radial' : 'bg-light-radial'" class="fixed flex-center-full">

        <AppQuickActions/>
        
        <AppTooltip/>

        <div class="flex-col-center gap-2">
            <h1 class="text-9xl font-extrabold tracking-tight text-TBD-primary-light">
                404
            </h1>
            <b class="text-3xl tracking-tight text-TBD-text-dark dark:text-TBD-text-light">
                Stranica nije pronađena
            </b>
            <p class="text-lg text-TBD-text-dark/75 dark:text-TBD-text-light/50">
                Sorry, čini se da je stranica koju tražite uklonjena ili ne postoji.
            </p>
            <b class="tracking-wide text-TBD-error-light dark:text-TBD-error-dark">
                {{ error }}
            </b>
            
            <TextLine class="w-full grow-0"/>

            <NuxtLink to="/" class="text-link">
                Natrag na početnu
            </NuxtLink>
        </div>

    </div>
</template>