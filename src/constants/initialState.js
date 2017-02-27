import lifecycles from './lifecycles';

export default {
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
  data: {
    messages: null,
    posts: null,
    rides: null,
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
