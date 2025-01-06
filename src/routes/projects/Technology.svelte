<script lang="ts">
	import type { TechData } from './+page.svelte';

	let { tech }: { tech: string } = $props();

	import techDataImport from './techmap.json';
	let techData: Record<string, TechData> = techDataImport;
	let data: TechData = techData[tech];
</script>

{#if data}
	<div
		class="flex-grow p-4 text-center first:rounded-bl-lg last:rounded-br-lg"
		style="color: {data.textColor};background: {data.color};"
	>
		{data.formattedName}
	</div>
{:else}
	<div class="flex-grow bg-teal-400 p-4 text-center first:rounded-bl-lg last:rounded-br-lg">
		{tech}
	</div>
{/if}
