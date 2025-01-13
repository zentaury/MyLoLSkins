import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          This product is not endorsed, certified or otherwise approved in any way by Riot Games, Inc. or any of its affiliates.
        </p>
        <p>
          All trademarks and copyrights related to the League of Legends game and its content are the property of Riot Games, Inc.
        </p>
        <p>
          For more information, visit the official{" "}
          <Link href="https://www.riotgames.com/en" passHref legacyBehavior>
            <a className="text-blue-400" target="_blank" rel="noopener noreferrer">
              Riot Games website
            </a>
          </Link>
          <br></br>
          <Link href="https://github.com/zentaury" passHref legacyBehavior>
            <a className="text-blue-400" target="_blank" rel="noopener noreferrer">
              Created by Zentaury
            </a>
          </Link>.
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;