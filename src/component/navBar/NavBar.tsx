import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.login);
  return (
    <div className="w-full h-16 border-b-2 border-b-white-lightGray flex flex-row items-center justify-between">
      {!user ? (
        <h1 className="text-3xl md:text-4xl font-semibold text-white-text">
          Welcome
        </h1>
      ) : (
        <h1 className="text-3xl md:text-4xl font-semibold text-white-text">
          Hi! {user.first_name} {user.last_name}
        </h1>
      )}
      {!user && (
        <Link
          to="user/2"
          className="border border-secondary-yellow text-white-main px-1 sm:px-2 md:h-10 h-8 rounded-md md:text-base text-xs flex flex-row items-center justify-center bg-secondary-yellow transition-all duration-200 ease-in-out hover:bg-secondary-yellow"
        >
          <p>My Account</p>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
