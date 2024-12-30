<script lang="ts">
	import type { Project } from './+page.svelte';
	import Technology from './Technology.svelte';

	let { project }: { project: Project } = $props();
</script>

<div
	class="m-2 flex h-[24rem] w-60 flex-none flex-col rounded-lg bg-surface1 odd:border-secondary even:border-primary"
>
	<div id="image wrapper" class="h-[40%] rounded-t-lg border-x-2 border-t-2 border-inherit">
		<img
			src="./Projects/{project.id}-picture.png"
			class="h-full w-full rounded-t-lg object-contain"
		/>
	</div>

	<div id="Info block" class="flex h-[45%] flex-col border-x-2 border-inherit p-2">
		<div class="text-lg font-bold">
			{project.name}
		</div>
		<div class="flex-grow text-subtext">
			{project.description}
		</div>
		<div class="flex flex-row justify-between text-sm">
			{#if project.link}
				<a href={project.link}>Link</a>
			{/if}
			{#if project.sourceLink}
				<a href={project.sourceLink} class="ml-auto">Source Code</a>
			{/if}
		</div>
	</div>
	<div id="Techs" class="flex h-[15%] max-w-full flex-row rounded-b-lg">
		{#each project.technologies as tech}
			<Technology {tech} />
		{/each}
	</div>
</div>
