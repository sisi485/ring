const api = require('./api/HueApi');

const AWAITTIME = 1200;
const AWAITTIMELONG = AWAITTIME;

let count = 0;
let resetTimeOut = null;

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

    count++;

    if (count < 5) {
        if (!resetTimeOut)
            return;
        resetTimeOut = setTimeout(function () {
            count = 0;

        }, 1000)
    }


    console.log('its donging..');
    const lights = await api.getLights();
    const scene = await api.createScene('test', Object.keys(lights));
    let sat     = 255 * Math.random();
    let color   = 64000 * Math.random();

    await sleep(100);

    api.setGroup({
        on: true,
        sat: parseInt(sat),
        hue: parseInt(color),
        bri: 255
    });

    await sleep(AWAITTIME);
    await offOn();

    await sleep(AWAITTIME);
    await offOn();

    await sleep(AWAITTIMELONG);

    await api.setGroup({scene: scene[0].success.id});

    api.deleteScene(scene[0].success.id);

    console.log('its not longer donging..');
}

ringDingDong();