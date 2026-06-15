export type ExerciseDemonstration = {
  displayName: string
  targetArea: string
  equipment: string
  summary: string
  steps: string[]
  coachTip: string
  safetyNote: string
}

const KNOWN_DEMONSTRATIONS: Record<string, Omit<ExerciseDemonstration, 'displayName'>> = {
  'dumbbell-bench-press': {
    targetArea: 'Chest, shoulders, and triceps',
    equipment: 'Dumbbells and a flat bench',
    summary: 'A controlled horizontal press that builds upper-body pushing strength.',
    steps: [
      'Lie back with dumbbells stacked over your chest and feet planted firmly on the floor.',
      'Lower the weights with control until your elbows are slightly below bench level.',
      'Press upward in a smooth arc until your arms are nearly straight again.',
    ],
    coachTip: 'Keep your shoulder blades lightly pulled back so your chest stays open.',
    safetyNote: 'Use a load you can lower with control and avoid flaring the elbows too wide.',
  },
  'goblet-squat': {
    targetArea: 'Quads, glutes, and core',
    equipment: 'One dumbbell or kettlebell',
    summary: 'A beginner-friendly squat pattern that teaches bracing and balanced depth.',
    steps: [
      'Hold the weight close to your chest with elbows angled down.',
      'Sit your hips down and back while keeping your chest tall and feet grounded.',
      'Drive through the mid-foot to stand tall without rushing the movement.',
    ],
    coachTip: 'Think about spreading the floor with your feet to keep your knees stable.',
    safetyNote: 'Stop the descent before your lower back tucks under or your heels lift.',
  },
  'dumbbell-row': {
    targetArea: 'Upper back and lats',
    equipment: 'Dumbbell and bench or sturdy support',
    summary: 'A pulling movement that builds back strength and postural control.',
    steps: [
      'Brace one hand on a bench and let the working arm hang under your shoulder.',
      'Pull the dumbbell toward your hip while keeping your torso steady.',
      'Lower the weight slowly until your arm is straight again.',
    ],
    coachTip: 'Lead with the elbow rather than shrugging the shoulder toward your ear.',
    safetyNote: 'Keep your spine neutral and avoid twisting through the trunk to lift heavier.',
  },
  'shoulder-press': {
    targetArea: 'Shoulders and triceps',
    equipment: 'Dumbbells, barbell, or machine',
    summary: 'An overhead press that develops vertical pushing strength.',
    steps: [
      'Start with the weights around shoulder height and your ribs stacked over your hips.',
      'Press overhead until your arms are extended without arching your back.',
      'Lower the weights under control back to the start position.',
    ],
    coachTip: 'Squeeze your glutes and brace your abs to stop the ribcage from flaring.',
    safetyNote: 'Do not push through shoulder pain; reduce range of motion or choose a lighter load.',
  },
  'romanian-deadlift': {
    targetArea: 'Hamstrings, glutes, and lower back',
    equipment: 'Dumbbells or barbell',
    summary: 'A hip-hinge pattern that trains the back side of the body.',
    steps: [
      'Stand tall with soft knees and the weight close to your thighs.',
      'Push your hips back while keeping the spine long and the weights close to your legs.',
      'Stop when you feel a strong hamstring stretch, then drive hips forward to stand.',
    ],
    coachTip: 'Keep the movement slow on the way down and let the hips do most of the work.',
    safetyNote: 'Avoid rounding the back or chasing extra depth once your posture starts to break.',
  },
  plank: {
    targetArea: 'Core, shoulders, and glutes',
    equipment: 'Bodyweight',
    summary: 'An isometric hold that teaches full-body bracing and trunk control.',
    steps: [
      'Place forearms or hands under the shoulders and extend the legs behind you.',
      'Create a straight line from head to heels by tightening your abs and glutes.',
      'Hold steady breathing while resisting sagging through the hips.',
    ],
    coachTip: 'Exhale slowly to help lock the ribs down and keep the core engaged.',
    safetyNote: 'Shorten the hold or elevate the hands if you cannot maintain a straight body line.',
  },
}

