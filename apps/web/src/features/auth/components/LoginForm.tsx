import { useState, type FormEvent } from "react";
import { loginWithEmail } from "../services/auth.service";
import { AuthField } from "./AuthField";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to sign in right now. Please try again.";
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginWithEmail(email.trim(), password);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthField
        id="email"
        label="Email Address"
        type="email"
        placeholder="name@example.com"
        icon="email"
        autoComplete="email"
        value={email}
        onChange={setEmail}
      />

      <AuthField
        id="password"
        label="Password"
        type="password"
        placeholder="********"
        icon="lock"
        autoComplete="current-password"
        labelAction={
          <a className="auth-label-action" href="#reset-password">
            Forgot Password?
          </a>
        }
        value={password}
        onChange={setPassword}
        withReveal
      />

      <label className="auth-consent auth-consent--remember">
        <input type="checkbox" />
        <span>Remember this device</span>
      </label>

      {error ? (
        <p className="auth-form-feedback auth-form-feedback--error">{error}</p>
      ) : null}

      <button className="auth-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing In..." : "Sign In"}
        <span aria-hidden="true">-&gt;</span>
      </button>
    </form>
  );
}
