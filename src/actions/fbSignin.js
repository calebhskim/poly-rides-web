export default function fbSignin() {
  return (dispatch, getState) => {
    const { firebase: { app, fbProvider } } = getState();
    const auth = app.auth();

    return auth.signInWithRedirect(fbProvider);
  };
}
