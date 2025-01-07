<script lang="ts">
	import { Group, Mesh } from 'three';
	import { T, useTask } from '@threlte/core';
	import { useGltf, useGltfAnimations } from '@threlte/extras';
	import { AutoColliders, Collider } from '@threlte/rapier';
	import { Collider as ColliderClass, Vector3 } from '@dimforge/rapier3d-compat';

	export const ref = new Group();

	const gltf = useGltf('/CoinPusher.glb');
	export const { actions, mixer } = useGltfAnimations(gltf, ref);

	let pusher: Mesh;
	let collider: ColliderClass;
	let pusherGroup: Group;

	let counter = 0.5;
	let direction = 1;
	let speed = 1;

	useTask((delta) => {
		const deltaSpeed = speed * delta;
		counter += deltaSpeed * direction;
		if (counter <= 0.1 || counter > 1) {
			direction *= -1;
		}
		if (pusher) {
			pusher.scale.x = counter;
			pusher.position.x = counter * (1 / 3) - 4.7;
		}
		if (collider) {
			collider.setTranslation(new Vector3(counter * (2 / 3) - 2.175, 1.05, 0));
		}
	});
</script>

<T is={ref} {...$$restProps}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Group name="Scene">
			<T.Mesh
				receiveShadow
				castShadow
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

			<T.Group position={[3, 1.05, 0]} bind:ref={pusherGroup}>
				<T.Mesh
					receiveShadow
					castShadow
					bind:ref={pusher}
					name="Pusher"
					geometry={gltf.nodes.Pusher.geometry}
					material={gltf.materials['Material.003']}
					position={[0, 0, 0]}
				/>
				<Collider bind:collider shape={'cuboid'} args={[0.5, 0.05, 0.7]} />
			</T.Group>
			<T.Mesh
				name="Text"
				receiveShadow
				castShadow
				geometry={gltf.nodes.Text.geometry}
				material={gltf.materials['Material.001']}
				position={[-0.98, 3.1, 0.67]}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
			/>

			<AutoColliders shape={'convexHull'}>
				<T.Mesh
					name="Left_Bumper"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Left_Bumper.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Right_Bumper"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Right_Bumper.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Cylinder"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 2.24, 0.43]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder001"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder001.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 2.24, 0.02]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder002"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder002.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 2.24, -0.39]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder003"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder003.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.54, 0.43]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder004"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder004.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.54, 0.02]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder005"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder005.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.54, -0.39]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder006"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder006.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.85, 0.22]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Cylinder007"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Cylinder007.geometry}
					material={gltf.materials.Prong}
					position={[-1.35, 1.86, -0.19]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				/>
				<T.Mesh
					name="Bottom_Collider"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Bottom_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Left_Collider"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Left_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Right_Collider"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Right_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Back_Collider"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Back_Collider.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Back"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Collector_Back.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Bottom"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Collector_Bottom.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Front"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Collector_Front.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Left"
					receiveShadow
					castShadow
					geometry={gltf.nodes.Collector_Left.geometry}
					material={gltf.materials.Machine}
				/>
				<T.Mesh
					name="Collector_Right"
					receiveShadow
					castShadow
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
