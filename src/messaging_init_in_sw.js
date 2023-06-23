import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyDsWKYtAq6u10cLBH0B8yN6VhPkf02VxmQ",
  authDomain: "binge-boss.firebaseapp.com",
  projectId: "binge-boss",
  storageBucket: "binge-boss.appspot.com",
  messagingSenderId: "463863418639",
  appId: "1:463863418639:web:fbe6647559910c8509b87a"
};

export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      // Add the public key generated from the console here.
      getToken(messaging, {vapidKey: "BMdXwDjW_Vo1KjH1Gcw7Ojr_gyRRW1Mf3JDdjut-MrO1QHye1tW8zASko_zJ8Ms_DE8_vQpmQNWuIhCeB38dwQU"}).then(
        (currentToken) => {
          if(currentToken){
            console.log('currentToken', currentToken);
          } else {
            console.log('Cannot get token');
          }
        }
      )
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
      });

      // onBackgroundMessage(messaging, (payload) => {
      //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
      //   // Customize notification here
      //   const notificationTitle = 'Background Message Title';
      //   const notificationOptions = {
      //     body: 'Background Message body.',
      //     icon: '/firebase-logo.png'
      //   };
      
      //   // eslint-disable-next-line no-restricted-globals
      //   self.registration.showNotification(notificationTitle,
      //     notificationOptions);
      // });


    } else {
      console.log('Do not have permission!');
    }
  })
};

requestPermission();