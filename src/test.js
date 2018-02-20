var hue = require('./api/HueApi');

async function test() {

    const lights = await hue.getLights();

    console.log(lights);
}
