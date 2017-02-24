import lifecycles from './lifecycles';

export default {
  appState: {
    feed: {},
    status: lifecycles.LOADING,
  },
  auth: {
    error: {},
    fbToken: null,
    lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
    user: {
      displayName: '',
      email: null,
      emailVerified: false,
      fbId: null,
      isAnonymous: null,
      inGroup: null,
      photoURL: null,
      refreshToken: null,
      uid: null,
    },
  },
  config: {
    title: 'PolyRides',
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
  posts: {},
};
