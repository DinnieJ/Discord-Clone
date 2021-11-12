import { faDiscord, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../redux/directmessage";
import MessageBox from "../../../components/dm/MessageBox";

const DirectMessagePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const [convertedMessagesList, setConvertedMessageList] = useState([]);
  const messagesList = useSelector((state) => state.directmessage.messages);

  const pushMessage = () => {
    if (inputMessage.trim() !== "") {
      dispatch(addMessage({ content: inputMessage, username: "Dork2" }));
      setInputMessage("");
    }
  };

  useEffect(() => {
    const _convertedMessageList = messagesList.reduce((prev, current) => {
      if (
        prev.length == 0 ||
        prev[prev.length - 1].username !== current.username
      ) {
        prev.push({ username: current.username, messages: [{ content:current.content, created: current.created }] });
      } else {
        prev[prev.length - 1].messages.push({ content:current.content, created: current.created });
      }
      return prev;
    }, []);

    setConvertedMessageList(_convertedMessageList)
  }, [messagesList]);

  const onPressEnter = (e) => {
    if (e.keyCode === 13) {
      pushMessage();
    }
  };
  return (
    <div className="w-full h-full flex flex-col pt-6 relative">
      <div className="w-full border-b border-gray-500 shadow-xl flex flex-col items-center">
        <div className="w-28 h-28 bg-gray-900 flex justify-center items-center rounded-100">
          <FontAwesomeIcon icon={faDiscord} size="3x" color="#fff" />
        </div>
        <h1 className="font-bold text-white text-center my-3">Friend {id}</h1>
      </div>
      <div className="app-scrollbar flex flex-grow bg-gray-500 mb-12 flex-col overflow-y-auto">
        {convertedMessagesList.map((item, i) => (
            <MessageBox box={item} key={i}/>
        ))}
      </div>

      <div className="h-12 w-full absolute bottom-0 flex items-center px-3 bg-gray-900">
        <input
          className="bg-gray-600 focus:bg-gray-700 focus:outline-none h-8 rounded-3xl px-4 text-white w-5/6"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={onPressEnter}
        />
        <button
          disabled={!inputMessage.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-1 mx-3  rounded-3xl"
          onClick={pushMessage}
        >
          <FontAwesomeIcon icon={faTelegramPlane} size="1x" color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

export default DirectMessagePage;
