import Config from 'react-native-config';
import {getLocales} from 'react-native-localize';

// Default language
let DEFAULT_LANGUAGE = 'en';

const getLanguage = () => {
  const language = getLocales()?.[0];
  try {
    const channel = DEFAULT_LANGUAGE; //language.languageCode;
    if (channel) {
      DEFAULT_LANGUAGE = channel;
      return DEFAULT_LANGUAGE;
    }
    return DEFAULT_LANGUAGE;
  } catch (e) {
    return DEFAULT_LANGUAGE;
  }
};

const envConfig = {
  API_SERVER: Config.API_SERVER,
  API_KEY: Config.API_KEY,
  ENV: Config.ENV,
};

const getEnvConfig = () => {
  return envConfig;
};

export {getLanguage, getEnvConfig};
