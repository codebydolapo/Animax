const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

// metro.config.js
const {
    wrapWithReanimatedMetroConfig,
  } = require('react-native-reanimated/metro-config');

module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: './global.css' })