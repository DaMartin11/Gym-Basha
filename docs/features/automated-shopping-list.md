# Product Requirements Document (PRD): Automated Shopping List

## 1. Overview
The "Automated Shopping List" closes the loop on meal planning by transforming abstract meal suggestions into an actionable grocery list, greatly reducing planning friction for the user.

## 2. Objectives
- Automatically aggregate ingredients from the weekly AI Meal Plan.
- Categorize items to make grocery shopping efficient.
- Allow seamless exporting (e.g., to Telegram).

## 3. User Stories
- As a user reviewing my meal plan, I want a single unified list of all ingredients I need to buy for the week.
- As a user in the supermarket, I want to view my shopping list easily on my phone.
- As a user, I want to send my list to my Telegram for quick access while shopping.

## 4. Functional Requirements
- **Aggregation Logic**: Parse the "Ingredients" arrays from the generated weekly meals and sum up quantities where possible.
- **Categorization**: Group items by supermarket sections (e.g., Produce, Meat, Dairy, Pantry).
- **Checklist UI**: Provide an interactive checklist in the frontend to tick off bought items.
- **Exporting**: 
  - Option to send instructions to n8n workflow for sending via Telegram.
  - Option to copy to clipboard.

## 5. Non-Functional Requirements
- **Accuracy**: Quantities must be aggregated correctly (e.g., converting 2x "1 cup of rice" into "2 cups of rice" requires either smart logic or LLM summarization).
- **Speed**: The list should be instantly available once the meal plan is generated.

## 6. Technical Specifications
- **Processing**: Potentially use a secondary fast LLM pass via Firebase Functions to group and sum ingredients cleanly.
- **External Integration**: Telegram API (invoked directly or via n8n).

## 7. Status
- Not Started
