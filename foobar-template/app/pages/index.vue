<template>
    <div class="w-full self-baseline px-window py-8 text-TBD-text-dark dark:text-TBD-text-light">
        <div class="mx-auto flex w-full max-w-6xl flex-col gap-4">
            <section class="relative overflow-hidden rounded-2xl border border-TBD-bg-dark/10 shadow-dark dark:border-TBD-bg-light/10 dark:shadow-light">
                <TextBGEffect/>

                <div class="relative z-1 space-y-4 p-6 sm:p-8">
                    <div class="space-y-2">
                        <p class="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-55">Workspace Docs</p>
                        <h1 class="text-3xl font-bold leading-tight sm:text-4xl">
                            Component documentation styled like a real docs app.
                        </h1>
                        <p class="max-w-3xl text-sm leading-6 opacity-80">
                            Browse the shared input components through route-based reference pages with navigation,
                            examples, and live testing surfaces.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2.5">
                        <InputsButton class="min-w-fit" @click="navigateTo('/components')">
                            Open Docs
                        </InputsButton>
                        <InputsButton outline class="min-w-fit" @click="navigateTo('/components/textinput')">
                            View Text Input Example
                        </InputsButton>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
