import { AppRegistry } from 'react-native';
import Hello from './components/hello';

AppRegistry.registerComponent('Hello', () => Hello);
if (typeof window !== 'undefined') {
  AppRegistry.runApplication('Hello', {
    rootTag: document.getElementById('react-root'),
  });
}
