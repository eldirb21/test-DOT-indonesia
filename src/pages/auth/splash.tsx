import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Container, Texts} from '@atoms';
import {colors, fonts, fontTypes, scale} from '@utils';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  [x: string]: any;
};

const Splash = (props: Props) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        validateScreen();
      }, 2000);
    }
  }, [isFocused]);

  const validateScreen = () => {
    props.navigation.navigate('TabStack');
  };

  return (
    <Container style={styles.container} statusbar bgColor={colors.tintColor}>
      <Texts style={styles.text} animated>
        TEST
      </Texts>
      <Texts style={styles.text} animated>
        PT. Digdaya Olah Teknologi (DOT) Indonesia
      </Texts>
      <View style={styles.gap} />
      <ActivityIndicator size={'large'} color={colors.white} animating />
    </Container>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tintColor,
  },
  text: {
    color: colors.white,
    fontFamily: fontTypes.medium,
    fontSize: fonts.font14,
    marginBottom: scale(2),
    textAlign: 'center',
  },
  gap: {
    height: scale(10),
  },
});
