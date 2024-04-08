import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/chatlogo.png';
import { Link, useLocation } from 'react-router-dom';
import Msgbox from './Msgbox';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Redux/chatSlice";

function ChatPage() {
  const location = useLocation();
  const user = location.state;
  const [typeMessage, setTypeMessage] = useState("");
  const [newSocket, setNewSocket] = useState();
  const [id, setUserId] = useState();
  const boxref = useRef(null);
  const dispatch = useDispatch();
  const datared = useSelector(state => state.chatReducer);

  useEffect(() => {
    const socket = io("https://fschatapp-mvj6.onrender.com");
    setNewSocket(socket);

    socket.on("connect", () => {
      setUserId(socket.id);
      socket.emit('joined', { user });
    });

    socket.on('welcome', (data) => {
      dispatch(setChat(data));
    });

    socket.on('userJoined', (data) => {
      dispatch(setChat(data));
    });

    socket.on('sendMessage', (data) => {
      dispatch(setChat(data));
    });

    socket.on('leave', (data) => {
      dispatch(setChat(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const send = () => {
    if (typeMessage !== "") {
      newSocket.emit('message', { message: typeMessage, id });
      setTypeMessage("");
    }
  };

  useEffect(() => {
    boxref.current?.lastElementChild?.scrollIntoView();
  }, [datared]);
  

  return (
    <>
      <div className="body2 bg-dark">

        <div className="row chatpage  shadow d-flex justify-content-center align-items-center w-100 mt-4">

          
            <div className="row chatborder text-light bg-secondary p-3 w-75">
              <span><Link to={'/'}><i className="fa-solid fa-chevron-left" style={{ color: "#ffffff" }}></i></Link>&ensp; <i>Log Out</i></span>
            </div>

            <div className='whtapp' style={{width:'75%',height:'70vh',marginTop:'0px'}}>
  
            <div ref={boxref} className="chatpart w-100">
              {datared && datared.map((item, index) => (
                <Msgbox key={index} user={user} name={item.user} message={item.message} />
              ))}
            </div>

            <div className="textmsg mt-0" style={{height:"150px"}}>
                <input type="text" className=" inpbx mt-5 me-3" placeholder='  Message' onChange={(e) => setTypeMessage(e.target.value)} value={typeMessage} style={{ height: '40px' }} />
                <button onClick={send} className='snt mt-5' style={{ width: '11%', height: '45px',paddingLeft:'1px',paddingTop:'4px' }}><i className="fa-regular fa-paper-plane" style={{ color: "#fcfcfc" }}></i></button>
              </div>
          </div>

        </div>
        
      </div>
    </>
  );
}

export default ChatPage;
