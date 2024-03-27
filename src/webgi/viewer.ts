import { ViewerApp, addBasePlugins, AssetManagerPlugin,SSAOPlugin, SSRPlugin, BloomPlugin, AssetImporter} from "webgi";

let viewer: ViewerApp;

export async function setupViewer() {
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
}

export function disposeViewer() {
  viewer.scene.disposeSceneModels();
  viewer.scene.dispose();
  viewer.renderer.dispose();
  viewer.dispose();
}

