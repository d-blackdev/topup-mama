import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenErrorLayout from "../../component/error/ScreenError";
import Loader from "../../component/loader/Loader";
import MainContainer from "../../component/mainContainer/MainContainer";
import SingleUser from "../../component/user/SingleUser";
import { IAuthErrorResponse, IUser } from "../../lib/types";
import { useUserLoginMutation } from "../../services/authApi";
import { useGetUsersMutation } from "../../services/userApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { errorHandler, successHandler } from "../../utils/networkHandler";
import {
  changeMinute,
  changeSecond,
  clearUser,
  loginUser,
  logoutUser,
  saveUser,
} from "../login/loginSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paginate, setPaginate] = useState({
    page: 1,
    totalPage: 0,
    total: 0,
  });
  const { minuteTime, secondTime } = useAppSelector((state) => state.login);
  const [users, setUsers] = useState<IUser[] | []>([]);
  // Mutation
  const [getUser] = useGetUsersMutation();
  const [login] = useUserLoginMutation();

  // Get all users api call
  const getAllUsers = useCallback(() => {
    setLoading(true);
    setError("");
    getUser({ page: paginate.page })
      .unwrap()
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
        setPaginate((p) => ({
          ...p,
          page: res.page,
          total: res.total,
          totalPage: res.total_pages,
        }));
      })
      .catch((err: IAuthErrorResponse<{ error: string }>) => {
        setLoading(false);
        if (err.data.error) {
          setError(err.data.error);
        } else {
          setError("Error fetching users");
        }
      });
  }, [getUser, paginate.page]);

  // UseEffect to call refresh user token
  useEffect(() => {
    if (minuteTime === 1 && secondTime === 0) {
      login({ email: "eve.holt@reqres.in", password: "pistol" })
        .unwrap()
        .then((res) => {
          setLoading(false);
          dispatch(loginUser({ token: res.token }));
          successHandler("Token refreshed successfully");
          navigate("/");
          dispatch(changeSecond(0));
          dispatch(changeMinute(10));
        })
        .catch((err) => {
          setLoading(false);
          errorHandler(err);
        });
    }
  }, [minuteTime, secondTime, dispatch, login, navigate]);

  // Starting the timer on login success
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (secondTime > 0) {
        dispatch(changeSecond(secondTime - 1));
      }
      if (secondTime === 0) {
        if (minuteTime === 0) {
          clearInterval(myInterval);
        } else {
          dispatch(changeSecond(59));
          dispatch(changeMinute(minuteTime - 1));
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });
  // Get User
  useEffect(() => {
    getAllUsers();
    dispatch(clearUser());
  }, [dispatch, getAllUsers]);

  const logout = () => {
    dispatch(logoutUser());
  };

  if (error) {
    return <ScreenErrorLayout error={error} retry={getAllUsers} />;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <MainContainer className="pb-20 h-screen overflow-y-scroll">
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <div>
          {minuteTime === 0 && secondTime === 0 ? (
            <p>Bye Bye!</p>
          ) : (
            <p className="text-[10px] text-primary-light font-mono font-bold">
              Time Remaining:
              <span className="text-xs">
                {minuteTime}:{secondTime < 10 ? `0${secondTime}` : secondTime}
              </span>
            </p>
          )}
        </div>
        <p
          onClick={() => logout()}
          className="cursor-pointer text-primary-light text-sm font-mono font-bold"
        >
          Logout
        </p>
      </div>
      <div className="w-full h-full bg-white-main rounded-md px-5 py-5 overflow-y-auto">
        <div className="border-b border-b-white-lightGray pb-3 w-full flex flex-row">
          <p className="text-xl font-mono font-bold text-white-lightGray">
            All Users
          </p>
        </div>
        {/* Users */}
        <div className="w-full mt-3">
          {users &&
            users.length > 0 &&
            !loading &&
            users.map((item, index) => (
              <SingleUser
                {...item}
                key={index}
                onClick={() => {
                  navigate(`user/${item.id}`);
                  dispatch(saveUser(item));
                }}
              />
            ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;
