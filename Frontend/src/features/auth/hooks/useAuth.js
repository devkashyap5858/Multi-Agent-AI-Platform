import { useDispatch } from "react-redux";
import { setUserData } from "../../../app/redux/auth.slice.js";
import { login, getMe, logOut } from "../services/auth.api.js";
import { User } from "lucide-react";
import {
  setConversation,
  setSelectConversation,
} from "../../../app/redux/conversation.slice.js";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleLogin(token) {
    try {
      const data = await login(token);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function handleGetMe() {
    try {
      const data = await getMe();
      dispatch(setUserData(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function handleLogOut() {
    try {
      const res = await logOut();
      dispatch(setUserData(null));
      dispatch(setConversation([]));
      dispatch(setSelectConversation(null));
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  return { handleLogin, handleGetMe, handleLogOut };
}
