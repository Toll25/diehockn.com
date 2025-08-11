<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		id: string;
		children: Snippet;
		disabled?: boolean;
	}

	let { onclick, id, children, disabled = false }: Props = $props();
</script>

<button
	class="flex items-center justify-center rounded-md border-2 border-primary bg-background px-2 py-1 text-text hover:bg-primary hover:text-background active:bg-primary disabled:opacity-50"
	{onclick}
	{id}
	{disabled}
	>{@render children?.()}
</button>
