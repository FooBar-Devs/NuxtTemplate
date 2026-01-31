<script setup lang="ts">
    const themeStore = useThemeStore();    
</script>
<template>
    <div :style="themeStore.getBg" class="inset-0 absolute wh-full -z-1">
    </div>
</template>