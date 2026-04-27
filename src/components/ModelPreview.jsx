
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { PixelLabsModel } from "./PixelLabsModel";
import { BannerModel } from "./BannerModel";
import Loader from "./Loader";

export default function ModelPreview() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#222" }}>
      <h2 style={{ color: "white", textAlign: "center", marginTop: 20 }}>PixelLabs Model</h2>
      <Canvas camera={{ position: [0, 0.5, 4.5], fov: 45 }} style={{ width: "100vw", height: "45vh" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 6, 3]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <Suspense fallback={<Loader />}>
          <PixelLabsModel scale={1.2} position={[0, -0.5, 0]} />
          <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={5} blur={2.5} far={1.5} />
        </Suspense>
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 1.9} minPolarAngle={0} />
      </Canvas>
      <h2 style={{ color: "white", textAlign: "center", marginTop: 40 }}>Banner Model</h2>
      <Canvas camera={{ position: [0, 0.5, 4.5], fov: 45 }} style={{ width: "100vw", height: "45vh" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 6, 3]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <Suspense fallback={<Loader />}>
          <BannerModel scale={1.2} position={[0, -0.5, 0]} />
          <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={5} blur={2.5} far={1.5} />
        </Suspense>
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 1.9} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}
