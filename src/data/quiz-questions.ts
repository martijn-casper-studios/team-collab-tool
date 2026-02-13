export interface QuizOption {
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  scenario: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    topic: "Energy source at work",
    scenario:
      "It's Monday morning and you have a full day ahead. What charges you up most?",
    options: [
      {
        label: "A",
        text: "A deep-dive solo session on a complex problem with no meetings",
      },
      {
        label: "B",
        text: "A brainstorming session with the team where ideas fly fast",
      },
      {
        label: "C",
        text: "A 1-on-1 with a teammate to align on shared goals",
      },
      {
        label: "D",
        text: "Taking charge of a kickoff meeting for a new initiative",
      },
    ],
  },
  {
    id: 2,
    topic: "Handling ambiguity",
    scenario:
      "You're assigned a project with unclear requirements and no precedent. What's your first move?",
    options: [
      {
        label: "A",
        text: "Build a structured framework and fill in assumptions methodically",
      },
      {
        label: "B",
        text: "Start prototyping immediately to learn by doing",
      },
      {
        label: "C",
        text: "Talk to stakeholders to understand the real need behind the request",
      },
      {
        label: "D",
        text: "Research comparable solutions and gather data before acting",
      },
    ],
  },
  {
    id: 3,
    topic: "Receiving feedback publicly",
    scenario:
      "During a team meeting, a colleague challenges your approach in front of everyone. How do you respond?",
    options: [
      {
        label: "A",
        text: "Engage with the critique directly—if they have a better argument, you'll adjust",
      },
      {
        label: "B",
        text: "Acknowledge it calmly but prefer to discuss the details privately afterward",
      },
      {
        label: "C",
        text: "Feel a sting but channel it into refining the work even further",
      },
      {
        label: "D",
        text: "Welcome it—public debate sharpens ideas and keeps the team honest",
      },
    ],
  },
  {
    id: 4,
    topic: "Decision-making style",
    scenario:
      "You need to make a critical decision and have conflicting data. How do you proceed?",
    options: [
      {
        label: "A",
        text: "Go with the data that tells the most logical, consistent story",
      },
      {
        label: "B",
        text: "Trust your gut—past experience and pattern recognition matter",
      },
      {
        label: "C",
        text: "Consult trusted colleagues to get diverse perspectives before deciding",
      },
      {
        label: "D",
        text: "Run a quick experiment or test to gather more signal",
      },
    ],
  },
  {
    id: 5,
    topic: "Work under pressure",
    scenario:
      "A deadline just got moved up by a week. The scope hasn't changed. What happens?",
    options: [
      {
        label: "A",
        text: "You get focused and laser-locked—pressure brings out your best work",
      },
      {
        label: "B",
        text: "You immediately re-prioritize and cut scope ruthlessly",
      },
      {
        label: "C",
        text: "You feel anxious but push through, often working longer hours quietly",
      },
      {
        label: "D",
        text: "You rally the team, delegate what you can, and communicate the tradeoffs upward",
      },
    ],
  },
  {
    id: 6,
    topic: "Communication preference",
    scenario:
      "You need to share a complex update with your team. What's your go-to approach?",
    options: [
      {
        label: "A",
        text: "Write a detailed async memo or doc—let people digest it on their own time",
      },
      {
        label: "B",
        text: "Hop on a quick call and walk through it live, taking questions in real-time",
      },
      {
        label: "C",
        text: "Send a brief Slack message with the key points and offer to elaborate if needed",
      },
      {
        label: "D",
        text: "Schedule a 1-on-1 with each stakeholder so you can tailor the message",
      },
    ],
  },
  {
    id: 7,
    topic: "Team dynamics preference",
    scenario:
      "You're building a team for a high-stakes project. What's most important to you?",
    options: [
      {
        label: "A",
        text: "Individual competence and deep expertise—the best people, period",
      },
      {
        label: "B",
        text: "Trust and psychological safety—people who can be honest with each other",
      },
      {
        label: "C",
        text: "Complementary skills and diversity of thought—balance over brilliance",
      },
      {
        label: "D",
        text: "Speed and bias for action—people who ship and iterate fast",
      },
    ],
  },
  {
    id: 8,
    topic: "Handling disagreement",
    scenario:
      "You strongly disagree with a decision your manager has made. What do you do?",
    options: [
      {
        label: "A",
        text: "State your case directly with evidence—disagree and commit if overruled",
      },
      {
        label: "B",
        text: "Ask questions to understand their reasoning first, then share your perspective",
      },
      {
        label: "C",
        text: "Express your concern privately and propose an alternative approach",
      },
      {
        label: "D",
        text: "Accept it and focus on execution—you trust they see something you don't",
      },
    ],
  },
  {
    id: 9,
    topic: "What drains you",
    scenario:
      "You've had the most draining week at work. What probably happened?",
    options: [
      {
        label: "A",
        text: "Back-to-back meetings with no time for deep, focused work",
      },
      {
        label: "B",
        text: "Constant shifting priorities and unclear direction from leadership",
      },
      {
        label: "C",
        text: "Interpersonal tension or political dynamics on the team",
      },
      {
        label: "D",
        text: "Repetitive execution work with no creative challenge or learning",
      },
    ],
  },
  {
    id: 10,
    topic: "Ideal recognition",
    scenario:
      "You just shipped something you're proud of. What kind of recognition feels most meaningful?",
    options: [
      {
        label: "A",
        text: "A thoughtful private message from someone you respect acknowledging the quality",
      },
      {
        label: "B",
        text: "Public shout-out in a team meeting or company channel",
      },
      {
        label: "C",
        text: "Being given more ownership and harder problems as a result",
      },
      {
        label: "D",
        text: "Seeing the impact—metrics, user feedback, or the team building on your work",
      },
    ],
  },
];
