import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { USER_STATUS } from "../../constants/user";
import { getFriendsTestData } from "../../utils/testingData";
import { NavLink } from "react-router-dom";

const FriendList = () => {
  const friends = getFriendsTestData();
  return (
    <React.Fragment>
      <div className="cursor-pointer w-full h-8 px-2 bg-gray-800 text-gray-400 text-sm border-gray-500 border-2 flex flex-row justify-start items-center">
        Find or start a conversation
      </div>
      <div className="w-full h-8 my-3 px-2 cursor-pointer text-gray-400 hover:bg-gray-600 flex items-center justify-between font-bold transition duration-200 ease-in-out">
        <p className="inline-block">Direct Message</p>
        <p className="hover:text-white">+</p>
      </div>
      <div className="overflow-y-scroll hide-scrollbar px-1">
        {friends.map((item, i) => (
          <FriendListItem
            key={item.id}
            name={item.name}
            status={item.status}
            id={item.id}
          ></FriendListItem>
        ))}
      </div>
    </React.Fragment>
  );
};

const FriendListItem = ({ status, name, id }) => {
  const getStatusDOM = () => {
    switch (status) {
      case USER_STATUS.ONLINE:
        return <div className="w-full h-full rounded-100 bg-green-500"></div>;
      case USER_STATUS.OFFLINE:
        return (
          <div className="w-full h-full rounded-100 bg-black box-border border-2 border-gray-400"></div>
        );
      default:
        return <div className="w-full h-full rounded-100 bg-yellow-500"></div>;
    }
  };
  return (
    <NavLink to={`/dashboard/dm/${id}`} activeClassName="bg-gray-600" className="flex justify-start items-center hover:bg-gray-600 p-1 my-1 transition duration-200 ease-in-out">
        <div className="avatar p-1.5 rounded-100 bg-gray-900 relative">
          <FontAwesomeIcon icon={faDiscord} size="1x" color="#ffffff" />
          <div
            className={`w-2.5 h-2.5 bg-transparent absolute left-6 bottom-px`}
          >
            {getStatusDOM()}
          </div>
        </div>
        <p className="ml-2 text-gray-400 font-semibold text-sm">{name}</p>
    </NavLink>
  );
};

export default FriendList;
