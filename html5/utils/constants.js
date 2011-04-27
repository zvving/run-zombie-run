/** 常量存放文件  */

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

var DIR_STATE_ZOMBIE_K	= 150;
var DIR_STATE_PLAYER_K	= 300;
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

const SPEED_ZOMBIE_DEFAULT	= 0.05;
const SPEED_PLAYER_MAX		= 0.1;

//僵尸 emotion
const EMO_SEARCH	= 0;
const EMO_FOUND		= 1;
const EMO_FOLLOW	= 2;
const EMO_ACCACK	= 3;