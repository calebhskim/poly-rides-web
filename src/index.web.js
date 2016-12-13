import { AppRegistry } from 'react-native';
import App from './components/App';

AppRegistry.registerComponent('App', () => App);
if (typeof window !== 'undefined') {
  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('react-root'),
  });
}
