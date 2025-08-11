<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';

	interface Props {
		onclick: () => void;
		icon_name: string | IconifyIcon;
		id: string;
		disabled?: boolean;
		hidden?: boolean;
	}

	let { onclick, icon_name, id, disabled = false, hidden = false }: Props = $props();
</script>

<button
	{id}
	class={`${hidden ? 'hidden' : ''} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-primary bg-background text-text hover:bg-primary hover:text-background active:bg-primary disabled:opacity-50`}
	{onclick}
	{disabled}
>
	<Icon class="h-5/6 w-5/6" icon={icon_name} />
</button>
