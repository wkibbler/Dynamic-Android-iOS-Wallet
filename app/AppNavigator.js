import {
      createStackNavigator,
      createAppContainer,
    } from 'react-navigation';
import Login from './Login';
import Home from './Home';
import Send from './Send';
import Receive from './Receive';
import Settings from './Settings';
import QrReader from './QrReader';

const RootStack = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      }
    },
    Send: {
      screen : Send,
      navigationOptions: {
        header: null,
      }
    },
    Receive: {
      screen: Receive,
      navigationOptions: {
        header: null,
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      }
    },
    QrReader: {
      screen: QrReader,
      navigationOptions: {
        header: null,
      }
    }
  });

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
