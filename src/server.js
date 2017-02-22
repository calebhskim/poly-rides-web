import { AppRegistry } from 'react-native';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import express from 'express';
import bodyParser from 'body-parser';

import App from './containers/App';
import config from './config';
import initialState from './constants/initialState';
import Store from './store/configureStore';

const app = express();

function renderFullPage(html, preloadedState) {
  return (`
    <!doctype html>
    <html>
      <head>
        <title>PolyRides</title>
      </head>
      <body>
        <div id='root'>${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `);
}

function handleRender(req, res) {
  const store = new Store(initialState);
  // register the app
  AppRegistry.registerComponent('App', () => App);

  // prerender the app
  const { element, stylesheet } = AppRegistry.getApplication('App', { /* Initial props */ });
  const html = ReactDOMServer.renderToString(element);

  const html = renderToString(
    <Provider store={ store }>
      <App />
    </Provider>
  );
  
  // Grab the initial state from our Redux store
  const preloadedState = store.getState();
  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState));
}

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.port || config.http);
app.use(bodyParser.json());
app.use(handleRender);
app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
