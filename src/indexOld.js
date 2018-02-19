const api = require('./api/HueApi');

const AWAITTIMELONG = 600;
const AWAITTIME = 600;

//Lampen ueber Fernbedienung steuern
//Infrarotempfaenger fuer harmony

function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    })
}

async function offOn(lights) {


    //Scene off
    api.setScene(XZJXrt0j6zrVlUo);

    await sleep(AWAITTIME);

    //Scene on
    api.setScene(XZJXrt0j6zrVlUo);
}


async function ringDingDong() {

    const lights = await api.getLights();

    for(const key in lights) {
        if (lights[key].state.on) {
            api.toggleLight(key, false);
        }
    }

    await sleep(AWAITTIME);

    //Scene on
    api.setScene(XZJXrt0j6zrVlUo);

    await sleep(AWAITTIME);
    await offOn(lights);

    await sleep(AWAITTIME);
    await offOn(lights);

    await sleep(AWAITTIME);
    api.toggleAllLights(lights, false);

    await sleep(AWAITTIME);
    api.toggleAllLightState(lights);
}

ringDingDong();