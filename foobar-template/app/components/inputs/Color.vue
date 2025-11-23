<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const themeStore = useThemeStore();
const props = defineProps({
	modelValue: { type: String },
	hoverColor: { type: Number },
	hoverVariant: { type: Number },
	i: { type: Number },
	j: { type: Number },
	property: { type: String },
});

const parentRef = ref<HTMLElement | null>(null);
const childRef = ref<HTMLElement | null>(null);
const gadgetStyles = ref({ top: "0px", left: "0px" });
const color = ref(props.modelValue);
const active = ref(false);

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
	(e: "leaveColorPicker"): void;
	(e: "clickColor"): void;
}>();

const update = function (value: string) {
	emit("update:modelValue", value);
};

watch(
	() => color.value,
	(newValue) => {
		update(newValue as string);
	}
);

function calculateGadgetPosition() {
	if ((props.i != props.hoverColor || props.j != props.hoverVariant) && !active.value) return;

	if (parentRef.value && childRef.value) {
		const parentRect = parentRef.value.getBoundingClientRect();

		const childRect = childRef.value.getBoundingClientRect();

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Calculate initial position (centered below the parent)
		let left = parentRect.left + parentRect.width / 2 - childRect.width / 2 + window.scrollX;
		let top = parentRect.bottom + window.scrollY;

		// Check if the gadget goes out of the window bounds and adjust accordingly
		if (left + childRect.width > windowWidth) {
			// Move left to fit within the window
			left = windowWidth - childRect.width;
		} else if (left < 0) {
			// Move right to fit within the window
			left = 0;
		}

		if (top + childRect.height > windowHeight + window.scrollY) {
			// Move above the parent if it goes below the window
			top = parentRect.top + window.scrollY - childRect.height;
		} else if (top < window.scrollY) {
			// Move down to fit within the window
			top = window.scrollY;
		}

		// Ensure the gadget stays within the window bounds after adjustments
		left = Math.min(windowWidth - childRect.width, Math.max(left, 0));
		top = Math.min(windowHeight + window.scrollY - childRect.height, Math.max(top, window.scrollY));

		gadgetStyles.value = {
			top: `${top}px`,
			left: `${left}px`,
		};
	}
}

function handleClickOutside(event: MouseEvent) {
	let target = event.target as HTMLElement;

	while (target) {
		if (target.classList.contains("ck-cp-container") || target.classList.contains("color")) return;
		target = target.parentElement as HTMLElement;
	}

	emit("leaveColorPicker");
}

// ResizeObserver to watch for changes in the size of childRef
const resizeObserver = ref<ResizeObserver | null>(null);

onMounted(() => {
	// Set up ResizeObserver for childRef
	childRef.value = document.getElementById("color" + props.property + props.i + props.j);
	if (childRef.value) {
		resizeObserver.value = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { height, width } = entry.contentRect;
				calculateGadgetPosition(); // Recalculate gadget position on size change
			}
		});
		resizeObserver.value.observe(childRef.value);
	}

	// Set up event listeners
	window.addEventListener("resize", calculateGadgetPosition);
	window.addEventListener("scroll", calculateGadgetPosition, true);
	document.addEventListener("click", handleClickOutside);
	calculateGadgetPosition();
});

onUnmounted(() => {
	// Clean up ResizeObserver
	if (resizeObserver.value && childRef.value) {
		resizeObserver.value.unobserve(childRef.value);
	}

	// Clean up event listeners
	window.removeEventListener("resize", calculateGadgetPosition);
	window.removeEventListener("scroll", calculateGadgetPosition, true);
	document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
	<div
		class="color cursor-pointer rounded-sm ring overflow-hidden group hover:overflow-visible w-4 h-4 hover:scale-125 transition-150"
		:style="i != 0 ? `background-color: ${modelValue};` : `background-color: ${j == 1 ? 'black' : 'white'}; background-image: ${modelValue};`"
		ref="parentRef"
		@click="
			$emit('clickColor');
			active = true;
            color = modelValue;
			calculateGadgetPosition();
		">
		<Teleport to="body">
			<ColorPicker
				:class="i == hoverColor && j == hoverVariant ? 'opacity-100' : 'opacity-0 pointer-events-none'"
				showColorList
				showEyeDrop
                :showAlpha="i == 0"
				type="RGB"
				:mode="i != 0 ? 'solid' : 'gradient'"
				inputType="RGB"
				:showPickerMode="false"
				:theme="themeStore.isDarkMode ? 'dark' : 'light'"
				v-model="color"
				:id="'color' + property + i + j"
				class="fixed transition-opacity duration-300 ease-in-out"
				@blur="
					$emit('leaveColorPicker');
					active = false;
				"
				:style="gadgetStyles" />
		</Teleport>
	</div>
</template>
