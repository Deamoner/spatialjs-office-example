import { useGLTF } from "@react-three/drei";
import { useCallback } from "react";
import { useWindowStore } from "@spatialjs/core";
import * as THREE from "three";

export function Office(props: any) {
  const { nodes, materials } = useGLTF("/room-transformed.glb");
  const {
    setPosition: setWindowPosition,
    setRotation: setWindowRotation,
    selectedWindow,
  } = useWindowStore();
  const handleClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      // Calculate surface normal at the click point
      const face = event.face;
      const normal = face.normal.clone();
      normal.transformDirection(event.object.matrixWorld);
      console.log(event.point);
      // Calculate a point slightly in front of the clicked point along the surface normal
      const offsetDistance = 0.1; // Adjust this value as needed
      const offsetPoint = event.point
        .clone()
        .add(normal.multiplyScalar(offsetDistance));

      // Calculate rotation to face outward from the surface
      const rotationMatrix = new THREE.Matrix4().lookAt(
        normal,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0)
      );
      const rotation = new THREE.Euler().setFromRotationMatrix(rotationMatrix);

      if (selectedWindow) {
        setWindowPosition(selectedWindow, offsetPoint);
        setWindowRotation(selectedWindow, rotation);
        useWindowStore.getState().updateWindow(selectedWindow, {
          disableTiling: true,
          position: offsetPoint,
          rotation: rotation,
        });
      }
    },
    [setWindowPosition, setWindowRotation, selectedWindow]
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_2.geometry}
          material={materials.Material}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_3.geometry}
          material={materials["Material.002"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_4.geometry}
          material={materials["Material.003"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_6.geometry}
          material={materials.krzeslo_1}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_7.geometry}
          material={materials.krzeslo_okno}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_8.geometry}
          material={materials.krzeslo_prawe}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_9.geometry}
          material={materials.krzeslo_srodek}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_10.geometry}
          material={materials.podloga}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_11.geometry}
          material={materials.sciana_okno}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_12.geometry}
          material={materials["stolik.001"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_16.geometry}
          material={materials["Material.006"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_5.geometry}
          material={materials["Material.004"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          // @ts-ignore
          geometry={nodes.Object_13.geometry}
        >
          <meshStandardMaterial transparent opacity={0.5} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_14.geometry}
          material={materials["Material.002"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_15.geometry}
          material={materials["Material.005"]}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_17.geometry}
          material={materials.mata}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Object_18.geometry}
          material={materials.stolik}
          onClick={handleClick}
          pointerEventsType={{ deny: ["grab", "touch"] }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/room-transformed.glb");
