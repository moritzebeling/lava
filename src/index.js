import { Lava } from './animation.js';

let options = {
    color: {
        r: 255,
        g: 0,
        b: 0
    }
};

let canvas = document.querySelector( '#lava' );
let animation = new Lava( canvas, options );