<script lang="ts">
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { AutoColliders } from '@threlte/rapier';

	let map = useTexture('/Plinko/bitmap.png');
</script>

<T.Group position={[0, 0, -2.5]}>
	<AutoColliders shape={'cuboid'}>
		{#await map then value}
			<T.Mesh receiveShadow>
				<T.BoxGeometry args={[20, 20, 1]} />
				<T.MeshStandardMaterial map={value} />
			</T.Mesh>
		{/await}
	</AutoColliders>
</T.Group>
