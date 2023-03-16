import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Calculator from './Calculator';

export default function App() {
  const [input, setInput] = useState(0)
  const [currentOperator, setCurrentOperator] = useState(null) 
  const [result,setResult] = useState(null)
  const [tempInput,setTempInput] = useState(null)
  const [tempOperator, setTempOperator] = useState(null)
  return (
    <SafeAreaView style={styles.container}>
      <Calculator/>
    </SafeAreaView>
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
