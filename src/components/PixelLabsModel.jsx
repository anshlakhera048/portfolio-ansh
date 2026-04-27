import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function PixelLabsModel(props) {
  const group = useRef();
  const { scene } = useGLTF("/models/pixellabs-glb-3350.glb");
  return <primitive ref={group} object={scene} {...props} />;
}
useGLTF.preload("/models/pixellabs-glb-3350.glb");
