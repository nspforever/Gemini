function GBitmapData(image, x, y, width, height) {
    this.type = "GBitmapData";
    this.oncomplete = null;
    
    if(image) {
        this.image = image;
        this.x = (x ? x : 0);
        this.y = (y ? y : 0);
        this.width = (width ? width : this.image.width);
        this.height = (height? height : this.image.height);
    } else {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.image = new Image();
    }
}

GBitmapData.prototype = {
    setProperties: function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    },
    
    setCoordinate : function(x, y) {
        this.x = x;
        this.y = y;
    },
}