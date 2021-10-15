# Lava animation

## Example

- [EOS Radio](https://eosradio.de)
- [EOS Radio Generator](https://eosradio.de/generator)
- [dist/index.html](dist/index.html)

## Installation

1. Install `simplex-noise` dependency
2. Add some `<canvas>` element to your project
3. Copy the `src/animation.js` file into your project
4. Import that and use it like it‘s done in `src/index.js`

## Dependencies

```
npm i simplex-noise -D
```

## Usage

```js
import { Lava } from './animation.js';

let canvas = document.querySelector( '#lava' );
let animation = new Lava( canvas );
```

## Options

Passing options to the animation
```js
let options = {
    width: 128,
    height: 128,
    speed: 3,
    factor: 3,
    shift: 0.5,
    color: {
        r: 0, g: 0, b: 255
    }
};
let animation = new Lava( element, options );
```

### Normal options

- `speed` is the time jump between every iteration of the animation. Try some values between 1 and 1000.
- `color` is an object containing rgb values `{r:0,g:0,b:0}`, each between `0` and `255`.

### Experimental options

- `width` and `height` is not the size in which the canvas will be displayed (you would do that via CSS), but it is the size of pixels that are calculated within the canvas. Don’t make it too high, `128` feels about right.
- `factor` is a value that the result of the noise get multiplied with. No idea what it does, but feel free to play with it.
- `shift` is a value that gets added to the result of the noise. Same as above, no clue what it does.

## Development

```
npm install
npm run dev
npm run build
```

## Credits & license

© 2021 by [Moritz Ebeling](https://moritzebeling.com).
Originally made for [EOS Radio](https://eosradio.de).

There is no garantee or customer service provided for this code. Use it as is on your own risk and enjoyment. This is no freeware, if you want to use it for your project, contact the creator.