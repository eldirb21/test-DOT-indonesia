import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 320;
const guidelineBaseHeight = 548;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.75) =>
  size + (scale(size) - size) * factor;
const deviceHeight = height;
const deviceWidth = width;

export {scale, verticalScale, moderateScale, deviceHeight, deviceWidth};

const font10 = moderateScale(10);
const font12 = moderateScale(12);
const font11 = moderateScale(11);
const font13 = moderateScale(13);
const font14 = moderateScale(14);
const font15 = moderateScale(15);
const font16 = moderateScale(16);
const font17 = moderateScale(17);
const font18 = moderateScale(18);
const font20 = moderateScale(20);
const font22 = moderateScale(22);
const font24 = moderateScale(24);
const font26 = moderateScale(26);
const font28 = moderateScale(28);
const font30 = moderateScale(30);

export const fonts = {
  font10: font10,
  font11: font11,
  font12: font12,
  font13: font13,
  font14: font14,
  font15: font15,
  font16: font16,
  font17: font17,
  font18: font18,
  font20: font20,
  font22: font22,
  font24: font24,
  font26: font26,
  font28: font28,
  font30: font30,
};

export const fontTypes = {
  regular: 'poppins-regular',
  medium: 'poppins-medium',
  semiBold: 'poppins-semiBold',
  bold: 'poppins-bold',
};
