<script lang="ts">
	import '../app.css';
	import NavLink from './NavLink.svelte';
	let { children } = $props();
	const customSVGs = {
		beacon: '/beacon.svg'
	};
</script>

<svelte:head>
	<title>Die Hockn</title>
</svelte:head>
<nav
	class="fixed z-[99999999] flex h-12 w-full border-b-[1px] bg-surface1 bg-opacity-50 p-2 align-middle backdrop-blur"
>
	<a
		href="/"
		class="flex items-center whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent"
		>Die Hockn</a
	>
	<div class="flex w-full justify-evenly">
		<NavLink href="/beacon" svgPath={customSVGs.beacon} text="Beacon Calculator" />
	</div>
</nav>

<div class="flex h-full w-full pt-12">
	{@render children()}
</div>
