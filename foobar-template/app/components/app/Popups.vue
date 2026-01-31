<script lang="ts" setup>
    const themeStore = useThemeStore();
</script>

<template>
    <div class="fixed bottom-4 left-4 z-10000 flex items-end max-w-xl pointer-events-none">

        <div :class="popups.length > 0 ? '' : 'scale-0'"
            class="group transition-500 pointer-events-auto cursor-pointer p-4 relative top-4 right-4"
            @mouseenter="setTooltip('Izbriši popup')" @mouseleave="setTooltip('')" >
            <div class="drop-shadow-md px-0 py-1 text-sm font-bold rounded-md flex-center 
                    border backdrop-blur-xs text-TBD-error-dark bg-TBD-error-dark/25
                    border-TBD-error-dark w-fit h-fit dark:text-TBD-error-light 
                    dark:bg-TBD-error-light/10 dark:border-TBD-error-light"
                    @click="popups.splice(0,1)">
                <Icon class="text-xl min-w-7 group-hover:scale-125 transition-300"
                    name="material-symbols:delete-forever-outline-rounded"/>
            </div>
        </div>
        <div class="relative -left-6 flex flex-col gap-2">
            <TransitionGroup>
                <div v-for="popup in popups" :key="popup.message">
                    <div v-if="popup.type === 'error'" class="drop-shadow-md px-2 py-1 
                        text-sm font-bold rounded-md flex items-center gap-2 border 
                        backdrop-blur-xs text-TBD-error-dark bg-TBD-error-dark/25 
                        border-TBD-error-dark dark:text-TBD-error-light 
                        dark:bg-TBD-error-light/10 dark:border-TBD-error-light">
                        <Icon class="text-xl min-w-7 -mx-1.5"
                            name="material-symbols:bug-report-outline-rounded"/>
                        <div :innerHTML="popup.message" class="[&_span]:text-TBD-text-light"></div>
                    </div>
                    <div v-if="popup.type === 'success'" class="drop-shadow-md px-2 py-1 
                        text-sm font-bold rounded-md flex items-center gap-2 border 
                        backdrop-blur-xs text-TBD-confirm-dark bg-TBD-confirm-dark/25 
                        border-TBD-confirm-dark dark:text-TBD-confirm-light 
                        dark:bg-TBD-confirm-light/10 dark:border-TBD-confirm-light">
                        <Icon class="text-xl min-w-7 -mx-1.5"
                            name="material-symbols:check-circle-outline-rounded"/>
                        <div :innerHTML="popup.message" class="[&_span]:text-TBD-text-light"></div>
                    </div>
                    <div v-if="popup.type === 'warning'" class="drop-shadow-md px-2 py-1 
                        text-sm font-bold rounded-md flex items-center gap-2 border 
                        backdrop-blur-xs text-TBD-warning-dark bg-TBD-warning-dark/25 
                        border-TBD-warning-dark dark:text-TBD-warning-light 
                        dark:bg-TBD-warning-light/10 dark:border-TBD-warning-light">
                        <Icon class="text-xl min-w-7 -mx-1.5"
                            name="material-symbols:warning-outline-rounded"/>
                        <div :innerHTML="popup.message" class="[&_span]:text-TBD-text-light"></div>
                    </div>
                </div>
            </TransitionGroup>     
        </div> 
    </div>
</template>

<style scoped>
    .v-enter-from {
        opacity: 0;
        transform: translateY(50%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateY(-50%);
    }
    .v-enter-to, .v-leave-from {
        opacity: 1;
        transform: translateY(0%);
    }
    .v-enter-active,
    .v-leave-active {
        transition: transform 0.5s ease-out, opacity 0.5s ease-out, translateY 0.5s ease-out;
    }
</style>