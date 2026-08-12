<script setup lang="ts">
    interface DocsPropRow {
        name: string;
        type: string;
        required: boolean;
        description: string;
    }

    defineProps<{
        rows: DocsPropRow[];
    }>();
</script>

<template>
    <div class="overflow-hidden rounded-md border border-TBD-bg-dark/10 dark:border-TBD-bg-light/10">
        <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_58px_minmax(0,1.9fr)] bg-TBD-primary-light dark:bg-TBD-primary-dark px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-TBD-text-light dark:text-TBD-text-dark">
            <div>Prop</div>
            <div>Type</div>
            <div>Req.</div>
            <div>Description</div>
        </div>

        <div class="divide-y divide-TBD-bg-dark/10 dark:divide-TBD-bg-light/10">
            <div v-for="row in rows" :key="row.name"
                class="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_58px_minmax(0,1.9fr)] gap-2.5 bg-TBD-bg-light/35 px-2.5 py-2 text-xs leading-5 dark:bg-TBD-bg-dark/20 sm:text-sm">
                <div class="font-semibold text-TBD-primary-light dark:text-TBD-primary-dark wrap-break-word">
                    {{ row.name }}
                </div>

                <div class="text-TBD-secondary-light dark:text-TBD-secondary-dark wrap-break-word">
                    {{ row.type }}
                </div>

                <div>
                    <span class="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                        :class="row.required
                            ? 'bg-TBD-error-light/15 text-TBD-error-light dark:bg-TBD-error-dark/20 dark:text-TBD-error-dark'
                            : 'bg-TBD-confirm-light/15 text-TBD-confirm-light dark:bg-TBD-confirm-dark/20 dark:text-TBD-confirm-dark'">
                        {{ row.required ? 'Yes' : 'No' }}
                    </span>
                </div>

                <div class="opacity-85 wrap-break-word leading-[1.35]">
                    {{ row.description }}
                </div>
            </div>
        </div>
    </div>
</template>