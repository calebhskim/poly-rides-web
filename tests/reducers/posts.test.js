import actions from '../../src/constants/actions';
import postsReducer from '../../src/reducers/posts';

describe('posts reducer', () => {
  it('should handle a ride change', () => {
    expect(
      postsReducer({}, {
        type: actions.CURRENT_RIDES_CHANGE,
        payload: {
          ride1: true,
          ride2: true,
        },
      }),
    ).toEqual({
      ride1: true,
      ride2: true,
    });
  });
});

