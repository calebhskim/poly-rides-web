import lifecycles from './lifecycles';

export default {
  auth: {
    error: {},
    lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
    user: {
      displayName: null,
      email: null,
      emailVerified: false,
      isAnonymous: null,
      photoURL: null,
      refreshToken: null,
      uid: null,
    },
    fbToken: null,
  },
  config: {
    title: 'PolyRides',
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
