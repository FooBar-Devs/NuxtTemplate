<script setup lang="ts">
    const themeStore = useThemeStore();
    const cycleThemeToggle = ref(false);
</script>

<template>
    <div>

        <div class="fixed z-1500 flex gap-2 top-4 pr-6 transition-500 group-hover:right-0 group-hover:opacity-100 group-hover:pointer-events-auto right-0">
            
            <InputsToggle @onToggle="themeStore.cycleThemes()" v-model="cycleThemeToggle"
                :toggledIcon="'material-symbols:format-paint-outline-rounded'" :unToggledIcon="'material-symbols:format-paint-outline-rounded'" altAnimation/>

            <InputsToggle v-model="themeStore.settingsOpen" 
                altAnimation :toggledIcon="'line-md:cog'"  :unToggledIcon="'line-md:cog-off'"/> 

            <InputsToggle @onToggle="themeStore.toggleTheme()" v-model="themeStore.isDarkMode" manualUpdate/> 

            <div class="bg-TBD-bg-dark fixed z-1 rounded-full aspect-square transition-1000 pointer-events-none"
                :class="!themeStore.isDarkMode ? 'opacity-0 w-full scale-[250%] -top-full -right-1/2' : 'opacity-100 w-8 top-4 right-6'">
            </div>

        </div>
            
    </div>
</template>