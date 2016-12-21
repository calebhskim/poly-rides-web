import configureStore from './configureStore';
import rootReducer from '../reducers';

export default function store(initialState = {}) {
  const middlewares = [
    // Add callAPIMiddleware
  ]; 

  // If needed later
  // const storeEnhancers = {};
  
  const store = configureStore(initialState, rootReducer, middlewares);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
