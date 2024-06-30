import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Container, Texts} from '@atoms';
import {colors, fonts, fontTypes, scale} from '@utils';
import {Appbar} from '@molecules';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  [x: string]: any;
};

const Profile = (props: Props) => {
  const isFocused = useIsFocused();

  const goBack = () => props.navigation.replace('TabStack');
  return (
    <Container>
      <Appbar withsearch={false} title="Profile" onBack={goBack} />
      <Container animated statusbar bgColor={colors.tintColor}>
        <View style={styles.content}>
          <Avatar />
          <View style={styles.description}>
            <Texts style={styles.name}>Eldir Buulolo</Texts>
            <Texts style={styles.address}>Tangerang, Indonesia</Texts>
          </View>
        </View>
      </Container>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tintColor,
    height: scale(165),
  },
  description: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  name: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: fontTypes.semiBold,
    fontSize: fonts.font14,
    marginBottom: scale(1),
  },
  address: {
    color: colors.white,
    textAlign: 'center',
  },
});
