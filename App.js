import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import hotBackground from './assets/image/2.3 hot.png'
import coldBackground from './assets/image/2.1 cold.png'
import React, { useState, useEffect, useMemo } from 'react';

const units = {
  celcius: '°C',
  fahrenheit: '°F',
};
const defaultUnit = units.celcius;

export default function App() {
  const [inputValue, setInputValue] = useState(''); 
  const [temperature, setTemperature] = useState('0'); 
  const [currentUnit, setCurrentUnit] = useState(defaultUnit);
  const currentBackground = useMemo (() => {
    const temp = parseFloat(temperature);
    if (
      (currentUnit === units.celcius && temp < 10) ||
      (currentUnit === units.fahrenheit && temp < 50)
    ) {
      return coldBackground;
    } else {
      return hotBackground;
    }
  }, [temperature, currentUnit])

  const convertTemperature = () => {
    let temp = parseFloat(inputValue);
    if (isNaN(temp) || inputValue.trim() === '') {
      setTemperature('0');
      setInputValue('');
      return;
    }
    if (currentUnit === units.celcius) {
      setTemperature(((temp * 9) / 5 + 32).toFixed(2));
      setCurrentUnit(units.fahrenheit);
    } else {
      setTemperature((((temp - 32) * 5) / 9).toFixed(2));
      setCurrentUnit(units.celcius);
    }
    setInputValue(''); 
  };

  return (
    <ImageBackground source={currentBackground} style={styles.container}>
      <View style={styles.workspace}>
        <View>
          <Text style={styles.temperatureText}>
            {temperature} {currentUnit}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter temperature"
            keyboardType="numeric"
            style={styles.input}
            maxLength={7}
            onChangeText={setInputValue}
            value={inputValue}
          />
          <Text style={styles.unit}>{currentUnit}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={convertTemperature}>
          <Text style={styles.buttonText}>
            Convert to {currentUnit === units.celcius ? units.fahrenheit : units.celcius}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  workspace: {
    height: 450,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  temperatureText: {
    fontWeight: 'bold',
    fontSize: 70,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  unit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: 30,
    paddingRight: 25,
  },
  input: {
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
