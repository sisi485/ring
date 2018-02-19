var wpi = require('wiring-pi');

wpi.setup('wpi');
wpi.pinMode(0, wpi.INPUT);

setInterval(function() {
    console.log(wpi.digitalRead(0));
}, 100);