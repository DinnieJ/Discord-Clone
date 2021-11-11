import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import ProfileBlock from "./common/ProfileBlock";
import FriendList from "./index/FriendList";

const SubSidebar = () => {
  const { url } = useRouteMatch();
  const [innerDOM, setInnerDOM] = useState(null);

  useEffect(() => {
    
    if(url.startsWith("/dashboard")) {
        setInnerDOM(<FriendList/>)
    } else {
        setInnerDOM(<div>Nothing</div>)
    }

  }, [url]);
  return (
    <React.Fragment>
      <div className="hide-scrollbar w-60 h-full bg-gray-700 flex flex-col pt-3 pb-12 shadow-md">
        {innerDOM}
        <ProfileBlock />
      </div>
    </React.Fragment>
  );
};

export default SubSidebar;
