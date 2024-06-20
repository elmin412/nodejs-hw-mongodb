
import cors from "cors";
import express from 'express';
import pino from "pino-http"
import env from "./utils/env.js";
import { getContacts, getContactById } from "./services/contact-service.js";


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
      data ,
      message: "Successfully found contacts!"
    });
  });

// получения одного контакта по id
  app.get("/contacts/:contactId", async(req, res) => {
    const {contactId} = req.params;
  try {
    
    const data = await getContactById(contactId);
    

    if(!data) {
      return res.status(404).json({
        message: `Сontact with id=${contactId} not found!`
      });
    } 
      res.json({
      data,
      status: 200,
      message: `Successfully found contact with id=${contactId}!`
    });
  } catch (error) {
    res.status(500).json({

        message: 'Something wrong',
        
      })
  }}
);

  app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Not found',
    });
  });


  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}

export default setupServer;