interface Props {
  size?: "small" | "medium";
}

export default function LoadingSpinner({
  size = "medium",
}: Props): JSX.Element {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    medium: "w-10 h-10 border-4",
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        // Tailwind doesn't support border-top-color
        style={{ borderTopColor: "#3498db" }}
        className={`${sizeClasses[size]} border-gray-200 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
