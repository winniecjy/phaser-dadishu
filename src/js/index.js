require('../css/reset.scss');
require('../css/common.scss');
require('../css/index.scss');

var initFn = require('./initFn'),
  play = require('./play');

function startGame() {
  $(".cjy_panel .start_btn").click(function () {
    console.log("开始游戏！");
    // 移除开始界面
    $(".cjy_panel").hide();
    customGame.state.start('play');
  })
}

window.customGame = new Phaser.Game(750, 750 / window.innerWidth * window.innerHeight, Phaser.CANVAS, 'container', initFn);
customGame.state.add('play', play);
customGame.state.start('init');
startGame();