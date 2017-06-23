import * as firebase from 'firebase'
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let config = {
    apiKey: "AIzaSyD8bvY3ZAiGiS1svEiz6jiwEOawg1Lp0qY",
    authDomain: "paywithfriends-e917e.firebaseapp.com",
    databaseURL: "https://paywithfriends-e917e.firebaseio.com",
    projectId: "paywithfriends-e917e",
    storageBucket: "paywithfriends-e917e.appspot.com",
    messagingSenderId: "814873373619"
};

firebase.initializeApp(config)
window.$firebase = firebase

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();