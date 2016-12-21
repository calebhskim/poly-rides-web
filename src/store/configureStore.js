import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// TODO(ckim): Add callAPIMiddleWare

// Create a store using redux store functions. reducers is a map of reducers names to their
// corresponding functions. middlewares is an array of middlewares to use. We can possibly
// add storeEnhancers here in the future if needed.
export default function configureStore(initialState = {}, rootReducer, middlewares=[]) {
  const middlewareList = [thunk].concat(middlewares);
  const enhancer = compose(applyMiddleware(...middlewareList));
  
  const store = createStore(rootReducer, initialState, enhancer);
   
  return store;
}
