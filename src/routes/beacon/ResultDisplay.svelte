<script lang="ts">
	import type { Approximation } from './+page.svelte';
	import BeaconBeam from './BeaconBeam.svelte';
	import PaneColorDisplay from './PaneColorDisplay.svelte';

	let { result }: { result: Approximation } = $props();
	let panes = $derived.by(() => {
		let temp = JSON.parse(JSON.stringify(result.panes));
		temp.reverse();
		return temp;
	});
</script>

<div class="flex h-full w-40 min-w-40 flex-col content-center items-center align-middle">
	<BeaconBeam color={[result.color.red, result.color.green, result.color.blue]} />
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
