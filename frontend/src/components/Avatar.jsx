import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = ({ src, alt, size = '50px', userId }) => {
  const onlineUsers = useSelector((store) => store.user.onlineUsers || []);
  const isOnline = onlineUsers.includes(userId);

  return (
    <div className={`relative rounded-full  bg-gray-200`} style={{ width: size, height: size }}>
      {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
         
      ) : (
        <span className="text-primary font-bold text-lg">{alt?.charAt(0).toUpperCase()}</span>
      )}
       {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white z-10"></div>
          )}
    </div>
  );
};

export default Avatar;
