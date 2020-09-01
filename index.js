import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import HomeScreen from './components/HomeScreen/HomeScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(HomeScreen));
