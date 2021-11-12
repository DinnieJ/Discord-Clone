import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const IndexPage = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center overflow-x-hidden">
      <FontAwesomeIcon icon={faDiscord} size="10x" color="#ffffff" />
      <h1 className="text-3xl font-bold text-white uppercase my-2 text-center">
        Welcome to Discork
      </h1>
      <p className="text-white my-2 text-center">
        This is a personal project by Datnn in attempt to learn AdonisJS and
        Graphql combines with socket
      </p>
      <a href='https://github.com/DinnieJ/Discord-Clone' className="hover:underline text-indigo-300" target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faGithub} color='#ffffff' className="mx-2"/>Source code</a>
      <button className="text-white bg-indigo-500 hover:bg-indigo-700 px-3 py-2 my-2 rounded-lg transition-all duration-200 ease-in-out font-bold">
        Find someone to talk with
      </button>
    </div>
  );
};

export default IndexPage;
