import { useState } from "react";
import heroImage from "../../assets/hero.png";
import "./auth.css";

const authCopy = {
  "create-account": {
    title: "Create Your Account",
    subtitle: "Join the future of personalized fitness.",
    submitLabel: "Create Account",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign In",
  },
  "sign-in": {
    title: "Welcome Back",
    subtitle: "Please enter your details to access your dashboard.",
    submitLabel: "Sign In",
    switchPrompt: "Don't have an account?",
    switchLabel: "Join the Sanctuary",
  },
};

export function AuthPage() {
  const [mode, setMode] = useState("sign-in");
  const copy =
    mode === "sign-in" ? authCopy["sign-in"] : authCopy["create-account"];

  return (
    <main className="auth-page" aria-labelledby="auth-title">
      <section className={`auth-shell auth-shell--${mode}`}>
        <AuthHero mode={mode} />
        <AuthPanel
          mode={mode}
          copy={copy}
          onModeChange={(nextMode = "create-account") => setMode(nextMode)}
        />
      </section>
    </main>
  );
}

function AuthHero({ mode = "create-account" }) {
  const isSignIn = mode === "sign-in";

  return (
    <aside className="auth-hero" aria-label="Kinetic Sanctuary introduction">
      <div className="auth-brand">
        <span className="auth-brand__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M13.7 1.8 4.5 13h6.2l-1.1 9.2 9.7-12.8h-6.4l.8-7.6Z" />
          </svg>
        </span>
        <span>Kinetic Sanctuary</span>
      </div>

      <div className="auth-hero__copy">
        {isSignIn ? (
          <>
            <h1>
              Your Personal <span>Sanctuary</span> for Kinetic Growth.
            </h1>
            <p>
              Experience an AI-driven fitness journey that adapts to your
              rhythm, not the other way around.
            </p>
          </>
        ) : (
          <>
            <h1>
              Redefining <span>Human Potential.</span>
            </h1>
            <p>
              Enter a space where AI-driven intelligence meets the organic flow
              of your physical wellness. Your sanctuary for kinetic evolution.
            </p>
          </>
        )}
      </div>

      {!isSignIn && (
        <img
          className="auth-hero__figure"
          src={heroImage}
          alt=""
          aria-hidden="true"
        />
      )}

      {isSignIn ? (
        <div className="coach-card coach-card--compact">
          <div className="coach-card__profile">
            <span aria-hidden="true">AI</span>
            <p>
              Coach AI
              <small>Active Insights</small>
            </p>
          </div>
          <blockquote>
            "Welcome back. I've analyzed your recovery data from yesterday.
            Ready for a light mobility flow?"
          </blockquote>
        </div>
      ) : (
        <div className="coach-card">
        <p className="coach-card__eyebrow">Daily Wisdom</p>
        <blockquote>"Your journey starts with a single step."</blockquote>
        <p className="coach-card__source">
          <span aria-hidden="true">*</span>
          AI Coach Insight
        </p>
        </div>
      )}
    </aside>
  );
}

