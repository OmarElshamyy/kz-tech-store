const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Paste your User UID from Step 2 below:
const uid = 'PASTE_YOUR_USER_UID_HERE';

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('✅ Admin claim set successfully for UID:', uid);
    process.exit();
  })
  .catch((error) => {
    console.error('❌ Error setting claim:', error);
  });