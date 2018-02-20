const api = require('./api/HueApi');

let isRinging = false;
const AWAITTIMELONG = 600;
const AWAITTIME = 600;

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

ringDingDong();