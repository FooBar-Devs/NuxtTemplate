<script setup lang="ts">
    const themeStore = useThemeStore();
    const mouseX = ref(0);
    const mouseY = ref(0);

    let tooltipWidth = 100;
    let tooltipHeight = 30;
    let tooltipElement = null as Element | null;


    const leftPosition = ref(0);
    const topPosition = ref(0);

    const handleMouseMove = (event: MouseEvent) => {
        
        if (!tooltip.active || !tooltipElement) return;

        mouseX.value = event.clientX;
        mouseY.value = event.clientY;

        tooltipWidth = tooltipElement.clientWidth;
        tooltipHeight = tooltipElement.clientHeight;

        let alignX = 0;
        let alignY = 0;
        
        // Calculate initial alignment based on tooltip type
        switch (tooltip.type) {
            case "top":
                alignX = 0;
                alignY = -tooltipHeight / 2 - 8;
                break;
            case "bottom":
                alignX = 0;
                alignY = tooltipHeight / 2 + 8;
                break;
            case "left":
                alignX = -tooltipWidth / 2 - 8;
                alignY = 0;
                break;
            case "right":
                alignX = tooltipWidth / 2 + 8;
                alignY = 0;
                break;
        }

        // Calculate preliminary positions
        let tempLeft = mouseX.value + tooltip.offsetx + alignX;
        let tempTop = mouseY.value + tooltip.offsety - tooltipHeight / 2 + alignY;
        let tempType = tooltip.type;
        let tempOffsetx = tooltip.offsetx;
        let tempOffsety = tooltip.offsety;

        // Adjust tooltip type only if it reaches boundaries
        if (tempType=== "top" && tempTop < 8) {
            tempType = "bottom";
            tempOffsety = -tooltip.offsety;
        } else if (tempType === "bottom" && tempTop + tooltipHeight > window.innerHeight - 8) {
            tempType = "top";
            tempOffsety = -tooltip.offsety;
        } else if (tempType === "left" && tempLeft - tooltipWidth / 2 < 8) {
            tempType = "right";
            tempOffsetx = -tooltip.offsetx;
        } else if (tempType === "right" && tempLeft + tooltipWidth / 2 > window.innerWidth - 8) {
            tempType = "left";
            tempOffsetx = -tooltip.offsetx;
        }

        // Recalculate alignment based on adjusted tooltip type
        switch (tempType) {
            case "top":
                alignX = 0;
                alignY = -tooltipHeight / 2 - 8;
                break;
            case "bottom":
                alignX = 0;
                alignY = tooltipHeight / 2 + 8;
                break;
            case "left":
                alignX = -tooltipWidth / 2 - 8;
                alignY = 0;
                break;
            case "right":
                alignX = tooltipWidth / 2 + 8;
                alignY = 0;
                break;
        }

        // Calculate final positions
        leftPosition.value = Math.min(
            window.innerWidth - tooltipWidth / 2 - 8,
            Math.max(mouseX.value + tempOffsetx + alignX, tooltipWidth / 2 + 8)
        );
        topPosition.value = Math.min(
            window.innerHeight - tooltipHeight - 8,
            Math.max(mouseY.value + tempOffsety - tooltipHeight / 2 + alignY, 8)
        );
    };

    onMounted(() => {
        window.addEventListener("mousemove", handleMouseMove);
        tooltipElement = document.getElementById("tooltip");
    });

    onBeforeUnmount(() => {
        window.removeEventListener("mousemove", handleMouseMove);
    });
</script>

<template>
    <Teleport to="body">
        <div :style="{ left: leftPosition + 'px', top: topPosition + 'px' }"
            :class="[tooltip.active ? 'opacity-100' : 'opacity-0', tooltip.css, {'dark' : themeStore.isDarkMode}]" 
            class="z-20000 fixed pointer-events-none flex justify-center transition-opacity duration-300">

            <div id="tooltip" class="rounded dark:bg-TBD-bg-dark/50 bg-TBD-bg-light/50 
                dark:text-TBD-text-light text-TBD-text-dark px-2 py-1 flex justify-left 
                items-left absolute w-fit border ring-1 dark:ring-TBD-bg-dark 
                ring-TBD-bg-light dark:border-TBD-bg-light border-TBD-bg-dark 
                font-bold dark:font-normal drop-shadow-lg transition-500 backdrop-blur-sm">
                <div class="text-xs w-fit whitespace-nowrap" :innerHTML="tooltip.content"></div>
            </div>
            
        </div>
    </Teleport>
</template>