import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainContainer from "../../component/mainContainer/MainContainer";
import { useAppSelector } from "../../store/hooks";
import { SUBMIT, TEXT } from "../../lib/types";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../services/userApi";
import { errorHandler, successHandler } from "../../utils/networkHandler";
import { Bars } from "react-loader-spinner";

const UserDetail = () => {
  const { user } = useAppSelector((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  // Mutation
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const formik = useFormik({
    initialValues: {
      name: user?.first_name,
      job: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name field is required"),
      job: Yup.string().required("Job field is required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      updateUser({ name: values.name, job: values.job, id: user?.id })
        .unwrap()
        .then((res) => {
          setLoading(false);
          successHandler("Profile updated successfully");
        })
        .catch((err) => {
          setLoading(false);
          errorHandler(err);
        });
    },
  });

  // Delete User
  const deleteUserProfile = () => {
    setDeleteLoading(true);
    deleteUser({ id: user?.id })
      .unwrap()
      .then(() => {
        setDeleteLoading(false);
        successHandler("User profile deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        errorHandler(err);
        setDeleteLoading(false);
      });
  };

  return (
    <MainContainer className="h-screen">
      <div className="flex flex-row w-full justify-between">
        <Link to="/">
          <p className="text-white-gray text-base font-semibold font-mono">
            Go Back
          </p>
        </Link>
        {deleteLoading ? (
          <Bars width="20" height="30" color="#F69F13" />
        ) : (
          <div
            onClick={deleteUserProfile}
            className="border cursor-pointer border-secondary-error text-white-main px-1 sm:px-2 md:h-10 h-8 rounded-md md:text-base text-xs flex flex-row items-center justify-center bg-secondary-error transition-all duration-200 ease-in-out hover:bg-secondary-error"
          >
            <p>Delete Account</p>
          </div>
        )}
      </div>
      <div className="w-full h-full bg-white-main mt-5 rounded-md px-5 flex flex-col items-center py-10">
        <img
          src={`${user?.avatar}`}
          alt={`${user?.first_name}`}
          className="block rounded-full xl:w-[150px] xl:h-[150px] md:w-[100px] md:h-[100px] w-[100px] h-[100px]"
        />
        <div className="pt-2">
          <p className="text-white-text font-mono font-semibold md:text-2xl text-base">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-secondary-yellow font-mono font-medium text-center">
            {user?.email}
          </p>
        </div>
        {/* Form */}
        <form
          className="w-full mt-10 md:w-[70%] mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <Input
            label="Name"
            id={TEXT}
            name="name"
            type="name"
            placeholder="example@gmail.com"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name}
            errorText={formik.errors.name}
          />
          <Input
            label="Job"
            id="job"
            name="job"
            type={TEXT}
            placeholder="Developer"
            value={formik.values.job}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.job && formik.touched.job}
            errorText={formik.errors.job}
          />
          <Button
            text="Update"
            type={SUBMIT}
            disabled={formik.values.job === "" || formik.values.name === ""}
            className="mt-5"
            loading={loading}
          />
        </form>
      </div>
    </MainContainer>
  );
};

export default UserDetail;
