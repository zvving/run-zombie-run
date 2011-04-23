var GlobalManager = Class.extend({
    // init是构造函数
    init: function() {
		this.zombieList	= new Array();
		this.player		= new Player();
		log.log("=== GlobalManager init..." );
		this.inGame = true;

    },
    start: function() {
		log.log("=== game start..." );
		this.eventIntervalId = setInterval( this.eventLoop , 20);
		this.drawIntervalId = setInterval( this.drawLoop , 20);
		
		
    },

	eventLoop: function () {
		cpsNewTime = new Date().getTime();
		
		if ( gm.inGame == true )  {
			//判断临近邻居
			for ( i = 0; i<gm.zombieList.length; i++ ) {
				gm.zombieList[i].neighborList.length = 0;
				gm.zombieList[i].nearZombie = null;
				
				if ( gm.player.isLive  &&
					( distance(gm.player, gm.zombieList[i])
					< RADIUS_ZOMBIE + RADIUS_PLAYER ) ) {
					gm.ohDie();
				}
			}
		
			for ( i = 0; i<gm.zombieList.length; i++ ) {
				for ( j = i+1; j<gm.zombieList.length; j++ ) {
					tmp_manager_distance = 
						distance ( gm.zombieList[i],
							gm.zombieList[j] )
					if ( tmp_manager_distance < EYESHOT_RANGE ) {
						gm.zombieList[i].neighborList
							.push(gm.zombieList[j]);
						gm.zombieList[j].neighborList
							.push(gm.zombieList[i]);
						if ( tmp_manager_distance < EYESHOT_RANGE/4 ) {
							if ( gm.nearZombie == null ||
								tmp_manager_distance 
								< distance ( gm.zombieList[i],
									gm.nearZombie ) ) {
									gm.zombieList[i].nearZombie = 
										gm.zombieList[j];
									gm.zombieList[j].nearZombie = 
										gm.zombieList[i];	
							}
						}
					}
				}
			}
		
			//处理 player event loop
			if ( gm.player.isLive == true ) {
				gm.player.eventLoop(cpsNewTime - cpsLastTime);
			}
			
			// TODO 优化多次使用的计算参数
		
			//处理 zombie event loop
			for ( i = 0; i<gm.zombieList.length; i++ ) {
				gm.zombieList[i].eventLoop(cpsNewTime - cpsLastTime);
			}
		}
		
		//计算绘图循环帧率
		if ( cpsNewTime - cpsSecondTime >= 1000 ) {
			infoCps.innerText = fps ;
			cpsSecondTime = cpsNewTime;
			cps = 0;
		}
		cps ++;
		
		infoCTime.innerText = new Date().getTime() - cpsNewTime;
		cpsLastTime = cpsNewTime;
	},
	drawLoop: function () {
		fpsNewTime = new Date().getTime();
		
		cx.clearRect(0, 0, 960, 640);
		cx.save();
		
		//绘制 zombie 
		for ( i = 0; i<gm.zombieList.length; i++ ) {
			gm.zombieList[i].drawLoop();
		}
		
		//绘制 player
		if ( gm.player.isLive == true ) {
			gm.player.drawLoop();
		}

		cx.restore();
		
		//计算绘图循环帧率
		if ( fpsNewTime - fpsSecondTime >= 1000 ) {
			infoFps.innerText = fps ;
			fpsSecondTime = fpsNewTime;
			fps = 0;
		}
		fps ++;
		
		infoFTime.innerText = new Date().getTime() - fpsNewTime;
		fpsLastTime = fpsNewTime;
	},

	end: function() {
		log.log("=== game end...");
		window.clearInterval( this.intervalId );
	},
	
	ohDie: function () {
		log.log("die");
		this.player.isLive = false;
		audioDie.play();
	},
	addZombie: function () {
		
		var z = new Zombie(2);
		z.dir = Math.round( Math.random() * Math.PI * 2 * 10000 );
		this.zombieList[ this.zombieList.length ] = z ;
		infoZombieList.innerText = this.zombieList.length;
		log.log("add a zombie..." + this.zombieList.length);
	},
	clearZombie: function () {
		this.zombieList.length = 0;
		infoZombieList.innerText = 0;
		log.log("clear all zombie...");
	}
});

var tmp_manager_distance = 0;
var tmp_manager_distance_min = 0;

var fps				= 0;
var fpsNewTime		= 0;
var fpsLastTime		= 0;
var fpsSecondTime	= 0;
var fTime			= 0;

var cps				= 0;
var cpsNewTime		= 0;
var cpsLastTime		= 0;
var cpsSecondTime	= 0;

var infoFps;
var infoFTime;
var infoCps;
var infoCTime;
var infoZombieList;

var EYESHOT_ANGLE		= Math.PI / 3;
var EYESHOT_RANGE		= 200;

var DIR_STATE_K			= 150;
var DIR_STATE_K_CENTER	= 1;
var DIR_STATE_K_MATCH	= 0.8;
var DIR_STATE_K_NEAR	= 1;


const VIEW_WIDTH		= 960;
const VIEW_HEIGHT		= 640;

const DIR_STATE_LEFT	= -1;
const DIR_STATE_RIGHT	= 1;
const DIR_STATE_NONE	= 0;

const RADIUS_ZOMBIE		= 10;
const RADIUS_PLAYER		= 15;

// var eventLoop = function () {
// 	console.log("=== in eventLoop:" + gm.lo);
// 	gm.lo ++;
// 	if ( gm.lo == 10 ) {
// 		gm.end();
// 	}
// }