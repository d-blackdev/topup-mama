import React, { useState } from "react";
import AuthContainer from "../../component/mainContainer/AuthContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EMAIL, PASSWORD, SUBMIT } from "../../lib/types";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import { Link } from "react-router-dom";
import { useUserRegisterMutation } from "../../services/authApi";
import { errorHandler, successHandler } from "../../utils/networkHandler";
import { useAppDispatch } from "../../store/hooks";
import { loginUser, saveUserId } from "../login/loginSlice";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // Mutation
  const [register] = useUserRegisterMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email field is required"),
      password: Yup.string()
        .required("Password field is required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),

    onSubmit: (values) => {
      const { email, password } = values;
      const trimmedValues = {
        email: email.trim(),
        password,
      };
      setLoading(true);
      register(trimmedValues)
        .unwrap()
        .then((res) => {
          setLoading(false);
          successHandler("Account registered successfully");
          dispatch(saveUserId(res.id));
          dispatch(loginUser({ token: res.token }));
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
          Create your new account
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
            text="Register"
            type={SUBMIT}
            className="mt-10"
            loading={loading}
            disabled={
              formik.values.email === "" || formik.values.password === ""
            }
          />
        </form>
        <h6 className="text-sm text-white-lightGray  mt-3">
          Already have an account?
          <Link to="/login">
            <span
              // onClick={() => router.push("/sign-up")}
              className="text-primary-light text-sm font-bold cursor-pointer"
            >
              &nbsp;Login
            </span>
          </Link>
        </h6>
      </div>
    </AuthContainer>
  );
};

export default Register;
