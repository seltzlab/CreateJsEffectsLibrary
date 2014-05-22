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

(function() {

    function SimpleExplosion(configuration, x, y) {
        
        this.configuration = CreateJsEffectsLibrary.Effect.extend(SimpleExplosion.defaultConfiguration, configuration);
        
        CreateJsEffectsLibrary.Effect.call(this, x, y);
    }
    
    var p = SimpleExplosion.prototype = new CreateJsEffectsLibrary.Effect();

    // default configuration
    SimpleExplosion.defaultConfiguration = {
        duration: 1000,
        colors: ['#cc0000','#cc0000','#cc0000', '#cc6600', '#ffffcc'],
        min_radius: 1.0,
        max_radius: 3.0,
        min_speed: 15.0,
        max_speed: 40.0,
        min_scale: 1.0,
        max_scale: 4.0,
        max_particles: 10
    };

    p.getRandomColor = function() {
        var i = Math.floor(Math.random() * (this.configuration.colors.length));
        return this.configuration.colors[i];
    };

    p.initialize = function(x, y) {
        
        this.ContainerInitialize();

        for (var angle = 0; angle < 360; angle += Math.round(360 / this.configuration.max_particles)) {
            
            var particleColor = new Color(this.getRandomColor()).alpha(0.7);
            var d = this.randomFloat(0, 2);
            var particleX = d * Math.cos(angle);
            var particleY = d * Math.sin(angle);
            var r = this.randomFloat(this.configuration.min_radius, this.configuration.max_radius);
            var particle = this.getParticle(particleX, particleY, r, particleColor);

            var speed = this.randomFloat(this.configuration.min_speed, this.configuration.max_speed);

            particle.scaleSpeed = this.randomFloat(this.configuration.min_scale, this.configuration.max_scale);
            particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

            this.addChild(particle);
        }

        // top particle
        var particleColor = new Color(this.getRandomColor()).alpha(0.7);
        var particle = this.getParticle(0, 0, this.configuration.max_radius, particleColor);
        particle.scaleSpeed = this.configuration.max_radius;
        this.addChild(particle);

        this.x = x;
        this.y = y;

        return this;
    };

    p.animate = function() {
        
        for (var i = 0; i < this.getNumChildren(); i++) {
            var particle = this.getChildAt(i);
            createjs.Tween.get(particle, {loop: false})
                .to({scaleX: particle.scaleSpeed, scaleY: particle.scaleSpeed}, this.configuration.duration / 2, createjs.Ease.circOut)
                .wait(this.randomFloat(100, 500))
                .to({scaleX: 0, scaleY: 0, x: particle.velocityX, y: particle.velocityY}, this.configuration.duration / 2, createjs.Ease.quadOut);
        }
    };

    window.CreateJsEffectsLibrary.SimpleExplosion = SimpleExplosion;

}(window));

(function() {

    function Explosion(configuration, x, y) {
        
        this.configuration = CreateJsEffectsLibrary.Effect.extend(Explosion.defaultConfiguration, configuration);
        
        CreateJsEffectsLibrary.Effect.call(this, x, y);
    }

    var p = Explosion.prototype = new CreateJsEffectsLibrary.Effect();

    // default configuration
    Explosion.defaultConfiguration = {
        duration: 2000,
        min_radius: 5.0,
        max_radius: 15.0,
        min_speed: 10.0,
        max_speed: 30.0,
        min_scale: 1.0,
        max_scale: 1.5,
        max_particles: 15
    };

    p.getRandomColor = function() {
        var i = Math.floor(Math.random() * (this.configuration.colors.length));
        return this.configuration.colors[i];
    };

    p.initialize = function(x, y) {
        
        this.ContainerInitialize();

        for (var angle = 0; angle < 180; angle += Math.round(180 / this.configuration.max_particles)) {
            
            var particleColor = new Color('#cc0000');
            var d = this.randomFloat(0, 2);
            var particleX = d * Math.cos(angle);
            var particleY = d * Math.sin(angle);
            var r = this.randomFloat(this.configuration.min_radius, this.configuration.max_radius);
            var particle = this.getParticle(particleX, particleY, r, particleColor);

            var speed = this.randomFloat(this.configuration.min_speed, this.configuration.max_speed);

            particle.scaleSpeed = this.randomFloat(this.configuration.min_scale, this.configuration.max_scale);
            particle.velocityX = speed * Math.cos(angle * Math.PI / 270);
            particle.velocityY = -(speed * this.randomFloat(1, 4));

            var blurFilter = new createjs.BlurFilter(6, 6, 2);
            var colorFilter = new createjs.ColorFilter(this.randomFloat(0.5, 1), 0, 0, 1, 255 % angle, 0, 0);
            particle.filters = [colorFilter, blurFilter];
            var bounds = blurFilter.getBounds();

            particle.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);

            this.addChild(particle);
        }

        this.x = x;
        this.y = y;

        return this;
    };

    p.animate = function() {
        
        for (var i = 0; i < this.getNumChildren(); i++) {
            var particle = this.getChildAt(i);
            createjs.Tween.get(particle, {loop: false})
                .to({scaleX: particle.scaleSpeed, scaleY: particle.scaleSpeed}, this.configuration.duration / 2, createjs.Ease.cubicOut)
                .wait(this.randomFloat(100, 500))
                .to({alpha: 0, scaleX: particle.scaleSpeed / 2, scaleY: particle.scaleSpeed / 2, x: particle.velocityX, y: particle.velocityY, skewY: this.randomFloat(25, 100), skewX: this.randomFloat(25, 100)}, this.configuration.duration / 2, createjs.Ease.circInOut);
        }
    };

    window.CreateJsEffectsLibrary.Explosion = Explosion;

}(window));

