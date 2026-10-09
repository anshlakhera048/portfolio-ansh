import { createContext } from "react";

export const THEMES = ["singularity", "abyss", "ember"];
export const DEFAULT_THEME = "singularity";

export const THEME_META = {
  singularity: { label: "Singularity", hint: "Black hole · red/purple" },
  abyss: { label: "Abyss", hint: "Deep ocean · cyan/teal" },
  ember: { label: "Ember", hint: "Supernova · amber/orange" },
};

export const ThemeContext = createContext(null);
