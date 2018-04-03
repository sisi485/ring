const api = require('./api/HueApi');

const AWAITTIME = 500;
const TRANSITIONTIME = AWAITTIME / 1000 * 0.1;


function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    })
}

async function offOn() {

    await api.setGroup({
        bri: 0,
        transitiontime: TRANSITIONTIME
    });

    await sleep(AWAITTIME);

    await api.setGroup({
        bri: 255,
        transitiontime: TRANSITIONTIME
    });
}


async function ringDingDong() {
    try {
        console.log('its donging..');
        const lights = await api.getLights();
        const scene = await api.createScene('tmp-ring', Object.keys(lights));
        let sat     = 255 * Math.random();
        let color   = 65535 * Math.random();

        await sleep(100);


        await api.setGroup({
            bri: 0,
            transitiontime: TRANSITIONTIME
        });

        await sleep(AWAITTIME);

        await api.setGroup({
            on: true,
            sat: parseInt(sat),
            hue: parseInt(color),
            bri: 255,
            transitiontime: TRANSITIONTIME
        });

        await sleep(AWAITTIME);
        await offOn();

        await sleep(AWAITTIME);
        await offOn();

        await sleep(AWAITTIME);

        await api.setGroup({
            bri: 0,
            transitiontime: TRANSITIONTIME
        });

        await sleep(AWAITTIME);

        await api.setGroup({
            scene: scene[0].success.id,
            transitiontime: TRANSITIONTIME
        });

        await sleep(AWAITTIME);

        await api.deleteScene(scene[0].success.id);

    } catch (ex) {
        console.log(ex);
        if (scene)
            await api.deleteScene(scene[0].success.id);
    }
}

ringDingDong();