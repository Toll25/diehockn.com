<script lang="ts">
	import Icon from '@iconify/svelte';
	import htmlColorsImport from './html-colors.json';
	import BeaconBeam from './BeaconBeam.svelte';
	import { untrack } from 'svelte';
	const htmlColors: Record<string, string> = htmlColorsImport;

	const hex = new RegExp(/^(0x|#)?([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/, 'i');
	const hsl = new RegExp(
		/^hsl\((360|3[0-5][0-9]|[1-2]?[0-9]?[0-9]),(100|[1-9]?[0-9])%?,(100|[1-9]?[0-9])%?\)$/,
		'i'
	);
	const comma = new RegExp(
		/^(25[0-5]|2[0-4][\d]|1[\d]{2}|[1-9]?[\d]),(25[0-5]|2[0-4][\d]|1[\d]{2}|[1-9]?[\d]),(25[0-5]|2[0-4][\d]|1[\d]{2}|[1-9]?[\d])$/,
		'i'
	);
	const rgb = new RegExp(
		/^rgb(?:a)?\((25[0-5]|2[0-4][\d]|1[\d]{2}|[1-9]?[\d]),(25[0-5]|2[0-4][\d]|1[\d]{2}|[1-9]?[\d]),(25[0-5]|2[0-4][\d]|1[\d]{2}|[1-9]?[\d])(?:,.*)?\)$/,
		'i'
	);

	function parseColor(input: string) {
		const trimmed_input = input.trim();
		if (hex.test(trimmed_input)) {
			let hex: string = trimmed_input.replace(/^(#|0x)/, '');
			if (hex.length === 3) {
				hex = hex
					.split('')
					.map((char) => char + char)
					.join('');
			}
			const r = parseInt(hex.slice(0, 2), 16);
			const g = parseInt(hex.slice(2, 4), 16);
			const b = parseInt(hex.slice(4, 6), 16);
			return [r, g, b];
		} else if (hsl.test(trimmed_input)) {
			const matches = trimmed_input.match(/hsl\((\d+),(\d+)%?,(\d+)%?\)/)!;
			const h = parseInt(matches[1]) / 360;
			const s = parseInt(matches[2]) / 100;
			const l = parseInt(matches[3]) / 100;

			if (s === 0) {
				const gray = Math.round(l * 255);
				return [gray, gray, gray];
			}

			const hueToRgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;

			const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
			const g = Math.round(hueToRgb(p, q, h) * 255);
			const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);
			return [r, g, b];
		} else if (comma.test(trimmed_input)) {
			const matches = trimmed_input.match(comma)!;
			return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
		} else if (rgb.test(trimmed_input)) {
			const matches = trimmed_input.match(rgb)!;

			return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
		} else if (htmlColors[trimmed_input.toLowerCase()]) {
			let hexColor = htmlColors[trimmed_input.toLowerCase()];
			let hex: string = hexColor.replace(/^(#|0x)/, '');
			if (hex.length === 3) {
				hex = hex
					.split('')
					.map((char) => char + char)
					.join('');
			}
			const r = parseInt(hex.slice(0, 2), 16);
			const g = parseInt(hex.slice(2, 4), 16);
			const b = parseInt(hex.slice(4, 6), 16);
			return [r, g, b];
		} else {
			return [255, 255, 255];
		}
	}
	let input = $state('');
	let color = $derived(parseColor(input));

	let colorPickerValue = $state('#000000');
	let initialized = $state(false);
	function explicitEffect(fn: () => void, depsFn: () => void) {
		$effect(() => {
			depsFn();
			untrack(fn);
		});
	}

	explicitEffect(
		() => {
			if (!initialized) {
				initialized = true;
			} else {
				input = colorPickerValue.toUpperCase();
				colors = [...untrack(() => colors), parseColor(colorPickerValue.toUpperCase())];
			}
		},
		() => [colorPickerValue]
	);

	let colorPicker: HTMLElement;
	let { colors = $bindable() }: { colors: number[][] } = $props();
</script>

<div class="flex flex-row">
	<div class="h-9">
		<BeaconBeam {color} />
	</div>
	<div title="Possible Input Methods: rgb(), rgba(), hsl(), #FFF, #FFFFFF, HTML Colors">
		<Icon icon="mdi:information-outline" class="mx-2 h-9 cursor-help text-subtext" />
	</div>
	<div
		id="input"
		class="mr-4 flex h-8 items-center rounded border-2 bg-surface1 p-4"
		style="border-color: rgb({color[0]}, {color[1]}, {color[2]});"
	>
		<input
			class="bg-transparent font-mono text-text placeholder-subtext focus:outline-none"
			placeholder="#FFF,rgb(),..."
			bind:value={input}
			onkeypress={(e) => {
				if (e.key == 'Enter') {
					colors = [...colors, color];
				}
			}}
		/>
	</div>

	<button
		id="color_picker"
		class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-primary"
		onclick={() => {
			colorPicker.click();
		}}
	>
		<Icon class="h-5/6 w-5/6" icon="circum:picker-half" />
	</button>
	<input type="color" class="hidden" bind:value={colorPickerValue} bind:this={colorPicker} />
</div>
