/** 全局游戏管理类 */

var GlobalManager = Class.extend({
    // init是构造函数
    init: function() {
        this.zombieList = new Array(50);
        log.log("=== GlobalManager init...");
        this.inGame = true;
        this.isDebug = false;
		
		for (i = 0; i < this.zombieList.length; i++) {
			var z = new Zombie(i);
	        z.dir = Math.round(Math.random() * Math.PI * 2 * 10000);
			this.zombieList[i] = z;
		}
    },
    /** 开始游戏 */
    start: function() {
        log.log("=== game start...");
        
        /** 建立事件循环和绘图循环 */
        this.eventIntervalId = setInterval(this.eventLoop, CPS_TIME);
        this.drawIntervalId = setInterval(this.drawLoop, FPS_TIME);
		this.newGame();
    },
	newGame: function() {
		this.newFPlayer();
	},
	newFPlayer: function() {
		this.fPlayer = new Player(0,"f");
		this.fPlayer.newLife();
	},
	newWPlayer: function() {
		this.wPlayer = new Player(1,"w");
		this.wPlayer.newLife();
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
        for (var z in this.zombieList ) {
			if(this.zombieList[z].isLive == false ) {
				continue;
			}
            this.zombieList[z].neighborList.length = 0;
            this.zombieList[z].nearZombie	= null;
			this.zombieList[z].aim			= null;
			
			if ( this.fPlayer.isLive && this.fPlayer.superMan == false ) {
				this.playerWithZombie( this.zombieList[z], this.fPlayer );
			}
			if ( this.wPlayer != null && this.wPlayer.isLive 
				&& this.wPlayer.superMan == false ) {
				this.playerWithZombie( this.zombieList[z], this.wPlayer );
			}
        }

		/** 计算临近僵尸和近距离僵尸 */
        // for (var z1 in this.zombieList ) {
        //     for (var z2 in this.zombieList ) {
        //         tmp_manager_distance = distance(this.zombieList[z1], this.zombieList[z2])
        //         if (tmp_manager_distance < EYESHOT_RANGE) {
        //             this.zombieList[z1].neighborList.push(this.zombieList[z2]);
        //             this.zombieList[z2].neighborList.push(this.zombieList[z1]);
        //             if (tmp_manager_distance < NEAR_RANGE) {
        //                 if (this.nearZombie == null || tmp_manager_distance < distance(this.zombieList[z1], this.nearZombie)) {
        //                     this.zombieList[z1].nearZombie = this.zombieList[z2];
        //                     this.zombieList[z2].nearZombie = this.zombieList[z1];
        //                 }
        //             }
        //         }
        //     }
        // }
		for (i = 0; i < this.zombieList.length; i++) {
			if(this.zombieList[i].isLive == false ) {
				continue;
			}
		            for (j = i + 1; j < this.zombieList.length; j++) {
						if(this.zombieList[j].isLive == false ) {
							continue;
						}
		                tmp_manager_distance = distance(this.zombieList[i], this.zombieList[j])
		                if (tmp_manager_distance < EYESHOT_RANGE) {
		                    this.zombieList[i].neighborList.push(this.zombieList[j]);
		                    this.zombieList[j].neighborList.push(this.zombieList[i]);
		                    if (tmp_manager_distance < NEAR_RANGE) {
		                        if (this.nearZombie == null || tmp_manager_distance < distance(this.zombieList[i], this.zombieList[i].nearZombie)) {
		                            this.zombieList[i].nearZombie = this.zombieList[j];
		                            this.zombieList[j].nearZombie = this.zombieList[i];
		                        }
		                    }
		                }
		            }
		        }
		// for (var z in this.zombieList ) {
		// 	this.zombieList[z].findNeighborList();
		// }
		

        //处理 player event loop
        if (this.fPlayer.isLive == true) {
            this.fPlayer.eventLoop(lostTime);
        }
		if (this.wPlayer != null && this.wPlayer.isLive == true) {
            this.wPlayer.eventLoop(lostTime);
        }

        // TODO 优化多次使用的计算参数
        //处理 zombie event loop
        for (var z in this.zombieList ) {
			if (this.zombieList[z].isLive) {
            	this.zombieList[z].eventLoop(lostTime);
			}
        }

    },

	playerWithZombie: function( oneZombie, player ){
		
		var theDist = distance(player, oneZombie);
		
		if ( theDist < EYESHOT_RANGE ) {
			//TODO 判断 eyeshot angle
			if (oneZombie.aim == null) {
				oneZombie.findingAim( player );
			}
			else {
				var oldDist = distance(oneZombie.aim, oneZombie);
				if (theDist < oldDist) {
					oneZombie.findingAim( player );
				}
			}
			
		}
		
		
		//如果这个僵尸碰到 zombie, player 就挂掉啦
		if ( theDist 
			< RADIUS_ZOMBIE + RADIUS_PLAYER ) {
			player.ohDie();
		}
		
	},

    drawLoop: function() {
        fpsNewTime = new Date().getTime();

  		gm.execDrawLoop();

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
	execDrawLoop: function() {
		cx.clearRect(0, 0, 960, 640);
        cx.save();
        // 绘制 zombie 视野
        for (var z in this.zombieList ) {
			if (this.zombieList[z].isLive) {
            	this.zombieList[z].drawLoopEyeshot();
			}
        }

        //绘制 zombie 身体
        cx.strokeStyle = HSLA_ZOMBIE_STROKE;
        cx.fillStyle = HSLA_ZOMBIE_FILL;
        cx.beginPath();
        for (var z in this.zombieList ) {
            //this.zombieList[i].drawLoop();
			if (this.zombieList[z].isLive) {
				this.zombieList[z].drawLoopBody();
			}
            
        }
        cx.closePath();
        cx.fill();
        cx.stroke();

        if (this.isDebug) {
            //绘制 dembie debug
            cx.strokeStyle = HSLA_DEBUG_CENTER_POINT;
            cx.beginPath();
            for (var z in this.zombieList ) {
				if (this.zombieList[z].isLive) {
                	this.zombieList[z].drawLoopDebugCenter();
				}
            }
            cx.closePath();
            cx.stroke();

            cx.strokeStyle = HSLA_DEBUG_MATCH_DIR;
            cx.beginPath();
            for (var z in this.zombieList ) {
				if(this.zombieList[z].isLive == false ) {
					continue;
				}
				if (this.zombieList[z].centerPoint.dir != this.zombieList[z].dir) {
					this.zombieList[z].drawLoopDebugDir();
				}
            }
            cx.closePath();
            cx.stroke();

			cx.strokeStyle = HSLA_DEBUG_AIM_DIR;
            cx.beginPath();
			
            for (var z in this.zombieList ) {
				if(this.zombieList[z].isLive == false ) {
					continue;
				}
				if (this.zombieList[z].aim != null) {
					this.zombieList[z].drawLoopDebugAim();
				}
            }
            cx.closePath();
            cx.stroke();

        }

        //
        //绘制 player
        if (this.fPlayer.isLive == true) {
            this.fPlayer.drawLoop();
        }
		if (this.wPlayer != null && this.wPlayer.isLive == true) {
            this.wPlayer.drawLoop();
        }

        cx.restore();
	},

    end: function() {
        log.log("=== game end...");
        window.clearInterval(this.intervalId);
    },
    fRestart: function() {
        this.newFPlayer();
		playerLifeSet("f",3);
		$("#f_player_score").html("0");
        audioRestart.load();
        audioRestart.play();
    },
    wRestart: function() {
        this.newWPlayer();
		playerLifeSet("w",3);
		$("#w_player_score").html("0");
        audioRestart.load();
        audioRestart.play();
    },
    pause: function() {
        this.inGame = this.inGame ? false : true;
        audioPu.load();
        audioPu.play();
    },
    addZombie: function() {

        
		var idx = 0;
		for (idx=0; idx<50; idx++) {
			if(this.zombieList[idx].isLive == false) {
				break;
			}
		}
        this.zombieList[idx].isLive = true;
		this.zombieList[idx].hp = 1000;
		this.zombieList[idx].x	= 480;
		this.zombieList[idx].y	= 320;
		zombieCount ++;
        infoZombieList.innerText = zombieCount;
        log.log("add a zombie..." + zombieCount);
        audioPu.load();
        audioPu.play();
    },
    clearZombie: function() {
        for (i = 0; i < this.zombieList.length; i++) {
			this.zombieList[i].isLive = false;
		}
		zombieCount = 0;
        infoZombieList.innerText = 0;
        log.log("clear all zombie...");
        audioPu.load();
        audioPu.play();
    },
    
    /** debug 开关 */
    toggleDebug: function() {
    	$("#info_bar").toggle(1000);
        this.isDebug = this.isDebug ? false : true;
        audioPu.load();
        audioPu.play();
    },
	oneZombieDie: function(id) {
		this.zombieList[id].isLive = false;
	}
});

var zombieCount=0;
var tmp_manager_distance = 0;
var tmp_manager_distance_min = 0;
