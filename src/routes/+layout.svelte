<script lang="ts">
	import '../app.css';
	import NavLink from './NavLink.svelte';
	let { children } = $props();
	const customSVGs = {
		horse: '/honse.svg',
		beacon: '/beacon.svg'
	};
</script>

<svelte:head>
	<title>Die Hockn</title>
</svelte:head>
<nav class="fixed flex h-12 w-full border-b-2 p-2 align-middle backdrop-blur">
	<a
		href="/"
		class="flex items-center whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent"
		>Die Hockn</a
	>
	<div class="flex w-full justify-evenly">
		<NavLink href="/projects" icon="material-symbols:star-rounded" text="My Projects" />
		<NavLink href="/beacon" svgPath={customSVGs.beacon} text="Beacon Calculator" />
		<NavLink href="/plinko" icon="fa6-solid:horse-head" text="Plinko" />
		<NavLink href="/services" icon="mdi:server" text="Self Hosted Stuff" />
	</div>
</nav>

<div class="flex h-full w-full pt-16">
	{@render children()}
</div>
