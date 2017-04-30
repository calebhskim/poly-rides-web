import actions from '../constants/actions';

export default function post(ride) {
  return (dispatch, getState) => {
    const {
      auth: { user: { uid } },
      firebase: { app },
    } = getState();
    const rides = app.database().ref('rides');
    const users = app.database().ref('users');
    const newPostKey = rides.push().key;
    const newRide = {};
    const postCB = (err) => {
      // TODO: Properly handle errors
      if (err) {
        console.log('POST ERR :: ', err);
        return Promise.reject();
      }

      dispatch({
        type: actions.POST_RIDE_SUCCESS,
      });

      return Promise.resolve();
    };

    dispatch({
      type: actions.POST_RIDE_START,
      payload: uid,
    });

    newRide[`/${newPostKey}/`] = {
      id: newPostKey,
      ...ride,
    };

    const updateActions = [
      rides.update(newRide, postCB),
      users.child(`${uid}/posts/${newPostKey}`).set(true),
    ];

    return Promise.all(updateActions);
  };
}
