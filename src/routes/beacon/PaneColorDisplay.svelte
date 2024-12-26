<script lang="ts">
	let { color, big = false }: { color: string; big?: boolean } = $props();
	let bigString = $derived(big ? 'Big/' : '');
</script>

<div class="flex flex-row items-start">
	<div
		class="mr-1 h-4 w-4"
		style="background-image: url('/BeaconAssets/Glass/{bigString}{color}_stained_glass.png')"
	></div>
	<div>
		{color}
	</div>
</div>
