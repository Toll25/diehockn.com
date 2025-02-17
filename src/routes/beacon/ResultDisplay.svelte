<script lang="ts">
	import { colorToArray } from './+page.svelte';
	import BeaconBeam from './BeaconBeam.svelte';
	import PaneColorDisplay from './PaneColorDisplay.svelte';
	import type { ResultAndColors } from './Results.svelte';

	let { resultAndColors, collapsed }: { resultAndColors: ResultAndColors; collapsed: boolean } =
		$props();
	let panes = $derived.by(() => {
		return JSON.parse(JSON.stringify(resultAndColors.result.panes));
	});
	function toUpper(str: string) {
		return str
			.toLowerCase()
			.split(' ')
			.map(function (word: string) {
				return word[0].toUpperCase() + word.substr(1);
			})
			.join(' ');
	}
</script>

<div class="flex h-full w-40 min-w-40 flex-col content-center items-center align-middle">
	<div
		class="box-border flex h-16 min-h-16 w-full flex-col items-center border-2 border-x-0 border-t-0 border-subtext font-mono"
	>
		<BeaconBeam color={colorToArray(resultAndColors.result.originalColor)} />
	</div>
	<div class="flex h-fit w-full flex-col">
		{#each resultAndColors.result.panes as pane, index}
			<div class="relative">
				<div class="flex h-28 justify-center">
					<BeaconBeam color={colorToArray(resultAndColors.colors[index])} />
				</div>
				<div
					class="group absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 transform cursor-help"
					style="background-image: url('/BeaconAssets/Glass/Big/{pane}_stained_glass.png')"
					title="{toUpper(pane.replace('_', ' '))} Stained Glass"
				></div>
			</div>
		{/each}

		<div class="relative grow">
			<div class="flex h-full min-h-12 justify-center">
				<BeaconBeam color={[255, 255, 255]} />
			</div>
		</div>
	</div>
	<div class="box-border flex w-full flex-col font-mono">
		{#if !collapsed}
			<div class="border-2 border-x-0 border-b-0 border-subtext p-2">
				<div class="">
					<strong>Used Colors:</strong>
					<div class="text-sm">
						{#each panes as color}
							<PaneColorDisplay {color} />
						{/each}
					</div>
				</div>
				<div class="inline-flex text-center">
					<div
						class="cursor-help font-bold underline decoration-dotted"
						title="Delta E is a measure of color proximity. Lower is better. Values ≤1.0 means the difference is not perceptible by human eyes."
					>
						dE
					</div>
					<strong>:</strong>
					{resultAndColors.result.distance.toFixed(2)}
				</div>
				<div class="">
					<strong>Actual Color: </strong><br />
					<div class="text-sm">
						<u class="decoration-red-500">red</u>:&nbsp;&nbsp;
						{resultAndColors.result.color.red}<br />
						<u class="decoration-green-500">green</u>:
						{resultAndColors.result.color.green}<br />
						<u class="decoration-blue-500">blue</u>:&nbsp;
						{resultAndColors.result.color.blue}
					</div>
				</div>
				<div class="">
					<strong>Target Color: </strong><br />
					<div class="text-sm">
						<u class="decoration-red-500">red</u>:&nbsp;&nbsp;
						{resultAndColors.result.originalColor.red}<br />
						<u class="decoration-green-500">green</u>:
						{resultAndColors.result.originalColor.green}<br />
						<u class="decoration-blue-500">blue</u>:&nbsp;
						{resultAndColors.result.originalColor.blue}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
