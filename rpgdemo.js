init(80, "back", 800, 480, main);


var backLayer;

var mapImg;

var playerImg;
var loader;
var imageArray;
var loadIndex = 0;

var imgData = [
    {name: "/images/back.jpg", img: null},
    {name: "/images/xiaoyao_lee.png", img: null},
    {name: "/images/marwa.png", img: null},
    ];
var chara;
var charaList;

function main() {
    loadImage();
}

function loadImage() {
    if(loadIndex >= imgData.length) {
        gameInit();
        return;
    }
    loader = new GLoader();
    loader.addEventListener(GEvent.COMPLETE, loadComplete);
    loader.load(imgData[loadIndex].name, "bitmapData");
}

function loadComplete(event) {
    imgData[loadIndex].img = loader.content;
    ++loadIndex;
    loadImage();
}

function gameInit() {
    var bitmapData = new GBitmapData(imgData[0].img);
    mapImg = new GBitmap(bitmapData);
    
    document.getElementById("inittext").innerHTML = "";
    backLayer = new GSprite();
    addChild(backLayer);
    backLayer.addChild(mapImg);
    
    bitmapData = new GBitmapData(imgData[1].img, 0, 0, 70, 92);
    imageArray = GGlobal.divideCoordinate(bitmapData.image.width, bitmapData.image.height, 8, 8);
    playerImg = new GBitmap(bitmapData);
    chara = new CharacterSprite(true, playerImg, imageArray, 0, 0);
    backLayer.addChild(chara);
    
    charaList = [];
    for(var i = 0; i < 10; ++i) {
        bitmapData = new GBitmapData(imgData[2].img, 0, 0, 80, 91);
        imageArray = GGlobal.divideCoordinate(bitmapData.image.width, bitmapData.image.height, 8, 8);
        playerImg = new GBitmap(bitmapData);
        var npcx = parseInt(Math.random() * 800 / 3) * 3;
        var npcy = parseInt(Math.random() * 480 / 3) * 3;
        var npc = new CharacterSprite(false, playerImg, imageArray, npcx, npcy);
        backLayer.addChild(npc);
        charaList.push(npc);
    }
    
    backLayer.addEventListener(GEvent.ENTER_FRAME, onframe);
    backLayer.addEventListener(GMouseEvent.MOUSE_DOWN, onmousedown);
    
}

function onframe() {
    chara.onframe();
    for(var i = 0; i < charaList.length; ++i) {
        charaList[i].onframe();
    }
}

function onmousedown(event) {
    chara.toCoordinate.x = parseInt(event.selfX / 3) * 3;
    chara.toCoordinate.y = parseInt(event.selfY / 3) * 3;
}
