import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../../utils/firebase.js";
import { setUserData } from "../../../app/redux/auth.slice.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const { handleLogin } = useAuth();

  async function login(token) {
    try {
      const data = await handleLogin(token);
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function googleLogin() {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    login(token);
    console.log(data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ">
      <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
            Welcome To CodexAI
          </h2>
          <p className="text-[13px] text-slate-500">
            please login to continue using the app.
          </p>
        </div>
        <button
          className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer"
          onClick={googleLogin}
        >
          <FcGoogle size={15} />
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
