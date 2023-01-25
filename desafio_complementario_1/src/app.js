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

const app = express();



// jsonparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// session config
app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://karamhechoamano:5o2n6vqd1wraEe0b@cluster0.rvafqda.mongodb.net/desafio_complementario_1?retryWrites=true&w=majority",
    dbName: "myFirstDatabase",
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 30
  }),
  secret: '123456',
  resave: true,
  ttl:200,
  saveUninitialized: true
}));

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
  "mongodb+srv://karamhechoamano:5o2n6vqd1wraEe0b@cluster0.rvafqda.mongodb.net/desafio_complementario_1?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log("Could not connect to database");
      return;
    }
    console.log("Connected to DataBase");
  }
);

const httpServer = app.listen(5000, () => {
  console.log("Listening server on port 5000");
});

const io = new Server(httpServer)

app.set('io', io)

