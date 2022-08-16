import { useState } from "react";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import joi from "joi";
import FormikValidateJoi from "../utils/formikUsingJoi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
function SignIn({ redirect }) {
  const { user, login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormikValidateJoi({
      email: joi
        .string()
        .min(6)
        .max(225)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().min(6).max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader title={"sign in"} />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="email"
          label="email"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />
        <Input
          type="password"
          label="password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />

        <div className="my-2">
          <button disabled={!form.isValid} className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default SignIn;

// import { useAuth } from "../context/auth.context";

// const SignIn = ({ redirect }) => {
//   const [error, setError] = useState("");
//   const { user, login } = useAuth();
//   const navigate = useNavigate();
