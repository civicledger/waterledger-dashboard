import React from "react";
import { useContext, useState } from "react";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { Link, useHistory } from "react-router-dom";

import { ACTIONS, LoginContext } from "../../redux/reducers/login";

import RouteTransition from "./RouteTransition";

import UserService from "../../services/UserService";
const userService = new UserService();

const Login = () => {
  const { dispatch } = useContext(LoginContext);
  const history = useHistory();
  const [formErrors, setFormErrors] = useState([]);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <RouteTransition>
      <h2 className="text-2xl font-semibold mb-5">Log In</h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={({ email, password }, actions) => {
          actions.setSubmitting(true);
          userService
            .logIn(email, password)
            .then(response => {
              dispatch({ type: ACTIONS.SET_USER, payload: { ...response.data, loggedIn: true } });
              userService.saveUser(response.data);
              history.push("/");
            })
            .catch(({ response }) => {
              const errors = response.data.errors.map(error => error.message);
              setFormErrors(errors);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {props => (
          <Form>
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
                          <div className="mt-1 flex rounded-md shadow-sm text-gray-900">
                            <input
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.email}
                              type="text"
                              name="email"
                              id="email"
                              className="p-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                              placeholder=""
                            />
                          </div>
                          <ErrorMessage component="p" className="sm:text-xs text-red-600 pt-2" name="email" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="col-span-1 sm:col-span-1">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm text-gray-900">
                            <input
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.password}
                              type="password"
                              name="password"
                              id="password"
                              className="p-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                              placeholder=""
                            />
                          </div>
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
    </RouteTransition>
  );
};

export default Login;
