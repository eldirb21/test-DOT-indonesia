import colors from './colors';
import {useScreenAnimation, useTextAnimation} from './useAnimation';
import * as type from './constant.type';
import {getLanguage, getEnvConfig} from './env.config';
import Api from './httpClient';
import ENDPOINTS from './api.endpoint';
import httpStore from './localstore';
import {
  fontTypes,
  fonts,
  moderateScale,
  scale,
  verticalScale,
  deviceHeight,
  deviceWidth,
} from './fonts';
export {
  colors,
  useScreenAnimation,
  useTextAnimation,
  fontTypes,
  fonts,
  moderateScale,
  scale,
  verticalScale,
  deviceHeight,
  deviceWidth,
  type,
  getLanguage,
  getEnvConfig,
  Api,
  ENDPOINTS,
  httpStore,
};
