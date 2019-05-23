const initScene = {
    preload: function () {
        console.log("start loading ...");
        this.numbersJson = require('../json/numbers.json');

        this.load.image('bg', './img/holes-bg.png');
        this.load.image('hamster', './img/hamster.png');
        this.load.image('hammer', './img/hammer.png');
        this.load.image('lightning', './img/lightning.png');
        this.load.atlas('sprite_numbers', './img/numbers.png', this.numbersJson);

        this.load.on('complete', loadProgress);

        function loadProgress(loader, finishedNum) {
            console.log(`${finishedNum}个资源加载完毕，可以开始游戏了！`);
            $(".cjy_panel .start_btn").click(function () {
                // 移除开始界面
                $(".cjy_panel").hide();
                customGame.scene.start('play');
            })
        }
    }
}

module.exports = initScene;