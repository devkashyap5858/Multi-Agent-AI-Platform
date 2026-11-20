import { Mic, Paperclip, Send } from "lucide-react";
import React, { useState } from "react";
import { useAgent } from "../../features/agent/hooks/useAgent";
import { useSelector } from "react-redux";

export const Chatinput = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const [value, setValue] = useState("");
  const { handleSendMessage } = useAgent();

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3 ">
        <textarea
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          placeholder="Ask Anything..."
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
              <Paperclip size={16} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
              <Mic size={16} />
            </button>
          </div>
          <button
            disabled={!value.trim()}
            onClick={() => {
              handleSendMessage(value, selectedConversation?._id);
              setValue("")
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 bg-linear-to-b from-indigo-500 to-violet-700 hover:opacity-90 text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-800"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
