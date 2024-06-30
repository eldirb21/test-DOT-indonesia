import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from './src/nav/navStack';

type Props = {};

const App = (props: Props) => {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
