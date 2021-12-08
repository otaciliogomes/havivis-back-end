require("dotenv").config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import "reflect-metadata";
import "express-async-errors";

import { router } from "./routes";

import './database';

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Error: 001 Interno"
    })
})


app.listen( process.env.PORT || 3334, () => console.log('Server is run!'));

export { app };
