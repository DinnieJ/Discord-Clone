import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavIcon.scss";

const NavIcon = ({ title, to, action }) => {
  let innerDOM = null;
  const { path, url } = useRouteMatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (url.startsWith(to)) setActive(true);
  }, [active, url, to]);
  switch (typeof title) {
    case "object":
      innerDOM = (
        <FontAwesomeIcon
          icon={title}
          size="2x"
          color="#ffffff"
        ></FontAwesomeIcon>
      );
      break;
    case "string":
      const splitTitle = title.split(" ");
      innerDOM = (
        <p className="text-white text-lg">{`${splitTitle[0]
          .substring(0, 1)
          .toUpperCase()}${
          splitTitle[1] ? splitTitle[1].substring(0, 1) : ""
        }`}</p>
      );
      break;
    default:
      innerDOM = <div></div>;
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`w-16 h-16 ${active ? "bg-indigo-500 rounded-1/5" : "bg-gray-600 rounded-100"} hover:bg-indigo-500  hover:rounded-1/5 flex justify-center items-center my-3 transition-all duration-200 ease-in-out`}
      >
        {innerDOM}
      </Link>
    );
  }

  if (action) {
    return (
      <div
        className="cursor-pointer w-16 h-16 bg-gray-600 hover:bg-green-500 rounded-100 hover:rounded-1/5 flex justify-center items-center my-3 transition-all duration-200 ease-in-out"
        onClick={action}
      >
        {innerDOM}
      </div>
    );
  }

  return <div></div>;
};

export default NavIcon;
