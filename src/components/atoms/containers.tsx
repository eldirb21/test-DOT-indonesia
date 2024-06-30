import {colors, useScreenAnimation} from '@utils';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Animated,
  View,
  StatusBar,
  ViewProps,
  ScrollViewProps,
} from 'react-native';

type CustomProps = {
  children: any;
  scrolled?: boolean;
  style?: any;
  statusbar?: boolean;
  bgColor?: any;
  barStyle?: any;
  refreshControl?: any;
  animated?: boolean;
  onEndReached?: (item: any) => void;
  scrollEventThrottle?: any;
};

const Container: React.FC<
  CustomProps & (ViewProps | ScrollViewProps)
> = props => {
  const {
    children,
    scrolled,
    style,
    statusbar,
    bgColor,
    barStyle,
    refreshControl,
    animated = false,
    onEndReached,
    scrollEventThrottle,
    ...rest
  } = props;

  const slideAnim = useScreenAnimation(animated);

  return (
    <Animated.View
      style={[
        styles.container,
        animated && {transform: [{translateY: slideAnim}]},
      ]}
      {...rest}>
      {statusbar && (
        <StatusBar
          translucent
          backgroundColor={bgColor ? bgColor : colors.backgroundDefault}
          barStyle={barStyle ? barStyle : 'light-content'}
          {...rest}
        />
      )}
      {scrolled ? (
        <ScrollView
          contentContainerStyle={[styles.scrolled, style]}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
          onMomentumScrollEnd={onEndReached}
          scrollEventThrottle={scrollEventThrottle}
          {...rest}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, style]} {...rest}>
          {children}
        </View>
      )}
    </Animated.View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDefault,
  },
  scrolled: {
    flexGrow: 1,
    backgroundColor: colors.backgroundDefault,
  },
});
