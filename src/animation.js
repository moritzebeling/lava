import { SimplexNoise } from 'simplex-noise';

export class Lava {

    constructor( canvas = undefined, options = {} ){
        
        if( !canvas ){
            console.error('LAVA No element found');
            return;
        }
        if( canvas.nodeName.toUpperCase() !== "CANVAS" ){
            console.error('LAVA Element should be of type CANVAS', canvas);
            return;
        }

        this._canvas = canvas;

        this._options = {
            ...{
                width: 128,
                height: 128,
                color: {
                    r: 0, g: 0, b: 0
                }
            },
            ...options
        };

        this._setCanvasSize();

        this._simplex = new SimplexNoise();
        this._ctx = this._canvas.getContext('2d');
        this._imgdata = this._ctx.getImageData(0, 0, this._options.width, this._options.height);
        this._data = this._imgdata.data;
        this._time = 0;

        let context = this;
        window.requestAnimationFrame( () => this.animation(context) );

        console.log( this );

    }

    _setCanvasSize( width = false, height = false ){
        this._canvas.width = width || this._options.width;
        this._canvas.height = height || this._options.height;
    }

    animation( context ){
        for (var x = 0; x < context._options.width; x++) {
            for (var y = 0; y < context._options.height; y++) {
                var r = context._simplex.noise3D(x / context._options.width, y / context._options.height, context._time) * 3 + 0.5;
                // update only opacity value
                context._data[(x + y * context._options.width) * 4 + 3] = r * 255;
            }
        }
        context._time += 0.003;
        context._ctx.putImageData(context._imgdata, 0, 0);
        window.requestAnimationFrame( () => context.animation(context) );
    }

}