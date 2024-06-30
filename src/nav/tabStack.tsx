import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabdata} from './data';
import {Icons, Texts} from '@atoms';
import {colors, fonts, fontTypes, scale} from '@utils';

function MyTabBar({state, descriptors, navigation}: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = null;
        switch (label) {
          case 'Home':
            iconName = 'home-filled';

            break;
          case 'Favorite':
            iconName = 'favorite';
            break;
          case 'Profile':
            iconName = 'account-circle';
            break;

          default:
            break;
        }

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}>
            <Icons
              name={iconName}
              size={fonts.font22}
              color={isFocused ? colors.tintColor : colors.textDisable}
            />
            <Texts
              style={{
                color: isFocused ? colors.tintColor : colors.textDisable,
                fontFamily: fontTypes.medium,
              }}>
              {label}
            </Texts>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      {tabdata.map((x, i) => (
        <Tab.Screen key={i} name={x.name} component={x.path} />
      ))}
    </Tab.Navigator>
  );
}
export default TabStack;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: scale(10),
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    marginBottom: Platform.OS === 'ios' ? scale(10) : 0,
    padding: scale(10),
    width: scale(90),
    margin: scale(1),
  },
});
