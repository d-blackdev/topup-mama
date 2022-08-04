import React from "react";
import { IUser } from "../../lib/types";

interface SingleUserProps extends IUser {
  onClick: () => void;
}

const SingleUser: React.FC<SingleUserProps> = ({
  first_name,
  avatar,
  onClick,
  email,
  last_name,
}) => {
  return (
    <div
      className="w-full mb-2 border-b border-b-white-lightGray flex flex-row items-center pb-5 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <img
          src={`${avatar}`}
          alt={`${first_name}`}
          className="block rounded-full xl:w-[100px] xl:h-[100px] md:w-[70px] md:h-[70px] w-[50px] h-[50px]"
        />
      </div>
      <div className="ml-4 pt-1">
        <p className="text-white-text font-mono font-semibold md:text-xl text-base">
          {first_name} {last_name}
        </p>
        <p className="text-xs sm:text-xs text-secondary-yellow font-mono font-medium">
          {email}
        </p>
      </div>
    </div>
  );
};

export default SingleUser;
