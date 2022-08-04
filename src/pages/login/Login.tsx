import React, { useState } from "react";
import AuthContainer from "../../component/mainContainer/AuthContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EMAIL, PASSWORD, SUBMIT } from "../../lib/types";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { useUserLoginMutation } from "../../services/authApi";
import { errorHandler, successHandler } from "../../utils/networkHandler";
import { loginUser } from "./loginSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useUserLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email field is required"),
      password: Yup.string().required("Password field is required"),
    }),

    onSubmit: (values) => {
      const { email, password } = values;
      const trimmedValues = {
        email: email.trim(),
        password,
      };
      setLoading(true);
      login(trimmedValues)
        .unwrap()
        .then((res) => {
          setLoading(false);
          dispatch(loginUser({ token: res.token }));
          successHandler("User logged in successfully");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          errorHandler(err);
        });
    },
  });
  return (
    <AuthContainer>
      <div className="w-full h-full px-5 py-5">
        <h6 className="md:text-3xl xl:text-4xl text-white-text font-semibold text-center font-sans">
          TopUp Mama
        </h6>
        <p className="text-primary-light text-sm text-center pt-1 font-medium font-mono">
          Login into your account
        </p>
        {/* Form */}

        <form onSubmit={formik.handleSubmit} className="w-full mt-4">
          <Input
            label="Email"
            id={EMAIL}
            name={EMAIL}
            type={EMAIL}
            placeholder="example@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email && formik.touched.email}
            errorText={formik.errors.email}
          />
          <Input
            label="Password"
            type={PASSWORD}
            id={PASSWORD}
            name={PASSWORD}
            placeholder="******"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password && formik.touched.password}
            errorText={formik.errors.password}
          />
          <Button
            text="Login"
            type={SUBMIT}
            className="mt-10"
            loading={loading}
            disabled={
              formik.values.email === "" || formik.values.password === ""
            }
          />
        </form>
        <h6 className="text-sm text-white-lightGray  mt-3">
          Don&apos;t have an account?
          <Link to="/register">
            <span
              // onClick={() => router.push("/sign-up")}
              className="text-primary-light text-sm font-bold cursor-pointer"
            >
              &nbsp;Register
            </span>
          </Link>
        </h6>
      </div>
    </AuthContainer>
  );
};

export default Login;
