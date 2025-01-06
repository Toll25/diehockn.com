<script module lang="ts">
	export interface Project {
		id: string;
		name: string;
		description: string;
		text: string;
		link?: string;
		sourceLink?: string;
		technologies: string[];
	}
	export interface TechData {
		formattedName: string;
		iconName?: string;
		iconLocation?: string;
		color: string;
		textColor: string;
	}
</script>

<script lang="ts">
	import Card from './Card.svelte';

	import dataImport from './data.json';
	let data: Project[] = dataImport['entries'];
</script>

<div class="flex h-full w-full flex-col">
	<div class="mb-8 flex w-full items-center justify-center pt-2">
		<div class="">
			<div class="text-2xl font-bold">Plinko</div>
		</div>
	</div>
	<div class="flex h-full w-full flex-wrap justify-evenly">
		{#each data as project}
			<Card {project} />
		{/each}
	</div>
</div>
