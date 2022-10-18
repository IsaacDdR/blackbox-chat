const socket = io.connect();

export const saveMessage = (title) => {
  socket.emit("client:newmessage", {
    title,
  });
};

export const deleteMessage = (id) => {
  socket.emit("client:deletemessage", id);
};

export const updateMessage = (_id, title) => {
  socket.emit("client:updatemessage", {
    _id,
    title,
  });
};

export const loadMessages = (callback) => {
  socket.on("server:loadmessages", callback);
};

export const onNewMessage = (callback) => {
  socket.on("server:newmessage", callback);
};

export const onSelected = (callback) => {
  socket.on("server:selectedmessage", callback);
};

export const getMessageById = (messageId) => {
  socket.emit("client:getmessage", messageId);
};