function AuthPanel({
  mode = "create-account",
  copy = authCopy["create-account"],
  onModeChange = (nextMode = "create-account") => {
    void nextMode;
  },
}) {
  const isCreateAccount = mode === "create-account";
  const alternateMode = isCreateAccount ? "sign-in" : "create-account";

  return (
    <section className="auth-panel" aria-labelledby="auth-title">
      <div className="auth-mode-switch" aria-label="Authentication view">
        <button
          className={!isCreateAccount ? "is-active" : ""}
          type="button"
          aria-pressed={!isCreateAccount}
          onClick={() => onModeChange("sign-in")}
        >
          Sign in
        </button>
        <button
          className={isCreateAccount ? "is-active" : ""}
          type="button"
          aria-pressed={isCreateAccount}
          onClick={() => onModeChange("create-account")}
        >
          Create account
        </button>
      </div>

      <div className="auth-panel__heading">
        <h2 id="auth-title">{copy.title}</h2>
        <p>{copy.subtitle}</p>
      </div>

      <form className="auth-form">
        {isCreateAccount && (
          <AuthField
            id="full-name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon="person"
            autoComplete="name"
          />
        )}
        <AuthField
          id="email"
          label="Email Address"
          type="email"
          placeholder={
            isCreateAccount ? "hello@kineticsanctuary.com" : "name@example.com"
          }
          icon="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="********"
          icon="lock"
          autoComplete={isCreateAccount ? "new-password" : "current-password"}
          labelAction={
            !isCreateAccount ? (
              <a className="auth-label-action" href="#reset-password">
                Forgot Password?
              </a>
            ) : (
              <></>
            )
          }
          helper={
            isCreateAccount
              ? "Must be at least 8 characters with one special character."
              : undefined
          }
          withReveal
        />

        {isCreateAccount ? (
          <label className="auth-consent">
            <input type="checkbox" />
            <span>
              I agree to the <a href="#terms">Terms of Service</a> and{" "}
              <a href="#privacy">Privacy Policy</a>.
            </span>
          </label>
        ) : (
          <label className="auth-consent auth-consent--remember">
            <input type="checkbox" />
            <span>Remember this device</span>
          </label>
        )}

        <button className="auth-submit" type="submit">
          {copy.submitLabel}
          <span aria-hidden="true">-&gt;</span>
        </button>
      </form>

      <div className="auth-social-divider">
        <span>Or continue with</span>
      </div>

      <div className="auth-social-actions">
        <button type="button">
          <span
            className="auth-social-icon auth-social-icon--google"
            aria-hidden="true"
          >
            G
          </span>
          Google
        </button>
        <button type="button">
          <span
            className="auth-social-icon auth-social-icon--apple"
            aria-hidden="true"
          >
            iOS
          </span>
          Apple
        </button>
      </div>

      <p className="auth-switch-prompt">
        {copy.switchPrompt}{" "}
        <button type="button" onClick={() => onModeChange(alternateMode)}>
          {copy.switchLabel}
        </button>
      </p>
    </section>
  );
}

function AuthField({
  id = "",
  label = "",
  type = "text",
  placeholder = "",
  icon = "person",
  autoComplete = "off",
  labelAction = <></>,
  helper = "",
  withReveal = false,
}) {
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
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {withReveal && (
          <button type="button" aria-label="Show password">
            <FieldIcon icon="eye" />
          </button>
        )}
      </div>
      {helper && <p>{helper}</p>}
    </div>
  );
}

function FieldIcon({ icon = "person" }) {
  let path =
    "M12 12.2c2 0 3.6-1.7 3.6-3.8S14 4.8 12 4.8 8.4 6.4 8.4 8.4s1.6 3.8 3.6 3.8Zm0 2c-3.1 0-5.6 1.6-5.6 3.6 0 .8.6 1.4 1.4 1.4h8.4c.8 0 1.4-.6 1.4-1.4 0-2-2.5-3.6-5.6-3.6Z";

  if (icon === "email") {
    path =
      "M4.8 6.5h14.4c.8 0 1.4.6 1.4 1.4v8.2c0 .8-.6 1.4-1.4 1.4H4.8c-.8 0-1.4-.6-1.4-1.4V7.9c0-.8.6-1.4 1.4-1.4Zm.8 2.3 6.4 4.1 6.4-4.1v-.4H5.6v.4Z";
  }

  if (icon === "lock") {
    path =
      "M7 10h1.2V8.2a3.8 3.8 0 0 1 7.6 0V10H17c.8 0 1.4.6 1.4 1.4v6.1c0 .8-.6 1.4-1.4 1.4H7c-.8 0-1.4-.6-1.4-1.4v-6.1C5.6 10.6 6.2 10 7 10Zm3.1 0h3.8V8.2a1.9 1.9 0 0 0-3.8 0V10Z";
  }

  if (icon === "eye") {
    path =
      "M12 6.5c4 0 7 3.2 8.2 5.5-1.2 2.3-4.2 5.5-8.2 5.5S5 14.3 3.8 12C5 9.7 8 6.5 12 6.5Zm0 8.6a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z";
  }

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
