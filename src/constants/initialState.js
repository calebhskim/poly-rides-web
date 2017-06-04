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
    rides: {
      displayCount: 10,
      fblist: [], // list containing fb post
      isNextLoading: false,
      isPosting: '', // uid of current user used as boolean and id
      isLoading: false, // in the middle of some lookup, i.e. search
      isSearching: false, // search results are being displayed
      list: [],
      searchResults: [], // holds search results
      loadedRowsMap: {}, // True is loaded, false is loading
      clickedRowsMap: {},
      startFrom: {}, // Object to be passed to startAt e.g. { key: '', timestamp: '' }
      totalCount: 0,
    },
    userRidesData: {
      isDrivesLoading: false,
      isRidesLoading: false,
      isRequestsLoading: false,
      drives: [],
      rides: [],
      requests: [],
    },
  },
  firebase: {
    app: null,
    fbProvider: null,
  },
};
