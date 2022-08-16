// import { toast } from "react-toastify";
import joi from "joi";
import PageHeader from "../componnents/common/pageHeader";
import formikUsingJoi from "../utils/formikUsingJoi";
import { useNavigate } from "react-router-dom";
import { createCard } from "../service/cardService";

import { useFormik } from "formik";
import { useState } from "react";
import Input from "./common/input";

function CreateCard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      businessName: "",
      businessDiscribe: "",
      businessAdress: "",
      businessPhone: "",
      businessPicture: "",
    },
    validate: formikUsingJoi({
      businessName: joi.string().min(2).max(225).required().label("Name"),
      businessDiscribe: joi.string().min(2).max(1024).required().label("Description"),
      businessAdress: joi.string().min(2).max(400).required().label("Address"),
      businessPhone: joi.string().min(9).max(10).required().label("Phone"),
      businessPicture: joi.string().min(11).max(1024).uri().allow("").label("Image"),
    }),
    async onSubmit(values) {
      try {
        await createCard({ ...values, likes: [] });
        navigate("/card/mycards");
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader title="create Card here" description="create a card with iCard" />
      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="text"
          label="Name"
          {...form.getFieldProps("businessName")}
          error={form.touched.businessName && form.errors.businessName}
        />
        <Input
          type="text"
          label="Description"
          {...form.getFieldProps("businessDiscribe")}
          error={form.touched.businessDiscribe && form.errors.businessDiscribe}
        />
        <Input
          type="text"
          label="Address"
          {...form.getFieldProps("businessAdress")}
          error={form.touched.businessAdress && form.errors.businessAdress}
        />
        <Input
          type="text"
          label="Phone"
          {...form.getFieldProps("businessPhone")}
          error={form.touched.businessPhone && form.errors.businessPhone}
        />
        <Input
          type="text"
          label="Image"
          {...form.getFieldProps("businessPicture")}
          error={form.touched.businessPicture && form.errors.businessPicture}
        />
        <div className="my-2">
          <button type="submit" disabled={!form.isValid} className="btn btn-primary">
            create card
          </button>
        </div>
      </form>
    </>
  );
}
export default CreateCard;
