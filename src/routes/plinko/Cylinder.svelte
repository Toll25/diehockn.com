<script lang="ts">
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	export let position;
</script>

<T.Group {position} rotation={[0, Math.PI * 0.5, Math.PI * 0.5]}>
	<AutoColliders shape={'convexHull'}>
		<T.Mesh receiveShadow>
			<T.CylinderGeometry args={[1, 1, 8]} />
			<T.MeshStandardMaterial color="red" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
