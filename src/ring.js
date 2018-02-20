const api = require('./api/HueApi');

const AWAITTIME = 1200;
const AWAITTIMELONG = AWAITTIME;

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    })
}

async function offOn() {

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

    api.setGroup({on: false});

    await sleep(AWAITTIME);

    api.setGroup({
        on: true,
        sat: 255,
        hue: 2500,
        bri: 255
    });

    await sleep(AWAITTIME);
    await offOn();

    await sleep(AWAITTIME);
    await offOn();

    await sleep(AWAITTIMELONG);
    api.setGroup({on: false});

    await sleep(AWAITTIMELONG);
    api.toggleAllLightState(lights);

    console.log('its not longer donging..');
}

ringDingDong();