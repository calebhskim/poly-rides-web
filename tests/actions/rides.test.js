import actions from '../../src/constants/actions';
import { listenForRides, stopListenForRides } from '../../src/actions/rides';

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
  let dispatch;
  let getState;
  let limitToLast;
  let off;
  let orderByChild;
  let ridesRef;
  let ref;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
    getState.mockReturnValueOnce({
      firebase: {
        app: {
          database: () => ({ ref }),
        },
      },
    });
    limitToLast = jest.fn(() => ({
      on: (type, callback) => {
        callback({
          val: () => sampleRides[0],
        });
      },
    }));
    off = jest.fn();
    orderByChild = jest.fn(() => ({
      limitToLast,
      on: (type, callback) => {
        callback({
          val: () => sampleRides[0],
        });
      },
    }));
    ref = jest.fn(() => ridesRef);
    ridesRef = {
      orderByChild,
      off,
    };
  });

  describe('listenForRides', () => {
    it('given firebase returns rides should dispatch with correct rides payload', () => {
      listenForRides()(dispatch, getState);

      expect(getState).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith('rides');
      expect(orderByChild).toHaveBeenCalledTimes(1);
      expect(orderByChild).toHaveBeenCalledWith('postTimestamp');
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: actions.CURRENT_RIDES_CHANGE,
        payload: sampleRides[0],
      });
    });
  });

  describe('stopListenForRides', () => {
    it('should not listen to changes', () => {
      stopListenForRides()(dispatch, getState);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith('rides');
      expect(off).toHaveBeenCalledTimes(1);
    });
  });
});
