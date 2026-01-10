import fetch from 'node-fetch';

// USAGE: node scripts/test-fcm.js <FCM_TOKEN>

const FCM_TOKEN = process.argv[2];
const SERVER_KEY = 'YOUR_FIREBASE_SERVER_KEY_HERE'; // Get this from Project Settings > Cloud Messaging

if (!FCM_TOKEN) {
    console.error('Please provide an FCM Token.');
    console.log('Usage: node scripts/test-fcm.js <FCM_TOKEN>');
    process.exit(1);
}

const sendNotification = async () => {
    const message = {
        to: FCM_TOKEN,
        notification: {
            title: 'Order Ready!',
            body: 'Your food is ready for pickup at the counter.',
            icon: '/vite.svg' // visual icon
        },
        data: {
            orderId: '12345',
            status: 'READY'
        }
    };

    try {
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': `key=${SERVER_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        const data = await response.json();
        console.log('Notification sent:', data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

sendNotification();
