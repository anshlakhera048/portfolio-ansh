import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function BannerModel(props) {
  const group = useRef();
  const { scene } = useGLTF("/models/pixellabs-banner-3761.glb");
  return <primitive ref={group} object={scene} {...props} />;
}
useGLTF.preload("/models/pixellabs-banner-3761.glb");
