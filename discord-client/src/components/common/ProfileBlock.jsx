import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import "./ProfileBlock.scss";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/auth";

const ProfileBlock = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <div className="profile-block bg-gray-800 absolute top-0 flex items-center justify-between p-2.5 shadow-xl">
      <div className="flex justify-start items-center">
        <div className="rounded-100 w-8 h-8 bg-gray-600 flex justify-center items-center">
          <FontAwesomeIcon icon={faDiscord} size="1x" color="#ffffff" />
        </div>
        <p className="text-gray-400 font-bold text-sm mx-1">{user?.username}</p>
      </div>
      <button><FontAwesomeIcon icon={faPowerOff} color="#ffffff" size='1x' onClick={() => dispatch(logout())}/></button>
    </div>
  );
};

export default ProfileBlock;
