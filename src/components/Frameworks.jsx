import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "git",
    "html5",
    "javascript",
    "react",
    "tailwindcss",
    "vitejs",
    "threejs",
  ];
  return (
    <div className="relative flex h-[12rem] sm:h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={30} radius={80}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={20} radius={50} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
