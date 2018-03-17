const api = require('./api/HueApi');

const AWAITTIME = 750;
const AWAITTIMELONG = AWAITTIME;


function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    })
}

async function offOn() {

    await api.setGroup({
        bri: 0
    });

    await sleep(AWAITTIMELONG);

    await api.setGroup({
        bri: 255
    });
}


async function ringDingDong() {
    try {
        console.log('its donging..');
        const lights = await api.getLights();
        const scene = await api.createScene('test', Object.keys(lights));
        let sat     = 255 * Math.random();
        let color   = 64000 * Math.random();

        await sleep(100);

        await api.setGroup({
            on: true,
            sat: parseInt(sat),
            hue: parseInt(color),
            bri: 255
        });

        await sleep(AWAITTIME);
        await offOn();

        await sleep(AWAITTIME);
        await offOn();

        await sleep(AWAITTIME);
        await offOn();

        await sleep(AWAITTIMELONG);

        await api.setGroup({scene: scene[0].success.id});

        await api.deleteScene(scene[0].success.id);

    } catch (ex) {
        console.log(ex);
    }
}

ringDingDong();