const express = require('express');
const cors = require('cors');

// Utils
const { getRandomDelay, getBotResponse, parseResponseDataset, addNewUser, removeUser } = require('./utils');

// Constants
const {
  PORT,
  RESPONSES_FILE_PATH,
  USER_MESSAGE_EVENT,
  BOT_MESSAGE_EVENT,
  BOT_TYPING_EVENT,
  MIN_TYPING_S,
  MAX_TYPING_S,
  MIN_NATURAL_PAUSE_S,
  MAX_NATURAL_PAUSE_S,
  USER_LIST,
  USER_DATA,
  CHAT_MESSAGE_EVENT,
  USER_CHAT_MESSAGE_EVENT,
  ALL_USERS,
  STOP_TYPING_EVENT,
  USER_TYPING_EVENT
} = require('./constants');

const app = express();
const http = require('http').createServer(app);
const router = express.Router();
const io = require('socket.io')(http);

let botResponses = null;
let users = ALL_USERS;
let userTyping = false;

app.use(router);
app.use(cors({ origin: '*' }));
app.use(express.static(__dirname + '/public'));



io.on('connection', (socket) => {
  console.log('Connection', socket.id)
   // Emit on line users, and assign to current user
    users = addNewUser(users, ALL_USERS, socket.id);
    io.emit(USER_LIST, users);
    socket.emit(USER_DATA, users.find(({id}) => id === socket.id));


  //On disconnect, remove user and emit
  socket.on("disconnect", () => {
    users = removeUser(users, socket.id);
    io.emit(USER_LIST, users);
  });

  // Chat message
  socket.on(CHAT_MESSAGE_EVENT, (message) => {
    io.to(message.id).emit(USER_CHAT_MESSAGE_EVENT, { from: socket.id, message: message.body});
  })

  // User Typing
  socket.on(USER_TYPING_EVENT, (to) => {
    if (!userTyping) {
      io.to(to).emit(BOT_TYPING_EVENT, socket.id);
      userTyping = true;
      setTimeout(() => {
        io.to(to).emit(STOP_TYPING_EVENT);
        userTyping = false;
      }, MAX_TYPING_S * 1000)
    }
  })
  
  // Carol Bot
  socket.on(USER_MESSAGE_EVENT, (message) => {
    setTimeout(() => {
      // Don't emit a typing event if we've set typing seconds to 0
      if(MAX_TYPING_S) { socket.emit(BOT_TYPING_EVENT); }
      setTimeout(() => {
        socket.emit(
          BOT_MESSAGE_EVENT,
          { from: 'bot', message: getBotResponse(message.body, botResponses)}
        );
      }, getRandomDelay(MIN_TYPING_S, MAX_TYPING_S));

    }, getRandomDelay(MIN_NATURAL_PAUSE_S, MAX_NATURAL_PAUSE_S));
  });
});

parseResponseDataset(RESPONSES_FILE_PATH).then(parsedResponses => {
  botResponses = parsedResponses;
});

http.listen(PORT, () => {
  console.log(`Carol server listening on *:${PORT} 🚀`);
});
