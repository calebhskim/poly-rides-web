import lifecycles from './lifecycles';

export default {
  firebase: {
    app: null,
  },
  config: {},
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
  },
};
