import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import StateWithFuctionalComponent from './StateWithFuctionalComponent'
import UseEffectWithFunctionalComponent from './UseEffectWithFunctionalComponent'
import CustomHook from './CustomHook';

export default function App() {
  const [isTrue,setIsTrue] = useState(true);
  
  return (
    <View style={styles.container}>
      {/*<StateWithFuctionalComponent/>*/}
      {/*isTrue?<UseEffectWithFunctionalComponent/>:null*/}

      {/*<Button title="toggle" onPress={()=>{setIsTrue(!isTrue)}}/>*/}
      
      <CustomHook/>
    </View>
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
