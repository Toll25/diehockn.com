<script lang="ts">
	import Icon from '@iconify/svelte';
	import ColorRow from './ColorRow.svelte';

	import TextInput from './TextInput.svelte';
	import type { Approximation } from './+page.svelte';
	interface Props {
		results: Approximation[];
		colors: number[][];
		stopLoading: () => void;
		startCalculation: () => void;
	}
	let {
		results = $bindable(),
		colors = $bindable(),
		stopLoading,
		startCalculation
	}: Props = $props();
	let dropdown = $state(false);
	let dropdownValue = $state('Normal');

	function calculate() {
		startCalculation();
		makeRequests();
	}

	function deleteColor(index: number) {
		colors.splice(index, 1);
	}
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
			} else if (dropdownValue === 'Normal') {
				values.depth = 5;
				values.cutoff = 4;
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
						// panes: apiResponse.panes.reverse(),
						originalColor: { red: item[0], green: item[1], blue: item[2] }
					};
				});
			} catch (error) {
				console.error('Error fetching API data:', error);
			} finally {
				stopLoading();
				// console.log(results);
			}
		};
		fetchApiData();
	}
</script>

<TextInput bind:colors />

{#if colors[0]}
	<div
		class="mt-8 overflow-y-auto rounded border-2 border-primary bg-surface1 p-2"
		id="colors_container"
	>
		{#each colors as color, index}
			{#key index}
				<ColorRow {color} handleDelete={() => deleteColor(index)} />
			{/key}
		{/each}
	</div>
{:else}
	<div class="mt-8 select-none text-xl text-subtext">No colors chosen yet</div>
{/if}
<div class="mt-auto">
	<div class="mt-8">
		<button
			class="rounded bg-primary px-2 py-1 text-background disabled:opacity-50"
			onclick={calculate}
			disabled={colors[0] ? false : true}>Calculate</button
		>
		<div class="relative ml-2 inline-block text-left">
			Accuracy:
			<div class="relative w-28 min-w-28">
				<button
					class="flex w-full items-center justify-center rounded bg-primary px-2 py-1 text-background disabled:opacity-50"
					onclick={() => {
						dropdown = !dropdown;
					}}
					disabled={colors[0] ? false : true}
				>
					<Icon icon="mdi:chevron-down" class="absolute left-2"></Icon>
					<span>{dropdownValue}</span>
				</button>
			</div>
			{#if dropdown}
				<div
					class="animate-fadeIn absolute right-0
                                       mt-2 w-48 origin-top-right
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
						<span class="text-subtext">(2 sec/color)</span>
					</button>
					<button
						onclick={() => {
							dropdownValue = 'Normal';
							dropdown = false;
						}}
						class="flex w-full items-center justify-between rounded-t px-4 py-2 text-sm hover:text-subtext"
					>
						<span>Normal</span>
						<span class="text-subtext">(0.3 sec/color)</span>
					</button>
				</div>
			{/if}
		</div>

		<div class="h-2"></div>
	</div>
</div>
