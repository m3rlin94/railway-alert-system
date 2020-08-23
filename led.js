const { Board } = require('johnny-five');
// const board = new Board({
//   port: '/dev/cu.usbmodem1414101',
// });
const serialport = require('serialport');

serialport
  .list()
  .then((ports) => {
    console.log(ports);
  })
  .catch((error) => {
    console.log('er', error);
  });

// board.on('ready', () => {
//   const led = new Led(13);

//   // This will grant access to the led instance
//   // from within the REPL that's created when
//   // running this program.
//   board.repl.inject({
//     led,
//   });

//   led.blink();
// });
