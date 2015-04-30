function GSprite() {
    this.type = "GSprite";
    this.x = 0;
    this.y = 0;
    this.visible = true;
    this.childList = [];
    this.frameList = [];
    this.mouseList = [];
}

GSprite.prototype = {
    show : function(coordinate) {
        if(!coordinate) {
            coordinate = { x : 0, y : 0 };
        }
        if(this.visible) {
            GGlobal.show(this.childList, 
                         {
                            x : this.x + coordinate.x, 
                            y: this.y + coordinate.y
                         });
            this.loopFrame();
        }
    },
    
    addChild : function(child) {
        if(!this.childList) {
            console.log("this.childList is null");
        }
        
        this.childList.push(child);
    },
    
    loopFrame: function() {
        
        for(var i = 0; i < this.frameList.length; ++i) {
            this.frameList[i]();
        }
        
    },
    
    addEventListener : function(type, listener) {
        if(type === GEvent.ENTER_FRAME) {
            this.frameList.push(listener);
        } else if (type === GMouseEvent.MOUSE_DOWN) {
            this.mouseList.push({listener: listener, type: GMouseEvent.MOUSE_DOWN});
        }
    },
    
    removeEventListener : function(type, listener) {
        var i, length = this.frameList.length;
        
        for(i = 0; i < length; i++) {
            if(type === GEvent.ENTER_FRAME) {
                this.frameList.splice(i, 1);
                break;
            }
        }
        
        length = this.mouseList.length;
		for(i = 0; i < length; ++i){
			if(type == GMouseEvent.MOUSE_DOWN && this.mouseList[i].listener === listener){
				this.mouseList.splice(i,1);
				break;
			}
		}
    },
    
    mouseEvent: function(event, type, coordinate) {
        var isClick = false;
        var i, j;
        if(!coordinate) {
            coordinate = {x: 0, y: 0};
        }
        if(!this.mouseList || this.mouseList.length === 0) {
            return;
        }
		if(!this.childList || this.childList.length === 0) {
		    return;
		}
		
        for(i = 0; i < this.childList.length; ++i) {
            isClick = this.childList[i].ismouseon(event, {x: this.x + coordinate.x, y: this.y + coordinate.y});
            if(isClick) {
                break;
            }
        }
         
        if(isClick) {
            for(j = 0; j < this.mouseList.length; ++j) {
                var obj = this.mouseList[j];
                if(obj.type === type) {
                    event.selfX = event.pageX - (this.x + coordinate.x);
                    event.selfY = event.pageY - (this.y + coordinate.y);
                    event.currentTarget = this;
                    obj.listener(event);
                }
            }
        }
        
        for(i = 0; i < this.childList.length; ++i) {
            if(this.childList[i].mouseEvent) {
                this.childList[i].mouseEvent(event, type, {x: this.x + coordinate.x, y: this.y + coordinate.y});
            }
        }
    },
    
    ismouseon: function(event, coordiante) {
        var i;
        var isClick = false;
        for(i = 0; i < this.childList.length; ++i) {
            isClick = this.childList[i].ismouseon(event, {x: this.x + coordinate.x, y: this.y + coordinate.y});
            if(isClick) {
                break;
            }
        }
        return isClick;
    },
    
}