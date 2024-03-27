import { ViewerApp, addBasePlugins, AssetManagerPlugin,SSAOPlugin, SSRPlugin, BloomPlugin, AssetImporter, Mesh, BufferGeometry, Material} from "webgi";

let viewer: ViewerApp;

// const diamondsObjectNames = [
//   'diamonds',
//   'diamonds001',
//   'diamonds002',
//   'diamonds003',
//   'diamonds004',
//   'diamonds005',
// ]

const diamondsObjectNames2 = [
  'Object'
]

export async function setupViewer({setDiamondObjects, setSilver, setGold} : {setDiamondObjects: React.Dispatch<React.SetStateAction<any[]>>, setSilver: React.Dispatch<React.SetStateAction<any>>, setGold: React.Dispatch<React.SetStateAction<any>>}) {
  viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
    // useGBufferDepth: true,
    isAntialiased: false,
  });

  viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

  //@ts-ignore
  await addBasePlugins(viewer);
  //@ts-expect-error - AssetManagerPlugin is not recognized as a plugin type
  const manager = await viewer.getPlugin(AssetManagerPlugin);
  //@ts-ignore
  const importer = manager.importer as AssetImporter;
  //@ts-ignore
  const ssr = viewer.getPlugin(SSRPlugin);
  //@ts-ignore
  const ssao = viewer.getPlugin(SSAOPlugin);
  //@ts-ignore
  const bloom = viewer.getPlugin(BloomPlugin);
  //@ts-ignore
  ssr!.passes.ssr.passObject.lowQualityFrames = 0;
  //@ts-ignore
  bloom.pass!.passObject.bloomIterations = 2;
  //@ts-ignore
  ssao.passes.ssao.passObject.material.defines.NUM_SAMPLES = 4;

  viewer.renderer.refreshPipeline();

  //@ts-expect-error - AssetManagerPlugin is not recognized as a plugin type
  const models = await manager.addFromPath("/ring3_webgi.glb");
  let ring: Mesh<BufferGeometry, Material>, gold: Mesh<BufferGeometry, Material>, silver: Mesh<BufferGeometry, Material>
  let diamondObjects: any[] = []

  ring = viewer.scene.findObjectsByName('ring-compare')[0] as any as Mesh<BufferGeometry, Material>
  silver = viewer.scene.findObjectsByName('alliance')[0] as any as Mesh<BufferGeometry, Material>
  gold = viewer.scene.findObjectsByName('entourage')[0] as any as Mesh<BufferGeometry, Material>
  for (const obj of diamondsObjectNames2) {
      const o = viewer.scene.findObjectsByName(obj)[0]
      diamondObjects.push(o)
  }
  setDiamondObjects(diamondObjects)
  setSilver(silver)
  setGold(gold)
  ring.rotation.set(Math.PI/2, 0.92, 0)

}

export function disposeViewer() {
  viewer.scene.disposeSceneModels();
  viewer.scene.dispose();
  viewer.renderer.dispose();
  viewer.dispose();
}

