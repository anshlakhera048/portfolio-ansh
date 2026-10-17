import { createContext } from "react";

export const THEMES = ["neon", "singularity", "ember", "abyss", "bloom"];
export const DEFAULT_THEME = "neon";

export const THEME_META = {
  neon: { label: "Neon", hint: "Cyberpunk · cyan/magenta" },
  singularity: { label: "Singularity", hint: "Black hole · red/purple" },
  ember: { label: "Ember", hint: "Supernova · amber/orange" },
  abyss: { label: "Abyss", hint: "Deep ocean · cyan/teal" },
  bloom: { label: "Bloom", hint: "Sakura · soft pink" },
};

export const ThemeContext = createContext(null);
