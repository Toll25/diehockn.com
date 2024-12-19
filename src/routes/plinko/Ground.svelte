<script lang="ts">
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
</script>

<T.Group position={[0, -10.5, 2]}>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh receiveShadow>
			<T.BoxGeometry args={[20, 1, 10]} />
			<T.MeshStandardMaterial color="blue" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
