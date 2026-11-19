import React, { useState } from "react";
import {
  Coins,
  LogOut,
  MessagesSquare,
  PanelLeftIcon,
  PenSquare,
  Plus,
  UserIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useChat } from "../../features/chat/hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { setSelectConversation } from "../redux/conversation.slice.js";
import { useAuth } from "../../features/auth/hooks/useAuth.js";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );

  const [imageError, setImageError] = useState(false);
  const [sideBarClose, setSideBarClose] = useState(false);

  console.log(userData);

  const { handleLogOut } = useAuth();
  const { handleGetConversation, handleCreateConversation } = useChat();

  useEffect(() => {
    handleGetConversation();
  }, []);

  if (sideBarClose) {
    return (
      <div className="hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-3 shrink-0 transition-colors duration-150">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
          onClick={() => setSideBarClose(false)}
        >
          <PanelLeftIcon size={18} />
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
          onClick={handleCreateConversation}
        >
          <Plus size={16} />
        </button>

        <div className="flex-1 overflow-y-auto px-2.5 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-10">
          {conversations.map((conv, i) => {
            let isActive = false;

            if (selectedConversation?._id === conv._id) {
              isActive = true;
            }

            return (
              <div
                key={i}
                onClick={() => {
                  dispatch(setSelectConversation(conv));
                }}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                    : "bg-transparent border-transparent"
                }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  <MessagesSquare size={13} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shrink-0">
          {userData?.avatar && !imageError ? (
            <div>
              <img
                className="w-8 h-8 rounded-[10px] object-cover border-2 border-indigo-500/25"
                src={userData?.avatar}
                alt="User Avatar"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
              <UserIcon size={15} className="text-slate-400" />
              <div />
            </div>
          )}
        </div>
      </div>
    );
  }

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
        {conversations.length === 0 ? (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            No Recent Conversations
          </div>
        ) : (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            Recent
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2.5 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {conversations.map((conv, i) => {
            let isActive = false;

            if (selectedConversation?._id === conv._id) {
              isActive = true;
            }

            return (
              <div
                key={i}
                onClick={() => {
                  dispatch(setSelectConversation(conv));
                }}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                    : "bg-transparent border-transparent"
                }`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  <MessagesSquare size={13} />
                </div>
                <span
                  className={` text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}
                >
                  {conv.title || "New Chat"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mx-2.5 bg-white/[0.06]"></div>

        <div className="px-3.5 py-3.5">
          {userData ? (
            <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
              <div className="relative shrink-0">
                {userData?.avatar && !imageError ? (
                  <div>
                    <img
                      className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                      src={userData?.avatar}
                      alt="User Avatar"
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
                    <UserIcon size={15} className="text-slate-400" />
                    <div />
                  </div>
                )}
              </div>

              <div>
                <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                  {userData?.name || "user"}
                </p>
                <p className="text-[11px] text-slate-600 mt-px">
                  {"Free Plan"}
                </p>
              </div>

              <div className="flex gap-1">
                <button className="flex items-center justify-center w-7 h-7 border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150">
                  <Coins size={16} />
                </button>
                <button
                  className="flex items-center justify-center w-7 h-7 border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
