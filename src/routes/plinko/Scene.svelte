<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import Plane from './Plane.svelte';
	import { CollisionGroups, Debug, World } from '@threlte/rapier';
	import Ground from './Ground.svelte';
	import Horse from './Horse.svelte';
	import Cylinder from './Cylinder.svelte';

	let autoRotate: boolean = false;
	let enableDamping: boolean = true;
	let rotateSpeed: number = 1;
	let zoomToCursor: boolean = false;
	let zoomSpeed: number = 1;
	let minPolarAngle: number = 0;
	let maxPolarAngle: number = Math.PI;
	let enableZoom: boolean = true;
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 30]} lookAt.y={0.5}>
	<OrbitControls
		{enableDamping}
		{autoRotate}
		{rotateSpeed}
		{zoomToCursor}
		{zoomSpeed}
		{minPolarAngle}
		{maxPolarAngle}
		{enableZoom}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight position.y={10} position.z={10} />
<T.AmbientLight intensity={0.3} />

<World>
	<CollisionGroups groups={[0, 15]}>
		<Ground />
		<Plane />
		<Cylinder position={[3, 4, 2]} />
		<Cylinder position={[-3, 4, 2]} />
		<Cylinder position={[0, 0, 2]} />
		<Cylinder position={[6, 0, 2]} />
		<Cylinder position={[-6, 0, 2]} />
		<Cylinder position={[3, -4, 2]} />
		<Cylinder position={[-3, -4, 2]} />
	</CollisionGroups>

	<Horse />
</World>
