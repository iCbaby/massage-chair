/**
 * @description logger配置
 * @author iC
 */

const loggerConfig = {
  appenders: {
    console: {
      type: 'console'
    },
    errorLogger: {
      type: 'file',
      filename: 'log/error',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 2000,
      numBackups: 3
    },
    httpLogger: {
      type: 'file',
      filename: 'log/http',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 2000,
      numBackups: 3
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'all'
    },
    errorLogger: {
      appenders: ['errorLogger'],
      level: 'error'
    },
    httpLogger: {
      appenders: ['httpLogger'],
      level: 'info'
    }
  }
}

module.exports = { loggerConfig }
