import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormControl } from "./FormControl";
import { countries } from "../Data/Data";

import { StoreOFDataCotext } from "../context/StoreOfDataContext";
import { useContext } from "react";

export const FormContainer = () => {
  const { getTotal, setLogedUser, disabled, setDisapled } =
    useContext(StoreOFDataCotext);
  const initialValues = {
    selectOption: "",
    city: "",
    address: "",
    orderDate: new Date(),
  };
  //validation
  const validationSchema = Yup.object({
    city: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    orderDate: Yup.date().required("Required"),
  });
  function onSubmit(values) {
    //update loged user by  info
    setLogedUser((prev) => {
      prev.invoiceDate = values.orderDate.toDateString();
      prev.country = values.selectOption;
      prev.address = values.address;
      prev.city = values.city;
      return { ...prev };
    });
    if (Array.from(values).every((x) => x !== "")) {
      getTotal();
      setDisapled(false);
    } else return;
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-wrapper">
          <FormControl
            control="date"
            type="date"
            label="Invoice date "
            name="orderDate"
          />
          <FormControl
            control="option"
            type="option"
            label="Country"
            name="selectOption"
            options={countries}
          />
          <FormControl control="input" type="text" label="City" name="city" />
          <FormControl
            control="input"
            type="text"
            label="Address"
            name="address"
          />
          <button
            type="submit"
            className="submit-btn  btn"
            disabled={!disabled}
          >
            submit
          </button>
        </Form>
      </Formik>
     
    </>
  );
};
