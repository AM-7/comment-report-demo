export const outcomes = ["positive", "neutral", "negative", "mixed", "uncertain"];

export const samples = {
  garden: {
    title: "Balcony herb garden",
    category: "Gardening tutorial",
    excluded: { language: 1, uncertain: 0, unusable: 1 },
    comments: [
      ["g1", "positive", "The pot-size comparison made it easy to pick a container."],
      ["g2", "mixed", "The pot-size chart helped, but the watering section went too fast."],
      ["g3", "positive", "Seeing the roots in each pot finally made the size difference click."],
      ["g4", "neutral", "How often should I water basil in a small pot?"],
      ["g5", "neutral", "Do you water every day when the balcony gets afternoon sun?"],
      ["g6", "negative", "The watering part skipped what to do during a heat wave."],
      ["g7", "positive", "I followed the steps and my mint finally started growing."],
      ["g8", "uncertain", "Guess I know what happens next."],
      ["g9", "neutral", "The hanging planter appears at the end."],
      ["g10", "negative", "The captions were too small to read."],
    ],
    themes: [
      { id: "pot-size", label: "Choosing a pot size", support: ["g1", "g2", "g3"] },
      { id: "watering", label: "Watering schedule", support: ["g2", "g4", "g5", "g6"] },
    ],
    questions: [
      { id: "watering-question", label: "How often should I water basil in a small pot?", representative: "g4", support: ["g4", "g5"] },
    ],
  },
  audio: {
    title: "Clearer audio at home",
    category: "Recording tutorial",
    excluded: { language: 1, uncertain: 1, unusable: 0 },
    comments: [
      ["a1", "positive", "Moving the microphone closer made my voice much clearer."],
      ["a2", "mixed", "The mic placement examples were useful, but I couldn't hear the second comparison."],
      ["a3", "positive", "The hand-span demo made the microphone distance easy to remember."],
      ["a4", "neutral", "How far should the microphone be from my mouth?"],
      ["a5", "neutral", "Does that distance change if I record with a phone?"],
      ["a6", "negative", "The reference clips were too quiet to compare."],
      ["a7", "uncertain", "That is exactly what I expected."],
      ["a8", "positive", "I tried the blanket trick and the echo was gone."],
    ],
    themes: [
      { id: "mic-distance", label: "Microphone distance", support: ["a1", "a2", "a3", "a4", "a5"] },
    ],
    questions: [
      { id: "distance-question", label: "How far should the microphone be from my mouth?", representative: "a4", support: ["a4", "a5"] },
    ],
  },
};
