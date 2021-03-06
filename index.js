require('dotenv').config();
const { Board, Proximity } = require('johnny-five');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();

const COM_PORT = 'COM5'; // Change to appropriate com port number;
const ULTRASONIC_CONNECTED_PIN = 2; // Change to appropriate pin number which the ultrasonic is connected to;

try {
  const board = new Board({
    port: COM_PORT,
  });

  board.on('ready', () => {
    const proximity = new Proximity({
      controller: 'HCSR04',
      pin: ULTRASONIC_CONNECTED_PIN,
    });

    proximity.on('change', () => {
      const { centimeters } = proximity;
      console.log('  cm  : ', centimeters);

      db.collection('Detection')
        .doc('Distance')
        .set(
          {
            centimeters,
          },
          {
            merge: true,
          }
        )
        .then(() => {
          console.log(`Database update successful with value ${centimeters}`);
        })
        .catch((error) => {
          console.log(
            `Value ${centimeters} update unsuccessful with error: `,
            error
          );
        });
    });
  });
} catch (error) {
  console.log('setup error', error);
}
