//Credenciales para tutilizar la base de datos en tiempo real de firebase
var firebaseConfig = {
    apiKey: "AIzaSyB-RFgRAyYiRqRXcCS7iV_GxAWsGUToWhs",
    authDomain: "turnosappod.firebaseapp.com",
    projectId: "turnosappod",
    storageBucket: "turnosappod.appspot.com",
    messagingSenderId: "289912126755",
    appId: "1:289912126755:web:4cd1395acccba6bf4ce096",
    measurementId: "G-3E0L5S7Y2T"
  };
  // Inicializando la base de datos
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();