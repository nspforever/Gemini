init(80, "back", 800, 480, main);


var list = [];
var index = 0;
var backLayer;

var mapImg;

var playerImg;
var loader
var imageArray;
var animeIndex = 0;
var dirIndex = 0;
var dirarr = [{x: 0, y: 1},
              {x: -1,y: 0},
              {x: 1, y: 0},
              {x: 0, y:-1},
              {x:-1, y: 1},
              {x: 1, y: 1},
              {x:-1, y:-1},
              {x: 1, y:-1}];

var dirMark = {"0,1": 0, "-1,0": 1,
               "1,0": 2, "0,-1": 3,
               "-1,1": 4, "1,1": 5,
               "-1,-1": 6, "1,-1": 7};


var toX = 0;
var toY = 0;
function main() {

    loader = new GLoader();
    loader.addEventListener(GEvent.COMPLETE,loadBitmapdata);
    loader.load("/images/back.jpg", "bitmapData");
}
function loadBitmapdata(event) {
    var bitmapdata = new GBitmapData(loader.content);
    mapImg = new GBitmap(bitmapdata);
    loader = new GLoader();
    loader.addEventListener(GEvent.COMPLETE, loadOver);
    loader.load("images/xiaoyao_lee.png", "bitmapData");
}
function loadOver(event) {
    var bitmapdata = new GBitmapData(loader.content, 0, 0, 70, 92);
    imageArray = GGlobal.divideCoordinate(bitmapdata.image.width, bitmapdata.image.height, 8, 8);
    document.getElementById("inittext").innerHTML="";
    playerImg = new GBitmap(bitmapdata);
    playerImg.bitmapData.setCoordinate(0, 0);
    index = 0;
    backLayer = new GSprite();
    addChild(backLayer);
    backLayer.addChild(mapImg);
    backLayer.addChild(playerImg);
    backLayer.addEventListener(GEvent.ENTER_FRAME, onframe)
    backLayer.addEventListener(GMouseEvent.MOUSE_DOWN, onmousedown);
}

function onframe(){
    index++;
    if(index >= imageArray[0].length){
        index = 0;
    }
    var markx = 0,marky = 0;
    var l = 3;
    if(playerImg.x > toX){
        playerImg.x -= l;
        markx = -1;
    }else if(playerImg.x < toX){
        playerImg.x += l;
        markx = 1;
    }
    if(playerImg.y > toY){
        playerImg.y -= l;
        marky = -1;
    }else if(playerImg.y < toY){
        playerImg.y += l;
        marky = 1;
    }
    if(markx !=0 || marky != 0){
        var mark = markx + "," + marky;
        dirIndex = dirMark[mark];
    }
    playerImg.bitmapData.setCoordinate(imageArray[dirIndex][index].x, imageArray[dirIndex][index].y);
}
function onmousedown(event) {
    toX = parseInt(event.selfX / 3) * 3;
    toY = parseInt(event.selfY / 3) * 3;
}