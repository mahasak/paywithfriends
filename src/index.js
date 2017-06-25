import * as firebase from 'firebase'
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import dialogPolyfill from 'dialog-polyfill'

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

const dialogs = document.querySelector("dialog"); dialogs && dialogPolyfill.registerDialog(dialogs);


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();