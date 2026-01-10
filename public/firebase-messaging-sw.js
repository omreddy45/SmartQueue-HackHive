importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCUXLjQds6_O5J90wu7e832sO2GZnsBJOo",
    authDomain: "smart-queue-website.firebaseapp.com",
    projectId: "smart-queue-website",
    storageBucket: "smart-queue-website.firebasestorage.app",
    messagingSenderId: "875617201209",
    appId: "1:875617201209:web:2b76d5f9282da54a7b31e8",
    measurementId: "G-MEASUREMENT_ID"
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
