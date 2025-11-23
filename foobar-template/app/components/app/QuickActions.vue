<script setup lang="ts">
    const themeStore = useThemeStore();
</script>

<template>
    <div :class="themeStore.showQuickActionsOnHover ? 'group' : ''">

        <div class="fixed z-1500 flex gap-2 top-4 pr-6 transition-500 group-hover:right-0 group-hover:opacity-100 group-hover:pointer-events-auto right-0">
            
            <InputsToggle @onToggle="themeStore.settingsOpen = !themeStore.settingsOpen" :toggled="!themeStore.settingsOpen" 
                altAnimation :toggledIcon="'line-md:cog'"  :unToggledIcon="'line-md:cog-off'"/> 

            <InputsToggle @onToggle="themeStore.toggleTheme()" :toggled="themeStore.isDarkMode" /> 

            <div class="bg-TBD-bg-dark fixed z-1 rounded-full aspect-square transition-1000 pointer-events-none"
                :class="!themeStore.isDarkMode ? 'opacity-0 w-full scale-[250%] -top-full -right-1/2' : 'opacity-100 w-8 top-4 right-6'">
            </div>

        </div>
            
    </div>
</template>