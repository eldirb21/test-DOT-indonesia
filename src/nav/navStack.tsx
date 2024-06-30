import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {navdata} from './data';

const Stack = createStackNavigator();

function NavStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {navdata.map((x, i) => (
        <Stack.Screen key={i} name={x.name} component={x.path} />
      ))}
    </Stack.Navigator>
  );
}

export default NavStack;
