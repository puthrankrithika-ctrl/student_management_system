
export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  href,
}) {
  const className =
    variant === "delete"
      ? "text-button delete-button"
      : variant === "secondary"
      ? "button secondary-button"
      : "button";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


