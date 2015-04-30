var GEvent = function() {}
GEvent.COMPLETE = "complete";
GEvent.ENTER_FRAME = "enter_frame";
GEvent.currentTarget = null;

GEvent.addEventListener = function(node, type, callback) {
    if(node.addEventListener) {
        node.addEventListener(type, callback, false);
    } else if(node.attachEvent) {
        node["e" + type + callback] = callback;
        node[type + callback] = function() {
            node["e" + type + callback]();
        }
        node.attachEvent("on" + type, node[type + callback]);
    }
}