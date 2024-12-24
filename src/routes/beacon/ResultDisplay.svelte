<script lang="ts">
	import type { Approximation } from './+page.svelte';
	import PaneColorDisplay from './PaneColorDisplay.svelte';

	let { result, startTime }: { result: Approximation; startTime: number } = $props();
	let elapsedSeconds = $derived((Date.now() - startTime) / 1000);
	let panes = $derived.by(() => {
		let temp = JSON.parse(JSON.stringify(result.panes));
		temp.reverse();
		return temp;
	});
</script>

<div class="flex h-full w-40 min-w-40 flex-col content-center items-center align-middle">
	<div
		class=" mx-2 h-full w-8 animate-scroll bg-blend-multiply"
		style="background-color: rgb({result.color.red}, {result.color.green}, {result.color
			.blue}); background-image: url('/BeaconAssets/beacon_beam_large.png');
       			animation-delay: calc(-1s * {elapsedSeconds}); "
	></div>
	<div
		class="box-border flex h-fit w-full flex-col border-2 border-x-0 border-b-0 border-subtext p-2 font-mono"
	>
		<div class="inline-flex items-center text-center">
			Distance: {result.distance.toFixed(2)}
		</div>
		<div class="">
			Actual Color: <br />
			<div class="text-sm">
				red: {result.color.red}<br />
				green: {result.color.green}<br />
				blue: {result.color.blue}
			</div>
		</div>
		<div class="">
			Used Colors:
			<div class="text-sm">
				{#each panes as color}
					<PaneColorDisplay {color} />
				{/each}
			</div>
		</div>
	</div>
</div>
