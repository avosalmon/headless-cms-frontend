import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Overlay({ children }: Props): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity bg-gray-700 opacity-75">
      {children}
    </div>
  );
}
