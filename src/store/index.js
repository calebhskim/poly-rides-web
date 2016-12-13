import configureStore from './configureStore';
import config from '../reducers/config';

export default function store(initialState = {}) {
  const reducers = {
    // Map of reducers go here
    config
  };
  
  const middlewares = [
    // Add callAPIMiddleware
  ]; 

  // If needed later
  // const storeEnhancers = {};
  
  return configureStore(initialState, reducers, middlewares);
}
