require('../css/reset.scss');
require('../css/common.scss');
require('../css/index.scss');


var Phaser = require('phaser'),
  initScene = require('./initScene'),
  play = require('./play');


let gameConf = {
  width: 750,
  height: 750 / window.innerWidth * window.innerHeight,
  type: Phaser.CANVAS,
  parent: 'container',
  backgroundColor: '#f9c04c',
  scale: {
    mode: Phaser.Scale.FIT
  },
  scene: initScene
};

window.customGame = new Phaser.Game(gameConf);
window.customGame.scene.add('play', play);
$(".cjy_panel .start_btn").click(function () {
  console.log("开始游戏！");
  // 移除开始界面
  $(".cjy_panel").hide();
  customGame.scene.start('play');
})