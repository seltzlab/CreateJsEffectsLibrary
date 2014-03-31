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
