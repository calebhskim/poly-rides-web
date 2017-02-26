import Firebase from 'firebase';
import FirebaseServer from 'firebase-server';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { listenForRides } from '../../src/actions/rides';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


// This test case does not work
// A way to mock firebase is needed
describe('ride access actions', () => {
  it('properly gets values in rides database', () => {
    const server = new FirebaseServer(5000, 'lolhost.firebaseio.test', {
      ride1: true,
      ride2: true,
    });

    const app = new Firebase('ws://localhost.firebaseio.test:5000');

    const store = mockStore({
      firebase: {
        app,
      },
    });

    return store.dispatch(listenForRides())
      .then(() => {
        expect(store.appState.feed).toEqual({
          ride1: true,
          ride2: true,
        });
      });
  });
});
