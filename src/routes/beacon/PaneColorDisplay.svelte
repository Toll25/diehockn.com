<script lang="ts">
	let { color }: { color: string } = $props();
</script>

<div class="flex flex-row items-start">
	<div
		class="mr-1 h-4 w-4"
		style="background-image: url('/BeaconAssets/{color}_stained_glass.png')"
	></div>
	<div>
		{color}
	</div>
</div>
