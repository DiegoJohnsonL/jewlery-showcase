import { useEffect, useState } from "react";
import { setupViewer, disposeViewer } from "../webgi/viewer";
import { Color } from "three";

export default function Webgi({ diamondColor } : { diamondColor: string }) {
  
  const [diamondObjects, setDiamondObjects] = useState<any[]>([])

  useEffect(() => {
    diamondObjects.forEach((diamond) => {
      diamond.material.color = new Color(diamondColor);
      console.log(diamond)
    })
  }, [diamondColor]);

  useEffect(() => {
    setupViewer({ setDiamondObjects });
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
