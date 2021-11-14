import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MessageBox = ({ box }) => {
  return (
    <div className="w-full bg-transparent flex flex-col pl-5 py-5 border-b border-gray-400 last:border-0">
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 rounded-100 bg-black flex justify-center items-center">
          <FontAwesomeIcon icon={faDiscord} size="1x" color="#ffffff" />
        </div>
        <h1 className="text-green-300 text-lg font-medium px-2">
          {box.username}
        </h1>
      </div>
      <div className="flex flex-col mt-3">
        {box.messages.map((item, i) => (
          <p key={i} className="text-white pl-12 mr-12 hover:bg-gray-400 rounded-2xl">
            {item.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
