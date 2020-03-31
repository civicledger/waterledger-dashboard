import React from 'react';
import * as Yup from 'yup';
import { FieldLabel } from '../components';

import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object().shape({
  password: Yup
    .string()
    .label('Password')
    .required()
    .min(8, 'Please enter a password that has more than 8 characters')
  });

const PasswordForm = ({ onCancelled, onSaved }) => {

  return <Formik
    initialValues ={{password: ''}}
    validationSchema={ validationSchema }
    onSubmit={async (values, {setSubmitting, resetForm, setErrors }) => {
      try {
        await onSaved(values);
        resetForm();
      } catch (error) {
        if (error.message.includes('wrong password')) {
          setErrors({ password: 'Wrong password used. Please try again.' });
        }
      }
      setSubmitting(false);
    }}
    render={({ isSubmitting, resetForm }) => <Form>
      <FieldLabel forField="password" text="Password"/>
      <Field type="password" name="password" className="border p-2 w-full" autoComplete="password" disabled={isSubmitting}/>
      <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>

      <div className="flex justify-end mt-6 pt-4">
        <button type="button" disabled={isSubmitting} onClick={() => {resetForm(); onCancelled()}} className="btn bg-transparent hover:bg-gray-700 text-gray-500 hover:text-gray-100 hover:border-transparent rounded-sm mr-2">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className='btn-blue'>
          {isSubmitting ? <i className="fal fa-spinner fa-spin fa-fw "/> : <i className="fal fa-unlock-alt fa-fw"/>}
          Sign In
        </button>
      </div>
    </Form>}
  />;
};

export default PasswordForm;