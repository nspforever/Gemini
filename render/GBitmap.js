function GBitmap(bitmapData) {
    this.type = "GBitmap";
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.visible = true;
    this.bitmapData = bitmapData;
    if(this.bitmapData) {
        this.width = this.bitmapData.width;
        this.height = this.bitmapData.height;
    }
}

GBitmap.prototype = {
    show : function(coordinate) {
        if(this.visible) {
            GGlobal.canvas.drawImage(this.bitmapData.image, 
                                     this.bitmapData.x, this.bitmapData.y,
                                     this.bitmapData.width, this.bitmapData.height,
                                     coordinate.x + this.x, coordinate.y + this.y,
                                     this.width * this.scaleX,
                                     this.height * this.scaleY
                                     );
        }
    },
    
    ismouseon : function(event, coordinate) {
        if(event.pageX >= this.x + coordinate.x && 
           event.pageX <= this.x + coordinate.x + this.width &&
           event.pageY >= this.y + coordinate.y &&
           event.pageY <= this.y + coordinate.y + this.height) {
               return true;
           } else {
               return false;
           }
    },
    
    width:function(){
		var self = this;
		return self.bitmapData != null? self.bitmapData.width : 0;
	},
	
	height:function(){
		var self = this;
		return self.bitmapData != null? self.bitmapData.height : 0;
	}
}