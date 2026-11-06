import "express-async-errors";
import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { erroMidleware } from "./middleware/validadores/erro";

const app = express();
app.use(express.json());
router(app);

app.use(erroMidleware);

AppDataSource.initialize().then(() =>{
    console.log('Database connected')
});


export default app;