(function() {

    function InkStain(configuration, x, y) {
        
        this.configuration = CreateJsEffectsLibrary.Effect.extend(InkStain.defaultConfiguration, configuration);
        
        CreateJsEffectsLibrary.Effect.call(this, x, y);
    }

    var p = InkStain.prototype = new CreateJsEffectsLibrary.Effect();

    // default configuration
    InkStain.defaultConfiguration = {
        duration: 5000,
        min_radius: 3.0,
        max_radius: 6.0,
        min_speed: 20.0,
        max_speed: 10.0,
        min_scale: 2.0,
        max_scale: 3.0,
        max_particles: 10,
        persistent: false
    };

    p.initialize = function(x, y) {
        
        this.ContainerInitialize();
        var particleColor = new Color(0, 0, 0).alpha(0.5);

        for (var angle = 0; angle < 360; angle += Math.round(360 / this.configuration.max_particles)) {
            var d = this.randomFloat(5, 15);
            var particleX = d * Math.cos(angle);
            var particleY = d * Math.sin(angle);
            var particle = this.getParticle(particleX, particleY, this.randomFloat(this.configuration.min_radius, this.configuration.max_radius), particleColor);

            particle.scaleSpeed = this.randomFloat(this.configuration.min_scale, this.configuration.max_scale);

            this.addChild(particle);
            
            for (var stainAngle = 0; stainAngle < 360; stainAngle += Math.round(360 / this.randomFloat(1, 3))) {
                var subParticleX = (d + this.randomFloat(10, 20)) * Math.cos(stainAngle);
                var subParticleY = (d + this.randomFloat(10, 20)) * Math.sin(stainAngle);
                var subParticle = this.getParticle(subParticleX, subParticleY, this.randomFloat(1, 3), particleColor);
                this.addChild(subParticle);
            }
        }

        this.x = x;
        this.y = y;

        return this;
    };

    p.animate = function() {
        
        for (var i = 0; i < this.getNumChildren(); i++) {
            var particle = this.getChildAt(i);
            var tweenObj = createjs.Tween.get(particle, {loop: false});
            if (particle.scaleSpeed) {
                tweenObj.to({scaleX: particle.scaleSpeed, scaleY: particle.scaleSpeed}, this.configuration.duration / 2, createjs.Ease.circOut);
            }
        }
        if (this.persistent !== false) {
            createjs.Tween.get(this, {loop: false}).wait(this.configuration.duration).to({alpha: 0}, 500, createjs.Ease.circOut);
        }
    };

    window.CreateJsEffectsLibrary.InkStain = InkStain;

}(window));

(function() {

    function Burn(configuration, x, y) {
        
        this.configuration = CreateJsEffectsLibrary.Effect.extend(Burn.defaultConfiguration, configuration);
        
        CreateJsEffectsLibrary.Effect.call(this, x, y);
    }

    var p = Burn.prototype = new CreateJsEffectsLibrary.Effect();
    
    // points collected during the drawing
    p.points = [];

    // default configuration
    Burn.defaultConfiguration = {
        min_radius: 10.0,
        max_radius: 12.0
    };

    p.initialize = function(x, y) {
        
        this.ContainerInitialize();

        var g = new createjs.Graphics().beginFill('#622').setStrokeStyle(0.1).beginStroke('#cc0000'); 
        this.radius = this.randomFloat(this.configuration.min_radius, this.configuration.max_radius);
        this.points = [];
        
        //this.g.moveTo(this.radius, this.radius);
        for (var angle = 1; angle < 360; angle += 1) {
            
            var rad = angle * (Math.PI / 180);
            
            var px = this.radius * Math.cos(rad + this.noise(this.radius));
            var py = this.radius * Math.sin(rad + this.noise(this.radius));
            
            g.lineTo(px, py);
            
            this.points.push([px, py]);
        }

        this.s = new createjs.Shape(g);
        this.s.alpha = 0.75;
        
        this.addChild(this.s);
        
        this.x = x;
        this.y = y;

        return this;
    };

    p.animate = function() {
        
        var self = this;
        var offset = 0;
        var totalIterations = self.points.length;
        
        self.points = self.shuffle(self.points);
        
        createjs.Ticker.addEventListener("tick", tick);
        function tick() {
            
            if (offset >= (totalIterations / 100 * 75)) {
                createjs.Tween.get(self.s).to({alpha: 0}, 500);
            }
             
            if (offset >= totalIterations || typeof self.points[offset] === 'undefined') {
                createjs.Ticker.removeEventListener("tick", tick);
                offset = 0;
                console.log('removeit!');

                return;
            }
            
            var g = new createjs.Graphics().beginFill('#ee0000').setStrokeStyle(0.1).beginStroke('#ee0000').drawCircle(0, 0, 2);
            var s = new createjs.Shape(g);
            s.x = self.points[offset][0] + self.noise(2);
            s.y = self.points[offset][1] + self.noise(2);
            s.alpha = 0.5;
            var blurFilter = new createjs.BlurFilter(2, 2, 2);
            s.filters = [blurFilter];
            var bounds = blurFilter.getBounds();
            s.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);
            self.addChild(s);
            offset = offset + 1 + parseInt((Math.random() * 12));
            
            createjs.Tween.get(s).to({alpha: 0}, 1500);
        }
    };

    p.noise = function(n) {
        
        return 1 - Math.pow(Math.random(), n);
        
    };

    p.shuffle = function(array) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    };

    window.CreateJsEffectsLibrary.Burn = Burn;

}(window));
