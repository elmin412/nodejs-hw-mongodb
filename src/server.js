
import cors from "cors";
import express from 'express';
import pino from "pino-http"
import cookieParser from "cookie-parser";
import env from "./utils/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";

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
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
// получения всех контактов
app.use("/contacts", contactsRouter);

// получения одного контакта по id
app.use("contact/:contactId", contactsRouter)

app.use('*', notFoundHandler);
  
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}

export default setupServer;