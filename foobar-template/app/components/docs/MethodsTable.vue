<script setup lang="ts">

    interface DocsMethodRow {
        method: string;
        description: string;
        parameters: Array<{ name: string; type: string; description: string, required: boolean, default: string }> | string;
        returns: Array<string> | string;
    }

    defineProps<{
        rows: DocsMethodRow[];
    }>();

</script>

<template>
    <DocsPanel eyebrow="api reference" title="Methods" bodyClass="p-0">

        <div class="flex bg-TBD-bg-light dark:bg-TBD-bg-dark px-3 py-1.5
            text-eyebrow-bold text-TBD-text-dark dark:text-TBD-text-light
            border-b border-TBD-bg-dark/10 dark:border-TBD-bg-light/10">

            <div class="min-w-1/5 max-w-1/5">Method</div>
            <div class="grow">Description</div>
            <div class="min-w-1/5 max-w-1/5">Parameters</div>
            <div class="min-w-1/5 max-w-1/5">Returns</div>

        </div>

        <div class="divide-y divide-TBD-bg-dark/10 dark:divide-TBD-bg-light/10
            bg-TBD-bg-light/25 dark:bg-TBD-bg-dark/25 transition-300">

            <div v-for="row in rows" :key="row.method"
                class="flex gap-2 items-center p-2 text-xs
                    bg-TBD-bg-light/5 dark:bg-TBD-bg-dark/5
                    even:bg-TBD-bg-dark/5 even:dark:bg-TBD-bg-light/5 transition-300">

                <div class="min-w-1/5 max-w-1/5 font-semibold text-TBD-primary-light dark:text-TBD-primary-dark transition-300">
                    {{ row.method }}
                </div>

                <div class="grow">
                    {{ row.description }}
                </div>

                <div class="min-w-1/5 max-w-1/5 flex items-center h-full pb-0.5
                    overflow-x-auto overflow-y-hidden scrollbar-size-1.25">
                    
                    <div v-if="typeof row.parameters === 'string'"
                        class="ml-1 rounded-md bg-TBD-bg-dark/5 px-2 py-1 text-TBD-text-dark dark:bg-TBD-bg-light/5 dark:text-TBD-text-light transition-300">
                        {{ row.parameters }}
                    </div>

                    <div v-else-if="row.parameters.length" class="flex gap-2">
                        <div v-for="param in row.parameters"
                            :key="param.name"
                            class="min-w-36 text-2xs rounded-md bg-TBD-bg-dark/5 px-2 py-1 text-TBD-text-dark dark:bg-TBD-bg-light/5 dark:text-TBD-text-light transition-300">
                            <span class="font-semibold relative">{{ param.name }} 
                                <span class="text-TBD-error-light dark:text-TBD-error-dark
                                    absolute right-0.75 -top-0.5 leading-none text-base transition-300"
                                    :class="{'opacity-0': param.required}">*
                                </span>:
                            </span>
                            <span class="text-TBD-secondary-light dark:text-TBD-secondary-dark font-medium transition-300"> {{ param.type }}</span>
                            <br/>
                            <span v-if="param.default" class="opacity-50">
                                Default: {{ param.default }}
                            </span>
                            <TextLine slim/>
                            <span class="opacity-75">{{ param.description }}</span>
                        </div>
                    </div>

                    <span v-else class="italic opacity-50">
                        (none)
                    </span>

                </div>

                <div class="min-w-1/5 max-w-1/5 flex items-center h-full pb-0.5
                    overflow-x-auto overflow-y-hidden scrollbar-size-1.25">
                    <div v-if="typeof row.returns === 'string'">
                        {{ row.returns }}
                    </div>

                    <div v-else class="flex flex-wrap gap-1">
                        <div v-for="returnType in row.returns"
                            :key="returnType">
                            {{ returnType }}
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </DocsPanel>
</template>