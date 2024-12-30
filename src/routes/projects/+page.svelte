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

	const data: { entries: Project[] } = dataImport;
</script>

<div class="h-full w-full">
	<div class="mb-8 flex w-full items-center justify-center pt-2">
		<div class="">
			<div class="text-2xl font-bold">My Projects</div>
		</div>
	</div>
	<div class="flex w-full flex-row flex-wrap justify-evenly">
		{#each data.entries as project}
			<Card {project} />
		{/each}
	</div>
</div>
