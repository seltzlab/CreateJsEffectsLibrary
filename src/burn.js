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
