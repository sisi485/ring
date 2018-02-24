const wpi = require('wiringpi-node');
const { spawn } = require('child_process');

let isRinging = false;
let count = 0;
let resetTimeOut = null;

wpi.setup('wpi');
wpi.pinMode(0, wpi.INPUT);

console.log('Pin 0, input');
console.log('Read 0: ' + wpi.digitalRead(0));
console.log('Warte..');

wpi.wiringPiISR(0, wpi.INT_EDGE_RISING, function () {

    if(isRinging)
        return;

    count++;

    if (count < 2) {

        if (!resetTimeOut)
            return;
        resetTimeOut = setTimeout(function () {
            count = 0;

        }, 1000);
        return;
    }

    isRinging = true;

    console.log('its ringing..');

    const ring = spawn('node', ['./src/ring.js', '']);

    ring.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ring.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ring.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    setTimeout(function () {

        isRinging = false;

    }, 5000)
});
