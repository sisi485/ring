const api = require('./api/HueApi');

const AWAITTIME = 600;
const AWAITTIMELONG = 2*AWAITTIME;

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    })
}

async function offOn(lights) {

    api.setGroup({
        bri: 0
    });


    await sleep(AWAITTIMELONG);

    api.setGroup({
        bri: 255
    });
}


async function ringDingDong() {

    console.log('its donging..');
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

    console.log('its not longer donging..');
}

ringDingDong();