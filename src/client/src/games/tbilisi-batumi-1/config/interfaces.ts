export interface MapInformationIconData {
  x: number;
  y: number;
  text: Array<string>;
}
export interface BombsData {
  x: number;
  y: number;
}
export interface SaveZonesData {
  x: number;
  y: number;
  icon: string;
  text: Array<string>;
  index: number;
}
export interface StarsData {
  x: number;
  y: number;
  count: number;
}
export interface MusicIconsData {
  x: number;
  y: number;
  key: string;
  text: Array<string>;
  musicKey: string;
}
export interface AngelsData {
  x: number;
  y: number;
  text: Array<string>;
}
export interface RussianSoldierData {
  x: number;
  y: number;
}
export interface MonsterData {
  x: number;
  y: number;
  jumpStrong: number;
}
export interface EvilFaceData {
  x: number;
  y: number;
  animationDuration: number;
  animationPosY: number;
}

export interface Responsivedata {
  computer: DeviceLayout;
  mobile: DeviceLayout;
}

interface DeviceLayout {
  canvas: {
    width: number;
    height: number;
  };
  gameMenu: {
    menuIcon: {
      positions: {
        x: number;
        y: number;
      };
      scale: number;
    };
    speedometer: {
      positions: {
        y: number;
      };
    };
    speedometerArrow: {
      positions: {
        y: number;
      };
    };
    radioLeftButtons: {
      positions: {
        x: number;
        y: number;
      };
      scale: number;
    };
    radioRightButtons: {
      positions: {
        x: number;
        y: number;
      };
      scale: number;
    };
  };
  menu: {
    touchScreenText: {
      text: Array<string>;
      fontSize: number;
    };
    plug: {
      positions: {
        x: number;
        y: number;
      };
      scale: {
        width: number;
        height: number;
      };
    };
    playButton: {
      positions: {
        x: number;
        y: number;
      };
      scale: number;
    };
    playText: {
      fontSize: number;
    };
    informationButton: {
      positions: {
        x: number;
        y: number;
      };
      scale: number;
    };
    informationText: {
      fontSize: number;
      padding: number;
    };
  };
}
