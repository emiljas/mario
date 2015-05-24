interface ISoundLoader {
  promise: Promise<void>;
  play(): void;
}

export = ISoundLoader;
