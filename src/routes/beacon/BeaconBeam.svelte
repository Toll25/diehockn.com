<script lang="ts">
	import { getContext } from 'svelte';

	let { color }: { color: number[] } = $props();

	let startTime: number = getContext('startTime');
	let elapsedSeconds = $derived((Date.now() - startTime) / 1000);
</script>

<div class="flex w-12 items-center justify-center">
	<div
		class="h-8 w-8 animate-scroll bg-blend-multiply"
		style="background-color: rgb({color[0]}, {color[1]}, {color[2]}); background-image: url('/BeaconAssets/beacon_beam_large.png');
       			animation-delay: calc(-1s * {elapsedSeconds}); "
	></div>
</div>
