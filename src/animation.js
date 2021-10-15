import { SimplexNoise } from 'simplex-noise';

export class Lava {

    constructor( canvas = undefined, options = {} ){
        
        /* check if element is valid */
        if( !canvas ){
            console.error('LAVA No element found');
            return;
        }
        if( canvas.nodeName.toUpperCase() !== "CANVAS" ){
            console.error('LAVA Element should be of type CANVAS', canvas);
            return;
        }

        /* options */
        this._options = {
            ...{
                width: 128,
                height: 128,
                speed: 3,
                factor: 3,
                shift: 0.5,
                color: {
                    r: 0, g: 0, b: 255
                }
            },
            ...options
        };
        this._time = 0;
        this._speed = this._options.speed / 1000;

        /* setup simplex noise */
        this._simplex = new SimplexNoise();
        
        /* setup canvas */
        this._canvas = canvas;
        this._setCanvasSize();

        this._ctx = this._canvas.getContext('2d');

        this._imgdata = this._ctx.getImageData(0, 0, this._options.width, this._options.height);
        this._data = this._imgdata.data;

        /* set color */
        this.setColor();

        /* start animation */
        let context = this;
        window.requestAnimationFrame( () => this._animation(context) );

    }

    _setCanvasSize( width = false, height = false ){
        /* set size of canvas */
        /* this is not the displayed size, but the amount of the pixels that are calculated inside the canvas */
        /* do not make this too large, 128 x 128 should be enough */
        this._canvas.width = width || this._options.width;
        this._canvas.height = height || this._options.height;
    }

    setColor( color = false ){
        color = color || this._options.color;
        for (var x = 0; x < this._options.width; x++) {
            for (var y = 0; y < this._options.height; y++) {
                this._data[(x + y * this._options.width) * 4 + 0] = color.r || 0;
                this._data[(x + y * this._options.width) * 4 + 1] = color.g || 0;
                this._data[(x + y * this._options.width) * 4 + 2] = color.b || 0;
            }
        }
    }

    _animation( context ){

        /* loop all pixels */
        for (let x = 0; x < context._options.width; x++) {
            for (let y = 0; y < context._options.height; y++) {

                /* create density value based on x,y,time */
                /* * factor, + shift */
                let r = context._simplex.noise3D(
                        x / context._options.width,
                        y / context._options.height,
                        context._time
                    ) * context._options.factor + context._options.shift;

                /* update opacity of pixel */
                context._data[(x + y * context._options.width) * 4 + 3] = r * 255;

            }
        }

        /* save and show new state */
        context._ctx.putImageData(context._imgdata, 0, 0);

        /* go to next animation step */
        context._time += context._speed;
        window.requestAnimationFrame( () => context._animation(context) );

    }

}