import * as firebase from 'firebase';
import axios from 'axios';

import config from './config';

firebase.initializeApp(config.firebase);

const baseURL = 'https://graph.facebook.com/v2.9';
const limit = 2000;
const url = `${baseURL}/250502971675365/feed?limit=${limit}`;

const fbposts = firebase.database().ref('fbposts');


const getPosts = () =>
  axios({
    method: 'get',
    url,
    params: {
      access_token: config.fbtoken,
    },
  }).then((response) => {
    const data = response.data.data;

    const inParallel = data.map((post) => {
      const {
        id,
        message,
        updated_time,
      } = post;

      return fbposts.child(id).set({ message, postTimestamp: Date.parse(updated_time) });
    });

    Promise.all(inParallel).then(() => {
      process.exit(0);
    }).catch(() => {
      process.exit(1);
    });
  }).catch((error) => {
    console.log('ERR :: ', error);

    process.exit(1);
  });


getPosts();
