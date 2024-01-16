import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        //Sign out successfull
      })
      .catch((error) => {
        navigate("/error");
        //an error happened
      });
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      <div className="flex">
        <img
          className="w-12 h-12 p-"
          alt="usericon"
          src="https://images.ctfassets.net/4cd45et68cgf/1pFUjCo5EKjZp9SMoSIsmq/f66c53a4473233fa73f5820bc8a04d8a/NFLX_Profile_10Yrs.jpg?w=2000"
        />
        <button onClick={handleSignOut} className="font-bold">
          (Sign out)
        </button>
      </div>
    </div>
  );
};

export default Header;
