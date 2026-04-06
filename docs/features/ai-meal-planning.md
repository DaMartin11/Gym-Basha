# Product Requirements Document (PRD): AI Meal Planning

## 1. Overview
Nutrition is a massive hurdle for beginners. The "AI Meal Planning" feature provides users with simple, goal-aligned dietary suggestions completely customized to their preferences and caloric needs.

## 2. Objectives
- Provide weekly meal suggestions that align with the user's fitness goals (calorie surplus/deficit).
- Simplify meal prep by providing ingredient-based recipes.
- Ensure plans cater to dietary restrictions and general preferences.

## 3. User Stories
- As a user striving for weight loss, I want a meal plan that keeps me within a caloric deficit.
- As a beginner cook, I want simple recipes with clear ingredient lists.
- As a user with allergies, I want the AI to absolutely avoid suggesting specific ingredients.

## 4. Functional Requirements
- **Macro/Calorie Calculation**: Automatically calculate suggested daily caloric intake and macro splits based on user weight, age, and goal.
- **Weekly Schedule Generation**: Provide a 7-day breakdown of meals (Breakfast, Lunch, Dinner, Snacks) via LLM.
- **Detailed Recipes**: Include simple preparation instructions and precise ingredient lists.
- **Customization**: Option to regenerate a meal or swap it out.

## 5. Non-Functional Requirements
- **Response Format**: LLM must return structured data to be easily rendered in the React UI.
- **Disclaimer**: Add a prominent UI disclaimer stating that dietary suggestions are AI-generated and do not replace professional medical/nutrition advice.

## 6. Technical Specifications
- **Integration**: LLM API.
- **Backend Flow**: Firebase Functions to execute the prompt safely involving user preferences and calculated basal metabolic rate (BMR).

## 7. Status
- Not Started
