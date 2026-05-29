import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../shared/lib/firebase";
import { createUserProfile } from "../auth/services/profile.service";
import { ProfileContext } from "../../app/App";
import type {
  FitnessGoal,
  ExperienceLevel,
  UserProfile,
} from "@gym-basha/shared";
import "./onboarding.css";

type OnboardingStep =
  | "goal"
  | "experience"
  | "stats"
  | "equipment"
  | "dietary"
  | "review";

const fitnessGoals: { value: FitnessGoal; label: string }[] = [
  { value: "build_strength", label: "Build Strength" },
  { value: "lose_weight", label: "Lose Weight" },
  { value: "improve_endurance", label: "Improve Endurance" },
  { value: "increase_mobility", label: "Increase Mobility" },
  { value: "build_consistency", label: "Build Consistency" },
];

const experienceLevels: {
  value: ExperienceLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "beginner",
    label: "Just Starting",
    description: "I'm new to fitness",
  },
  {
    value: "returning",
    label: "Returning",
    description: "I trained before but took a break",
  },
  {
    value: "intermediate",
    label: "Regular Trainer",
    description: "I train regularly",
  },
];

const equipmentOptions = [
  "Bodyweight only",
  "Resistance bands",
  "Dumbbells",
  "Barbell & plates",
  "Gym machines",
  "Full gym access",
];

const dietaryOptions = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Lactose-free",
  "Gluten-free",
  "Halal",
];

type FormData = {
  goals: FitnessGoal[];
  experienceLevel: ExperienceLevel | null;
  age: number | null;
  weightKg: number | null;
  equipment: string[];
  dietaryPreferences: string[];
};

