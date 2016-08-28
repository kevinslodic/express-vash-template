exports.DEV = 'dev'
exports.PROD = 'prod'
exports.TEST = 'test'

var env = process.env.NODE_ENV || this.DEV;

var config = {
  global: {
    api: {
      host: '',
      keyString: ''
    }
  },
  prod: {
    staticFilePath: '',
    port: 8081
  },
  test: {
    staticFilePath: '',
    port: 8081
  },
  dev: {
    staticFilePath: '',
    port: 9000
  },
  getConfig: function() {
    var envConfig = this[env];
    var globalConfig = this.global;
    
    return Object.assign({}, envConfig, globalConfig);
  }
}

module.exports = config.getConfig();