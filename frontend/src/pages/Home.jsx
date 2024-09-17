import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logOut, setOnlineUsers, setSocketConnection, setToken, setUser } from "../utils/userSlice";
import SideBar from "../components/SideBar";
import io from "socket.io-client";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const token = useSelector((store) => store?.user?.token);
  const fectchUserDetails = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
    try {
      const response = await axios({
        url: url,
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response?.data?.data));
        dispatch(setToken(localStorage.getItem("token")));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    else fectchUserDetails();
  }, [navigate,fectchUserDetails]);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    dispatch(setSocketConnection(socketConnection))
    socketConnection.on('onlineUser',(data)=>{
        dispatch(setOnlineUsers(data))
    })
    return ()=>{
        socketConnection.disconnect()
    }
  }, []);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SideBar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className={`justify-center items-center  flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
               src="https://img.freepik.com/premium-vector/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.jpg?w=996"
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
  );
};

export default Home;
