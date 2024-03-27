import { useEffect } from "react";
import { setupViewer, disposeViewer } from "../webgi/viewer";

export default function Webgi() {
  
  useEffect(() => {
    setupViewer();
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
