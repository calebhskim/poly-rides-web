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
    rides: {
      displayCount: 10,
      isNextLoading: false,
      list: [],
      startFrom: {}, // Object to be passed to startAt e.g. { key: '', timestamp: '' }
      totalCount: 0,
    },
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
