<script lang="ts">
	import ColorRow from './ColorRow.svelte';
	import Input from './Input.svelte';

	let colors = $state([]);
	let startTime = Date.now();
</script>

<div class="flex h-full w-full flex-col items-center">
	<div class="flex w-full items-center justify-center pt-2">
		<div class="">
			<div class="transform text-2xl font-bold">Beacon Calculator</div>
		</div>
	</div>

	<Input bind:colors />
	{#if colors[0]}
		<div class="rounded border-2 border-primary bg-surface1 p-2" id="colors_container">
			{#each colors as color}
				<ColorRow r={color[0]} g={color[1]} b={color[2]} {startTime} />
			{/each}
		</div>
	{/if}
</div>
