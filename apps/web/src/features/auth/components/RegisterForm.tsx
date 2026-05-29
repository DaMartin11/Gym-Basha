import { useState, type FormEvent } from "react";
import { registerWithEmail } from "../services/auth.service";
import { AuthField } from "./AuthField";
import { useNavigate } from "react-router-dom";


function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to create account right now. Please try again.";
}

export function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!consentAccepted) {
      setError("Please accept Terms of Service and Privacy Policy to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      navigate("/onboarding", { replace: true });
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthField
        id="full-name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon="person"
        autoComplete="name"
        value={fullName}
        onChange={setFullName}
      />

      <AuthField
        id="email"
        label="Email Address"
        type="email"
        placeholder="hello@gymbasha.com"
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
        autoComplete="new-password"
        helper="Must be at least 8 characters with one special character."
        value={password}
        onChange={setPassword}
        withReveal
      />

      <label className="auth-consent">
        <input
          type="checkbox"
          checked={consentAccepted}
          onChange={(event) => setConsentAccepted(event.target.checked)}
        />
        <span>
          I agree to the <a href="#terms">Terms of Service</a> and{" "}
          <a href="#privacy">Privacy Policy</a>.
        </span>
      </label>

      {error ? (
        <p className="auth-form-feedback auth-form-feedback--error">{error}</p>
      ) : null}

      <button className="auth-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
        <span aria-hidden="true">-&gt;</span>
      </button>
    </form>
  );
}
