import React from 'react';

function Msgbox({ user, name, message }) {
  const isUser = user === name;
  const isAdmin = name === 'Admin';

  return (
    <div className="messages mt-2">
      <div className={`msg-container ${isAdmin ? 'admin-msg' : isUser ? 'user-msg' : 'other-msg'}`}>
        {!isAdmin && <p className={isUser ? 'text-danger text-end me-4 mb-0' 

        : 'text-success text-start ms-4 mb-0'}>{isUser ? 'You' : name}</p>}

        <div className={`message ${isUser ? 'user-msg-bubble text-end me-4' :isAdmin? 'b1 text-center ': 'other-msg-bubble text-start ms-4 mb-0'}`}>

        <p id='chats'><span id='chats2'>&nbsp;&nbsp;{  message  }&nbsp;&nbsp;</span></p>
        </div>
      </div>
    </div>
  );
}

export default Msgbox;
