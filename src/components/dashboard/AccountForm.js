import React from 'react';
import * as Yup from 'yup';
import { FieldLabel } from '../components';

import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object().shape({
  waterAllocationNumber: Yup
    .string()
    .label('Water Allocation Number')
    .required(),
  password: Yup
    .string()
    .label('Password')
    .required()
    .min(8, 'Please enter a password that has more than 8 characters'),
  confirmPassword: Yup
    .string()
    .required()
    .label('Confirm password')
    //.oneOf([this.parent.password], 'Passwords do not match')
  });

const AccountForm = ({ onCancelled, onSaved, initial }) => {

  return <Formik
    initialValues ={{password: '', confirmPassword: '', waterAllocationNumber: ''}}
    validationSchema={ validationSchema }
    onSubmit={async (values, {setSubmitting, resetForm }) => {
      await onSaved({tradingZoneId: initial.tradingZoneId, ...values});
      setSubmitting(false);
      resetForm();
    }}
    render={({ isSubmitting, resetForm }) => <Form>
      <FieldLabel forField="password" text="Password"/>
      <Field type="password" name="password" className="border p-2 w-full" autoComplete="password" disabled={isSubmitting}/>
      <ErrorMessage name="password" component="div" className="text-red text-sm"/>

      <FieldLabel forField="confirmPassword" text="Confirm Password"/>
      <Field type="password" name="confirmPassword" className="border p-2 w-full" autoComplete="password-confirm" disabled={isSubmitting}/>
      <ErrorMessage name="confirmPassword" component="div" className="text-red text-sm"/>

      <FieldLabel forField="waterAllocationNumber" text="Water Allocation Number"/>
      <Field type="text" name="waterAllocationNumber" className="border p-2 w-full" disabled={isSubmitting}/>
      <ErrorMessage name="waterAllocationNumber" component="div" className="text-red text-sm"/>

      <div className="flex justify-end mt-6 pt-4">
        <button type="button" disabled={isSubmitting} onClick={() => {resetForm(); onCancelled()}} className="btn bg-transparent hover:bg-gray-700 text-gray-500 hover:text-gray-100 hover:border-transparent rounded-sm mr-2">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className='btn-blue'>
          {isSubmitting ? <i className="block fal fa-spinner fa-spin"/> : "Create Account"}
        </button>
      </div>
    </Form>}
  />;
};

export default AccountForm;