import { useFormik } from "formik";
import joi from "joi";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import FormikValidateJoi from "../utils/formikUsingJoi";
import { createUser } from "../service/userService";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function SignUpBiz({ redirect }) {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: FormikValidateJoi({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi.string().min(6).required(),
      name: joi.string().min(2).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, cards: [], isVip: true });
        await login({ email: values.email, password: values.password });

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

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title="Sign Up for Business with my app"
        description="Open a new account its free!"
      />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="email"
          label="Email"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />
        <Input
          type="password"
          label="Password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />
        <Input
          type="name"
          label="Name"
          {...form.getFieldProps("name")}
          error={form.touched.name && form.errors.name}
        />

        <div className="my-2">
          <button disabled={!form.isValid} className="btn btn-primary">
            Business Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpBiz;
