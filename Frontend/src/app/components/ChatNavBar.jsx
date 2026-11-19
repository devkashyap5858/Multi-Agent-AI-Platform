import React from 'react'
import {MessagesSquare} from "lucide-react"
import { useSelector } from "react-redux";

const ChatNavBar = () => {

  const { selectedConversation } = useSelector((state) => state.conversation);
  return (
    <div className='h-14 flex gap-2.5 items-center px-5 border-b border-white/[0.06] bg-[#0d0f14]'>
      <div>
        <MessagesSquare/>
      </div>
      <div>
        {selectedConversation?.title || "New Chat"}
      </div>
    </div>
  )
}

export default ChatNavBar