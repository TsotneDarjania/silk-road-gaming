export interface MapInformationIconData {
  x: number;
  y: number;
  text: Array<string>;
}

export const mapInformationIconsData = {
  1: {
    x: -7200,
    y: 570,
    text: [" The objective of this game is", "to safely reach Batumi. "],
  },
  3: {
    x: -20000,
    y: 650,
    text: [
      " While travelling on the road,",
      " keep an eye out for 0.50, 1",
      " and 2 lari bills that",
      " you may come across.",
      " Collecting as much money",
      " as possible can prove",
      " to be useful on certain parts",
      " of the journey",
    ],
  },
  4: {
    x: -34300,
    y: 870,
    text: ["Acceleration can be crucial", "in certain situations."],
  },
  5: {
    x: -40000,
    y: 930,
    text: [
      "Don't worry about saving",
      " your progress in the game.",
      " There will be checkpoints",
      "  throughout your journey,",
      "  and the game will automatically",
      "  save your progress as",
      "  soon as you reach",
      "  each checkpoint.",
    ],
  },
};
