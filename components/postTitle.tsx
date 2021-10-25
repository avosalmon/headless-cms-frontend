import React, { useMemo } from "react";
import debounce from "lodash/debounce";

interface Props {
  title: string;
  onChange: (value: string) => void;
}

export default function PostTitle({ title, onChange }: Props): JSX.Element {
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), [onChange]);

  return (
    <div className="flex text-lg leading-6 text-gray-900 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Enter title"
        className="w-full p-4 border-none"
        value={title}
        onChange={(event) => debouncedOnChange(event.target.value)}
      />
    </div>
  );
}
