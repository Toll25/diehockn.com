<script lang="ts">
	import { colorToArray, type Approximation, type Color } from './+page.svelte';
	import BeaconBeam from './BeaconBeam.svelte';
	import PaneColorDisplay from './PaneColorDisplay.svelte';

	let { result, collapsed }: { result: Approximation; collapsed: boolean } = $props();
	let panes = $derived.by(() => {
		return JSON.parse(JSON.stringify(result.panes));
	});
	function makeRequests() {
		const callApi = async (item: string[]) => {
			let compoundString = item.join(',');
			const response = await fetch(
				`https://api.diehockn.com/beacon/panes?panes=${compoundString}`,
				{
					method: 'GET'
				}
			);
			return await response.json();
		};

		const fetchApiData = async () => {
			let panesCopy = JSON.parse(JSON.stringify(result.panes));
			while (panesCopy.length > 0) {
				const response: Color = await callApi(panesCopy);
				colors = [...colors, response];
				panesCopy.shift();
			}
		};
		fetchApiData();
	}
	makeRequests();
	let colors: Color[] = $state([]);
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

<div class="flex h-fit w-40 min-w-40 flex-col content-center items-center align-middle">
	<div
		class="box-border flex h-16 min-h-16 w-full flex-col items-center border-2 border-x-0 border-t-0 border-subtext font-mono"
	>
		<BeaconBeam color={colorToArray(result.originalColor)} />
	</div>
	<div class="flex h-fit w-full flex-col">
		{#each result.panes as pane, index}
			<div class="relative">
				<div class="flex h-28 justify-center">
					<BeaconBeam color={colors[index] ? colorToArray(colors[index]) : [255, 255, 255]} />
				</div>
				<div
					class="group absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 transform cursor-help"
					style="background-image: url('/BeaconAssets/Glass/Big/{pane}_stained_glass.png')"
					title="{toUpper(pane.replace('_', ' '))} Stained Glass"
				></div>
			</div>
		{/each}

		<div class="relative">
			<div class="flex h-12 justify-center">
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
					{result.distance.toFixed(2)}
				</div>
				<div class="">
					<strong>Actual Color: </strong><br />
					<div class="text-sm">
						<u class="decoration-red-500">red</u>:&nbsp;&nbsp;
						{result.color.red}<br />
						<u class="decoration-green-500">green</u>:
						{result.color.green}<br />
						<u class="decoration-blue-500">blue</u>:&nbsp;
						{result.color.blue}
					</div>
				</div>
				<div class="">
					<strong>Target Color: </strong><br />
					<div class="text-sm">
						<u class="decoration-red-500">red</u>:&nbsp;&nbsp;
						{result.originalColor.red}<br />
						<u class="decoration-green-500">green</u>:
						{result.originalColor.green}<br />
						<u class="decoration-blue-500">blue</u>:&nbsp;
						{result.originalColor.blue}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
