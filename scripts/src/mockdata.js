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

inquirer.prompt(questions).then((ans) => {
  const rides = firebaseRef.database().ref('rides');

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
      firebaseRef.database().goOffline();
      spinner.stop();
    }
  };

  for (let i = 0; i < n; i += 1) {
    rides.push(generateEntry(), pushHandler);
  }
});
