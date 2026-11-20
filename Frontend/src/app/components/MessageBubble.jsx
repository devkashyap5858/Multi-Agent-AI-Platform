import React from "react";
import AiMessageFormate from "./AiMessageFormate";

const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full py-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 text-[15px] leading-7 break-words ${
          isUser
            ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-2xl rounded-tr-sm"
            : "bg-white/[0.04] border-white-[0.07] text-slate-200 rounded-2xl rounded-tl-sm "
        }`}
      >
        <AiMessageFormate content={content}/>
      </div>
    </div>
  );
};

export default MessageBubble;
