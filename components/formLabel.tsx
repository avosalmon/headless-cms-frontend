import React, { ReactNode } from "react";

interface Props {
  htmlFor: string;
  children: ReactNode;
}

export default function FormLabel({ htmlFor, children }: Props): JSX.Element {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-900"
    >
      {children}
    </label>
  );
}
