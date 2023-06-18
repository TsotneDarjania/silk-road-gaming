import layoutConfig from "../config/layoutConfig.json";

export const screenSize = () => {
  if (window.innerWidth >= 1000) return layoutConfig.computer;
  if (window.innerWidth < 1000) return layoutConfig.mobile;

  return layoutConfig.computer;
};
