<script module lang="ts">
	export interface Approximation {
		panes: string[];
		distance: number;
		color: Color;
	}

	export interface Color {
		red: number;
		green: number;
		blue: number;
	}
</script>

<script lang="ts">
	import ColorRow from './ColorRow.svelte';
	import ResultDisplay from './ResultDisplay.svelte';
	import TextInput from './TextInput.svelte';

	let colors = $state([]);
	let startTime = Date.now();
	function deleteColor(index: number) {
		colors.splice(index, 1);
		colors = [...colors]; // Trigger reactivity
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
			console.log('Sent request for:', item);
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
			console.log('Responded');
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

				results = colors.map((item: number[]) => responseMap.get(JSON.stringify(item)));
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
</script>

<div class="flex h-full w-full flex-col items-center">
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
				class="flex h-full max-w-[70%] flex-row overflow-y-auto rounded border-2 border-primary bg-surface1"
				id="colors_container"
			>
				{#each results as result, index}
					{#key index}
						<ResultDisplay {result} {startTime} />
					{/key}
				{/each}
			</div>
		{/if}
		<div class="mt-8">
			<button class="rounded bg-primary px-2 py-1 text-background" onclick={input}>Return</button>

			<div class="h-8"></div>
		</div>
	{:else}
		<TextInput bind:colors />

		{#if colors[0]}
			<div class="mt-8 rounded border-2 border-primary bg-surface1 p-2" id="colors_container">
				{#each colors as color, index}
					{#key index}
						<ColorRow
							r={color[0]}
							g={color[1]}
							b={color[2]}
							{startTime}
							on:delete={() => deleteColor(index)}
						/>
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
