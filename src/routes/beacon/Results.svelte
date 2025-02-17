<script module lang="ts">
	export interface ResultAndColors {
		result: Approximation;
		colors: Color[];
	}
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Approximation, Color } from './+page.svelte';
	import PaneColorDisplay from './PaneColorDisplay.svelte';
	import ResultDisplay from './ResultDisplay.svelte';

	let resourceDisplay = $state(false);
	let collapsed = $state(true);

	interface Props {
		results: Approximation[];
		returnToInput: () => void;
	}
	let { results, returnToInput }: Props = $props();

	let counts: Record<string, number> = $derived.by(() => {
		let counts: Record<string, number> = {};
		for (const result of results) {
			for (const pane of result.panes) {
				counts[pane] = (counts[pane] || 0) + 1;
			}
		}

		return counts;
	});

	let beaconWidth = $state(0);
	let startIndex = $state(0);
	let innerWidth = $state(0);
	let numShown = $derived.by(() => {
		let calculated = Math.trunc((innerWidth * 0.6) / beaconWidth);
		return Math.max(1, isFinite(calculated) ? calculated : 1);
	});
	let colorsAndResults: ResultAndColors[] = $state([]);
	$effect(() => {
		const fetchColors = async () => {
			for (const result of results) {
				let panesCopy = [...result.panes];
				let accumulatedPanes: string[] = [];

				const callApi = async (compoundString: string) => {
					const response = await fetch(
						`https://api.diehockn.com/beacon/panes?panes=${compoundString}`,
						{ method: 'GET' }
					);
					return response.json();
				};

				try {
					const promises = panesCopy.map((pane) => {
						accumulatedPanes.push(pane);
						let compoundString = accumulatedPanes.join(',');
						return callApi(compoundString);
					});

					const colors = await Promise.all(promises);

					colorsAndResults.push({ result, colors });
				} catch (error) {
					console.error('Error fetching colors:', error);
				}
			}
		};

		fetchColors();
	});

	let shownArray = $derived(colorsAndResults.slice(startIndex, startIndex + numShown));

	$effect(() => {
		startIndex = Math.max(0, Math.min(startIndex, colorsAndResults.length - numShown));
	});

	function next() {
		startIndex++;
	}

	function prev() {
		startIndex--;
	}
</script>

<svelte:window bind:innerWidth />
<div
	class="relative flex h-full min-h-0 max-w-[70%] flex-row rounded border-2 border-primary bg-surface1"
	id="colors_container"
>
	<div class="flex h-full overflow-y-scroll">
		{#each shownArray as resultAndColors}
			<div bind:clientWidth={beaconWidth}>
				<ResultDisplay {resultAndColors} {collapsed} />
			</div>
		{/each}
	</div>
	<button
		class="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-background disabled:opacity-50"
		onclick={next}
		disabled={!(startIndex + numShown < colorsAndResults.length)}
	>
		<Icon icon="mdi:chevron-right" class="h-6 w-6"></Icon>
	</button>
	<button
		class="absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-background disabled:opacity-50"
		onclick={prev}
		disabled={!(startIndex > 0)}
	>
		<Icon icon="mdi:chevron-left" class="h-6 w-6"></Icon>
	</button>
</div>

{#if resourceDisplay}
	<div class="mt-8 flex flex-col rounded border-2 border-secondary bg-surface1 p-2 font-mono">
		{#each Object.entries(counts) as [color, count]}
			<div class="inline-flex">
				<div class="w-12">
					{count}x
				</div>
				<PaneColorDisplay {color} />
				<br />
			</div>
		{/each}
	</div>
{/if}

<div class="mt-8 flex flex-col items-center">
	<div class="mb-2 flex flex-row">
		<button
			class="mr-2 rounded bg-primary px-2 py-1 text-background"
			onclick={() => (collapsed = !collapsed)}>Show Details</button
		>

		<button
			class="rounded bg-primary px-2 py-1 text-background"
			onclick={() => (resourceDisplay = !resourceDisplay)}>Show Resources</button
		>
	</div>
	<button class=" w-fit rounded bg-primary px-2 py-1 text-background" onclick={returnToInput}
		>Return</button
	>
</div>
