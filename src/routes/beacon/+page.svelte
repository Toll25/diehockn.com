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
	import Icon from '@iconify/svelte';

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
			let values: { depth: number; cutoff: number } = { depth: 3, cutoff: 3 };
			if (dropdownValue === 'High') {
				values.depth = 6;
				values.cutoff = 5;
			} else if (dropdownValue === 'Medium') {
				values.depth = 5;
				values.cutoff = 4;
			} else if (dropdownValue === 'Low') {
				values.depth = 4;
				values.cutoff = 3;
			}
			const response = await fetch(
				`https://api.diehockn.com/beacon/approximation/custom?r=${item[0]}&g=${item[1]}&b=${item[2]}`,
				{
					method: 'GET',
					headers: {
						depth: values.depth.toString(),
						cutoff: values.cutoff.toString()
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
	let dropdown = $state(false);
	let dropdownValue = $state('Medium');
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
				<button class=" rounded bg-primary px-2 py-1 text-background" onclick={calculate}
					>Calculate</button
				>
				<div class="relative ml-2 inline-block text-left">
					Accuracy:

					<div class="relative w-28 min-w-28">
						<button
							class="flex w-full items-center justify-center rounded bg-primary px-2 py-1 text-background"
							onclick={() => {
								dropdown = !dropdown;
							}}
						>
							<Icon icon="mdi:chevron-down" class="absolute left-2"></Icon>
							<span>{dropdownValue}</span>
						</button>
					</div>
					{#if dropdown}
						<div
							class="animate-fadeIn absolute right-0
                        mt-2 w-44 origin-top-right
                        rounded border-2 border-secondary bg-surface1
                        "
							id="dropdownMenuRight"
						>
							<button
								onclick={() => {
									dropdownValue = 'High';
									dropdown = false;
								}}
								class="flex w-full items-center justify-between rounded-t px-4 py-2 text-sm hover:text-subtext"
							>
								<span>High</span>
								<span class="text-subtext">(5 sec/color)</span>
							</button>
							<button
								onclick={() => {
									dropdownValue = 'Medium';
									dropdown = false;
								}}
								class="flex w-full items-center justify-between rounded-t px-4 py-2 text-sm hover:text-subtext"
							>
								<span>Medium</span>
								<span class="text-subtext">(2 sec/color)</span>
							</button>
							<button
								onclick={() => {
									dropdownValue = 'Low';
									dropdown = false;
								}}
								class="flex w-full items-center justify-between rounded-t px-4 py-2 text-sm hover:text-subtext"
							>
								<span>Low</span>
								<span class="text-subtext">(almost instant)</span>
							</button>
						</div>
					{/if}
				</div>

				<div class="h-8"></div>
			</div>
		{/if}
	{/if}
</div>
