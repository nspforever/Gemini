function GLoader() {
    this.type = "GLoader";
    this.loadType = "";
    this.content = null;
    this.oncomplete = null;
    this.event = {};
}

GLoader.prototype = {
    addEventListener : function(type, callback) {
        if(type === GEvent.COMPLETE) {
            this.oncomplete = callback;
        }
    },
    
    load : function(src, loadType) {
        this.loadType = loadType;
        if(this.loadType === "bitmapData") {
            this.content = new Image();
            var self = this;
            this.content.onload = function() {
                if(self.oncomplete) {
                    self.event.currentTarget = self.content;
                    self.oncomplete(self.event);
                }
            }
            this.content.src = src;
        }
    },
}