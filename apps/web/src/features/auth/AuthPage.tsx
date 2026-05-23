import { useState } from "react";
import logoImage from "../../assets/Gym-Basha.svg";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import "./auth.css";

type AuthMode = "sign-in" | "create-account";

const authCopy: Record<
  AuthMode,
  {
    title: string;
    subtitle: string;
    switchPrompt: string;
    switchLabel: string;
  }
> = {
  "create-account": {
    title: "Create Your Account",
    subtitle: "Join the future of personalized fitness.",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign In",
  },
  "sign-in": {
    title: "Welcome Back",
    subtitle: "Please enter your details to access your dashboard.",
    switchPrompt: "Don't have an account?",
    switchLabel: "Join Gym Basha",
  },
};

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("sign-in");
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

function AuthHero({ mode = "create-account" }: { mode?: AuthMode }) {
  const isSignIn = mode === "sign-in";

  return (
    <aside className="auth-hero" aria-label="Gym Basha introduction">
      <div className="auth-brand">
        <span className="auth-brand__mark" aria-hidden="true">
          <img src={logoImage} alt="" />
        </span>
        <span>Gym Basha</span>
      </div>

      <div className="auth-hero__copy">
        {isSignIn ? (
          <>
            <h1>
              Your Personal <span>AI Fitness Coach.</span>
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
              of your physical wellness. Start with clear guidance built for beginners.
            </p>
          </>
        )}
      </div>

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
  onModeChange,
}: {
  mode?: AuthMode;
  copy?: (typeof authCopy)[AuthMode];
  onModeChange: (nextMode: AuthMode) => void;
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

      {isCreateAccount ? (
        <RegisterForm onRegistrationComplete={() => onModeChange("sign-in")} />
      ) : (
        <LoginForm />
      )}

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
