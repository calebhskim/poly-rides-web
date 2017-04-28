import * as firebase from 'firebase';
import inquirer from 'inquirer';
import clui from 'clui';
import generateEntry from './mockdataUtil/generateData';
import config from './config';

const firebaseRef = firebase.initializeApp(config.firebase);

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
    } else if (parseInt(num, 10) <= 0) {
      return 'Error: Value cannot be at or below 0';
    }

    return true;
  },
}];

function pushData(ridesRef, count) {
  if (count <= 0) {
    return Promise.resolve();
  }

  const entry = generateEntry();
  const newKey = ridesRef.push().key;
  entry.id = newKey;
  return ridesRef.child(`${newKey}`).set(entry).then(() => {
    return pushData(ridesRef, count - 1);
  }).catch((err) => {
    if (err) {
      console.log('ERR :: ', err);
    }
    console.log('Failed to set new ride entry');
  });
}

inquirer.prompt(questions).then((ans) => {
  const rides = firebaseRef.database().ref('rides');

  if (ans.shouldClear) {
    rides.remove();
  }

  const n = parseInt(ans.numEntries, 10);
  const spinner = new clui.Spinner('Adding entries');
  spinner.start();

  pushData(rides, n).then(() => {
    spinner.stop(); 
    process.exit();
  });
});
