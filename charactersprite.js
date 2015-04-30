function CharacterSprite(isHero, bitmap, imageArray, x, y) {
    base(this, GSprite, []);
    this.type = "CharacterSprite";
    var self = this;
    self.x = x;
    self.y = y;
    self.toCoordinate = {x: x, y: y};
    self.isHero = isHero;
    self.animeIndex = 0;
    self.dirIndex = 0;
    self.dirmark = {"0,1": 0,"-1,0": 1,"1,0": 2,"0,-1": 3,"-1,1": 4,"1,1": 5,"-1,-1": 6,"1,-1": 7};
    self.bitmap = bitmap;
    self.imageArray = imageArray;
    self.addChild(bitmap);
}

CharacterSprite.prototype = {
    onframe : function() {
        var self = this;
        var markx = 0, marky = 0;
        var mark;
        ++self.animeIndex;
        if(self.animeIndex >= self.imageArray[0].length) {
            self.animeIndex = 0;
        }
        
        var l = 3;
        if(self.x > self.toCoordinate.x) {
            self.x -= 1;
            markx = -1;
        } else if(self.x < self.toCoordinate.x) {
            self.x += 1;
            markx = 1;
        }
        
        if(self.y > self.toCoordinate.y) {
            self.y -= 1;
            marky = -1;
        } else if(self.y < self.toCoordinate.y) {
            self.y += 1;
            marky = 1;
        }
        
        if(markx != 0 || marky != 0) {
            mark = markx + "," + marky;
            self.dirIndex = self.dirmark[mark];
        } else if(!self.isHero) {
            if(self.index > 0) {
                self.index -= 1;
            } else {
                self.index = parseInt(Math.random() * 300);
                self.toCoordinate.x = parseInt(Math.random() * 800 / 3) * 3;
                self.toCoordinate.y = parseInt(Math.random() * 480 / 3) * 3;
            }
        }
        self.bitmap.bitmapData.setCoordinate(self.imageArray[self.dirIndex][self.animeIndex].x,
                                             self.imageArray[self.dirIndex][self.animeIndex].y);
        
    },
}