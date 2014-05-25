window.CreateJsEffectsLibrary = {};

(function() {

    var Effect = function(x, y) {
        
        this.initialize(x, y);
    };
    
    var p = Effect.prototype = new createjs.Container();
    p.ContainerInitialize = p.initialize;
    
    p.randomFloat = function(min, max) {
        return min + Math.random() * (max - min);
    };
    
    p.getParticle = function(x, y, r, color) {
        var particle = new createjs.Shape();
        particle.graphics.beginFill(color.hexString()).drawCircle(0, 0, r);
        particle.x = x;
        particle.y = y;
        
        return particle;
    };
    
    Effect.extend = function() {
        if (arguments.length) {
            var object = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    object[key] = arguments[i][key];
                }
            }
            return object;
        }
        return {};
    };
    
    window.CreateJsEffectsLibrary.Effect = Effect;
})(window);
