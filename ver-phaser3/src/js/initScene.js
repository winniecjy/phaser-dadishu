const initScene = {
    preload: function () {
        console.log("start loading ...");
        this.numbersJson = require('../json/numbers.json');
        
        this.load.image('bg', './img/holes-bg.png');
        this.load.image('hamster', './img/hamster.png');
        this.load.image('hammer', './img/hammer.png');
        this.load.image('lightning', './img/lightning.png');
        this.load.atlas('sprite_numbers', './img/numbers.png', this.numbersJson);

        this.load.on('filecomplete', loadProgress);

        function loadProgress(progress, cacheKey, success, totalLoaded, totalFIles) {
            console.log(cacheKey + " is loaded.");
        }
    },
    create: function () {
        
    }
}

module.exports = initScene;