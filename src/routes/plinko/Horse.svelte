<script lang="ts">
	import { T } from '@threlte/core';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import { useGltf } from '@threlte/extras';
	import { derived } from 'svelte/store';
	import type { MeshStandardMaterial, Mesh } from 'three';

	let node = '16267_American_Paint_Horse_Nuetral_new';
	const gltf = useGltf<{
		nodes: {
			node: Mesh;
		};
		materials: {
			Material_MR: MeshStandardMaterial;
		};
	}>('/StolenHorse.gltf');
	const horse = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes[node]) return;

		// Check if the geometry has already been scaled
		const geometry = gltf.nodes[node].geometry;
		if (!geometry.userData.scaled) {
			geometry.scale(0.05, 0.05, 0.05);
			geometry.userData.scaled = true; // Mark as scaled
		}

		return gltf.nodes[node];
	});
</script>

{#if $horse}
	<T.Group
		position={[Math.random() * (5 - -5) - 5, 10, 0]}
		rotation={[Math.random() * 10, Math.random() * 10, Math.random() * 10]}
	>
		<RigidBody>
			<AutoColliders shape={'trimesh'}>
				<T.Mesh castShadow geometry={$horse.geometry} material={$horse.material} />
			</AutoColliders>
		</RigidBody>
	</T.Group>
{/if}
