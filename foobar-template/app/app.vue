<script setup lang="ts">    
    const globalStore = useThemeStore();

    onBeforeMount(async () => { 
        globalStore.toggleTheme();
        globalStore.toggleTheme();
    })
</script>

<template>
    <div class="fixed flex-center-full transition-1000 overflow-auto scroll-smooth" 
        :class="[globalStore.isDarkMode ? 'dark bg-dark-radial' : 'light bg-light-radial']">    

        <AppQuickActions/>
        <AppSettings/>
        <AppTooltip/>
        <AppPopups/>

        <NuxtLayout class="transition-500 wh-full">
            <NuxtPage/>
        </NuxtLayout>
        
    </div>
</template>