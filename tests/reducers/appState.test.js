import actions from '../../src/constants/actions';
import appStateReducer from '../../src/reducers/appState';

describe('appState reducer', () => {
  it('should handle a ride change', () => {
    expect(
      appStateReducer({}, {
        type: actions.CURRENT_RIDES_CHANGE,
        payload: {
          ride1: true,
          ride2: true,
        },
      }),
    ).toEqual({
      feed: {
        ride1: true,
        ride2: true,
      },
    });
  });
});

