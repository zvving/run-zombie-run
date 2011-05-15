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

const FPS_TIME			= 20;
const CPS_TIME			= 40;

const EYESHOT_ANGLE		= Math.PI / 3;
const EYESHOT_RANGE		= 200;
const NEAR_RANGE		= 40;

const DIR_STATE_ZOMBIE_K	= 150;
const DIR_STATE_PLAYER_K	= 500;
const DIR_STATE_K_CENTER	= 1;
const DIR_STATE_K_MATCH		= 0.8;
const DIR_STATE_K_NEAR		= 1;


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

const HSLA_EYESHOT			= "hsla(0, 50%, 90%, 0.2)";
const HSLA_ZOMBIE_STROKE	= "hsla(0, 50%, 50%, 1)";
const HSLA_ZOMBIE_FILL		= "hsla(60, 90%, 50%, 1)";
const HSLA_DEBUG_CENTER_POINT	= "hsla(240, 50%, 50%, 0.5)";
const HSLA_DEBUG_MATCH_DIR	= "hsla(120, 50%, 50%, 0.5)";

const HSLA_DEBUG_AIM_DIR	= "hsla(0, 50%, 50%, 0.2)";