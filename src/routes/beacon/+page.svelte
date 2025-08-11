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

	import Icon from '@iconify/svelte';
	import Loading from './Loading.svelte';
	import Input from './Input.svelte';
	import Results from './Results.svelte';

	let colors = $state([]);
	setContext('startTime', Date.now());

	let display = $state(false);
	let results: Approximation[] = $state([]);
	let loading = $state(false);

	function stopLoading() {
		loading = false;
	}

	function startCalculation() {
		display = true;
		loading = true;
	}

	function returnToInput() {
		display = false;
		colors = [];
	}
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex h-full min-h-0 w-full flex-col items-center pb-8 pt-2">
		<div class="mb-8 flex w-full items-center justify-center pt-2">
			<div class="text-2xl font-bold">Beacon Calculator</div>
		</div>
		{#if display}
			{#if loading}
				<Loading />
			{:else}
				<Results {results} {returnToInput}></Results>
			{/if}
		{:else}
			<Input bind:results bind:colors {stopLoading} {startCalculation} />
		{/if}
	</div>

	<div class="absolute bottom-0 right-0">
		<div class="mb-2 mr-2 flex flex-col">
			Powered by:
			<a
				class="flex w-fit items-center gap-1 text-primary visited:text-secondary"
				href="https://github.com/Toll25/BeaconCalculator"
				target="_blank"
			>
				<Icon icon="mdi:github" class="h-6 w-6" />
				<span>BeaconCalculator</span>
			</a>
			<br />
			made by me :)
		</div>
	</div>
</div>
