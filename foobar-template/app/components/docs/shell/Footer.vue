<template>
    <div class="w-full pb-4">
        <footer class="flex w-full items-center justify-between rounded-lg border border-TBD-bg-dark/10 bg-TBD-bg-light/35 
            px-4 py-2.5 text-sm dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/25">
            <div class="flex items-center gap-2">
                <Logo class="size-9"/>
                <span class="font-semibold">FooBar</span>
            </div>
            <span class="opacity-50 text-xs">   
                &copy;{{ new Date().getFullYear() }} ▪️ FooBar ▪️ All Rights Reserved.
            </span>
            <span class="flex items-center gap-1">
                Made with <Icon name="line-md:coffee-half-empty-filled-loop" class="text-xl mb-1"/> by <b>FooBar</b>
            </span>
        </footer>
    </div>
</template>