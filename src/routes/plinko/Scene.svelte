<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Environment, OrbitControls } from '@threlte/extras';

	import Plane from './Plane.svelte';
	import { CollisionGroups, World } from '@threlte/rapier';
	import CoinPusher from './CoinPusher.svelte';
	import Emitter from './Emitter.svelte';
	import MonkeyInABox from './MonkeyInABox.svelte';

	let direction = 1;
	let speed = 1;
	let counter = 0.5;

	useTask((delta) => {
		const deltaSpeed = speed * delta;
		counter += deltaSpeed * direction;
		if (counter <= -1 || counter > 1) {
			direction *= -1;
		}
	});
</script>

<Environment url={'/Plinko/billiard_hall_2k.hdr'} isBackground={true} />
<T.PerspectiveCamera makeDefault position={[10, 6, 0]}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight
	position={[5, 5, counter * 5]}
	castShadow
	intensity={20}
	color={((255 * Math.abs(counter)) << 16) + (0 << 8) + 255}
/>

<World>
	<CollisionGroups groups={[0, 15]}>
		<Plane />
	</CollisionGroups>
	<Emitter />

	<MonkeyInABox />
	<CoinPusher />
</World>
