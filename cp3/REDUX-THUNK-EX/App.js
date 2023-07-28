import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import CounterScreen from './src/screens/CounterScreen';
import { Provider } from 'react-redux';
import store from './src/store/store'; 
export default function App() {
  return (
    
      <SafeAreaView style={{flex:1,marginTop:20}}>
        <Provider store={store}>
        <CounterScreen/>  
        </Provider>
      
      </SafeAreaView>
      
    
  );
}