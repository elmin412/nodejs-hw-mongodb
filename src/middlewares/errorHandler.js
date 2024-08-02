import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const {status, message} = error;
    res.status(error.status).json({
      status,
      message,
      data: error,
    });
    return;
  }

  const {status = 500, message} = error;
  res.status(500).json({
    status,
    message: "Something went wrong",
    data: error.message,
  });
};