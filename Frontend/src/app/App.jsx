import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import React, { useEffect } from "react";
import api from "../../utils/axios.js";
import Home from "./pages/Home.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";
import { useSelector } from "react-redux";

const App = () => {
  const { userData } = useSelector((state) => state.auth);

  const { handleGetMe } = useAuth();

  async function getMe() {
    try {
      const data = await handleGetMe();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMe();
  }, [userData?.user?._id]);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
