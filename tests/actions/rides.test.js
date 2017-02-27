import configureMockStore from 'redux-mock-store';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import actions from '../../src/constants/actions';
import { listenForRides, stopListenForRides } from '../../src/actions/rides';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// connecting to firebase dev
// somehow the following code works. originally I was trying to create
//  a local firebase server so we didn't have to use the internet. Now
//  I see that it doesn't matter what the databaseURL is, it always
//  works. Am I crazy?
console.log("here we are");
const fbRef = firebase.initializeApp({
  apiKey: 'something',
  databaseURL: 'ws://127.0.1:5000', // i literally have 0 idea
});
const ref = fbRef.database().ref('rides');

// super magic !!!
// by adding a remove before everything it makes the database work
ref.remove();

// global placeholder to hold the mockstore. set in beforeEach
let store;
const waitDuration = 500;

const sampleRides = [
  {
    cost: 18,
    driver: 'bob',
    postTimestamp: 15,
  },
  {
    cost: 32,
    driver: 'sally',
    postTimestamp: 13,
  },
  {
    cost: 21,
    driver: 'regine',
    postTimestamp: 12,
  },
];

describe('ride actions', () => {
  beforeEach(() => {
    // clear db before
    ref.remove();

    // reset the store before
    store = mockStore({
      firebase: {
        app: fbRef,
      },
    });
  });

  it('listenForRides shows existing rides', () => {
    ref.push(sampleRides[0]);

    store.dispatch(listenForRides());

    // sort of hacky but not that bad
    const p = new Promise((resolve) => {
      setTimeout(() => resolve(), waitDuration);
    });

    return p.then(() => {
      const fbAction = store.getActions()[0];

      expect(fbAction.type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(fbAction.payload[Object.keys(fbAction.payload)[0]])
        .toEqual(sampleRides[0]);
    });
  });
  it('listenForRides shows newly added rides', () => {
    store.dispatch(listenForRides());

    ref.push(sampleRides[0]);

    // sort of hacky but not that bad
    const p = new Promise((resolve) => {
      setTimeout(() => resolve(), waitDuration);
    });

    return p.then(() => {
      const testActions = store.getActions();
      expect(testActions).toHaveLength(2);

      // first one is null
      expect(testActions[0].type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(testActions[0].payload).toBeNull();

      expect(testActions[1].type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(testActions[1].payload[Object.keys(testActions[1].payload)[0]])
        .toEqual(sampleRides[0]);
    });
  });
  it('stopListenForRides stops listening to changes', () => {
    // add something to db
    ref.push(sampleRides[0]);

    store.dispatch(listenForRides());

    // fire off action with first fb entry
    store.dispatch(stopListenForRides());

    // push something else
    ref.push(sampleRides[1]);

    // sort of hacky but not that bad
    const p = new Promise((resolve) => {
      setTimeout(() => resolve(), waitDuration);
    });

    return p.then(() => {
      const testActions = store.getActions();

      // only the one event should show
      expect(testActions).toHaveLength(1);

      const fbAction = testActions[0];

      expect(fbAction.type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(fbAction.payload[Object.keys(fbAction.payload)[0]])
        .toEqual(sampleRides[0]);
    });
  });
  it('stopListenForRides stops listening to changes after new entry', () => {
    // add something to db
    ref.push(sampleRides[0]);

    store.dispatch(listenForRides());

    // push something else
    ref.push(sampleRides[1]);

    // fire off action with first fb entry
    store.dispatch(stopListenForRides());

    // push something else
    ref.push(sampleRides[2]);

    // sort of hacky but not that bad
    const p = new Promise((resolve) => {
      setTimeout(() => resolve(), waitDuration);
    });

    return p.then(() => {
      const testActions = store.getActions();

      // only the one event should show
      expect(testActions).toHaveLength(2);

      const fbAction1 = testActions[0];

      expect(fbAction1.type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(fbAction1.payload[Object.keys(fbAction1.payload)[0]])
        .toEqual(sampleRides[0]);

      const fbAction2 = testActions[1];
      expect(fbAction2.type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(fbAction2.payload[Object.keys(fbAction2.payload)[1]])
        .toEqual(sampleRides[1]);
    });
  });
  // TODO add a test for ordering
});
