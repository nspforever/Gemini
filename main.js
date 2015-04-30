init(80, "back", 300, 300, main);

var list = [];
var index = 0;
var mapping;
var loader;
var imageArray;
var animeIndex = 0;
var dirIndex = 0;
var dirArray = [
        {x: 0, y: 1},
        {x: -1, y : 0},
        {x: 1, y: 0},
        {x: 0, y: -1},
    ];


function main() {
    loader = new GLoader();
    loader.addEventListener(GEvent.COMPLETE, loadBitmapData);
    loader.load("/images/marwa.png", "bitmapData");
    
}

function loadBitmapData() {
    var bitmapData = new GBitmapData(loader.content, 0, 0, 70, 92);
    imageArray = GGlobal.divideCoordinate(bitmapData.image.width, 
                                              bitmapData.image.height, 8, 8);
    mapping = new GBitmap(bitmapData)
    mapping.x = 100;
    mapping.bitmapData.setCoordinate(0, 0);
    index = 0;
    var backLayer = new GSprite();
    addChild(backLayer);
    backLayer.addChild(mapping);
    backLayer.addEventListener(GEvent.ENTER_FRAME, onframe);
}

function onframe() {
    ++index;
    if(index >= imageArray[0].length) {
        index = 0;
    }
    mapping.bitmapData.setCoordinate(imageArray[dirIndex][index].x, 
                                     imageArray[dirIndex][index].y);
    mapping.x += dirArray[dirIndex].x * 3;
    mapping.y += dirArray[dirIndex].y * 3;
    
    if(animeIndex > 20) {
        dirIndex ++;
        if(dirIndex > 3) {
            dirIndex = 0;
        }
        animeIndex = 0;
    }
    ++animeIndex;
}









