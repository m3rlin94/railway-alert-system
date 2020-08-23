const { Board, Led } = require('johnny-five');
const board = new Board({
  port: '/dev/cu.usbmodem1414101',
});

let led;
let toggleState = false;

board.on('ready', () => {
  console.log('Board ready');
  led = new Led(13);

  const toggleLED = () => {
    toggleState = !toggleState;

    if (toggleState) {
      led.on();
    } else {
      led.off();
    }
  };

  setInterval(toggleLED, 1000);
});
console.log('\nWaiting for device to connect...');
