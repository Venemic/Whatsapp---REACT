import firebase from "firebase";

    const firebaseConfig = {
            apiKey: "AIzaSyB46RBUYbEgXwhCogUb4hf5xLIjSzLZsN8",
            authDomain: "whatsapp-b9496.firebaseapp.com",
            projectId: "whatsapp-b9496",
            storageBucket: "whatsapp-b9496.appspot.com",
            messagingSenderId: "836532416182",
            appId: "1:836532416182:web:291e636836c67095e38017",
            measurementId: "G-4ZJJRD1TRP"
        };

        const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig):firebase.app();
        const db  = app.firestore();
        const auth = app.auth();
        const provider = new firebase.auth.GoogleAuthProvider();

        export {db, auth, provider};