
import cors from "cors";
import express from 'express';
import pino from "pino-http"
import env from "./utils/env.js";
import { getContacts, getContactById } from "./services/contact-service.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";


const port = Number(env("PORT", 3000));



const setupServer = () => {
    const app = express();

const logger = pino({
  transport: {
    target: "pino-pretty"
  }
});

app.use(logger);
app.use(cors());

// получения всех контактов
app.get('/contacts', async(req, res) => {
    const data  = await getContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data 
      
    });
  });

// получения одного контакта по id
  app.get("/contacts/:contactId", async(req, res, next) => {
  try {
    const {contactId} = req.params;
    const data = await getContactById(contactId);
    if(!data) {
      return res.status(404).json({
        message: `Сontact with id=${contactId} not found!`
      });
    } 
      res.json({
      status: 200,
      message: `Successfully found contact with id=${contactId}!`,
      data
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    const { status = 500 } = error;
    res.status(status).json({ 
      message: error.message 
    });
  }}
);

  app.use('*', notFoundHandler);
  
  app.use(errorHandler);

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}

export default setupServer;