import { useDispatch } from "react-redux";
import { setUserData } from "../../../app/redux/auth.slice.js";
import { login, getMe } from "../services/auth.api.js";

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
      dispatch(setUserData(data));
      return data;
    } catch (error) {
      throw error;
    }
  }

  return { handleLogin, handleGetMe };
}
