import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
// import { UserContext, ACTIONS } from "../contexts";
import { userService } from "../../services/UserService";
import FormSuccess from "../common/form/FormSuccess";
import FormError from "../common/form/FormError";

const LoginForm = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  // const history = useHistory();

  // const { loginDispatch } = useContext(UserContext);

  return (
    <div className="p-0 pt-3 lg:p-5 mt-3 rounded bg-steel-900 lg:p-5">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={({ email, password }, actions) => {
          setFormErrors([]);
          actions.setSubmitting(true);
          userService
            .login(email, password)
            .then(({ data }) => {
              const { user, token } = data;
              const licences = user.licences;
              delete user.licences;

              const userData = {
                user,
                token,
                licenceId: licences[0].id,
                activeWaterAccount: licences[0].accounts[0].id,
              };

              // loginDispatch({ type: ACTIONS.LOG_IN_USER, payload: { ...userData } });
              userService.saveLocalUser(userData);

              setSuccess(true);
              actions.resetForm();
              setTimeout(() => {
                window.location = "/";
              }, 3000);
            })
            .catch(({ response }) => {
              // if (response.data.errors) {
              //   setFormErrors(response.data.errors.map(({ message }) => message));
              // }
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {() => {
          return (
            <Form className="mt-10">
              <FormError show={formErrors.length > 0} errors={formErrors} title="Unable to log in - errors occurred" />
              <FormSuccess show={success}>Log in success! Sending you to your dashboard.</FormSuccess>
              <div className="grid grid-cols-4 gap-5">
                <div className="col-start-2 col-span-2 p-5 bg-steel-500 rounded">
                  <label htmlFor="email" className="text-steel-300 my-2 font-semibold">
                    Email
                  </label>
                  <Field type="email" name="email" className="input text-steel-900 rounded" />
                  <ErrorMessage component="p" className="mb-3" name="email" />
                  <label htmlFor="password" className="text-steel-300 my-2 font-semibold">
                    Password
                  </label>
                  <Field type="password" name="password" autoComplete="signup-password" className="input text-steel-900 rounded mb-5" />
                  <ErrorMessage component="p" className="mb-3" name="password" />

                  <div className="py-3 bg-gray-50 text-right sm:px-1 flex items-center">
                    <div className="flex-shrink flex">
                      <div className="flex-shrink justify-center py-2 pr-2 text-sm text-indigo-400">Not a member?</div>
                      <Link
                        to="/signup"
                        className="flex-shrink justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-steel-white-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
                      >
                        <i className="fal fa-sign-in mr-2"></i>
                        Sign Up
                      </Link>
                    </div>
                    <div className="flex-grow">
                      <button
                        type="submit"
                        className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-steel-white bg-steel-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <i className="fal fa-sign-in mr-2"></i>
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
