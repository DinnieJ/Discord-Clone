import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../../redux/snackbar";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  ERROR_SNACKBAR,
  SUCCESS_SNACKBAR,
  WARNING_SNACKBAR,
} from "../../constants/snackbar";

const Snackbar = () => {
  const { show, message, type } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const [typeIcon, setTypeIcon] = useState(null);

  useEffect(() => {
    let timeout;
    if (show) {
      timeout = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
    //eslint-disable-next-line
  }, [show]);

  useEffect(() => {
    switch (type) {
      case ERROR_SNACKBAR:
        //eslint-disable-next-line
        setTypeIcon({ color: "#ff0000", icon: faTimesCircle });
        break;
      case SUCCESS_SNACKBAR:
        setTypeIcon({ color: "#00ff00", icon: faCheckCircle });
        break;
      case WARNING_SNACKBAR:
        setTypeIcon({ color: "#ffff00", icon: faExclamationCircle });
        break;
      default:
        break;
    }
  }, [type]);
  return (
    <div className={`absolute w-96 h-16 bg-gray-700 text-white z-50 shadow-lg flex flex-grow items-center justify-between p-5 transition-all duration-300 ease-in-out left-1/2 -ml-48 rounded-md ${show ? 'top-10' : '-top-16'}`}>
      <div className="flex items-center justify-start">
        <FontAwesomeIcon
            icon={typeIcon?.icon ?? faExclamationCircle}
            color={typeIcon?.color ?? "#ffff00"}
            size="2x"
            className='h-full mr-2'
        />
        <div>{message}</div>
      </div>
    <button className="text-white font-bold" onClick={() => dispatch(hideSnackbar())}>
      <FontAwesomeIcon icon={faTimes} size="1x" color="#ffffff"/>
    </button>
    </div>
  );
};

export default Snackbar;
