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
      isPosting: '', // uid of current user used as boolean and id
      list: [],
      loadedRowsMap: {}, // True is loaded, false is loading
      clickedRowsMap: {},
      startFrom: {}, // Object to be passed to startAt e.g. { key: '', timestamp: '' }
      totalCount: 0,
    },
    userRides: {
      isLoading: false,
      list: [],
    },
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
