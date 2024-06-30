import {StyleSheet, TextInput, View, ViewProps} from 'react-native';
import React from 'react';
import Icons from './icons';
import {colors, fonts, scale} from '@utils';

interface Props {
  placeholder?: string;
  value?: any;
  onSearch?: (item: any) => void;
}

const Search: React.FC<ViewProps & Props> = ({
  placeholder,
  value,
  onSearch,
  ...restProps
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onSearch}
        placeholder={placeholder}
        placeholderTextColor={colors.textDisable}
        style={styles.input}
        {...restProps}
      />
      <View style={styles.icon}>
        <Icons name="search" size={fonts.font16} color={colors.textDisable} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(30),
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.borderColor,
    borderRadius: 10,
    marginBottom: scale(8),
    marginHorizontal: scale(20),
  },
  input: {
    flex: 1,
    paddingHorizontal: scale(10),
    padding: 0,
    height: '100%',
    borderRadius: 10,
  },
  icon: {
    width: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
