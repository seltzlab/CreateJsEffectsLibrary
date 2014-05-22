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
