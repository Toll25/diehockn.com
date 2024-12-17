<script>
	import Icon from '@iconify/svelte';

	export let href = '#';
	export let icon = '';
	export let svgPath = '';
	export let text = '';
</script>

<a {href} class="flex items-center gap-2 transition-colors duration-300 hover:text-primary">
	{#if svgPath}
		<img src={svgPath} alt="{text} icon" class="h-6 w-6" />
	{:else if icon}
		<Icon {icon} class="h-6 w-6" />
	{/if}
	<span>{text}</span>
</a>
