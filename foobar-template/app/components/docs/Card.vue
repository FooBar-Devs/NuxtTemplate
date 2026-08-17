<script setup lang="ts">
    defineProps<{
        item: DocsNavItem;
    }>();

    const route = useRoute();
    const isActive = (path?: string) => path ? route.path === path : false;
    const statusLabelMap: Record<DocsNavItem['status'], string> = {
        'ready': 'Ready',
        'planned': 'Soon',
        'in-progress': 'In Progress',
        'needs-review': 'Needs Review',
    };
    const getStatusLabel = (status: DocsNavItem['status']) => statusLabelMap[status];
    const getStatusColor = (status: DocsNavItem['status']) => {
        switch (status) {
            case 'ready':
                return 'confirm';
            case 'planned':
                return 'warning';
            case 'in-progress':
                return 'primary';
            case 'needs-review':
                return 'error';
        }
    };
</script>

<template>
    <div class="flex relative items-start justify-between gap-3 w-full rounded-md border p-2 transition-300"
        :class="isActive(item.path)
            ? 'border-TBD-primary-light/75 bg-TBD-primary-light/5 dark:border-TBD-primary-dark/75 dark:bg-TBD-primary-dark/5'
            : 'border-TBD-bg-dark/10 bg-TBD-bg-light/25 text-TBD-text-dark hover:border-TBD-text-dark/50 hover:bg-TBD-bg-light/50 dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/25 dark:text-TBD-text-light dark:hover:border-TBD-text-light/25 dark:hover:bg-TBD-bg-dark/50'">
        <div>
            <p class="text-sm font-semibold leading-5">{{ item.title }}</p>
            <p class="mt-0.5 text-xs leading-4.5 opacity-75 dark:opacity-80">
                {{ item.description }}
            </p>
        </div>
        
        <TextMark class="absolute top-0 right-0 mt-1.5 mr-1.5"
            :color="getStatusColor(item.status)">
            {{ getStatusLabel(item.status) }}
        </TextMark>
    </div>
</template>