export function OnboardingPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useContext(ProfileContext);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("goal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    goals: [],
    experienceLevel: null,
    age: null,
    weightKg: null,
    equipment: [],
    dietaryPreferences: [],
  });

  const steps: OnboardingStep[] = [
    "goal",
    "experience",
    "stats",
    "equipment",
    "dietary",
    "review",
  ];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!formData.goals.length) {
      setError("Please select at least one fitness goal.");
      return;
    }

    if (!formData.experienceLevel) {
      setError("Please select your experience level.");
      return;
    }

    if (!formData.age || formData.age < 13 || formData.age > 120) {
      setError("Please enter a valid age (13-120).");
      return;
    }

    if (
      !formData.weightKg ||
      formData.weightKg < 30 ||
      formData.weightKg > 300
    ) {
      setError("Please enter a valid weight (30-300 kg).");
      return;
    }

    if (!formData.equipment.length) {
      setError("Please select at least one equipment option.");
      return;
    }

    if (!formData.dietaryPreferences.length) {
      setError("Please select at least one dietary preference.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const profileData: Omit<UserProfile, "id"> = {
        displayName: user.displayName || "User",
        age: formData.age || undefined,
        weightKg: formData.weightKg || undefined,
        goals: formData.goals,
        experienceLevel: formData.experienceLevel,
        equipment: formData.equipment,
        dietaryPreferences: formData.dietaryPreferences,
        notificationPreference: {
          remindersEnabled: true,
          weeklySummaryEnabled: true,
          telegramEnabled: false,
        },
      };

      await createUserProfile(user.uid, profileData);
      await refreshProfile();
      navigate("/dashboard", { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save profile",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function goToStep(step: OnboardingStep) {
    setCurrentStep(step);
    setError("");
  }

  function goNext() {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      goToStep(steps[nextIndex]);
    }
  }

  function goBack() {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goToStep(steps[prevIndex]);
    }
  }

  return (
    <main className="onboarding-page" aria-labelledby="onboarding-title">
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="onboarding-header">
          <h1 id="onboarding-title">Set Up Your Profile</h1>
          <p>Let's personalize your fitness journey in just a few steps.</p>
          <div className="onboarding-progress">
            <div
              className="onboarding-progress__bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="onboarding-progress__text">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>

        <div className="onboarding-step">
          {currentStep === "goal" && (
            <StepGoal
              selected={formData.goals}
              onChange={(goals) => setFormData({ ...formData, goals })}
            />
          )}
          {currentStep === "experience" && (
            <StepExperience
              selected={formData.experienceLevel}
              onChange={(experienceLevel) =>
                setFormData({ ...formData, experienceLevel })
              }
            />
          )}
          {currentStep === "stats" && (
            <StepStats
              age={formData.age}
              weight={formData.weightKg}
              onAgeChange={(age) => setFormData({ ...formData, age })}
              onWeightChange={(weightKg) =>
                setFormData({ ...formData, weightKg })
              }
            />
          )}
          {currentStep === "equipment" && (
            <StepEquipment
              selected={formData.equipment}
              onChange={(equipment) => setFormData({ ...formData, equipment })}
            />
          )}
          {currentStep === "dietary" && (
            <StepDietary
              selected={formData.dietaryPreferences}
              onChange={(dietaryPreferences) =>
                setFormData({ ...formData, dietaryPreferences })
              }
            />
          )}
          {currentStep === "review" && <StepReview formData={formData} />}
        </div>

        {error && <p className="onboarding-error">{error}</p>}

        <div className="onboarding-actions">
          <button
            type="button"
            className="onboarding-button onboarding-button--secondary"
            onClick={goBack}
            disabled={currentStepIndex === 0 || isSubmitting}
          >
            Back
          </button>
          {currentStep === "review" ? (
            <button
              type="submit"
              className="onboarding-button onboarding-button--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </button>
          ) : (
            <button
              type="button"
              className="onboarding-button onboarding-button--primary"
              onClick={goNext}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

function StepGoal({
  selected,
  onChange,
}: {
  selected: FitnessGoal[];
  onChange: (goals: FitnessGoal[]) => void;
}) {
  return (
    <fieldset className="onboarding-fieldset">
      <legend className="onboarding-legend">What's your primary goal?</legend>
      <p className="onboarding-hint">You can pick more than one.</p>
      <div className="onboarding-options">
        {fitnessGoals.map((goal) => (
          <label key={goal.value} className="onboarding-chip">
            <input
              type="checkbox"
              value={goal.value}
              checked={selected.includes(goal.value)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  onChange([...selected, goal.value]);
                } else {
                  onChange(selected.filter((g) => g !== goal.value));
                }
              }}
            />
            <span>{goal.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepExperience({
  selected,
  onChange,
}: {
  selected: ExperienceLevel | null;
  onChange: (level: ExperienceLevel) => void;
}) {
  return (
    <fieldset className="onboarding-fieldset">
      <legend className="onboarding-legend">
        What's your experience level?
      </legend>
      <div className="onboarding-cards">
        {experienceLevels.map((level) => (
          <label key={level.value} className="onboarding-card">
            <input
              type="radio"
              name="experience"
              value={level.value}
              checked={selected === level.value}
              onChange={() => onChange(level.value)}
            />
            <div className="onboarding-card__content">
              <p className="onboarding-card__title">{level.label}</p>
              <p className="onboarding-card__description">
                {level.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepStats({
  age,
  weight,
  onAgeChange,
  onWeightChange,
}: {
  age: number | null;
  weight: number | null;
  onAgeChange: (age: number | null) => void;
  onWeightChange: (weight: number | null) => void;
}) {
  return (
    <fieldset className="onboarding-fieldset">
      <legend className="onboarding-legend">Tell us about yourself</legend>
      <p className="onboarding-hint">
        These help personalize your recommendations.
      </p>
      <div className="onboarding-inputs">
        <div className="onboarding-input-group">
          <label htmlFor="age">Age (optional)</label>
          <input
            id="age"
            type="number"
            min="13"
            max="120"
            value={age || ""}
            onChange={(e) =>
              onAgeChange(e.target.value ? parseInt(e.target.value, 10) : null)
            }
            placeholder="25"
          />
        </div>
        <div className="onboarding-input-group">
          <label htmlFor="weight">Weight (kg, optional)</label>
          <input
            id="weight"
            type="number"
            min="30"
            max="300"
            step="0.5"
            value={weight || ""}
            onChange={(e) =>
              onWeightChange(e.target.value ? parseFloat(e.target.value) : null)
            }
            placeholder="70"
          />
        </div>
      </div>
    </fieldset>
  );
}

function StepEquipment({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (equipment: string[]) => void;
}) {
  return (
    <fieldset className="onboarding-fieldset">
      <legend className="onboarding-legend">What equipment do you have?</legend>
      <p className="onboarding-hint">Select all that apply.</p>
      <div className="onboarding-options">
        {equipmentOptions.map((option) => (
          <label key={option} className="onboarding-chip">
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  onChange([...selected, option]);
                } else {
                  onChange(selected.filter((eq) => eq !== option));
                }
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepDietary({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (preferences: string[]) => void;
}) {
  return (
    <fieldset className="onboarding-fieldset">
      <legend className="onboarding-legend">Any dietary preferences?</legend>
      <p className="onboarding-hint">
        These help with meal planning (optional).
      </p>
      <div className="onboarding-options">
        {dietaryOptions.map((option) => (
          <label key={option} className="onboarding-chip">
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  onChange([...selected, option]);
                } else {
                  onChange(selected.filter((pref) => pref !== option));
                }
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepReview({ formData }: { formData: FormData }) {
  return (
    <div className="onboarding-review">
      <div className="onboarding-review__section">
        <h3>Fitness Goal</h3>
        <p>
          {formData.goals
            .map((g) => fitnessGoals.find((fg) => fg.value === g)?.label)
            .join(", ")}
        </p>
      </div>
      <div className="onboarding-review__section">
        <h3>Experience Level</h3>
        <p>
          {
            experienceLevels.find((el) => el.value === formData.experienceLevel)
              ?.label
          }
        </p>
      </div>
      {(formData.age || formData.weightKg) && (
        <div className="onboarding-review__section">
          <h3>Body Stats</h3>
          <p>
            {formData.age && `Age: ${formData.age}`}
            {formData.age && formData.weightKg && " - "}
            {formData.weightKg && `Weight: ${formData.weightKg} kg`}
          </p>
        </div>
      )}
      {formData.equipment.length > 0 && (
        <div className="onboarding-review__section">
          <h3>Equipment</h3>
          <p>{formData.equipment.join(", ")}</p>
        </div>
      )}
      {formData.dietaryPreferences.length > 0 && (
        <div className="onboarding-review__section">
          <h3>Dietary Preferences</h3>
          <p>{formData.dietaryPreferences.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
