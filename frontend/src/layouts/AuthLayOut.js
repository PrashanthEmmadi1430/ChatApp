import React from "react";
import { Link, useLocation } from "react-router-dom";

const AuthLayOut = ({ children }) => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <header className="flex justify-between items-center shadow-md">
        <img
          src="https://img.freepik.com/premium-vector/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.jpg?w=996"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="flex gap-4">
          {isRegisterPage && (
            <Link to="/login">
              <button className="bg-primary text-white w-20 h-10 rounded-lg mx-9">Login</button>
            </Link>
          )}
          {isLoginPage && (
            <Link to="/register">
               <button className="bg-primary text-white w-20 h-10 rounded-lg mx-9">Register</button>
            </Link>
          )}
        </div>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
};

export default AuthLayOut;
