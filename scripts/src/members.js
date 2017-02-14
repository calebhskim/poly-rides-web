import * as firebase from 'firebase';
import axios from 'axios';
import get from 'lodash/get';
import inquirer from 'inquirer';
import { Progress } from 'clui';
import readline from 'readline';

import config from './config';

if (process.argv.length !== 3) {
  console.log('Usage: yarn run members [access_token]');
  console.log('To get a token visit: https://developers.facebook.com/tools/explorer/');
  process.exit(1);
}

firebase.initializeApp(config.firebase);

const questions = [
  {
    name: 'shouldClear',
    message: 'Do you want to clear the member database before importing?',
    type: 'confirm',
  },
  {
    name: 'importAll',
    message: 'Do you want to import all members?',
    type: 'confirm',
  }
];

inquirer.prompt(questions).then((ans) => {
  const baseURL = 'https://graph.facebook.com';
  const maxValue = 16343;
  const members = firebase.database().ref('members');
  const progressBar = new Progress(30);
  let currentVal = 0;
  let hasNext = true;
  let url = `${baseURL}/250502971675365/members`;
  
  // Deconstruct member object to detect changes to facebook graph api
  // Should version lock graph api
  const generateMember = ({ administrator, name }) => {
    return {
      isAdmin: administrator,
      name
    }
  }

  const pushHandler = () => {
    currentVal += 1;
    readline.clearLine(process.stdout, 0); 
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(progressBar.update(currentVal, maxValue));

    if (currentVal >= maxValue) {
      process.exit();
    }
  };

  if (ans.shouldClear) {
    members.remove();
  }
  
  do {
    axios({
      method: 'get',
      url,
      params: {
        access_token: process.argv[2]
      }
    }).then((response) => {
      const { data }  = response;
      const nextUrl = get(data, 'paging.next', '');
      const responseMembers = get(data, 'data', []);

      if (nextUrl) {
        url = nextUrl;
      } else {
        hasNext = false;
      }

      Promise.all(responseMembers.map((member) => {
        return members.child(member.id).set(generateMember(member), pushHandler);
      })).then(() => {
        process.exit();
      });
    }).catch((error) => {
      console.log('ERR :: ', error);
      process.exit(1);
    });

    if (!ans.importAll) {
      break;
    }
  } while (hasNext);
}).catch((err) => {
  console.log('INQUIRER ERR :: ', err);
  process.exit(1); 
});
