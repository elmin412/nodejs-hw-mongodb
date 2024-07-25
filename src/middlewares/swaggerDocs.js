import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/contacts.js';

const swaggerDocs = () => {
  try {    

    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    console.log(swaggerDoc)
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
export default swaggerDocs;