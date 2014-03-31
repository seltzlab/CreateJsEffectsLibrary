CreateJsEffectsLibrary
======================

Simple canvas effects library based on http://www.createjs.com

## SimpleExplosion
```Javascript
var effect = new CreateJsEffectsLibrary.SimpleExplosion({}, x, y);
stage.addChild(effect);
stage.update();
effect.animate();
```

Configuration
```Javascript
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
    }
```

## Explosion
```Javascript
var effect = new CreateJsEffectsLibrary.Explosion({}, x, y);
stage.addChild(effect);
stage.update();
effect.animate();
```

Configuration
```Javascript
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
    }
```

## InkStain
```Javascript
var effect = new CreateJsEffectsLibrary.InkStain({}, x, y);
stage.addChild(effect);
stage.update();
effect.animate();
```

Configuration
```Javascript
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
    }
```
