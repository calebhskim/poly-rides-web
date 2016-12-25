import * as firebase from 'firebase';
import inquirer from 'inquirer';
import clui from 'clui';
import generateEntry from './generateData';


const config = {
  apiKey: 'AIzaSyCyiMJKUK5__AQfnSDfaQmBnVq-dBL73RY',
  authDomain: 'polyridesweb.firebaseapp.com',
  databaseURL: 'https://polyridesweb.firebaseio.com',
  storageBucket: 'polyridesweb.appspot.com',
  messagingSenderId: '429026541463',
};
firebase.initializeApp(config);

const questions = [{
  name: 'shouldClear',
  message: 'Do you want to clear the database before adding mock data?',
  type: 'confirm',
}, {
  name: 'numEntries',
  message: 'How many entries do you want to add?',
  validate: (num) => {
    if (isNaN(num)) {
      return 'Error: Please enter int';
    } else if (parseInt(num, 10) < 0) {
      return 'Error: Value cannot be below 0';
    }

    return true;
  },
}];

inquirer.prompt(questions).then((ans) => {
  const rides = firebase.database().ref('rides');

  if (ans.shouldClear) {
    rides.remove();
  }

  const n = parseInt(ans.numEntries, 10);
  const spinner = new clui.Spinner(`Inputting entry 1 of ${n}`);
  spinner.start();

  let entryNum = 0;

  const pushHandler = () => {
    entryNum += 1;
    spinner.message(`Inputting entry ${entryNum} of ${n}`);

    if (entryNum === n) {
      firebase.database().goOffline();
      spinner.stop();
    }
  };

  for (let i = 0; i < n; i += 1) {
    rides.push(generateEntry(), pushHandler);
  }
});
