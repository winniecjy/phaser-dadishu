const initFn = {
    preload: function () {
        console.log("start loading ...");
        this.numbersJson = require('../json/numbers.json');
        console.log(window.customGame)

        window.customGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        window.customGame.stage.backgroundColor = '#f9c04c';

        window.customGame.load.image('bg', './img/holes-bg.png');
        window.customGame.load.image('hamster', './img/hamster.png');
        window.customGame.load.image('hammer', './img/hammer.png');
        window.customGame.load.image('lightning', './img/lightning.png');
        window.customGame.load.atlasJSONHash('sprite_numbers', './img/numbers.png', '', this.numbersJson);

        window.customGame.load.onLoadComplete.add(loadProgress, this);

        function loadProgress() {
            console.log('资源加载完毕，可以开始游戏啦！')
            $(".cjy_panel .start_btn").click(function () {
                console.log("开始游戏！");
                // 移除开始界面
                $(".cjy_panel").hide();
                customGame.state.start('play');
            })
        }
    },
    create: function () {

    }
}

module.exports = initFn;