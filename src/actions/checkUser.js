export default function checkUser() {
  return (dispatch, getState) => {
    const {
      auth: { user: { fbId, uid } },
      firebase: { app },
    } = getState();
    const userRef = app.database().ref(`users/${uid}`);

    userRef.once('value', (snapshot) => {
      if (snapshot.val() === null) {
        userRef.set({
          fbId,
        });
      }
    });
  };
}