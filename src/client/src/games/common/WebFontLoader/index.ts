import Phaser from "phaser";

/**
 * Extend Namespace to support TS
 */
declare global {
  namespace Phaser.Loader {
    interface LoaderPlugin {
      webFont(
        key: string,
        url: string,
        descriptors?: FontFaceDescriptors
      ): void;
    }
  }
}

/**
 * Custom loader to load Web fonts in Phaser way
 */
class WebFontFile extends Phaser.Loader.File {
  private font?: FontFace;
  constructor(
    loader: Phaser.Loader.LoaderPlugin,
    key: string,
    url: string,
    private descriptors?: FontFaceDescriptors
  ) {
    super(loader, {
      type: "webfont",
      key,
      url,
    });
  }

  load(): void {
    /**
     * Create Font Face and Start loading it
     */
    this.font = new FontFace(
      this.key,
      `url(${Phaser.Loader.GetURL(this, this.loader.baseURL)})`,
      this.descriptors
    );
    this.font
      .load()
      .then(() => this.onLoad())
      .catch((err) => {
        console.log(err);
        this.onError();
      });
  }

  onError(): void {
    this.loader.nextFile(this, false);
  }

  onLoad(): void {
    document.fonts.add(this.font!);
    this.loader.nextFile(this, true);
  }
}

/**
 * Register loader
 */
Phaser.Loader.FileTypesManager.register(
  "webFont",
  function (
    this: Phaser.Loader.LoaderPlugin,
    key: string,
    url: string,
    descriptors?: FontFaceDescriptors
  ) {
    this.addFile(new WebFontFile(this, key, url, descriptors));
  }
);
