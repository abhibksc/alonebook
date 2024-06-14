const admin = require('firebase-admin');
const path = require('path');

// Adjust the path as necessary based on the actual location of the JSON file
const serviceAccount = require(path.resolve(__dirname, '../../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-media-6a985-default-rtdb.firebaseio.com"
});

module.exports = admin;
