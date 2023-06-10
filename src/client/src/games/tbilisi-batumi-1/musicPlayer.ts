import { getRandomFloat } from "./helper/tatukaMath";
import { GamePlay } from "./scenes/gamePlay";

export default class MusicPlayer {
  georgianRadio: Array<Phaser.Sound.BaseSound> = [];
  americanRockRadio: Array<Phaser.Sound.BaseSound> = [];

  radioNumber: number = 2;
  songIndex!: number;
  radioIndex: number = 0;
  radios!: [Phaser.Sound.BaseSound[]];

  winSong!: Phaser.Sound.BaseSound;

  specialSongs: Array<Phaser.Sound.BaseSound> = [];

  constructor(public scene: GamePlay) {
    this.radioIndex = Math.floor(getRandomFloat(0, this.radioNumber - 1));

    this.init();
  }

  init() {
    this.addSongs();
    this.addRadios();
  }

  stopAllSong() {
    this.georgianRadio.forEach((song) => {
      song.stop();
    });
    this.americanRockRadio.forEach((song) => {
      song.stop();
    });
    this.specialSongs.forEach((song) => {
      song.stop();
    });
  }

  addRadios() {
    this.radios = [this.georgianRadio];
    this.radios.push(this.americanRockRadio);
  }

  addNewSong(song: string) {
    if (song === "taxi-1") {
      this.stopAllSong();
      const newSong = this.scene.sound.add("taxi-1", { volume: 0.4 });
      newSong.on("complete", () => {
        this.nextSong();
      });
      this.americanRockRadio.push(newSong);
      newSong.play();
      this.radioIndex = 1;
    }
    if (song === "gulmartali") {
      this.stopAllSong();
      const newSong = this.scene.sound.add("gulmartali", { volume: 0.7 });
      newSong.on("complete", () => {
        this.nextSong();
      });
      this.georgianRadio.push(newSong);
      newSong.play();
      this.radioIndex = 0;
    }
  }

  addSongs() {
    this.winSong = this.scene.sound.add("winSong", {
      volume: 1,
    });
    this.winSong.on("complete", () => {
      this.winSong.play();
    });

    const mtawmindaSong = this.scene.sound.add("mtawmindaSong", {
      volume: 0.1,
    });
    mtawmindaSong.on("complete", () => {
      this.nextSong();
    });

    const mtawmindaSpecialSong = this.scene.sound.add("mtawmindaSong", {
      volume: 0.1,
    });
    mtawmindaSpecialSong.on("complete", () => {
      mtawmindaSpecialSong.play();
    });

    const rusianSpecialSong = this.scene.sound.add("russianSong", {
      volume: 0.4,
    });
    rusianSpecialSong.on("complete", () => {
      rusianSpecialSong.play();
    });

    this.specialSongs.push(mtawmindaSpecialSong);

    const rock_1 = this.scene.sound.add("rock-1", { volume: 0.25 });
    rock_1.on("complete", () => {
      rock_1.play();
    });
    this.specialSongs.push(rock_1);

    const lexseni = this.scene.sound.add("lexseni", { volume: 0.2 });
    lexseni.on("complete", () => {
      this.nextSong();
    });
    this.specialSongs.push(lexseni);
    this.specialSongs.push(rusianSpecialSong);

    this.georgianRadio.push(lexseni);
    this.georgianRadio.push(mtawmindaSong);

    //American Rock Radio
    const rock_1_radio = this.scene.sound.add("rock-1", { volume: 0.4 });
    rock_1_radio.on("complete", () => {
      this.nextSong();
    });
    this.americanRockRadio.push(rock_1_radio);
  }

  playSpecialSong(index: number) {
    if (this.specialSongs[index].isPlaying === false) {
      this.specialSongs[index].play();
    }
  }

  playSong() {
    const songIndex = Math.floor(
      getRandomFloat(0, this.radios[this.radioIndex].length)
    );

    if (this.radios[this.radioIndex][songIndex].isPlaying === true) return;
    this.radios[this.radioIndex][songIndex].play();

    this.songIndex = songIndex;
  }

  nextSong() {
    if (this.radios.length - 1 >= this.songIndex + 1) {
      this.songIndex += 1;
    } else {
      this.songIndex = 0;
    }

    this.radios[this.radioIndex][this.songIndex].play();
  }

  changeRadioToUp() {
    if (this.radioIndex + 1 < this.radioNumber) {
      this.radioIndex += 1;
      this.stopAllSong();
      this.playSong();
    } else {
      this.radioIndex = 0;
      this.stopAllSong();
      this.playSong();
    }
  }

  changeRadioToDown() {
    if (this.radioIndex > 0) {
      this.radioIndex -= 1;
      this.playSong();
    } else {
      if (this.radioIndex + 1 > this.radioNumber) {
        this.radioIndex = this.radioNumber;
        this.playSong();
      }
    }
  }

  snoozeRussianSong() {
    let value = 0.4;
    const update = setInterval(() => {
      value -= 0.01;
      //@ts-ignore
      this.specialSongs[3].volume = value;
      if (value < 0) {
        this.specialSongs[3].stop();
        clearInterval(update);
      }
    }, 200);
  }
}
