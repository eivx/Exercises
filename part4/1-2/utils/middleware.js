const logger = require('./logger');
const requestLogger = (req, res, next) => {
  logger.info('方法', req.method);
  logger.info('路径', req.path);
  if (Object.keys(req.body).length > 0) {
    logger.info('上传内容', req.body);
  }
  logger.info('---');
  next();
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: '无效路径' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
