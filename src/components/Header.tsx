import React from "react";

const Header = () => {
  return (
    <div className="w-full  bg-gray-100 ">
      <div className=" container bg-gray-100 h-[8vh] flex items-center justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-sm ">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Header;
