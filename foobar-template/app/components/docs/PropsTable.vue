<script setup lang="ts">

    interface DocsPropRow {
        property: string;
        description: string;
        type: Array<string> | string;
        default: any;
        required: boolean;
    }

    defineProps<{
        rows: DocsPropRow[];
    }>();

</script>

<template>
    <DocsPanel eyebrow="api reference" title="Props" bodyClass="p-0">
        
        <div class="flex bg-TBD-bg-light dark:bg-TBD-bg-dark px-3 py-1.5 
            text-eyebrow-bold text-TBD-text-dark dark:text-TBD-text-light
            border-b border-TBD-bg-dark/10 dark:border-TBD-bg-light/10 transition-300">
            
            <div class="min-w-1/5 max-w-1/5">Property</div>
            <div class="grow">Description</div>
            <div class="min-w-1/5 max-w-1/5">Type</div>
            <div class="min-w-1/5 max-w-1/5">Default</div>
            <div class="min-w-18 max-w-18">Required</div>

        </div>

        <div class="divide-y divide-TBD-bg-dark/10 dark:divide-TBD-bg-light/10
            bg-TBD-bg-light/25 dark:bg-TBD-bg-dark/25">

            <div v-for="row in rows" :key="row.property"
                class="flex gap-2 items-center p-2 text-xs
                    bg-TBD-bg-light/5 dark:bg-TBD-bg-dark/5
                    even:bg-TBD-bg-dark/5 even:dark:bg-TBD-bg-light/5 transition-300">
                
                <div class="min-w-1/5 max-w-1/5 font-semibold text-TBD-primary-light dark:text-TBD-primary-dark transition-300">
                    {{ row.property }}
                </div>

                <div class="grow">
                    {{ row.description }}
                </div>

                <div class="min-w-1/5 max-w-1/5 flex items-center h-full pb-0.5 text-TBD-secondary-light dark:text-TBD-secondary-dark 
                    overflow-x-auto overflow-y-hidden scrollbar-size-1.25 transition-300">
                    
                    <TextMark v-if="typeof row.type === 'string'" color="neutral" class="ml-1 normal-case!">
                        {{ row.type }}
                    </TextMark>
                    <TextMark v-else v-for="type in row.type" :key="type" color="neutral" class="ml-1 normal-case!">
                        {{ type }}
                    </TextMark>

                </div>

                <div class="h-full min-w-1/5 max-w-1/5">
                    
                    <span v-if="row.default === ''" class="italic opacity-50">
                        (empty string)
                    </span>
                    
                    <span v-else-if="row.default === null" class="italic text-TBD-error-light dark:text-TBD-error-dark transition-300">
                        (null)
                    </span>
                    
                    <span v-else-if="row.default === undefined" class="italic text-TBD-error-light dark:text-TBD-error-dark transition-300">
                        (undefined)
                    </span>
                    
                    <span v-else>
                        
                        <span v-if="row.type === 'string'" class="text-TBD-warning-light dark:text-TBD-warning-dark transition-300">
                            "{{ row.default }}"
                        </span>
                        
                        <span v-else-if="row.type === 'boolean'">
                            <span v-if="row.default" class="text-TBD-confirm-light dark:text-TBD-confirm-dark transition-300">true</span>
                            <span v-else class="text-TBD-error-light dark:text-TBD-error-dark transition-300">false</span>
                        </span>
                        
                        <span v-else-if="row.type === 'number'" class="text-TBD-secondary-light dark:text-TBD-secondary-dark transition-300">
                            {{ row.default }}
                        </span>
                        
                        <span v-else class="text-TBD-text-dark dark:text-TBD-text-light transition-300">
                            {{ row.default }}
                        </span>
                    </span>

                </div>

                <div class="min-w-18 max-w-18">
                    <TextMark :color="row.required ? 'error' : 'confirm'" class="ml-1">
                        {{ row.required ? 'Yes' : 'No' }}
                    </TextMark>
                </div>

            </div>

        </div>

    </DocsPanel>
</template>