exports.responseSend = (res, statusCode, success, message, data) => {
  res.status(statusCode).send({
    success,
    message,
    data,
  });
};
