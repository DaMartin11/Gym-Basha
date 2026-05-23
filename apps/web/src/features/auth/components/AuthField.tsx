import { useMemo, useState, type ReactNode } from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  icon?: "person" | "email" | "lock" | "eye";
  autoComplete?: string;
  labelAction?: ReactNode;
  helper?: string;
  value: string;
  onChange: (value: string) => void;
  withReveal?: boolean;
};

export function AuthField({
  id,
  label,
  type = "text",
  placeholder = "",
  icon = "person",
  autoComplete = "off",
  labelAction,
  helper,
  value,
  onChange,
  withReveal = false,
}: AuthFieldProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const inputType = withReveal && type === "password" && isRevealed ? "text" : type;

  return (
    <div className="auth-field">
      <div className="auth-field__label-row">
        <label htmlFor={id}>{label}</label>
        {labelAction}
      </div>
      <div className="auth-field__control">
        <FieldIcon icon={icon} />
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {withReveal && type === "password" && (
          <button
            type="button"
            aria-label={isRevealed ? "Hide password" : "Show password"}
            onClick={() => setIsRevealed((current) => !current)}
          >
            <FieldIcon icon="eye" />
          </button>
        )}
      </div>
      {helper ? <p>{helper}</p> : null}
    </div>
  );
}

function FieldIcon({ icon = "person" }: { icon?: "person" | "email" | "lock" | "eye" }) {
  const path = useMemo(() => {
    if (icon === "email") {
      return "M4.8 6.5h14.4c.8 0 1.4.6 1.4 1.4v8.2c0 .8-.6 1.4-1.4 1.4H4.8c-.8 0-1.4-.6-1.4-1.4V7.9c0-.8.6-1.4 1.4-1.4Zm.8 2.3 6.4 4.1 6.4-4.1v-.4H5.6v.4Z";
    }

    if (icon === "lock") {
      return "M7 10h1.2V8.2a3.8 3.8 0 0 1 7.6 0V10H17c.8 0 1.4.6 1.4 1.4v6.1c0 .8-.6 1.4-1.4 1.4H7c-.8 0-1.4-.6-1.4-1.4v-6.1C5.6 10.6 6.2 10 7 10Zm3.1 0h3.8V8.2a1.9 1.9 0 0 0-3.8 0V10Z";
    }

    if (icon === "eye") {
      return "M12 6.5c4 0 7 3.2 8.2 5.5-1.2 2.3-4.2 5.5-8.2 5.5S5 14.3 3.8 12C5 9.7 8 6.5 12 6.5Zm0 8.6a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z";
    }

    return "M12 12.2c2 0 3.6-1.7 3.6-3.8S14 4.8 12 4.8 8.4 6.4 8.4 8.4s1.6 3.8 3.6 3.8Zm0 2c-3.1 0-5.6 1.6-5.6 3.6 0 .8.6 1.4 1.4 1.4h8.4c.8 0 1.4-.6 1.4-1.4 0-2-2.5-3.6-5.6-3.6Z";
  }, [icon]);

  return (
    <svg
      className="auth-icon"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
