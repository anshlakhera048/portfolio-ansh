import SingularityScene from "./SingularityScene";
import AbyssScene from "./AbyssScene";
import EmberScene from "./EmberScene";
import BloomScene from "./BloomScene";

/* Lazy-loaded hero 3D backdrop — dispatches to the active theme's scene.
   Mounts only when Hero asks for it, so three.js never touches the initial bundle. */
const SCENES = {
  singularity: SingularityScene,
  abyss: AbyssScene,
  ember: EmberScene,
  bloom: BloomScene,
};

export default function ParticleField({ theme = "ember", compact = false }) {
  const Scene = SCENES[theme] || SingularityScene;
  return <Scene compact={compact} />;
}
