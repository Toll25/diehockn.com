<script>
	import { Group } from 'three';
	import { T } from '@threlte/core';
	import { useGltf, useGltfAnimations } from '@threlte/extras';

	export const ref = new Group();

	const gltf = useGltf('/MonkeyInABox.glb');
	export const { actions, mixer } = useGltfAnimations(gltf, ref);
	$: $actions['LatchAction.001']?.play();
	$: $actions['SuzanneAction']?.play();
</script>

<T is={ref} {...$$restProps}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Group name="Scene" position={[1, 0.05, 5]} rotation={[0, Math.PI / 3, 0]}>
			<T.Mesh
				castShadow
				receiveShadow
				name="Cube"
				geometry={gltf.nodes.Cube.geometry}
				material={gltf.materials.Wood}
			/>
			<T.Mesh
				castShadow
				receiveShadow
				name="Latch"
				geometry={gltf.nodes.Latch.geometry}
				material={gltf.materials.Wood}
				position={[-1.05, 1.12, 0.01]}
			/>
			<T.Mesh
				castShadow
				receiveShadow
				name="Suzanne"
				geometry={gltf.nodes.Suzanne.geometry}
				material={gltf.materials['Material.001']}
				rotation={[0, Math.PI / 2, 0]}
				scale={0.72}
			/>
		</T.Group>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
