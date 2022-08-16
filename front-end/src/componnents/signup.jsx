import { useFormik } from "formik";
import joi from "joi";
import { useState } from "react";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import FormikValidateJoi from "../utils/formikUsingJoi";
import { createUser } from "../service/userService";
import { useNavigate, Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
function SignUp({ redirect }) {
  const navigate = useNavigate();
  const { user } = useAuth();
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
        await createUser({ ...values, cards: [], isVip: false });
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
      <PageHeader title="Sign Up with my awosome app" description="u can open your acc here" />

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
          <button type="submit" disabled={!form.isValid} className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
