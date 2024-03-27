import { Canvas} from "@react-three/fiber";
import "./App.css";
import { Suspense } from "react";
import { AccumulativeShadows, Center, Environment, MeshRefractionMaterial, OrbitControls, RandomizedLight, useEnvironment, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer, N8AO, ToneMapping } from "@react-three/postprocessing";
import * as THREE from 'three'
import Loader from "./components/loader";
import useWebgi from "./components/useWebgi";

function Ring({ frame, diamonds, env, ...props} : any) {
  const { nodes, materials } = useGLTF('/3-stone-transformed.glb') as any
  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial color={frame} roughness={0.15} metalness={1} envMapIntensity={1.5} />
      </mesh>
      <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />
      <instancedMesh castShadow args={[nodes.mesh_4.geometry, undefined, 65]} instanceMatrix={nodes.mesh_4.instanceMatrix}>
        <MeshRefractionMaterial color={diamonds} side={THREE.DoubleSide} envMap={env} aberrationStrength={0.02} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}
function FiberScene() {
  const { shadow, frame, diamonds } = { shadow: '#000000', frame: '#fff0f0', diamonds: '#ffffff' }
  const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })
   return (
    <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [-5, 5, 14], fov: 20 }}>
     <Suspense fallback={<Loader/>}>
     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <group position={[0, -0.25, 0]}>
        <Center top position={[0, -0.12, 0]} rotation={[-0.1, 0, 0.085]}>
          <Ring frame={frame} diamonds={diamonds} env={env} scale={0.1} />
        </Center>
        <AccumulativeShadows temporal frames={100} color={shadow} opacity={1.05}>
          <RandomizedLight radius={5} position={[10, 5, -5]} />
        </AccumulativeShadows>
      </group>
      <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} />
      <EffectComposer>
        <N8AO aoRadius={0.15} intensity={4} distanceFalloff={2} />
        <Bloom luminanceThreshold={3.5} intensity={0.85} levels={9} mipmapBlur />
        <ToneMapping />
      </EffectComposer>
      <Environment map={env} background blur={1} />
      </Suspense>
    </Canvas>
   );
}


function App() {
  const webdi = useWebgi()
  return (
    <div>
      <div className="w-full h-full grid grid-cols-2">
        <div className="flex flex-col">
          <p>React Three Fiber</p>
          <div id="canvas-container" className="h-full">
            <FiberScene />
          </div>
        </div>
        <div className="flex flex-col">
          <p>Webgi</p>
          <div className="h-full">
            {webdi}
          </div>
        </div>
      </div>
      <div className="footer--container">
		<div className="footer--menu">
			<ul>
				<li><img className="config--gem" alt="Config gem" width="32" height="32" src="/images/diamond.svg"/></li>
				<li><img className="config--material" alt="Config Material" width="32" height="32" src="/images/material.svg"/></li>
				<li><img className="config--ring" alt="Config Material" width="32" height="32" src="/images/ring.svg"/></li>
			</ul>
		</div>
		<div className="gem--menu">
			<ul className="colors--list">
				<li className="ruby active"><img alt="Fancy color" width="32" height="32" src="/images/ruby.svg"/></li>
				<li className="faint"><img alt="Fancy color" width="32" height="32" src="/images/faint.svg"/></li>
				<li className="fancy"><img alt="Fancy color" width="32" height="32" src="/images/fancy.svg"/></li>
				<li className="aqua"><img alt="Fancy color" width="32" height="32" src="/images/aqua.svg"/></li>
				<li className="swiss"><img alt="Fancy color" width="32" height="32" src="/images/swiss.svg"/></li>
				<li className="yellow"><img alt="Fancy color" width="32" height="32" src="/images/yellow.svg"/></li>
				<li className="orange"><img alt="Fancy color" width="32" height="32" src="/images/orange.svg"/></li>
				<li className="green"><img alt="Fancy color" width="32" height="32" src="/images/green.svg"/></li>
				<li className="emerald"><img alt="Fancy color" width="32" height="32" src="/images/emerald.svg"/></li>
				<li className="rose"><img alt="Fancy color" width="32" height="32" src="/images/rose.svg"/></li>
				<li className="violet"><img alt="Fancy color" width="32" height="32" src="/images/violet.svg"/></li>
				<li className="close-gems"><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6M9 9l6 6" stroke="#52322B" strokeLinecap="round" strokeLinejoin="round"/></svg></li>
			</ul>
		</div>
		<div className="materials--menu">
			<ul className="materials--list">
				<li className="default active"><img alt="default color" width="60" src="/images/default.png"/></li>
				<li className="silver-gold"><img alt="silver-gold" width="60" src="/images/silver_gold.png"/></li>
				<li className="silver-silver"><img alt="Fancy color" width="60" src="/images/silver_silver.png"/></li>
				<li className="gold-gold"><img alt="Fancy color" width="60" src="/images/gold_gold.png"/></li>
				<li className="rose-silver"><img alt="Fancy color" width="60" src="/images/rose_silver.png"/></li>
				<li className="gold-rose"><img alt="Fancy color" width="60" src="/images/gold_rose.png"/></li>
				<li className="rose-rose"><img alt="Fancy color" width="60" src="/images/rose_rose.png"/></li>
				<li className="close-materials"><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6M9 9l6 6" stroke="#52322B" strokeLinecap="round" strokeLinejoin="round"/></svg></li>
			</ul>
		</div>
	</div>

    </div>
  );
}

export default App;
