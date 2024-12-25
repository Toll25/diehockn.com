<script lang="ts">
	import Icon from '@iconify/svelte';
	import BeaconBeam from './BeaconBeam.svelte';

	const rgbToHsl = (r: number, g: number, b: number) => {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h = 0,
			s,
			l = (max + min) / 2;

		if (max === min) {
			h = s = 0; // achromatic
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
	};

	const rgbToHex = (r: number, g: number, b: number) => {
		const toHex = (v: number) => v.toString(16).padStart(2, '0').toUpperCase();
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	};

	let { color, handleDelete }: { color: number[]; handleDelete: any } = $props();
</script>

<div class="flex h-8 flex-row font-mono" id="color">
	<BeaconBeam {color} />
	<div class="mx-2 w-36 content-center">rgb({color[0]},{color[1]},{color[2]})</div>
	<div class="mx-2 w-36 content-center">
		hsl({rgbToHsl(color[0], color[1], color[2]).join(',')})
	</div>
	<div class="mx-2 content-center">{rgbToHex(color[0], color[1], color[2])}</div>
	<div class="mx-2 flex w-8 cursor-pointer items-center justify-center">
		<Icon icon="material-symbols:delete" class="h-6 w-6" onclick={handleDelete} />
	</div>
</div>
