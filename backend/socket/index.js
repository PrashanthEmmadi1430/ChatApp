const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const UserService = require("../services/user-service");
const UserRepository = require("../repository/user-repository");
const ConversationService = require("../services/conversaiton-service");
const MessageService = require("../services/message-service");
const getConversation = require("../helpers/getConversation");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FORNTEND_URL,
    credentials: true,
  },
});

const onlineUser = new Set();
io.on("connection", async (socket) => {
    console.log("Connected", socket.id);
  
    // Extract the token from the socket handshake
    const token = socket.handshake.auth.token;
  
    // Fetch the current user details using UserService
    const user = await new UserService().getUserDetails(token);
  
    // Join the user to their personal room
    socket.join(user?._id.toString());
  
    // Add the user to the online users set
    onlineUser.add(user?._id.toString());
  
    // Emit the updated list of online users to everyone
    io.emit("onlineUser", Array.from(onlineUser));
  
    // Listen for the 'messagepage' event to fetch messages and user data
    socket.on("messagepage", async (userId) => {
      // Fetch the user details of the chat partner using UserRepository
      const messageUser = await new UserRepository().getUserById(userId);
  
      // Emit the user details of the chat partner to the client
      socket.emit("messageUser", {
        _id: messageUser?._id,
        name: messageUser?.name,
        email: messageUser?.email,
        profile_pic_url: messageUser?.profile_pic_url,
        online: onlineUser.has(userId),
      });
  
      // Fetch the previous conversation messages between the two users
      const getConversationMessage = await new ConversationService().GetConversation({
        $or: [
          { sender: user?._id, receiver: userId },
          { sender: userId, receiver: user?._id },
        ],
      });
  
      // Emit the previous messages to the client
      socket.emit("message", getConversationMessage?.messages || []);
    });
  
    // Listen for the 'new message' event to handle new messages
    socket.on("new message", async (data) => {
      // Fetch the conversation between the two users or create a new one
      let conversation = await new ConversationService().GetConversation({
        $or: [
          { sender: data?.sender, receiver: data?.receiver },
          { sender: data?.receiver, receiver: data?.sender },
        ],
      });
  
      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = await new ConversationService().CreateConversation({
          sender: data?.sender,
          receiver: data?.receiver,
        });
      }
  
      // Create and save the new message using MessageService
      const message = await new MessageService().CreateMessage({
        text: data.text,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        msgByUserId: data?.msgByUserId,
      });
  
      // Update the conversation with the new message
      await new ConversationService().UpdateConversation(
        { _id: conversation?._id },
        { $push: { messages: message?._id } }
      );
  
      // Fetch the updated conversation messages
      const getConversationMessage = await new ConversationService().GetConversation({
        $or: [
          { sender: data?.sender, receiver: data?.receiver },
          { sender: data?.receiver, receiver: data?.sender },
        ],
      });
  
      // Emit the updated messages to both the sender and receiver
      io.to(data?.sender).emit("message", getConversationMessage?.messages || []);
      io.to(data?.receiver).emit("message", getConversationMessage?.messages || []);
  
      // Emit the updated conversations to both the sender and receiver
      const conversationSender = await getConversation(data?.sender);
      const conversationReceiver = await getConversation(data?.receiver);
      io.to(data?.sender).emit("conversation", conversationSender);
      io.to(data?.receiver).emit("conversation", conversationReceiver);
    });
  
    // Listen for the 'sidebar' event to fetch conversation data
    socket.on("sidebar", async (currentUserId) => {
  
      // Fetch the user's conversations
      const conversation = await getConversation(currentUserId);
  
      // Emit the conversation data to the client
      socket.emit("conversation", conversation);
    });
  
    // Listen for the 'seen' event to mark messages as seen
    socket.on("seen", async (msgByUserId) => {
      // Fetch the conversation between the current user and the other user
      let conversation = await new ConversationService().GetConversation({
        $or: [
          { sender: user?._id, receiver: msgByUserId },
          { sender: msgByUserId, receiver: user?._id },
        ],
      });
  
      // Mark all messages from the other user as seen
      await new MessageService().UpdateManyMessages(
        { _id: { $in: conversation?.messages || [] }, msgByUserId },
        { $set: { seen: true } }
      );
  
      // Emit the updated conversations to both users
      const conversationSender = await getConversation(user?._id?.toString());
      const conversationReceiver = await getConversation(msgByUserId);
      io.to(user?._id?.toString()).emit("conversation", conversationSender);
      io.to(msgByUserId).emit("conversation", conversationReceiver);
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      // Remove the user from the online users set
      onlineUser.delete(user?._id?.toString());
  
      console.log("Disconnected:", socket.id);
    });
  });
  

module.exports = {
  app,
  server,
};
