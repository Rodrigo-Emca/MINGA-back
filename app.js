import express from 'express'
import 'dotenv/config.js'
import './config/database.js'
import path from 'path'
import logger from 'morgan'
import indexRouter from './routes/index.js'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'
import { __dirname } from './utils.js';

let app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(errorHandler)

export default app
