import lifecycles from './lifecycles';

export default {
  auth: {
    error: {},
    fbToken: null,
    inGroup: null,
    isFetching: false,
    lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
    user: {
      displayName: '',
      email: null,
      emailVerified: false,
      fbId: null,
      isAnonymous: null,
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
    rides: {},
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
