import React, { useState } from "react";
import { PanelLeftIcon, PenSquare, Plus } from "lucide-react";
import { useEffect } from "react";
import { useChat } from "../../features/chat/hooks/useChat";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const conversations = useSelector((state) => state.conversation);

  console.log(conversations);

  const [sideBarClose, setSideBarClose] = useState(false);

  const { handleGetConversation, handleCreateConversation } = useChat();

  useEffect(() => {
    handleGetConversation();
  }, []);

  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
          <div
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-b-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={() => {
              setSideBarClose(true);
            }}
          >
            <PanelLeftIcon />
          </div>
          <span className="text-[16p] font-semibold text-white tracking-tight flex-1">
            CodexAI
          </span>
          <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide cursor-pointer">
            free
          </span>
          <button
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-b-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={() => {
              handleCreateConversation();
            }}
          >
            <PenSquare size={14} />
          </button>
        </div>
        <div className="px-4 pt-4 pb-1">
          <button
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#2509af] rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={() => {
              handleCreateConversation();
            }}
          >
            <Plus size={15} />
            New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
