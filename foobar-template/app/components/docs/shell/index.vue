<script setup lang="ts">
    defineProps<{
        eyebrow?: string;
        title: string;
        summary?: string;
    }>();
</script>

<template>
    <div class="flex-col-full max-w-7xl items-center p-4 gap-4 text-TBD-text-dark dark:text-TBD-text-light">
        
        <DocsShellHeader/>

        <div class="w-full flex gap-4">
            
            <DocsShellAside/>
                
            <DocsShellMain :eyebrow="eyebrow" :title="title" :summary="summary">
                <slot/>
            </DocsShellMain>

        </div>

        <DocsShellFooter/>
        
    </div>
</template>
