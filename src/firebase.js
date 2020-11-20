// const firebaseConfig = {
//     apiKey: "AIzaSyAX7tvKD0dHLut_FrF_MSSi50WGd38ghnY",
//     authDomain: "ig-clone-16cd3.firebaseapp.com",
//     databaseURL: "https://ig-clone-16cd3.firebaseio.com",
//     projectId: "ig-clone-16cd3",
//     storageBucket: "ig-clone-16cd3.appspot.com",
//     messagingSenderId: "972445917309",
//     appId: "1:972445917309:web:bc320db775967232ad5114",
//     measurementId: "G-S3VVPLCMRM"
//   };

// import firebase from "firebase";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAX7tvKD0dHLut_FrF_MSSi50WGd38ghnY",
	authDomain: "ig-clone-16cd3.firebaseapp.com",
	databaseURL: "https://ig-clone-16cd3.firebaseio.com",
	projectId: "ig-clone-16cd3",
	storageBucket: "ig-clone-16cd3.appspot.com",
	messagingSenderId: "972445917309",
	appId: "1:972445917309:web:bc320db775967232ad5114",
	measurementId: "G-S3VVPLCMRM",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage };
