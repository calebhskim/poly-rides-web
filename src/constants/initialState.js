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
      inGroup: false,
      photoURL: null,
      refreshToken: null,
      uid: null,
    },
  },
  config: {
    ridesDBName: 'rides',
    title: 'PolyRides',
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
