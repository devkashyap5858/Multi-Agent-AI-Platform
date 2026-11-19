import React from "react";
import ChatNavBar from "./ChatNavBar";
import MessageList from "./MessageList";
import { ChatInpu } from "./ChatInpu.jsx";


const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col">
      <ChatNavBar />
      <MessageList />
      <ChatInpu />
    </div>
  );
};

export default ChatArea;
