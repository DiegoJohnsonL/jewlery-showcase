import { useEffect, useState } from "react";
import { setupViewer, disposeViewer } from "../webgi/viewer";
import { Color } from "three";

export default function Webgi({ diamondColor, silverColor } : { diamondColor: string, silverColor: string}) {
  
  const [diamondObjects, setDiamondObjects] = useState<any[]>([])
  const [silver, setSilver] = useState<any>()
  const [gold, setGold] = useState<any>()

  useEffect(() => {
    diamondObjects.forEach((diamond) => {
      diamond.material.color = new Color(diamondColor);
      console.log(diamond)
    })
  }, [diamondColor]);

  useEffect(() => {
    const color = Number(silverColor.replace("#", "0x"));
    silver.material.color = new Color(color);
    // gold.material.color = new Color(color);
  }, [silverColor]);

  useEffect(() => {
    setupViewer({ setDiamondObjects, setSilver, setGold});
    return () => {
      disposeViewer();
    };
  }, []);

  return (
    <div id="webgi-canvas-container" className="h-full w-full">
      <canvas id="webgi-canvas" className="h-full w-full">
      </canvas>
    </div>
  );
}
