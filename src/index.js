const api = require('./api/HueApi');
//const wpi = require('wiring-pi');
const wpi = require('wiringpi-node');

let isRinging = false;
const AWAITTIMELONG = 600;
const AWAITTIME = 600;

wpi.setup('wpi');
wpi.pinMode(0, wpi.INPUT);

console.log('Pin 0, input');

// setInterval(function() {
//     console.log(wpi.digitalRead(0));
// }, 100);
//Lampen ueber Fernbedienung steuern
//Infrarotempfaenger fuer harmony

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    })
}

async function offOn(lights) {

    api.toggleAllLightState(lights, {
        sat: 255,
        hue: 2500,
        bri: 0
    });

    await sleep(AWAITTIME);

    api.toggleAllLightState(lights, {
        on: true,
        sat: 255,
        hue: 2500,
        bri: 255
    });
}


async function ringDingDong() {

    console.log('its donging..');
    if(isRinging)
        return;

    isRinging = true;

    console.log('its donging..2');
    const lights = await api.getLights();
    console.log('its donging..2.2');

    for(const key in lights) {
        if (lights[key].state.on) {
            api.toggleLight(key, false);
        }
    }

    console.log('its donging..3');
    await sleep(AWAITTIME);

    api.toggleAllLightState(lights, {
        on: true,
        sat: 255,
        hue: 2500,
        bri: 255
    });

    console.log('its donging..4');
    await sleep(AWAITTIME);
    await offOn(lights);

    await sleep(AWAITTIME);
    await offOn(lights);

    await sleep(AWAITTIME);
    api.toggleAllLights(lights, false);

    await sleep(AWAITTIME);
    api.toggleAllLightState(lights);

    console.log('its donging..5');
    isRinging = false;
    console.log('its not longer donging..');

}

console.log('Read 0: ' + wpi.digitalRead(0));
console.log('Warte..');

wpi.wiringPiISR(0, wpi.INT_EDGE_BOTH, function () {

    console.log('its ringing..');

    ringDingDong();

});