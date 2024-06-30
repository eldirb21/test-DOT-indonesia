module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          // components
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',

          // assets
          '@icons': './src/assets/icons',
          '@images': './src/assets/images',

          // constants
          '@constants': './src/constants',

          // navigate
          '@nav': './src/nav',

          // pages
          '@pages': './src/pages',

          // services
          '@actions': './src/services/actions',
          '@reducers': './src/services/reducers',
          '@store': './src/services/stores',
          '@storeSelector': './src/services/stores.selector',

          // utils
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
