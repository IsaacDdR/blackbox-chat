import Msg from "./models/Msg";

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("new socket on:", socket.id);

    const emitMessages = async () => {
      const messages = await Msg.find();
      socket.emit("server:loadmessages", messages);
    };
    emitMessages();

    socket.on("client:newmessage", async (data) => {
      const newMessage = new Msg(data);
      const savedMessage = await newMessage.save();
      io.emit("server:newmessage", savedMessage);
    });

    socket.on("client:deletemessage", async (messageId) => {
      await Msg.findByIdAndDelete(messageId);
      emitMessages();
    });

    socket.on("client:getmessage", async (messageId) => {
      const message = await Msg.findById(messageId);
      socket.emit("server:selectedmessage", message);
    });

    socket.on("client:updatemessage", async (updatedMessage) => {
      await Msg.findByIdAndUpdate(updatedMessage._id, {
        title: updatedMessage.title,
      });
      emitMessages();
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
