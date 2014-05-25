(function() {

    function Fireworks(configuration, x, y) {
        
        this.configuration = CreateJsEffectsLibrary.Effect.extend(Fireworks.defaultConfiguration, configuration);
        
        if (!this.configuration.canvas_width || !this.configuration.canvas_height) {
            throw new Error("canvas_width and canvas_height configuration are mandatory");
        }
        
        CreateJsEffectsLibrary.Effect.call(this, x, y);
    }
    
    Fireworks.defaultConfiguration = {
        colors: ['#cc0000', '#cc6600', '#ffffcc', '#F7DE4A', '#F1F74A'],
        particle_gravity_y: 1.6,
        particle_gravity_x: 0.98,
        particle_radius: 2,
        particle_speed: 1,
        max_particles: 100
    };
    
    var p = Fireworks.prototype = new CreateJsEffectsLibrary.Effect();
    
    var tickready = false;
    
    p.initialize = function(x, y) {

        this.ContainerInitialize();
        
        var sparkles = [];
        //create the specified number of sparkles
        for (var i = 0; i < this.configuration.max_particles; i++) {
            var sparkle = this.getParticle(0, 0, this.configuration.particle_radius, new Color(this.getRandomColor()));

            // set up velocities:
            var a = Math.PI * 2 * Math.random();
            var v = this.randomFloat(0, 0.9) * 30 * this.configuration.particle_speed;
            sparkle.vX = Math.cos(a) * v;
            sparkle.vY = Math.sin(a) * v;
            sparkle.vA = -(this.randomFloat(0.01,  0.05)); // alpha
            sparkle.name = createjs.UID.get();

            // add to the display list:
            this.addChild(sparkle);
            sparkles.push(sparkle);
        }
        
        this.tickChildren = false;
        this.x = x;
        this.y = y;
        
        var self = this;
        
        if (true || tickready == false) {
            this.tickListener = createjs.Ticker.addEventListener("tick", tick);
            tickready = true;
        
            function tick() {

                var l = sparkles.length;

                if (l < 1) {
                    createjs.Ticker.removeEventListener("tick", tick);
                    tickready = false;
                    self.getStage().removeChild(self);
                    return;
                }

                for (var i = 0; i < l; i++) {
                    
                    if (!sparkles[i]) {
                        continue;
                    }
                    
                    var sparkle = self.getChildByName(sparkles[i].name);
                    
                    if (!sparkle) {
                        sparkles.splice(i, 1);
                        continue;
                    }

                    // apply gravity and friction
                    sparkle.vY += self.configuration.particle_gravity_y + (self.configuration.max_particles / l);
                    sparkle.vX *= self.configuration.particle_gravity_x;

                    // update position, scale, and alpha:
                    sparkle.x += sparkle.vX;
                    sparkle.y += sparkle.vY;
                    sparkle.alpha += sparkle.vA;

                    // remove sparkles that are no longer visible or are stalled:
                    if (sparkle.alpha <= 0 || sparkle.y >= self.configuration.canvas_height) {
                        sparkles.splice(i, 1);
                        self.removeChild(sparkle);
                    }
                }

                // draw the updates to stage
                self.getStage().update();
            };
        }
        
        return this;
    };
    
    p.getRandomColor = function() {
        var i = parseInt(this.randomFloat(0, this.configuration.colors.length - 1));
        return this.configuration.colors[i];
    };
    
    window.CreateJsEffectsLibrary.Fireworks = Fireworks;
})(window);