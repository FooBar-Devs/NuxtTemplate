<script setup lang="ts">    
    const globalStore = useThemeStore();

    onBeforeMount(async () => { 
        globalStore.setRootStyle();
    })
</script>

<template>
    <div class="fixed flex-center-full transition-1000" 
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