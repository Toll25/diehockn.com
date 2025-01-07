<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<div class="flex h-full w-full flex-col">
	<div class="bg mb-8 flex w-full items-center justify-center pt-2">
		<div class="">
			<div class="text-2xl font-bold">Plinko</div>
		</div>
	</div>
	<div class="h-full w-full">
		<Canvas>
			<Scene />
		</Canvas>
	</div>
</div>
