const http = require('http');
const app = require('./app')
const config = require('./utils/config');
const logger = require('./utils/logger');

const sever = http.createServer(app);
sever.listen(config.PORT, () => {
  logger.info(`服务已通过${config.PORT}端口启动`);
});
