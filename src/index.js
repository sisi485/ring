const api = require('./api/HueApi');
//const wpi = require('wiring-pi');
const wpi = require('wiringpi-node');
const { spawn } = require('child_process');

let isRinging = false;
const AWAITTIME = 600;

wpi.setup('wpi');
wpi.pinMode(0, wpi.INPUT);

console.log('Pin 0, input');
console.log('Read 0: ' + wpi.digitalRead(0));
console.log('Warte..');

wpi.wiringPiISR(0, wpi.INT_EDGE_RISING, function () {

    if(isRinging)
        return;

    isRinging = true;

    console.log('its ringing..');

    const ls = spawn('node', ['./src/ring.js', '']);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    setTimeout(function () {

        isRinging = false;

    }, 5000)
});