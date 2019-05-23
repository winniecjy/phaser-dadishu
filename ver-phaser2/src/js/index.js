require('../css/reset.scss');
require('../css/common.scss');
require('../css/index.scss');

var initFn = require('./initFn'),
  play = require('./play');

window.customGame = new Phaser.Game(750, 750 / window.innerWidth * window.innerHeight, Phaser.CANVAS, 'container', initFn);
customGame.state.add('play', play);
customGame.state.start('init');
