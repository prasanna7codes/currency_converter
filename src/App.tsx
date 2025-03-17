/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';



import { currencyByRupee } from './constants';
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';



function App(): React.JSX.Element {
 
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')



  const buttonPressed=(targetValue:Currency)=>{

    if(!inputValue){
      return Snackbar.show({
        text:'Enter a value to convert ',
        backgroundColor:'pink',
        textColor:'black'

      })
    }

    const inputAmount = parseFloat(inputValue)
    if(!isNaN(inputAmount)){
      const convertedValue = inputAmount * targetValue.value 

      const result = `${targetValue.symbol}${convertedValue.toFixed(2)  }`

      setResultValue(result)
      setTargetCurrency(targetValue.name)

    }
    else{
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }

  }



  return (
   <>
    <StatusBar/>
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rupeesContainer}>
          <Text style={styles.rupee}>Rupee</Text>
          <TextInput style={styles.textinput}
          maxLength={10} 
          value={inputValue}
          clearButtonMode="always"
          onChangeText={setInputValue}
          keyboardType="number-pad"
          placeholder="enter amount"
          />
        </View>

        {resultValue && (
          <Text style={styles.resultTxt}>{resultValue}</Text>
        )}
   </View>
        <View style={styles.bottomContainer}>
          <FlatList
             numColumns={3}
             data={currencyByRupee}
             keyExtractor={item=>item.name}
             renderItem={({item})=>(
              <Pressable style={[styles.button,targetCurrency === item.name && styles.selected ]}  onPress={ () => buttonPressed(item)}>
                  <CurrencyButton {...item}/>
              </Pressable>
             )}
             
             
             />
        </View>
    </View>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  rupee: {
    marginRight:8,
    fontSize: 20,
    color: '#000000',
    fontWeight: '800',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 8,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
  buttonText: {
    textAlign: 'center',
  },
  textinput:{
   
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
