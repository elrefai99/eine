import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(helmet())
}