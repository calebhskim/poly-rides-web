import lifecycles from './lifecycles';

export default {
  firebase: {
    app: null,
  },
  config: {},
  auth: {
    lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
    user: {
      name: null,
    },
  },
};
