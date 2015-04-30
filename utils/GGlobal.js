var GGlobal = function() {}

GGlobal.type = "GGlobal";
GGlobal.canvas = null;
GGlobal.width = 0;
GGlobal.height = 0;
GGlobal.childList = [];


GGlobal.setCanvas = function(id, width, height) {
    GGlobal.canvasObj = document.getElementById(id);
    if (width) {
        GGlobal.canvasObj.width = width;
    }

    if (height) {
        GGlobal.canvasObj.height = height;
    }
    GGlobal.width = GGlobal.canvasObj.width;
    GGlobal.height = GGlobal.canvasObj.height;
    GGlobal.canvas = GGlobal.canvasObj.getContext("2d");
    
    GEvent.addEventListener(GGlobal.canvasObj, GMouseEvent.MOUSE_DOWN, function(event) {
       GGlobal.mouseEvent(event, GMouseEvent.MOUSE_DOWN);
    });
}

GGlobal.onShow = function() {
    if (GGlobal.canvas) {
        GGlobal.canvas.clearRect(0, 0, GGlobal.width, GGlobal.height);
        GGlobal.show(GGlobal.childList)
    }
}

GGlobal.show = function(showList, coordinate) {
    if(!coordinate) {
        coordinate = {x : 0, y: 0};
    }
    for (var i = 0; i < showList.length; ++i) {
        if(showList[i]) {
            showList[i].show(coordinate);
        } else {
            console.log("showList[" + i + "] is undefined");
        }
    }
}

GGlobal.divideCoordinate = function(w, h, row, col) {
    var i, j;
    var cWidth = w /col;
    var cHeight = h / row;
    var resultArray = [];
    
    for(i = 0; i < row; ++i) {
        var childArray = [];
        for(j = 0; j < col; ++j) {
            childArray.push({x: cWidth * j, y: cHeight * i});
        }
        resultArray.push(childArray);
    }
    return resultArray;
}

GGlobal.mouseEvent = function(event, type) {
    for(var i = 0; i < GGlobal.childList.length; ++i) {
        if(GGlobal.childList[i].mouseEvent) {
            GGlobal.childList[i].mouseEvent(event, type);
        }
    }
}