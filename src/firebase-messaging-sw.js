
importScripts("https://www.gstatic.com/firebasejs/5.0.4/firebase.js");

const config = {
    apiKey: "AIzaSyBt5-UPgsFMG8M598ekGBKzIl32nSdAvus",
    authDomain: "helpdesk-web.firebaseapp.com",
    databaseURL: "https://helpdesk-web.firebaseio.com",
    projectId: "helpdesk-web",
    storageBucket: "helpdesk-web.appspot.com",
    messagingSenderId: "176143547992"
};

try {
    firebase.initializeApp(config);
    firebase.messaging();
} catch (e) {
    console.log('Unable to Instantiate Firebase Messaing', e);
}

