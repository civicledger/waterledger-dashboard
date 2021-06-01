import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { serviceLoader } from "../../services/serviceLoader";
// import FormSuccess from "../common/form/FormSuccess";
// import FormError from "../common/form/FormError";

const usersService = serviceLoader("Users");

const LoginForm = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  return (
    <div className="p-0 pt-3 lg:p-5 mt-3 rounded bg-steel-800 lg:p-5">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={({ email, password }, actions) => {
          actions.setSubmitting(true);
          usersService
            .login(email, password)
            .then(() => {
              setSuccess(true);
              actions.resetForm();
              setTimeout(() => {
                history.push("/");
              }, 3000);
            })
            .catch(({ response }) => {
              if (response.data.errors) {
                setFormErrors(response.data.errors.map(({ message }) => message));
              }
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({ values }) => (
          <Form>
            {/* <FormError show={formErrors.length > 0} errors={formErrors} title="Unable to log in - errors occurred" /> */}
            {/* <FormSuccess show={success}>Log in success! Sending you to your dashboard.</FormSuccess> */}
            <div className="mb-10">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-3">
                  {formErrors.length > 0 && (
                    <div className="mb-5 p-5 text-sm bg-red-200 rounded-md border-red-400">
                      <h4 className="mb-2 text-md font-semibold">Unable to Log In</h4>
                      <ul>
                        {formErrors.map((error, index) => (
                          <li key={index}>- {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6 text-align m-10">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="col-span-1 sm:col-span-1">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <Field type="email" name="email" className="input text-steel-900 rounded" />
                          <ErrorMessage component="p" className="sm:text-xs text-red-600 pt-2" name="email" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="col-span-1 sm:col-span-1">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <Field type="password" name="password" className="input text-steel-900 rounded mb-5" />
                          <ErrorMessage component="p" className="sm:text-xs text-red-600 pt-2" name="password" />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center">
                      <div className="flex-shrink flex">
                        <div className="flex-shrink justify-center py-2 pr-2 text-sm text-indigo-400">Not a member?</div>
                        <Link
                          to="/signup"
                          className="flex-shrink justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
                        >
                          <i className="fal fa-sign-in mr-2"></i>
                          Sign Up
                        </Link>
                      </div>
                      <div className="flex-grow">
                        <button
                          type="submit"
                          className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <i className="fal fa-sign-in mr-2"></i>
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
