import configureMockStore from 'redux-mock-store';
import firebase from 'firebase';
import map from 'lodash/map';
import thunk from 'redux-thunk';
import values from 'lodash/values';

import actions from '../../src/constants/actions';
import { listenForRides, stopListenForRides } from '../../src/actions/rides';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// connecting to firebase dev
// somehow the following code works. originally I was trying to create
//  a local firebase server so we didn't have to use the internet. Now
//  I see that it doesn't matter what the databaseURL is, it always
//  works. Am I crazy?
const fbRef = firebase.initializeApp({
  databaseURL: 'ws://127.0.1:5000', // i literally have 0 idea
});
const ref = fbRef.database().ref('rides');

// super magic !!!
// by adding a remove before everything it makes the database work
ref.remove();

// global placeholder to hold the mockstore. set in beforeEach
let store;

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

function getLastAction(curStore) {
  const allActions = curStore.getActions();
  return allActions[allActions.length - 1];
}

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

  describe('listenForRides', () => {
    it('should show existing rides', () => {
      ref.push(sampleRides[0]);

      store.dispatch(listenForRides());

      const action = getLastAction(store);
      const payloadValues = values(action.payload);

      expect(action.type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(payloadValues[0]).toEqual(sampleRides[0]);
    });
    it('should show newly added rides', () => {
      store.dispatch(listenForRides());

      ref.push(sampleRides[0]);

      const testActions = store.getActions();
      expect(testActions).toHaveLength(2);

      // first one is null
      expect(testActions[0].type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(testActions[0].payload).toBeNull();

      const payloadValues = values(testActions[1].payload);

      expect(testActions[1].type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(payloadValues[0]).toEqual(sampleRides[0]);
    });
    it('should only show most recent rides', () => {
      store.dispatch(listenForRides());

      // num inserted should be greater than the number of feed items displayed
      const numFeedItemsDisplayed = 10;
      const numFeedItemsInserted = 15;

      // add more rides then are displayed
      for (let i = 0; i < numFeedItemsInserted; i += 1) {
        ref.push({
          postTimestamp: i,
        });
      }

      const action = getLastAction(store);
      const payloadValues = values(action.payload);

      expect(action.type).toEqual(actions.CURRENT_RIDES_CHANGE);

      const timestamps = map(payloadValues, 'postTimestamp');
      const minTimestamp = Math.min(...timestamps);

      expect(minTimestamp).toEqual(numFeedItemsInserted - numFeedItemsDisplayed);
    });
  });
  describe('stopListenForRides', () => {
    it('should not listen to changes', () => {
      // add something to db
      ref.push(sampleRides[0]);

      store.dispatch(listenForRides());

      // fire off action with first fb entry
      store.dispatch(stopListenForRides());

      // push something else
      ref.push(sampleRides[1]);

      const testActions = store.getActions();

      // only the one event should show
      expect(testActions).toHaveLength(1);

      const action = testActions[0];
      const payloadValues = values(action.payload);

      expect(action.type).toEqual(actions.CURRENT_RIDES_CHANGE);
      expect(payloadValues[0]).toEqual(sampleRides[0]);
    });
    it('should not see a new entry', () => {
      // add something to db
      ref.push(sampleRides[0]);

      store.dispatch(listenForRides());

      // push something else
      ref.push(sampleRides[1]);

      // fire off action with first fb entry
      store.dispatch(stopListenForRides());

      // push something else
      ref.push(sampleRides[2]);

      const testActions = store.getActions();

      // only the one event should show
      expect(testActions).toHaveLength(2);

      const action = getLastAction(store);
      const payloadValues = values(action.payload);

      expect(action.type).toEqual(actions.CURRENT_RIDES_CHANGE);

      expect(payloadValues[0]).toEqual(sampleRides[0]);
      expect(payloadValues[1]).toEqual(sampleRides[1]);
    });
  });
});
