import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import { Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function FiberScene() {
  const ringTwo = useGLTF("/ring2_webgi.glb");

  const meshRef = useRef<Mesh>(null!);
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <mesh ref={meshRef}>
        <primitive object={ringTwo.scene} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <OrbitControls target={[0, 0.3, 0]} />
    </>
  );
}

function WebglScene() {
  const ringOne = useGLTF("/ring_webgi.glb");

  const meshRef = useRef<Mesh>(null!);
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.4;
  });
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <mesh ref={meshRef}>
        <primitive object={ringOne.scene} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <OrbitControls target={[0, 0.3, 0]} />
    </>
  );
}

function App() {
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="flex flex-col">
        <p>React Three Fiber</p>
        <div id="canvas-container" className="h-full">
          <Canvas shadows>
            <Suspense fallback={<Loader />}>
              <FiberScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="flex flex-col">
        <p>Webgi</p>
        <div id="canvas-container" className="h-full">
          <Canvas shadows>
            <Suspense fallback={<Loader />}>
              <WebglScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
