# Gym-Basha

## AI Fitness Assistant for Beginners

Gym-Basha is a serverless web application designed to help beginners start and maintain a fitness routine through AI-powered personalization, automation, and simple guidance.

## Overview

This project is a digital fitness assistant that reduces common beginner barriers, including:

- Not knowing where to start
- Lack of motivation
- Overwhelming fitness information
- Difficulty maintaining consistency

The application combines:

- AI-generated workout and meal plans
- Automation workflows
- Progress tracking
- Gamification

## Key Idea

Instead of overwhelming users, Gym-Basha focuses on simple, guided, personalized fitness support for beginners.

The project is based on:

- User-Centered Design (UCD)
- Behavior Change Model (COM-B)

## Tech Stack

### Frontend

- React with Vite
- JavaScript / TypeScript
- Tailwind CSS / CSS

### Backend

- Firebase Authentication
- Firestore
- Firebase Functions

### AI Integration

- LLM API for workout and meal generation

### Automation

- n8n workflows for reminders, notifications, and summaries

### External APIs

- ExerciseDB for exercise data
- Telegram Bot API for notifications

## Features and Status

### Authentication and User Profile

- User registration and login with Firebase Auth
- User profile with age, weight, goals, and preferences
- Status: In Progress

### AI Workout Plan Generator

- Personalized weekly workout plans
- Plan generation based on goals, equipment availability, and experience level
- Status: Not Started

### AI Meal Planning

- Weekly meal suggestions
- Calorie and macronutrient guidance
- Ingredient-based recipes
- Status: Not Started

### Automated Shopping List

- Auto-generated grocery list from meal plans
- Export or send shopping lists through Telegram
- Status: Not Started

### Exercise Explorer

- Browse exercises through an external exercise API
- Filter by muscle group, equipment, and difficulty
- Status: In Progress

### Progress Tracking Dashboard

- Track completed workouts
- Track streaks
- View progress over time
- Status: Not Started

### Gamification

- Achievements and badges
- Fitness challenges, such as a 30-day challenge
- Status: Not Started

### Automation and Notifications

- Workout reminders
- Weekly summaries
- Motivation messages
- Inactivity triggers
- Status: Not Started

### Telegram Integration

- Receive shopping lists
- Receive reminders
- Receive progress updates
- Status: Not Started

## Architecture

```text
React Frontend (Vite)
        |
        v
Firebase (Auth + Firestore + Functions)
        |
        v
AI API (LLM)
        |
        v
n8n (Automation Workflows)
        |
        v
External APIs (ExerciseDB + Telegram)
```

## Project Goals

- Reduce entry barriers for fitness beginners
- Provide personalized guidance
- Support long-term adherence
- Minimize planning effort

## Data and Privacy

- GDPR-compliant design
- Minimal data collection
- User consent required
- Secure authentication with Firebase

## Disclaimer

This application provides general fitness guidance only. It does not provide medical advice and does not replace consultation with qualified health, fitness, or medical professionals.
