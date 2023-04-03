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
import initialazePassport from "./config/passport.config.js";
import passport from 'passport'
import cookieParser from 'cookie-parser'
import config from "./config/config.js";
import errorHandler from "./middlewares/errorHandler.js";
import { addLogger } from "./utils/logger.js";

const PORT = config.port
const app = express();


// jsonparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// logger
app.use(addLogger)


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
app.get('/api/loggerTest', (req,res,next)=> {
  req.logger.error('message: error')
  req.logger.warn('message: warn')
  req.logger.info('message: info')
  req.logger.http('message: http')
  req.logger.verbose('message: verbose')
  req.logger.debug('message: debug')
  res.send({message: 'Testing logger....'})
})

// errorHandler middleware
app.use(errorHandler)

// server and db config and init (now in factory)
// mongoose.connect(
//   config.mongoUrl,
//   (err) => {
//     if (err) {
//       console.log("Could not connect to database");
//       return;
//     }
//     console.log("Mongo db connected");

//   }
// );

const httpServer = app.listen(PORT, () => {
  console.log(`Listening server on port ${PORT}`);
});

const io = new Server(httpServer)

app.set('io', io)

  io.on('connection', (socket) => {
    socket.removeAllListeners()
    socket.on('productAdded', data=> {
      io.emit('totalQuantityInCart', data)
    })
  })

