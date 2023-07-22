export const layoutConfig = {
  desktop: {
    gamePlay: {
      camera: {
        minZoom: 0.9,
        maxZoom: 1,
      },
      startModal: {
        fontSize: "35px",
        copyText: {
          fontSize: "30px",
        },
        copyButton: {
          y: 20,
        },
        timer: {
          fontSize: "100px",
        },
      },
      gameIndicators: {
        userText: {
          fontSize: "30px",
        },
      },
      gamePlayButton: {
        width: 200,
        height: 80,
        fontSize: "23px",
      },
      doorButton: {
        x: 2,
      },
      heart: {
        y: 10,
      },
      finishModal: {
        title: {
          fontSize: "70px",
        },
        text: {
          fontSize: "40px",
        },
      },
    },
    menuButton: {
      width: 300,
      height: 90,
      fontSize: "23px",
    },
    creaeteButton: {
      y: 5,
    },
    joinButton: {
      y: 10,
    },
    backButton: {
      width: 110,
      height: 110,
    },
    characterOptionsModal: {
      title: {
        y: 12,
        fontSize: "23px",
      },
      boy: {
        scale: 1,
        x: 4,
      },
      girl: {
        scale: 1,
        x: 4,
      },
    },
    roomListModal: {
      title: {
        fontSize: "23px",
        y: 30,
      },
      modalElement: {
        width: "530px",
        height: "450px",
      },
      joinButton: {
        x: 50,
      },
    },
  },
  mobile: {
    gamePlay: {
      camera: {
        minZoom: 0.6,
        maxZoom: 0.5,
      },
      startModal: {
        fontSize: "17px",
        copyText: {
          fontSize: "20px",
        },
        copyButton: {
          y: 15,
        },
        timer: {
          fontSize: "45px",
        },
      },
      gameIndicators: {
        userText: {
          fontSize: "23px",
        },
      },
      gamePlayButton: {
        width: 150,
        height: 50,
        fontSize: "15px",
      },
      doorButton: {
        x: 60,
      },
      heart: {
        y: 14,
      },
      finishModal: {
        title: {
          fontSize: "40px",
        },
        text: {
          fontSize: "17px",
        },
      },
    },
    menuButton: {
      width: 200,
      height: 60,
      fontSize: "18px",
    },
    creaeteButton: {
      y: 10,
    },
    joinButton: {
      y: 10,
    },
    backButton: {
      width: 60,
      height: 60,
    },
    characterOptionsModal: {
      title: {
        y: 20,
        fontSize: "20px",
      },
      boy: {
        scale: 0.6,
        x: 8,
      },
      girl: {
        scale: 0.6,
        x: 8,
      },
    },
    roomListModal: {
      title: {
        fontSize: "18px",
        y: 40,
      },
      modalElement: {
        width: "50vw",
        height: "70vh",
      },
      joinButton: {
        x: 84,
      },
    },
  },
};

export const screenSize = () => {
  if (window.innerWidth >= 1000) return layoutConfig.desktop;
  if (window.innerWidth < 1000) return layoutConfig.mobile;

  return layoutConfig.desktop;
};
