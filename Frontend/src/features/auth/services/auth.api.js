import api from "../../../../utils/axios.js";

export async function login(token) {
  try {
    const res = await api.post("api/auth/login", { token });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  try {
    const res = await api.get("api/getme");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  try {
    const res = await api.post("/api/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
}
