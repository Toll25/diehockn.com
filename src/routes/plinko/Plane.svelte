<script lang="ts">
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
</script>

<T.Group position={[0, 0, -2.5]}>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh receiveShadow>
			<T.BoxGeometry args={[20, 20, 1]} />
			<T.MeshStandardMaterial color="green" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
