import React from "react";
import { FieldInputProps, FormikState } from "formik";

type FormikValues = Record<string, unknown>;

interface Props {
  form: FormikState<FormikValues>;
  field: FieldInputProps<string>;
}

export default function TextInput({
  form,
  field,
  ...props
}: Props): JSX.Element {
  return (
    <>
      <input
        {...field}
        {...props}
        className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      {form.errors[field.name] && form.touched[field.name] && (
        <div className="mt-2 text-sm text-red-600">
          {form.errors[field.name]}
        </div>
      )}
    </>
  );
}
