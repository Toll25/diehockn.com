<script module lang="ts">
	export interface Approximation {
		panes: string[];
		distance: number;
		color: Color;
		originalColor: Color;
	}

	export interface Color {
		red: number;
		green: number;
		blue: number;
	}
	export function colorToArray(color: Color): number[] {
		return [color.red, color.green, color.blue];
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	import ColorRow from './ColorRow.svelte';
	import ResultDisplay from './ResultDisplay.svelte';
	import TextInput from './TextInput.svelte';

	let colors = $state([]);
	setContext('startTime', Date.now());
	function deleteColor(index: number) {
		colors.splice(index, 1);
	}

	let display = $state(false);
	let results: Approximation[] = $state([]);
	let loading = $state(false);

	function makeRequests() {
		const uniqueElements = colors.filter(
			(item, index, self) =>
				index === self.findIndex((other) => JSON.stringify(other) === JSON.stringify(item))
		);

		const callApi = async (item: number[]) => {
			const response = await fetch(
				`https://api.diehockn.com/beacon/approximation/custom?r=${item[0]}&g=${item[1]}&b=${item[2]}`,
				{
					method: 'GET',
					headers: {
						depth: '3',
						cutoff: '3'
					}
				}
			);
			return await response.json();
		};

		const fetchApiData = async () => {
			try {
				const responseMap = new Map();

				const apiPromises = uniqueElements.map(async (unique) => {
					const response = await callApi(unique);
					responseMap.set(JSON.stringify(unique), response);
				});

				await Promise.all(apiPromises);

				results = colors.map((item: number[]) => {
					const apiResponse = responseMap.get(JSON.stringify(item));
					return {
						...apiResponse,
						originalColor: { red: item[0], green: item[1], blue: item[2] }
					};
				});
			} catch (error) {
				console.error('Error fetching API data:', error);
			} finally {
				loading = false;
				console.log(results);
			}
		};
		fetchApiData();
	}

	function calculate() {
		display = true;
		loading = true;
		makeRequests();
	}
	function input() {
		display = false;
		colors = [];
	}
	let collapsed = $state(true);
</script>

<div class="flex h-fit w-full flex-col items-center">
	<div class="mb-8 flex w-full items-center justify-center pt-2">
		<div class="">
			<div class="text-2xl font-bold">Beacon Calculator</div>
		</div>
	</div>
	{#if display}
		{#if loading}
			<div>Loading!!!</div>
		{:else}
			<div
				class="flex h-fit max-w-[70%] flex-row overflow-x-auto overflow-y-visible rounded border-2 border-primary bg-surface1"
				id="colors_container"
			>
				{#each results as result, index}
					{#key index}
						<ResultDisplay {result} {collapsed} />
					{/key}
				{/each}
			</div>
		{/if}
		<div class="mt-8">
			<button class="rounded bg-primary px-2 py-1 text-background" onclick={input}>Return</button>
			<button
				class="rounded bg-primary px-2 py-1 text-background"
				onclick={() => (collapsed = !collapsed)}>Show Details</button
			>
			<div class="h-8"></div>
		</div>
	{:else}
		<TextInput bind:colors />

		{#if colors[0]}
			<div class="mt-8 rounded border-2 border-primary bg-surface1 p-2" id="colors_container">
				{#each colors as color, index}
					{#key index}
						<ColorRow {color} handleDelete={() => deleteColor(index)} />
					{/key}
				{/each}
			</div>

			<div class="mt-8">
				<button class="rounded bg-primary px-2 py-1 text-background" onclick={calculate}
					>Calculate</button
				>

				<div class="h-8"></div>
			</div>
		{/if}
	{/if}
</div>
