/** 全局游戏管理类 */

var GlobalManager = Class.extend({
    // init是构造函数
    init: function() {
        this.zombieList = new Array();
        this.player = new Player();
        log.log("=== GlobalManager init...");
        this.inGame = true;
        this.isDebug = false;

    },
    /** 开始游戏 */
    start: function() {
        log.log("=== game start...");
        
        /** 建立事件循环和绘图循环 */
        this.eventIntervalId = setInterval(this.eventLoop, 20);
        this.drawIntervalId = setInterval(this.drawLoop, 20);

    },

    /** 事件处理循环 */
    eventLoop: function() {
        cpsNewTime = new Date().getTime();
        lostTime	= cpsNewTime - cpsLastTime;
        //画板显示循环间隔 lost time
        infoCTime.innerText	= lostTime;
        cps++;

        if (gm.inGame == true) {
            //判断临近邻居
            gm.execEventLoop(lostTime);
        }

        //计算绘图循环帧率
        if (cpsNewTime - cpsSecondTime >= 1000) {
            infoCps.innerText = fps;
            cpsSecondTime = cpsNewTime;
            cps = 0;
        }
        

        cpsLastTime = cpsNewTime;
    },
		/** 运行 event loop */
    execEventLoop: function(lostTime) {
				
		/** zombie 矩阵查找过程 初始化 */
        for (i = 0; i < this.zombieList.length; i++) {
            this.zombieList[i].neighborList.length = 0;
            this.zombieList[i].nearZombie	= null;
			this.zombieList[i].aim			= null;
			
			if ( this.player.isLive ) {
				this.playerWithZombie( this.zombieList[i] );
			}
        }

				/** 计算临近僵尸和近距离僵尸 */
        for (i = 0; i < this.zombieList.length; i++) {
            for (j = i + 1; j < this.zombieList.length; j++) {
                tmp_manager_distance = distance(this.zombieList[i], this.zombieList[j])
                if (tmp_manager_distance < EYESHOT_RANGE) {
                    this.zombieList[i].neighborList.push(this.zombieList[j]);
                    this.zombieList[j].neighborList.push(this.zombieList[i]);
                    if (tmp_manager_distance < EYESHOT_RANGE / 4) {
                        if (this.nearZombie == null || tmp_manager_distance < distance(this.zombieList[i], this.nearZombie)) {
                            this.zombieList[i].nearZombie = this.zombieList[j];
                            this.zombieList[j].nearZombie = this.zombieList[i];
                        }
                    }
                }
            }
        }

        //处理 player event loop
        if (this.player.isLive == true) {
            this.player.eventLoop(lostTime);
        }

        // TODO 优化多次使用的计算参数
        //处理 zombie event loop
        for (i = 0; i < this.zombieList.length; i++) {
            this.zombieList[i].eventLoop(lostTime);
        }

    },

	playerWithZombie: function( zombie ){
		
		var theDist = distance(this.player, zombie);
		
		if ( theDist < EYESHOT_RANGE ) {
			//TODO 判断 eyeshot angle
			zombie.findingAim( this.player );
		}
		
		
		//如果这个僵尸碰到 zombie, player 就挂掉啦
		if ( theDist 
			< RADIUS_ZOMBIE + RADIUS_PLAYER ) {
				this.ohDie();
		}
	},

    drawLoop: function() {
        fpsNewTime = new Date().getTime();

        cx.clearRect(0, 0, 960, 640);
        cx.save();

        // 绘制 zombie 视野
        for (i = 0; i < gm.zombieList.length; i++) {
            gm.zombieList[i].drawLoopEyeshot();
        }

        //绘制 zombie 身体
        cx.strokeStyle = HSLA_ZOMBIE_STROKE;
        cx.fillStyle = HSLA_ZOMBIE_FILL;
        cx.beginPath();
        for (i = 0; i < gm.zombieList.length; i++) {
            //gm.zombieList[i].drawLoop();
            gm.zombieList[i].drawLoopBody();
        }
        cx.closePath();
        cx.fill();
        cx.stroke();

        if (gm.isDebug) {
            //绘制 dembie debug
            cx.strokeStyle = HSLA_DEBUG_CENTER_POINT;
            cx.beginPath();
            for (i = 0; i < gm.zombieList.length; i++) {
                gm.zombieList[i].drawLoopDebugCenter();
            }
            cx.closePath();
            cx.stroke();

            cx.strokeStyle = HSLA_DEBUG_MATCH_DIR;
            cx.beginPath();
            for (i = 0; i < gm.zombieList.length; i++) {
                gm.zombieList[i].drawLoopDebugDir();
            }
            cx.closePath();
            cx.stroke();
        }

        //
        //绘制 player
        if (gm.player.isLive == true) {
            gm.player.drawLoop();
        }

        cx.restore();

        //计算绘图循环帧率
        if (fpsNewTime - fpsSecondTime >= 1000) {
            infoFps.innerText = fps;
            fpsSecondTime = fpsNewTime;
            fps = 0;
        }
        fps++;

        infoFTime.innerText = new Date().getTime() - fpsNewTime;
        fpsLastTime = fpsNewTime;
    },

    end: function() {
        log.log("=== game end...");
        window.clearInterval(this.intervalId);
    },

    ohDie: function() {
        log.log("die");
        this.player.isLive = false;
        audioDie.load();
        audioDie.play();
    },
    restart: function() {
        this.player.isLive = true;
        audioRestart.load();
        audioRestart.play();
    },
    pause: function() {
        this.inGame = this.inGame ? false : true;
        audioPu.load();
        audioPu.play();
    },
    addZombie: function() {

        var z = new Zombie(2);
        z.dir = Math.round(Math.random() * Math.PI * 2 * 10000);
        this.zombieList[this.zombieList.length] = z;
        infoZombieList.innerText = this.zombieList.length;
        log.log("add a zombie..." + this.zombieList.length);
        audioPu.load();
        audioPu.play();
    },
    clearZombie: function() {
        this.zombieList.length = 0;
        infoZombieList.innerText = 0;
        log.log("clear all zombie...");
        audioPu.load();
        audioPu.play();
    },
    
    /** debug 开关 */
    toggleDebug: function() {
        this.isDebug = this.isDebug ? false : true;
        audioPu.load();
        audioPu.play();
    }
});

var tmp_manager_distance = 0;
var tmp_manager_distance_min = 0;
