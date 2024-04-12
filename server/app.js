import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import connectPassport from './utils/provider.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.js';
import itemRoute from './routes/itemRoute.js';
import cors from 'cors';

const app = express();

export default app;

dotenv.config({
  path: './config/config.env',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: false,
      sameSite: false,
    },
  }),
);
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();
app.use('/', (req, res) => {
  res.send('hello');
});
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRouter);
app.use('/api/v1', itemRoute);

app.use(errorMiddleware);
