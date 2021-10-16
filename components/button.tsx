import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function Button({
  children,
  className = "",
  href = "#",
}: Props): JSX.Element {
  return (
    <a
      href={href}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${className}`}
    >
      {children}
    </a>
  );
}
