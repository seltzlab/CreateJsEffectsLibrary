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

    CreateJsEffectsLibrary.SimpleExplosion = SimpleExplosion;

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

    CreateJsEffectsLibrary.Explosion = Explosion;

}(window));