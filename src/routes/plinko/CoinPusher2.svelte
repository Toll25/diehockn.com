<script>
	import { Group } from 'three';
	import { T } from '@threlte/core';
	import { useGltf, useGltfAnimations } from '@threlte/extras';
	import { AutoColliders } from '@threlte/rapier';

	export const ref = new Group();

	const gltf = useGltf('/CoinPusher.glb');
	export const { actions, mixer } = useGltfAnimations(gltf, ref);
	export const triggerAnimation = () => {
		$actions['PusherAction.002']?.play();
	};
	$: $actions['PusherAction.002']?.play();
</script>

<T is={ref} {...$$restProps}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Group name="Scene">
			<T.Mesh
				name="Machine"
				geometry={gltf.nodes.Machine.geometry}
				material={gltf.materials.Machine}
			/>
			<AutoColliders shape={'convexHull'}>
				<T.Mesh name="Glass" geometry={gltf.nodes.Glass.geometry} material={gltf.materials.Glass} />
			</AutoColliders>
			<T.Mesh
				name="Glass_2"
				geometry={gltf.nodes.Glass_2.geometry}
				material={gltf.materials.Glass}
			/>
			<AutoColliders shape={'convexHull'}>
				<T.Mesh
					name="Pusher"
					geometry={gltf.nodes.Pusher.geometry}
					material={gltf.materials['Material.003']}
					position={[-1.35, 1.05, 0]}
				/>
			</AutoColliders>
			<T.Mesh
				name="Text"
				geometry={gltf.nodes.Text.geometry}
				material={gltf.materials['Material.001']}
				position={[-0.98, 3.1, 0.67]}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
			/>

			<AutoColliders shape={'convexHull'}>
				<T.Mesh
					name="Left_Bumper"
					geometry={gltf.nodes.Left_Bumper.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Right_Bumper"
					geometry={gltf.nodes.Right_Bumper.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Cylinder"
					geometry={gltf.nodes.Cylinder.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 2.24, 0.43]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder001"
					geometry={gltf.nodes.Cylinder001.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 2.24, 0.02]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder002"
					geometry={gltf.nodes.Cylinder002.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 2.24, -0.39]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder003"
					geometry={gltf.nodes.Cylinder003.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.54, 0.43]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder004"
					geometry={gltf.nodes.Cylinder004.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.54, 0.02]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder005"
					geometry={gltf.nodes.Cylinder005.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.54, -0.39]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder006"
					geometry={gltf.nodes.Cylinder006.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.85, 0.22]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder007"
					geometry={gltf.nodes.Cylinder007.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.86, -0.19]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Bottom_Collider"
					geometry={gltf.nodes.Bottom_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Left_Collider"
					geometry={gltf.nodes.Left_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Right_Collider"
					geometry={gltf.nodes.Right_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Back_Collider"
					geometry={gltf.nodes.Back_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Back"
					geometry={gltf.nodes.Collector_Back.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Bottom"
					geometry={gltf.nodes.Collector_Bottom.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Front"
					geometry={gltf.nodes.Collector_Front.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Left"
					geometry={gltf.nodes.Collector_Left.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Right"
					geometry={gltf.nodes.Collector_Right.geometry}
					material={gltf.materials.Machine}
				/>
			</AutoColliders>
		</T.Group>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
