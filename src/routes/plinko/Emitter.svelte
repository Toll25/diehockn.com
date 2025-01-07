<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { Euler, Vector3 } from 'three';
	import Particle from './Particle.svelte';
	let direction = -1;
	let positionX = 0;

	let speed = 1;

	let bodies: Body[] = [];
	const getId = () => {
		return Math.random().toString(16).slice(2);
	};

	const getRandomRotation = (): Parameters<Euler['set']> => {
		return [Math.random() * 10, Math.random() * 10, Math.random() * 10];
	};

	type Body = {
		id: string;
		mounted: number;
		position: Parameters<Vector3['set']>;
		rotation: Parameters<Euler['set']>;
	};

	let lastBodyMounted: number = 0;
	let bodyEveryMilliseconds = 1500;
	let longevityMilliseconds = 80000;
	const { start, stop, started, task } = useTask((delta) => {
		const deltaSpeed = speed * delta;
		positionX += deltaSpeed * direction;
		if (positionX <= -0.5 || positionX > 0.5) {
			direction *= -1; // Reverse direction
		}
		if (lastBodyMounted + bodyEveryMilliseconds < Date.now()) {
			const body: Body = {
				id: getId(),
				mounted: Date.now(),
				position: [0, 0, positionX],
				rotation: getRandomRotation()
			};
			bodies.unshift(body);
			lastBodyMounted = Date.now();
			bodies = bodies;
		}
		const deleteIds: string[] = [];
		bodies.forEach((body) => {
			if (body.mounted + longevityMilliseconds < Date.now()) {
				deleteIds.push(body.id);
			}
		});

		if (deleteIds.length) {
			deleteIds.forEach((id) => {
				const index = bodies.findIndex((body) => body.id === id);
				if (index !== -1) bodies.splice(index, 1);
			});
			bodies = bodies;
		}
	});
</script>

<T.Group position={[-1.4, 2.6, 0]}>
	<T.Mesh receiveShadow castShadow position={[0, 0, positionX]}>
		<T.BoxGeometry args={[0.2, 0.2, 0.2]} />
		<T.MeshStandardMaterial color={'blue'} />
	</T.Mesh>
	{#each bodies as body (body.id)}
		<Particle position={body.position} rotation={body.rotation} />
	{/each}
</T.Group>
