import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCard } from "../service/cardService";
import Input from "./common/input";
import React, { useState } from "react";
import formikUsingJoi from "../utils/formikUsingJoi";
import { useFormik } from "formik";
import joi from "joi";

function EditCard({ card, editCard }) {
  const [error, setError] = useState("");
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
    onSubmit(values) {
      try {
        editCard(card._id, values);
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <div
        class="modal fade"
        id="editmodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form autoComplete="off" noValidate onSubmit={form.handleSubmit}>
                {error && <div className="alert alert-danger ">{error}</div>}
                <Input
                  name="businessName"
                  label="businessName"
                  {...form.getFieldProps("businessName")}
                  error={form.touched.businessName && form.errors.businessName}
                />
                <Input
                  name="businessDiscribe"
                  label="businessDiscribe"
                  {...form.getFieldProps("businessDiscribe")}
                  error={form.touched.businessDiscribe && form.errors.businessDiscribe}
                />
                <Input
                  name="businessAdress"
                  label="businessAdress"
                  {...form.getFieldProps("businessAdress")}
                  error={form.touched.businessAdress && form.errors.businessAdress}
                />
                <Input
                  name="businessPhone"
                  label="businessPhone"
                  {...form.getFieldProps("businessPhone")}
                  error={form.touched.businessPhone && form.errors.businessPhone}
                />
                <Input
                  name="businessPicture"
                  label="businessPicture"
                  {...form.getFieldProps("businessPicture")}
                  error={form.touched.businessPicture && form.errors.businessPicture}
                />
                <div className="my-2">
                  <button
                    disabled={!form.isValid}
                    className="btn btn-success"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditCard;
