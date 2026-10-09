import { createContext } from "react";

export const THEMES = ["ember", "abyss", "singularity"];
export const DEFAULT_THEME = "ember";

export const THEME_META = {
  singularity: { label: "Singularity", hint: "Black hole · red/purple" },
  abyss: { label: "Abyss", hint: "Deep ocean · cyan/teal" },
  ember: { label: "Ember", hint: "Supernova · amber/orange" },
};

export const ThemeContext = createContext(null);
