module.exports = {
  // Extend/override the dev server configuration used by CRA
  // See: https://github.com/timarney/react-app-rewired#extended-configuration-options
  devServer: function (configFunction) {
    console.log("dev server overrides");
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      // Default config: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js

      // for https://extensi.io/api/email-validator.php call '/api/email-validator.php?email=' in the code

      const config = configFunction(proxy, allowedHost);

      config.proxy = {
        "/api": {
          target: "https://extensi.io",
          changeOrigin: true,
        },
      };

      return config;
    };
  },
};
