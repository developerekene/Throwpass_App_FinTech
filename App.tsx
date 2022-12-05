import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeBottomNavigation from './src/screens/navigators/HomeBottomNavigation';
import { Provider } from 'react-redux';
import {store} from './src/redux/slices/store'
import { NativeBaseProvider } from 'native-base';
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
      <HomeBottomNavigation/>
      </NativeBaseProvider>
    </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
