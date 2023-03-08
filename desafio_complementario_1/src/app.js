import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRoute from "./routes/carts.router.js";
import messagesRoute from "./routes/messages.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import { Server } from "socket.io";
import session from 'express-session'
import MongoStore from 'connect-mongo'
import initialazePassport from "./config/passport.config.js";
import passport from 'passport'
import cookieParser from 'cookie-parser'
import config from "./config/config.js";

const PORT = config.port
const app = express();

const dbName = config.dbName

// jsonparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


// session config

// app.use(session({
//   store: MongoStore.create({
//     mongoUrl: config.mongoUrl,
//     dbName,
//     mongoOptions: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     },
//     ttl: 30
//   }),
//   secret: '123456',
//   resave: true,
//   ttl:200,
//   saveUninitialized: true
// }));

// Seteo de passport en app
initialazePassport()
app.use(passport.initialize())
// app.use(passport.session())

// static files config
app.use(express.static(__dirname + "/public"));

// views engine config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

// routes config
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/users", usersRouter);

// server and db config and init
mongoose.connect(
  config.mongoUrl,
  (err) => {
    if (err) {
      console.log("Could not connect to database");
      return;
    }
    console.log("Connected to DataBase");
  }
);

const httpServer = app.listen(PORT, () => {
  console.log(`Listening server on port ${PORT}`);
});

const io = new Server(httpServer)

app.set('io', io)

