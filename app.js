import { faker } from '@faker-js/faker';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import * as cloud from './cloud-pod-view.js';

const app = express();
const port = 5000;
const router = express.Router();


const io = new Server(3000, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    maxAge: 3600,
  },
});

var corsOptions = {
  origin: `*`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// cors(corsOptions)
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/cloud/podview/tree', cloud.getTree);
app.get('/cloud/podview/drawerconfig/pod', cloud.getPodDrawerConfig);

io.on('connection', (socket) => {
  console.log('a user connected');


  // socket.send(JSON.stringify({
  //   type: "Hello from server",
  //   content: [1, '2']
  // }));

  socket.on("message", (data) => {
    console.log(data);
    // const packet = JSON.parse(data);

    // switch (packet.type) {
    //   case "Hello from client":
    //     console.log(packet.content);
    //     break;
    //   default:
    //     console.log("Unknown packet type");
    // }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // setInterval(() => {
  //   console.log('sending message');
  //   socket.send('ping');
  // }, 5000);
  // io.to('room1').emit('message', 'Hello from server');
});

io.of('/chat').on('connection', (socket) => {
  console.log('a user connected to /chat');

  io.of('/chat').emit('message', 'Hello from server');
  const roster = socket.adapter.rooms;
  // console.log(...roster.entries())

  socket.on('join', (data) => {
    socket.join(data.room);
    console.log(`${data.user} joined the ${data.room}`);
    io.of('/chat').to(data.room).emit('message', `${data.user} joined the ${data.room}`);
    const roster = socket.adapter.rooms;
    // console.log(...roster.entries())

    socket.on(data.room, (data) => {
      console.log('room', data);
      io.of('/chat').to(data.room).emit(data.room, data.message);
    });
  });

  socket.on('message', (data) => {
    console.log(data);
    io.of('/chat').emit('message', `${data.user} : ${data.message}`);
  });

  socket.on('leave', (data) => {
    console.log(data);
    socket.leave(data.room);
    console.log(`${data.user} left the ${data.room}`);
    io.of('/chat').to(data.room).emit('message', `${data.user} left the ${data.room}`);
  })

  socket.on("disconnect", () => {
    console.log("user disconnected from /chat");
  });

});


/**
 * Get rest api
 */
app.get('/api/get', (req, res) => {
  res.send({
    message: 'Hello World!'
  });
});

/**
 * Post rest api
 */
app.post('/api/post', (req, res) => {
  res.send({
    message: 'Hello World!'
  });
});

/**
 * Save to database
 */
app.post('/api/save', (req, res) => {
  const file = req.body.file;
  const data = req.body.data;
  const fileName = req.body.fileName;
  const filePath = `./data/${fileName}.json`;
  const fs = require('fs');
  if (file) {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.log(err);
      }
      res.send({
        message: 'Successfully saved!'
      });
    });
  } else {
    res.send({
      message: 'Please provide file name!'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

