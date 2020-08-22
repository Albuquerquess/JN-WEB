module.exports = {
  webpack: function (config, env) {
    return config;
  },
  jest: function (config) {
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      return config;
    };
  },
  paths: function (paths, env) {
    return paths;
  },
}