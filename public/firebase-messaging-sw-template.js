importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "{{VITE_FIREBASE_API_KEY}}",
    authDomain: "{{VITE_FIREBASE_AUTH_DOMAIN}}",
    databaseURL: "{{VITE_FIREBASE_DATABASE_URL}}",
    projectId: "{{VITE_FIREBASE_PROJECT_ID}}",
    storageBucket: "{{VITE_FIREBASE_STORAGE_BUCKET}}",
    messagingSenderId: "{{VITE_FIREBASE_MESSAGING_SENDER_ID}}",
    appId: "{{VITE_FIREBASE_APP_ID}}"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png' // Ensure this icon exists or remove
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
