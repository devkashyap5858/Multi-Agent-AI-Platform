import React from "react";
import Login from "../../features/auth/pages/Login";
import { useSelector } from "react-redux";
import Sidebar from "../components/SideBar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import ArtiFact from "../components/ArtiFact.jsx";

const Home = () => {
  const { userData } = useSelector((state) => state.auth);

  console.log(userData);
  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      <Sidebar/>
      <ChatArea />
      <ArtiFact />
      {!userData && <Login />}
    </div>
  );
};

export default Home;
