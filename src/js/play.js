const gameLast = 10; // 游戏时长，单位为秒
const hamsterSpeed = 1500; // 地鼠出现时长，单位为秒，初始数值
var score = 0; // 得分计算
var isHit = false; // 避免重复点击重复得分


// 地鼠的位置，第i个出现的位置(从左到右从上到下的顺序)为(2*i, 2*i+1)
const hamster_pos = [134, 245, 374, 224, 614, 258, 142, 477, 378, 477, 614, 496, 137, 737, 372, 738, 614, 738];
// 锤子的位置
// const hammer_pos = [40, 60, 280, 40, 520, 70, 43, 289, 284, 289, 520, 316, 43, 550, 278, 550, 520, 550];

const play = {
    create: function () {
        bg = customGame.add.image(customGame.world.centerX - 375, 200, 'bg');

        console.log("create");
        // 地鼠相关初始化
        this.hamster = customGame.add.sprite(-1000, -1000, 'hamster'); //  初始化地鼠
        this.showOrder = []; // 小地鼠出现位置数组
        this.showOrder[0] = Math.floor(Math.random() * 9);
        for (var i = 1; i < gameLast * 3;) {
            this.showOrder[i] = Math.floor(Math.random() * 9);
            if (this.showOrder[i] != this.showOrder[i - 1]) i++;
        }
        this.orderIndex = 0; // 地鼠出现位置数组下标初始化
        this.isShow = false; // 小地鼠当前是否出现初始化

        // 分数初始化
        score = 0;
        this.refreshScores();

        // 点击屏幕事件响应
        customGame.input.onTap.add(onTap, this);

        function onTap(pointer, doubleTap) {
            // console.log(pointer);
            // 锤子出现
            var hammerWidth = 60; // 用于将锤头横向移动到点击位置
            var hammerHeight = 35; // 用于使得锤子砸下的位置在点击位置
            var hammerx = pointer.positionDown.x - hammerWidth;
            var hammery = pointer.positionDown.y - hammerHeight;
            this.hammer = customGame.add.sprite(hammerx, hammery, 'hammer');
            this.hammer.anchor.setTo(0, 0.8);
            // 锤子旋转
            var rotateTween = customGame.add.tween(this.hammer);
            setTimeout(function () {
                rotateTween.to({
                    angle: 45
                }, 50, Phaser.Easing.Cubic.In, true);
            })
            // 锤子消失
            var fadeTween = customGame.add.tween(this.hammer);
            setTimeout(function () {
                fadeTween.to({
                    alpha: 0
                }, 10, Phaser.Easing.Linear.None, true);
            }, 350);

            // 检查錘子地鼠当前的位置是否重合
            if (!isHit) {
                var recHole = this.showOrder[this.orderIndex];
                var recHolex = hamster_pos[recHole * 2];
                var recHoley = hamster_pos[recHole * 2 + 1];
                if (Math.abs(hammerx + hammerWidth - recHolex) < 40 && hammery + hammerHeight - recHoley < 90 && hammery + hammerHeight - recHoley > -10) {
                    console.log('击中啦，来个闪电！');
                    var lightning = customGame.add.image(recHolex+30, recHoley-30, 'lightning');
                    var scared = customGame.add.tween(lightning);
                    scared.to({
                        y: recHoley-40
                    }, 100, Phaser.Easing.Back.Out, false, 0, 0, false);
                    scared.start();
                    score++;
                    isHit = true;
                    this.refreshScores();
                    var that = this;
                    let lastOrderIndex = this.orderIndex;
                    setTimeout(function () {
                        if(lastOrderIndex == that.orderIndex) {
                            that.hamster.destroy();
                        }
                        lightning.destroy();
                    }, 200);
                } else {
                    console.log('大不了从头再来~~');
                }
            }
        }

        // 倒计时
        customGame.countdown = gameLast; // 倒计时时长
        this.timerFn(); // 倒计时
        customGame.time.events.loop(Phaser.Timer.SECOND, this.timerFn, this); //利用时钟对象来重复产生管道
        customGame.time.events.start(); //先让他停止，因为即使没调用start方法，它也会自动启动，这应该是一个bug
    },
    update: function () {
        // console.log("updating!");
        if (!this.isShow && customGame.countdown > 0) {
            console.log("你的小地鼠突然出现！");
            this.isShow = true;
            var hole = this.showOrder[this.orderIndex]; // 地鼠随机位置获取
            var holex = hole * 2,
                holey = hole * 2 + 1;
            this.hamster = customGame.add.sprite(hamster_pos[holex], hamster_pos[holey], 'hamster');
            this.hamster.anchor.setTo(0.5, 0);
            var show = customGame.add.tween(this.hamster);
            var hide = customGame.add.tween(this.hamster);
            var fadeTween = customGame.add.tween(this.hamster);
            // 地鼠出现
            show.from({
                y: hamster_pos[holey] + 30
            }, 100, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
            show.start();

            let that = this;
            setTimeout(() => {
                that.orderIndex++;
                that.isShow = false;
                isHit = false;
                // 地鼠消失
                hide.to({
                    y: hamster_pos[holey] + 30
                }, 400, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
                fadeTween.to({
                    alpha: 0
                }, 400, Phaser.Easing.Cubic.Out, true);
                hide.start();
                fadeTween.start();

                // console.log(this.orderIndex);

                console.log("地鼠消失~");
            }, hamsterSpeed);
        }
    },

    /**
     * 函数作用：显示倒计时
     * 
     * @param {显示的数字} num_in 
     * @param {显示的每个数字宽度} num_w
     * @param {显示的数字位数} num_digit
     * @param {显示的位置左上角x} pos_x 
     * @param {显示的位置左上角y} pox_y 
     * @param {sprite的键值} key
     */
    changeNum: function (num_in, num_w, num_digit, pos_x, pos_y, key) {
        // 参数初始化
        if (!num_in) num_in = 0;
        if (!num_w) num_w = 100;
        var rec_digit = 0; // 当前数字位数
        var num_temp = num_in;
        while (num_temp >= 0) {
            num_temp = parseInt(num_temp / 10);
            rec_digit++;
            if (num_temp == 0) break;
        }
        if (!num_digit) num_digit = rec_digit;
        if (!pos_x) pos_x = 0;
        if (!pos_y) pos_y = 0;

        if (this.spriteArr) {
            for (var i = 0; i < this.spriteArr.length; i++) this.spriteArr[i].destroy();
        }
        this.spriteArr = [];
        var cnt = 0;
        while (num_digit > 0) { // 从左到右显示数字
            if (num_digit > rec_digit) {
                customGame.add.sprite(pos_x, pos_y, key, '00');
            } else {
                var rec_num = parseInt(num_in / Math.pow(10, num_digit - 1));
                this.spriteArr[cnt++] = customGame.add.sprite(pos_x, pos_y, key, '0' + rec_num);
                num_in = num_in % Math.pow(10, num_digit - 1);
            }
            pos_x += num_w;
            num_digit--;
        }
    },

    /**
     * 函数作用：倒计时，单位为秒
     * 
     */
    timerFn: function () {
        var that = this;
        that.changeNum(customGame.countdown, 63, 2, customGame.world.width - 63 * 2 - 70, 50, "sprite_numbers"); // 显示数字修改
        customGame.countdown--;
        if (customGame.countdown < 0) {
            customGame.time.events.stop(false);
            
            document.getElementsByClassName('cjy_popup')[0].classList = 'cjy_popup show';
        }
    },

    /**
     * 函数作用：刷新分数
     */
    refreshScores: function () {
        //设置文本样式：大小、字体、颜色、排列方向
        var textStyle = {
            font: "48px Arial",
            fill: "#543e1c",
            align: "left"
        };

        if (this.scores) this.scores.destroy();
        this.scores = customGame.add.text(70, 80, "分数：" + score, textStyle);
    }
}

module.exports = play;