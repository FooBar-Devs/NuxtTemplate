<script setup lang="ts">

    interface DocsSlotRow {
        name: string;
        description: string;
    }

    defineProps<{
        rows: DocsSlotRow[];
    }>();

</script>

<template>
    <DocsPanel eyebrow="api reference" title="Slots" bodyClass="p-0">

        <div class="flex bg-TBD-bg-light dark:bg-TBD-bg-dark px-3 py-1.5
            text-eyebrow-bold text-TBD-text-dark dark:text-TBD-text-light
            border-b border-TBD-bg-dark/10 dark:border-TBD-bg-light/10 transition-300">

            <div class="min-w-32">Slot</div>
            <div class="grow">Description</div>

        </div>

        <div class="divide-y divide-TBD-bg-dark/10 dark:divide-TBD-bg-light/10
            bg-TBD-bg-light/25 dark:bg-TBD-bg-dark/25">

            <div
                v-for="row in rows"
                :key="row.name"
                class="flex gap-2 items-center p-2 text-xs
                    bg-TBD-bg-light/5 dark:bg-TBD-bg-dark/5
                    even:bg-TBD-bg-dark/5 even:dark:bg-TBD-bg-light/5 transition-300">

                <div class="min-w-32 font-semibold text-TBD-primary-light dark:text-TBD-primary-dark transition-300">
                    {{ row.name }}
                </div>

                <div class="grow">
                    {{ row.description }}
                </div>

            </div>

        </div>

    </DocsPanel>
</template>