import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts, fontTypes, scale} from '@utils';
import {Icons, Search, Texts} from '@atoms';

type Props = {
  title?: string;
  onBack?: () => void;
  shadow?: boolean;
  onSearch?: (item: any) => void;
  value?: any;
  placeholderSearch?: any;
  styleContainer?: any;
  right?: any;
  withsearch?: boolean;
};

const Appbar = (props: Props) => {
  const {
    value,
    title,
    onBack,
    shadow = true,
    onSearch,
    placeholderSearch,
    styleContainer,
    withsearch = true,
    right,
  } = props;

  var renderDefault = () => (
    <View style={styles.content}>
      <View style={styles.itemSides}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBack}
          style={styles.backBtn}>
          <Icons
            name="arrow-back-ios"
            size={fonts.font16}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemCentered}>
        <Texts style={styles.textTitle}>{title}</Texts>
      </View>
      <View style={styles.itemSides}>{right}</View>
    </View>
  );

  var renderSearch = () => (
    <Search placeholder={placeholderSearch} onSearch={onSearch} value={value} />
  );

  return (
    <View style={[styles.container, styleContainer, shadow && styles.shadow]}>
      {renderDefault()}

      {withsearch && renderSearch()}
    </View>
  );
};

export default Appbar;
const STATUSBAR =
  Platform.OS === 'ios' ? StatusBar.currentHeight || 0 + scale(30) : scale(25);

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR,
    backgroundColor: colors.tintColor,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(40),
    paddingHorizontal: 10,
  },
  itemSides: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 9999,
  },
  itemCentered: {
    flex: 1,
    alignItems: 'center',
  },
  backBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  textTitle: {
    color: colors.white,
    fontSize: fonts.font16,
    fontFamily: fontTypes.medium,
  },
});
