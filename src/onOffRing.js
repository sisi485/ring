const Gpio = require('onoff').Gpio;
const ringSignal2 = new Gpio(2, 'in', 'both');
const ringSignal3 = new Gpio(3, 'in', 'both');
const ringSignal4 = new Gpio(4, 'in', 'both');
 
ringSignal2.watch((err, value) => {
    if(err) 
        console.log(err);
    console.log("[2] got value :" + value);
});

console.log("[2] registerd");

ringSignal3.watch((err, value) => {
    if(err) 
        console.log(err);
    console.log("[3] got value :" + value);
});

console.log("[2] registerd");

ringSignal4.watch((err, value) => {
    if(err) 
        console.log(err);
    console.log("[4] got value :" + value);
});

console.log("[4] registerd");
