const api = require('./api/HueApi');
const wpi = require('wiring-pi');

let isRinging = false;
const AWAITTIMELONG = 600;
const AWAITTIME = 600;

wpi.setup('wpi');
wpi.pinMode(0, wpi.INPUT);

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

    if(isRinging)
        return;

    isRinging = true;

    const lights = await api.getLights();

    for(const key in lights) {
        if (lights[key].state.on) {
            api.toggleLight(key, false);
        }
    }

    await sleep(AWAITTIME);

    api.toggleAllLightState(lights, {
        on: true,
        sat: 255,
        hue: 2500,
        bri: 255
    });

    await sleep(AWAITTIME);
    await offOn(lights);

    await sleep(AWAITTIME);
    await offOn(lights);

    await sleep(AWAITTIME);
    api.toggleAllLights(lights, false);

    await sleep(AWAITTIME);
    api.toggleAllLightState(lights);

    isRinging = false;
}

wpi.wiringPiISR(0, wpi.INT_EDGE_RISING, function () {

    ringDingDong();
    
});