<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { Environment, OrbitControls } from '@threlte/extras';

	import Plane from './Plane.svelte';
	import { AutoColliders, CollisionGroups, Debug, RigidBody, World } from '@threlte/rapier';
	import CoinPusher2 from './CoinPusher2.svelte';

	let autoRotate: boolean = false;
	let enableDamping: boolean = true;
	let rotateSpeed: number = 1;
	let zoomToCursor: boolean = false;
	let zoomSpeed: number = 1;
	let minPolarAngle: number = 0;
	let maxPolarAngle: number = Math.PI;
	let enableZoom: boolean = true;
</script>

<Environment url={'/billiard_hall_2k.hdr'} isBackground={true} />
<T.PerspectiveCamera makeDefault position={[10, 6, 0]}>
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

<!-- <T.DirectionalLight position.y={10} position.z={10} /> -->
<!-- <T.AmbientLight intensity={0.3} /> -->

<World>
	<CollisionGroups groups={[0, 15]}>
		<Plane />
	</CollisionGroups>
	<RigidBody>
		<AutoColliders shape={'cuboid'}>
			<T.Mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-1.18, 2.5, 0]}>
				<T.BoxGeometry args={[0.2, 0.2, 0.2]} />
				<T.MeshStandardMaterial color={'white'} />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>
	<Debug />
	<CoinPusher2 />
</World>
