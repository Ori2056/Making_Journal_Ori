const emotionalPatterns = {
  stressed: [
    "urgent",
    "deadline",
    "pressure",
    "stress",
    "overwhelmed",
    "busy",
    "anxious"
  ],

  positive: [
    "great",
    "love",
    "happy",
    "awesome",
    "good",
    "excited",
    "hopeful"
  ],

  reflective: [
    "think",
    "wonder",
    "perhaps",
    "consider",
    "maybe",
    "reflect"
  ]
};

function countCategory(text, words) {
  let score = 0;

  for (const word of words) {
    const regex = new RegExp(`\\\\b${word}\\\\b`, "g");

    const matches = text.match(regex);

    if (matches) {
      score += matches.length;
    }
  }

  return score;
}

function analyzeEmotion(text) {
  text = text.toLowerCase();

  const scores = {
    stressed: countCategory(text, emotionalPatterns.stressed),
    positive: countCategory(text, emotionalPatterns.positive),
    reflective: countCategory(text, emotionalPatterns.reflective)
  };

  const dominant = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];

  switch (dominant) {

    case "stressed":
      return `
Your writing may suggest elevated mental load and time-sensitive thinking.

Some language patterns indicate pressure, urgency, or cognitive strain.

This could reflect stress accumulation or sustained task focus.
      `;

    case "positive":
      return `
Your wording carries generally constructive emotional signals.

Your language suggests engagement, optimism, and emotional openness.

There are signs of positive momentum in your communication style.
      `;

    case "reflective":
      return `
Your text appears thoughtful and analytical.

The phrasing suggests careful processing of ideas rather than impulsive reactions.

This may reflect introspection or deliberate reasoning.
      `;

    default:
      return `
Your writing appears relatively balanced and emotionally neutral.

No strong emotional signal was consistently detected.
      `;
  }
}

document
  .getElementById("analyzeBtn")
  .addEventListener("click", () => {

    const text =
      document.getElementById("inputText").value;

    const result = analyzeEmotion(text);

    document.getElementById("output").innerText =
      result;
  });