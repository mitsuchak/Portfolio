import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const { scene } = useGLTF("./planet/scene.gltf");

  // Safety check for scene and position attribute
  if (!scene) {
    console.error("Model loading failed or returned empty scene");
    return null;
  }

  // Check if the model's position is valid, and set default position if NaN
  const { position } = scene;

  if (isNaN(position.x) || isNaN(position.y) || isNaN(position.z)) {
    console.warn("Invalid position data found, setting to default.");
    position.set(0, 0, 0);  // Set to default position if NaN
  }

  return (
    <primitive object={scene} scale={2.5} position={position} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
