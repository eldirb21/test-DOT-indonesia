import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Texts from './texts';
import {colors, fonts, fontType} from '@constants';
import {IcCheck, IcEyeClose, IcEyeOpen} from '@icons';
import Icons from './icons';

type Props = {
  title?: string;
  error?: string;
  secureText?: boolean;
  style?: any;
  checked?: boolean;
  value?: any;
  forgotPass?: any;
  onForgotPass?: () => void;
  onChangeText?: (item: any) => void;
  placeholder?: string;
  autoCorrect?: boolean;
  custom?: any;
  textStyle?: any;
  multiline?: boolean;
  inputStyle?: any;
  containerStyle?: any;
};

const Textinputs: React.FC<TextInputProps> = ({
  style,
  title,
  error,
  secureText,
  checked,
  forgotPass,
  value,
  onForgotPass,
  onChangeText,
  placeholder,
  autoCorrect,
  custom,
  textStyle,
  multiline = false,
  inputStyle,
  containerStyle,
  ...res
}: Props) => {
  const [showText, setshowText] = useState(true);
  return (
    <View style={style}>
      {title && <Texts style={textStyle}>{title}</Texts>}
      <View
        style={[
          {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: error ? colors.btnRed : colors.borderColor,
          },
          containerStyle,
        ]}>
        <TextInput
          secureTextEntry={secureText ? showText : false}
          style={[
            styles.input,
            inputStyle,
            {color: error ? colors.btnRed : colors.black},
          ]}
          placeholder={placeholder}
          value={value}
          autoCorrect={autoCorrect}
          onChangeText={onChangeText}
          multiline={multiline}
          {...res}
        />
        {secureText && (
          <TouchableOpacity
            onPress={() => setshowText(!showText)}
            activeOpacity={0.9}
            style={styles.icon}>
            {showText ? <IcEyeOpen /> : <IcEyeClose />}
          </TouchableOpacity>
        )}
        {forgotPass && (
          <TouchableOpacity
            onPress={onForgotPass}
            activeOpacity={0.9}
            style={styles.icon}>
            <Texts style={styles.underline}>{'Forgot'}</Texts>
          </TouchableOpacity>
        )}
        {custom}
        {checked && (
          <View style={styles.icon}>
            {value ? (
              !error ? (
                <IcCheck />
              ) : (
                <Icons name="close" size={18} color={colors.btnRed} />
              )
            ) : null}
          </View>
        )}
      </View>
      {error && <Texts style={styles.error}>{error}</Texts>}
    </View>
  );
};

export default Textinputs;

const styles = StyleSheet.create({
  input: {
    fontFamily: fontType.regular,
    fontSize: fonts.font12,
    borderRadius: 6,
    textDecorationLine: 'none',
    textDecorationColor: 'transparent',
    padding: 0,
    paddingVertical: 4,
    flex: 1,
  },
  error: {color: colors.btnRed},
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
