<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { TextureLoader } from 'three';
	const loader = useLoader(TextureLoader);
	const roughnessMap = loader.load(
		'/laminate-flooring-brown-bl/laminate-flooring-brown_roughness.png'
	);
	const normalMap = loader.load(
		'/laminate-flooring-brown-bl/laminate-flooring-brown_normal-ogl.png'
	);
	const metallicMap = loader.load(
		'/laminate-flooring-brown-bl/laminate-flooring-brown_metallic.png'
	);
	const heightMap = loader.load('/laminate-flooring-brown-bl/laminate-flooring-brown_height.png');
	const aoMap = loader.load('/laminate-flooring-brown-bl/laminate-flooring-brown_ao.png');
	const textureMap = loader.load('/laminate-flooring-brown-bl/laminate-flooring-brown_albedo.png');
</script>

<T.Group position={[0, -1.8, 0]}>
	<AutoColliders shape={'cuboid'}>
		{#await roughnessMap then roughnessMap}
			{#await normalMap then normalMap}
				{#await metallicMap then metallicMap}
					{#await heightMap then heightMap}
						{#await aoMap then aoMap}
							{#await textureMap then textureMap}
								<T.Mesh receiveShadow castShadow rotation={[-Math.PI / 2, 0, 0]}>
									<T.PlaneGeometry args={[20, 20]} />
									<T.MeshStandardMaterial
										{roughnessMap}
										{normalMap}
										metalnessMap={metallicMap}
										displacementMap={heightMap}
										{aoMap}
										map={textureMap}
									/>
								</T.Mesh>
							{/await}
						{/await}
					{/await}
				{/await}
			{/await}
		{/await}
	</AutoColliders>
</T.Group>
