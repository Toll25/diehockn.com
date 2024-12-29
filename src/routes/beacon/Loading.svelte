<script lang="ts">
	import Icon from '@iconify/svelte';
	let elapsed = $state(0);
	$effect(() => {
		const id = setInterval(() => {
			elapsed += 1;
		}, 100);

		return () => {
			clearInterval(id);
		};
	});
</script>

<Icon icon="gg:spinner" class="h-20 w-20 animate-spin" />
<div class="flex w-32 justify-between text-sm text-subtext">
	Elapsed Time: {(elapsed / 10).toFixed(1)}
</div>
