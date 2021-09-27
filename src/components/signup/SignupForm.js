import React, { Fragment } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { userService } from "../../services/UserService";

import FormSuccess from "../common/form/FormSuccess";
import FormError from "../common/form/FormError";
import AccountRow from "./AccountRow";
import { getScheme } from "../queries";

const SignupForm = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
    name: Yup.string().required("Name is required"),
    licence: Yup.string().required("Your licence is required"),
    accounts: Yup.array().min(2, "At least one account is required"),
  });

  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();
  let { data: scheme } = useQuery("getScheme", getScheme, { keepPreviousData: true });

  const zones = scheme?.zones || [];
  const keyedZones = zones.reduce((accumulator, item) => {
    accumulator[item.id] = item.name;
    return accumulator;
  }, {});

  return (
    <div className="p-0 pt-3 lg:p-5 mt-3 rounded bg-steel-800 lg:p-5">
      <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Provide your user and account details</h2>
      <p>
        Provide your email address and login details to get access to the trading platform. You will not be able to trade until your water accounts
        and licence are approved.
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          licence: "",
          accounts: [{ waterAccount: "", zoneId: "", allocation: "" }],
        }}
        validationSchema={validate}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);

          const { licence, accounts, ...user } = values;
          accounts.pop();
          user.licence = { licence, schemeId: scheme.id, accounts };

          userService
            .signup(user)
            .then(() => {
              setSuccess(true);
              actions.resetForm();
              setTimeout(() => {
                history.push("/login");
              }, 3000);
            })
            .catch(({ response }) => {
              if (response.data.errors) {
                setFormErrors(response.data.errors.map(({ message }) => message));
              }
              console.error(response);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({ values, isValid, dirty }) => {
          return (
            <Form className="mt-5">
              <FormError show={formErrors.length > 0} errors={formErrors} title="Unable to create account - errors occurred" />

              <FormSuccess show={success}>Your account has been created and is pending approval. Sending you to the login page.</FormSuccess>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 bg-steel-500 rounded">
                  <h4 className="font-semibold my-2">Login Details</h4>

                  <label htmlFor="email" className="text-steel-300 my-2 font-semibold">
                    Email
                  </label>
                  <Field type="email" name="email" className="input text-steel-900 rounded" />
                  <ErrorMessage component="p" name="email" className="mb-3" />

                  <label htmlFor="password" className="text-steel-300 my-2 font-semibold">
                    Password
                  </label>
                  <Field type="password" name="password" autoComplete="signup-password" className="input text-steel-900 rounded mb-5" />
                  <ErrorMessage component="p" name="password" className="mb-3" />

                  <label htmlFor="confirmPassword" className="text-steel-300 my-2 font-semibold">
                    Confirm Password
                  </label>
                  <Field type="password" name="confirmPassword" autoComplete="confirm-password" className="input text-steel-900 rounded mb-5" />
                  <ErrorMessage component="p" name="confirmPassword" className="mb-3" />
                </div>
                <div className="p-5 bg-steel-500 rounded">
                  <h4 className="font-semibold my-2">Licence Details</h4>

                  <label htmlFor="name" className="text-steel-300 mb-2 font-semibold">
                    Name
                  </label>
                  <Field name="name" className="input text-steel-900 rounded" />
                  <ErrorMessage component="p" name="name" className="mb-3" />

                  <label htmlFor="licence" className="text-steel-300 my-2 font-semibold">
                    Licence Number
                  </label>
                  <Field name="licence" autoComplete="confirm-password" className="input text-steel-900 rounded mb-5" />
                  <ErrorMessage component="p" name="licence" className="mb-3" />

                  <h4 className="font-semibold my-2">Water Accounts</h4>
                  <ErrorMessage component="p" name="accounts" className="mb-3" />
                  <FieldArray
                    name="accounts"
                    render={arrayHelpers => {
                      const lastAccount = values.accounts[values.accounts.length - 1];
                      const isAddDisabled =
                        lastAccount.zoneId === "" ||
                        lastAccount.waterAccount === "" ||
                        lastAccount.allocation === "" ||
                        isNaN(lastAccount.allocation);

                      return (
                        <div className="grid grid-cols-3 gap-2 ">
                          <label className="text-steel-300 font-semibold">Account Number</label>
                          <label htmlFor="name" className="text-steel-300 font-semibold">
                            Zone
                          </label>
                          <label htmlFor="allocation" className="text-steel-300 font-semibold">
                            Allocation
                          </label>
                          {values.accounts.map((account, index) => {
                            if (index < values.accounts.length - 1) {
                              return <AccountRow key={index} account={account} zone={keyedZones[account.zoneId]} />;
                            }

                            return (
                              <Fragment key={index}>
                                <Field name={`accounts[${index}].waterAccount`} className="input text-steel-900 rounded" />
                                <Field component="select" name={`accounts[${index}].zoneId`} className="input text-steel-900 rounded">
                                  <option value="">Select a zone</option>
                                  {zones.map(zone => (
                                    <option key={zone.id} value={zone.id}>
                                      {zone.name}
                                    </option>
                                  ))}
                                </Field>
                                <Field name={`accounts[${index}].allocation`} className="input text-steel-900 rounded" />
                              </Fragment>
                            );
                          })}
                          <div className="col-span-2"></div>
                          <div className="text-right">
                            <button
                              type="button"
                              className={`text-steel-white p-2 px-3 rounded-sm bg-steel-200 text-right ${
                                isAddDisabled ? "opacity-25 cursor-default" : ""
                              }`}
                              disabled={isAddDisabled}
                              onClick={event => {
                                event.preventDefault();
                                const latest = values.accounts[values.accounts.length - 1];
                                latest.allocation = latest.allocation * 1000;
                                arrayHelpers.insert(values.accounts.length, { waterAccount: "", zoneId: "", allocation: "" });
                              }}
                            >
                              <i className="fal fa-plus fa-fw mr-2"></i>Add
                            </button>
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="text-right col-span-2">
                  <button
                    type="submit"
                    className={`text-steel-white p-2 px-3 rounded-sm bg-steel-200 text-right
                    ${!(isValid && dirty) ? "opacity-25 cursor-default" : ""}
                  `}
                  >
                    <i className="fal fa-user-plus fa-fw mr-2"></i>Create your Water Ledger Account
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignupForm;
