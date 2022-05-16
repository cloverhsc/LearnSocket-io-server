import { faker } from '@faker-js/faker';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

// const bodyParser = require('body-parser');
// const cors = require('cors');

// const express = require('express');
const app = express();
const port = 5000;
// const { Server } = require('socket.io');

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
  origin: `http://localhost:${port}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// cors(corsOptions)
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

  /* setInterval(() => {
    const msg = faker.random.word();
    console.log(`Send ${msg} into /chat`);
    socket.send(`${msg}`);
  }, 5000); */
  io.of('/chat').emit('message', 'Hello from server');

  socket.on('join', (data) => {
    console.log(data);
    socket.join(data.room);
    /* setTimeout(() => {
      console.log(`${data.user} joined the ${data.room}`);
      io.to(data.room).emit('message', `${data.username} joined the ${data.room}`);
    }, 8000); */
    console.log(`${data.user} joined the ${data.room}`);
    io.of('/chat').to(data.room).emit('message', `${data.user} joined the ${data.room}`);

  });


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

