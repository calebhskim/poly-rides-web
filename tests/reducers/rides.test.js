import actions from '../../src/constants/actions';
import ridesReducer from '../../src/reducers/rides';

describe('rides reducer', () => {
  it('should handle a ride change', () => {
    expect(
      ridesReducer({ list: [] }, {
        type: actions.CURRENT_RIDES_CHANGE,
        payload: {
          ride1: true,
          ride2: true,
        },
      }),
    ).toEqual({
      list: [{
        ride1: true,
        ride2: true,
      }],
      loadedRowsMap: { 0: true },
    });
  });
});

