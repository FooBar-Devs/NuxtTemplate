<script setup lang="ts">
    const themeStore = useThemeStore();
    const route = useRoute();

    watch(() => themeStore.selectedTheme.name, (newTheme) => {       
        if (newTheme === 'Matrix') {
            initMatrixRain();
        } else {
            stopMatrixRain();
        }
    }, { immediate: true });
</script>

<template>
    <div class="absolute wh-full transition-500 pointer-events-none" :class="themeStore.fun ? ' opacity-100' : ' opacity-0'">
        <div v-if="themeStore.selectedTheme.images.dark.length > 0" class="transition-500"
            :class="themeStore.isDarkMode ? ' opacity-100' : ' opacity-0'">
            <img v-for="(image, index) in themeStore.selectedTheme.images.dark" :key="index"
                class="fixed transition-500 pointer-events-none" :style="image.style"
                :class="!['log-in', 'sign-up'].includes(route.name as string) ? '' : ' opacity-0'"
                :src="image.url != '' ? (image.url == 'transparent' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' : image.url) : 'https://picsum.photos/200'">
            </img>
        </div>
        <div v-if="themeStore.selectedTheme.images.light.length > 0 && !['log-in', 'sign-up'].includes(route.name as string)" class="transition-500"
            :class="!themeStore.isDarkMode ? ' opacity-100' : ' opacity-0'">
            <img v-for="(image, index) in themeStore.selectedTheme.images.light" :key="index"
                class="fixed transition-500 pointer-events-none" :style="image.style"
                :src="image.url != '' ? image.url : 'https://picsum.photos/200'">
            </img>
        </div>
        <!--Matrix-->
        <canvas class="wh-full fixed transition-500 pointer-events-none -z-10" id="matrix"
            :class="[['Matrix'].includes(themeStore.selectedTheme.name) ? (themeStore.isDarkMode ? ' opacity-15' : 'opacity-8 invert-100') : ' opacity-0']">
        </canvas>   
    </div>
</template>