export function formatExerciseName(exerciseId: string): string {
  return exerciseId.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

export function getExerciseDemonstration(exerciseId: string): ExerciseDemonstration {
  const displayName = formatExerciseName(exerciseId)
  const known = KNOWN_DEMONSTRATIONS[exerciseId]

  if (known) {
    return { displayName, ...known }
  }

  const lowerId = exerciseId.toLowerCase()
  const equipment = inferEquipment(lowerId)
  const targetArea = inferTargetArea(lowerId)

  return {
    displayName,
    targetArea,
    equipment,
    summary: `A ${targetArea.toLowerCase()} exercise included in your plan to build consistency with controlled technique.`,
    steps: buildFallbackSteps(lowerId),
    coachTip: inferCoachTip(lowerId),
    safetyNote: 'Move with a pain-free range of motion and reduce load or reps if form starts to slip.',
  }
}

function inferEquipment(exerciseId: string): string {
  if (exerciseId.includes('dumbbell')) return 'Dumbbells'
  if (exerciseId.includes('barbell')) return 'Barbell'
  if (exerciseId.includes('cable')) return 'Cable machine'
  if (exerciseId.includes('machine')) return 'Resistance machine'
  if (exerciseId.includes('band')) return 'Resistance band'
  if (exerciseId.includes('push-up') || exerciseId.includes('plank') || exerciseId.includes('bodyweight')) {
    return 'Bodyweight'
  }

  return 'Standard gym setup'
}

function inferTargetArea(exerciseId: string): string {
  if (exerciseId.includes('squat') || exerciseId.includes('lunge') || exerciseId.includes('leg')) {
    return 'Legs and glutes'
  }
  if (exerciseId.includes('row') || exerciseId.includes('pull') || exerciseId.includes('lat')) {
    return 'Upper back and lats'
  }
  if (exerciseId.includes('bench') || exerciseId.includes('push-up') || exerciseId.includes('chest')) {
    return 'Chest, shoulders, and triceps'
  }
  if (exerciseId.includes('press') || exerciseId.includes('shoulder')) {
    return 'Shoulders and triceps'
  }
  if (exerciseId.includes('curl')) {
    return 'Biceps and forearms'
  }
  if (exerciseId.includes('tricep')) {
    return 'Triceps'
  }
  if (exerciseId.includes('plank') || exerciseId.includes('crunch') || exerciseId.includes('core')) {
    return 'Core and trunk stability'
  }
  if (exerciseId.includes('deadlift') || exerciseId.includes('hinge')) {
    return 'Hamstrings, glutes, and posterior chain'
  }

  return 'Full-body strength and control'
}

function buildFallbackSteps(exerciseId: string): string[] {
  if (exerciseId.includes('squat') || exerciseId.includes('lunge')) {
    return [
      'Set your stance and brace your midsection before starting each rep.',
      'Lower with control while keeping the chest steady and knees tracking over the feet.',
      'Push through the floor to return to the start without losing balance.',
    ]
  }

  if (exerciseId.includes('row') || exerciseId.includes('pull')) {
    return [
      'Set your torso and shoulders before starting the pull.',
      'Drive the elbow back with control while keeping the neck relaxed.',
      'Lower slowly until the working arm is fully extended again.',
    ]
  }

  if (exerciseId.includes('press') || exerciseId.includes('push-up') || exerciseId.includes('bench')) {
    return [
      'Start from a stable position with the wrists stacked and core braced.',
      'Lower or press through a smooth path without bouncing or rushing.',
      'Finish each rep by locking in control rather than forcing extra range.',
    ]
  }

  return [
    'Set up in a stable start position and brace before moving.',
    'Move through each rep with smooth tempo and steady alignment.',
    'Return to the start under control and stop before technique breaks down.',
  ]
}

function inferCoachTip(exerciseId: string): string {
  if (exerciseId.includes('squat') || exerciseId.includes('lunge')) {
    return 'Keep your breathing calm and your feet grounded to make each rep more repeatable.'
  }
  if (exerciseId.includes('row') || exerciseId.includes('pull')) {
    return 'Think about moving from the back muscles first instead of pulling only with the hands.'
  }
  if (exerciseId.includes('press') || exerciseId.includes('bench')) {
    return 'A steady ribcage and packed shoulders will usually improve pressing control right away.'
  }

  return 'Use a slow first set to learn the path before you try to add speed or load.'
}
