import React from "react";
import ChatNavBar from "./ChatNavBar";
import MessageList from "./MessageList";
import { Chatinput } from "./ChatInput.jsx";


const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col">
      <ChatNavBar />
      <MessageList />
      <Chatinput />
    </div>
  );
};

export default ChatArea;
