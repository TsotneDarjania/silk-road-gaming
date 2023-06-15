import layoutConfig from "../config/layoutConfig.json";

export const screenSize = () => {
  if (window.innerWidth >= 900) return layoutConfig.computer;
  if (window.innerWidth < 900) return layoutConfig.mobile;

  return layoutConfig.computer;
};
