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
          <Link href="https://www.riotgames.com/en" className="text-blue-400">
              Riot Games website
          </Link>
          <br/>
          <Link href="https://github.com/zentaury" className="text-blue-400">
              Created by Zentaury
          </Link>
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;