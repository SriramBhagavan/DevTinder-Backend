const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require("cors");
require("dotenv").config();
const http=require('http')

const app = express();



app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,

}));



app.use(cookieParser());
app.use(express.json());


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');
const paymentRouter = require('./routes/payment');
const initializeSocket = require('./utils/socket');


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/',paymentRouter)
app.use('/',chatRouter) 

const server=http.createServer(app)
initializeSocket(server)



connectDB()
  .then(() => {
      console.log("Database connection established");
      server.listen(3000, () => console.log('server listening on port 3000'));
  })
  .catch((err) => console.error("database cannot be connected", err));
