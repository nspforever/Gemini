function addChild(child) {
    GGlobal.childList.push(child);
}

function init(speed, canvasName, width, height, callback) {
    GEvent.addEventListener(window, "load", function() {
        setInterval(function() {
            GGlobal.onShow();
        }, speed);
        
        GGlobal.setCanvas(canvasName, width, height);
        callback();
    });
}

function base(derive, baseSprite, baseArgs) {
    baseSprite.apply(derive, baseArgs);
    
    if(!derive.constructor.prototype) {
        derive.constructor.prototype = {};
    }
    
    for(prop in baseSprite.prototype) {
        var proto = derive.constructor.prototype;
        if(!proto[prop]) {
            proto[prop] = baseSprite.prototype[prop];
        }
    }

}
