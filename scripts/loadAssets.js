define(["require", "exports", "./Game", "./ImageLoader", "./ScaleType"], function (require, exports, Game, ImageLoader, ScaleType) {
    function loadAssets() {
        Game.potter = ImageLoader.load("assets/potter.png", 0.3, ScaleType.ToHeight);
        Game.hedgehog1 = ImageLoader.load("assets/hedgehog1.png", 0.1, ScaleType.ToWidth);
        Game.hedgehog2 = ImageLoader.load("assets/hedgehog2.png", 0.1, ScaleType.ToWidth);
        Game.flyingHedgehog = ImageLoader.load("assets/flyingHedgehog.png", 0.1, ScaleType.ToWidth);
        Game.apple = ImageLoader.load("assets/apple.png", 0.1, ScaleType.ToWidth);
        return ImageLoader.all([
            Game.potter, Game.hedgehog1, Game.hedgehog2,
            Game.flyingHedgehog, Game.apple
        ]);
    }
    return loadAssets;
});
