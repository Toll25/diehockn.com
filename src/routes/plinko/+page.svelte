<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { Environment } from '@threlte/extras';
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex w-full items-center justify-center pt-2">
		<div class="">
			<p class="transform text-2xl font-bold transition-all hover:drop-shadow-glow">Horse Plinko</p>
		</div>
	</div>
	<div class="h-full w-full">
		<Canvas>
			<Scene />
		</Canvas>
	</div>
</div>
