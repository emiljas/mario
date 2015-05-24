define(["require", "exports", "bluebird", "./Game", "./ImageLoader", "./ScaleType", "./SoundLoader"], function (require, exports, Promise, Game, ImageLoader, ScaleType, SoundLoader) {
    function loadAssets() {
        Game.assets.potterSprite = ImageLoader.load("assets/potter.png", 0.3, ScaleType.ToHeight);
        Game.assets.hedgehog1Sprite = ImageLoader.load("assets/hedgehog1.png", 0.1, ScaleType.ToWidth);
        Game.assets.hedgehog2Sprite = ImageLoader.load("assets/hedgehog2.png", 0.1, ScaleType.ToWidth);
        Game.assets.flyingHedgehogSprite = ImageLoader.load("assets/flyingHedgehog.png", 0.1, ScaleType.ToWidth);
        Game.assets.appleSprite = ImageLoader.load("assets/apple.png", 0.1, ScaleType.ToWidth);
        Game.assets.wandSound = SoundLoader.load("assets/wand.mp3");
        Game.assets.hedgehogStep1Sound = SoundLoader.load("assets/step1.mp3");
        Game.assets.hedgehogStep2Sound = SoundLoader.load("assets/step2.mp3");
        return Promise.all([
            Game.assets.potterSprite.promise,
            Game.assets.hedgehog1Sprite.promise,
            Game.assets.hedgehog2Sprite.promise,
            Game.assets.flyingHedgehogSprite.promise,
            Game.assets.appleSprite.promise,
            Game.assets.wandSound.promise,
            Game.assets.hedgehogStep1Sound.promise,
            Game.assets.hedgehogStep2Sound.promise
        ]);
    }
    return loadAssets;
});
