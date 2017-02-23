import setNavTitle from '../../src/actions/setNavTitle';
import types from '../../src/constants/actions';

describe('nav bar title action', () => {
  it('should change nav bar title', () => {
    const text = 'ridePage';
    const expectedAction = {
      type: types.NAV_BAR_TITLE_CHANGE,
      payload: {
        newTitle: text,
      },
    };

    expect(setNavTitle(text)).toEqual(expectedAction);
  });
});
