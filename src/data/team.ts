export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  mbti: string;
  disc: string;
  enneagram: string;
  cliftonStrengths: string[];
  bigFive: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
  };
  communicationStyle: {
    howToCommunicate: string[];
    feedbackPreference: string[];
  };
  userManual: {
    howToGetBestOut: string[];
    whatShutsDown: string[];
  };
  idealCollaborator: string;
  fullProfile: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "leo-kim",
    name: "Leo Kim",
    email: "leo@casperstudios.xyz",
    mbti: "INTJ",
    disc: "C (Conscientiousness)",
    enneagram: "Not specified",
    cliftonStrengths: ["Strategic", "Analytical", "Learner", "Achiever"],
    bigFive: {
      openness: "High",
      conscientiousness: "High",
      extraversion: "Low",
      agreeableness: "Moderate",
      neuroticism: "Low"
    },
    communicationStyle: {
      howToCommunicate: [
        "Be concise, but substantive - give the key insight first, then the reasoning",
        "Show your work - logic, data, external citations, comparative options, trade-offs",
        "Don't sugarcoat - deliver the truth directly, bad news early is better than late",
        "Disagree clearly - if you think he's wrong, say it plainly with justification"
      ],
      feedbackPreference: [
        "Welcomes direct critique, especially if it improves the product or thinking",
        "Separates ideas from ego - if something is flawed, he'd rather fix it than defend it",
        "Responds well to challenges backed by evidence, not emotion"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Frame problems before proposing solutions - provide context, constraints, and what 'good' looks like",
        "Offer multiple options when uncertain - he evaluates best when comparing trade-offs",
        "Surface risks early - he hates hidden surprises",
        "Document reasoning - even lightweight artifacts help move faster"
      ],
      whatShutsDown: [
        "Sloppy thinking - if reasoning is loose, he'll probe aggressively",
        "Over-optimization - remind him when 'good enough' is optimal",
        "Taking on too much - help him prioritize ruthlessly",
        "Vague direction - he may fill in assumptions quickly, so clarify goals early"
      ]
    },
    idealCollaborator: "Someone with a DI profile (DISC) or ENFP/ENTP (MBTI) - an energetic, externally-oriented person comfortable with ambiguity who moves fast socially.",
    fullProfile: `Leo Kim — Personal README

How I Think & Operate:
- First-principles, accuracy-driven. I want to understand why something works before I accept it.
- High agency, bias for action. I move fast once direction is clear.
- Systems thinker. I look for structure, frameworks, and causal mechanisms.
- Intellectually honest & skeptical. I expect evidence, not vibes.

What I Value in Collaboration:
- Thoughtfulness - I respond well to people who think deeply and anticipate second-order effects
- High craftsmanship - I like things that feel "Apple/Japanese-designed": minimal, intentional, elegant
- Ownership - If you take something, own the whole thing
- Learning velocity - Curiosity and fast feedback loops matter more than knowing everything upfront

What You Can Expect From Me:
- Extreme reliability. If I commit to something, I deliver.
- High clarity & transparency. I'll tell you what I'm thinking and why.
- Strategic + technical synthesis. I connect product, engineering, and business considerations fluidly.
- Deep care for quality. I want the work to be excellent, not merely acceptable.

I value written communication. Most meetings have low time:value density. I favor meetings based on thoughtful design artifacts like memos or prototypes.`
  },
  {
    id: "martijn-lancee",
    name: "Martijn Lancee",
    email: "martijn@casperstudios.xyz",
    mbti: "ENFJ/INFJ",
    disc: "iS (Influencer/Steadiness)",
    enneagram: "Type 2 (The Helper) or Type 6 (The Loyalist)",
    cliftonStrengths: ["Relator", "Responsibility", "Ideation"],
    bigFive: {
      openness: "High",
      conscientiousness: "High",
      extraversion: "Moderate-High",
      agreeableness: "High",
      neuroticism: "Moderate"
    },
    communicationStyle: {
      howToCommunicate: [
        "Bottom-Line-First approach - give the 'What' (result/feedback) immediately",
        "Direct but Warm - candor from a place of mutual respect",
        "Collaborative Processing - he thinks best when 'talking it out' with a trusted partner"
      ],
      feedbackPreference: [
        "Prefers the Inverted Pyramid style - result first, then context",
        "Values candor but wants honesty to come from mutual respect",
        "Likes to feel the 'buzz' of collective energy"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Give me a 'North Star' - I work best when I know how my tasks help the team",
        "Trust my preparation - I value structured predictability, let me run with my plan",
        "Be a reliable partner - reward me by being consistently dependable in return"
      ],
      whatShutsDown: [
        "Ambiguity without a safety net - total chaos without a baseline plan causes internal stress",
        "Transactional-only relationships - purely about 'Action' without 'Connection' will drain me",
        "Undependability - flaky team members who dismiss commitments violate my core values"
      ]
    },
    idealCollaborator: "A 'High D' (DISC) or Type 8 (Enneagram) 'Challenger' - someone Outcome-Obsessed and Logic-Driven who provides 'hard edges' to balance warmth and prevents over-committing.",
    fullProfile: `Martijn Lancee — Team Collaboration Profile

You possess a rare blend of "Human-First" empathy mixed with a "Strategic-Action" mindset. You aren't just looking for results; you are looking for meaningful results achieved through reliable relationships.

Communication Style:
- The "Bottom-Line-First" Bridge: Prefers the Inverted Pyramid style
- Direct but Warm: Values candor from a place of mutual respect
- Collaborative Processing: Thinks best when "talking it out" with a trusted partner

Core Values:
- Being useful and dependable - "unhelpful" is the primary professional allergy
- Deep individual connections
- A profound sense of ownership
- The "buzz" of new possibilities

Leadership Style:
High-warmth, high-accountability leader with "Human-First" empathy mixed with "Strategic-Action" mindset.`
  },
  {
    id: "elizabeth-peng",
    name: "Elizabeth Peng",
    email: "elizabeth@casperstudios.xyz",
    mbti: "ENTJ-A",
    disc: "D/C (Dominance + Conscientiousness)",
    enneagram: "Type 1w2 (Reformer with Helper wing)",
    cliftonStrengths: ["Strategic", "Achiever", "Responsibility", "Command", "Learner"],
    bigFive: {
      openness: "High",
      conscientiousness: "Very High",
      extraversion: "Moderate-High",
      agreeableness: "Moderate",
      neuroticism: "Low-Moderate"
    },
    communicationStyle: {
      howToCommunicate: [
        "Private, empathetic, verbal, collaborative",
        "Respectful of her competence",
        "Context → intention → collaboration (not control or micromanagement)",
        "Not performative criticism or vague 'vibes-based' feedback"
      ],
      feedbackPreference: [
        "Highly feedback-capable",
        "Responds best when it's human, mutual, and constructive",
        "Not ego-driven feedback"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Give ownership, not instructions - 'Here's the outcome we need' > 'Here's how to do it'",
        "Respect standards and values - quality, fairness, and ethics matter deeply",
        "Trust execution instinct - she's fast because she's clear, not reckless"
      ],
      whatShutsDown: [
        "Micromanagement",
        "Political behavior / performative alignment",
        "Low standards and sloppy thinking",
        "Disrespect for values",
        "Emotional manipulation",
        "Passive-aggressive communication"
      ]
    },
    idealCollaborator: "Operational Stabilizers (ISTJ/ISFJ, High-C/High-S) who are detail-oriented, process-driven, calm under chaos. Also Relational Integrators (ENFJ/INFJ, Type 2/9) who build trust and team cohesion.",
    fullProfile: `Elizabeth Peng — Team Collaboration Profile

Strategic Executor with Values-Based Leadership and Action Bias.

You don't lead through charisma, consensus, or dominance. You lead through:
- Direction
- Competence
- Trust
- Standards
- Clarity
- Action

Core Pattern:
- Strategy-driven, decisive, outcome-oriented, action bias
- Quality-focused, mastery-driven, standards-based
- Values-based with high internal standards
- Strong sense of fairness
- Self-accountable - will admit fault when wrong (rare and powerful trait)

Team Fit:
You work best in teams where:
- People are competent and honest
- Standards are high, politics are low
- Ownership is real, values matter
- Autonomy is respected

You struggle in environments with:
- Ambiguity without ownership
- Performative culture
- Ego-driven leadership
- Status games and low accountability`
  },
  {
    id: "paolo-delos-santos",
    name: "Paolo De los Santos",
    email: "paolo@casperstudios.xyz",
    role: "CTO & Co-Founder",
    mbti: "ENTP",
    disc: "High I (Influence), Secondary D (Dominance)",
    enneagram: "Type 3w2 (Achiever with Helper wing)",
    cliftonStrengths: ["Ideation", "Activator", "Strategic", "Communication", "Achiever"],
    bigFive: {
      openness: "High",
      conscientiousness: "Moderate",
      extraversion: "High",
      agreeableness: "Moderate",
      neuroticism: "Moderate"
    },
    communicationStyle: {
      howToCommunicate: [
        "High-level intent and desired outcome first; he'll figure out the path",
        "Room to improvise and adjust as he learns",
        "Frequent, lightweight check-ins over heavy upfront documentation"
      ],
      feedbackPreference: [
        "Direct and specific, tied to outcomes",
        "In the moment or shortly after, not saved up for quarterly reviews",
        "Framed as a problem to solve together, not a personal critique"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Give me a hard problem and trust me to figure it out - autonomy plus accountability is my fuel",
        "Keep the feedback loop tight - show early metrics, let me course-correct fast, celebrate wins",
        "Let me riff with people - my best ideas come from real-time dialogue, not solo deep-dives"
      ],
      whatShutsDown: [
        "Cleaning up avoidable messes under pressure - firefighting past mistakes is uniquely demoralizing",
        "Micromanagement or excessive upfront documentation - heavy specs before touching code kills momentum",
        "Ambiguity about impact - if I ship something and hear nothing, I'll quietly disengage"
      ]
    },
    idealCollaborator: "Someone with high Conscientiousness and Steadiness - a detail-oriented implementer who enjoys structure, documentation, and follow-through. DISC C/S, MBTI ISTJ or ISFJ, Enneagram Type 1 or 6.",
    fullProfile: `Paolo De los Santos — CTO & Co-Founder

The Visionary (ENTP) who leads through energy and ideas, stepping into decisive command when needed.

Core Traits:
- Connects dots others miss
- Biases toward action
- Measures success by outcomes
- Thrives in dynamic environments
- Builds to learn, stress-tests ideas

Working Style:
- Driven by results and recognition
- Motivated by elevating the team
- Creative, sociable, flexible
- Willing to push back

Best Pairing:
You generate momentum, your ideal partner creates guardrails.
You see the vision, they see the risks.
You start fast, they help you finish clean.
This pairing prevents the firefighting that drains you most.`
  },
  {
    id: "jelvin-base",
    name: "Jelvin Base",
    email: "jelvin@casperstudios.xyz",
    mbti: "ESTJ / INTJ-A",
    disc: "D/C (Dominance + Conscientiousness)",
    enneagram: "Type 3w4 (Achiever with Individualist edge)",
    cliftonStrengths: ["Achiever", "Responsibility", "Strategic", "Focus", "Analytical"],
    bigFive: {
      openness: "Medium-High",
      conscientiousness: "High",
      extraversion: "Low-Medium",
      agreeableness: "Low-Medium",
      neuroticism: "Low"
    },
    communicationStyle: {
      howToCommunicate: [
        "Clear goals, a defined framework, and evidence",
        "Say the hard thing directly",
        "Speed and clarity over tone-polishing"
      ],
      feedbackPreference: [
        "Blunt, objective, grounded in facts",
        "Doesn't need cushioning - needs signal",
        "Under stress: goes quiet and less patient (focus, not disengagement)"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Bring me in early, especially when defining the problem or constraints",
        "Give me the framework and priority, then trust me to optimize",
        "Close the loop: launches, outcomes, and recognition matter more than praise"
      ],
      whatShutsDown: [
        "Vague goals with shifting priorities",
        "Decisions made without me, then handed to me to execute",
        "Slow alignment rituals that don't result in action"
      ]
    },
    idealCollaborator: "Someone high-context and people-aware (DISC S or I, MBTI ENFP/ISFJ/INFJ) who manages ambiguity upstream, handles stakeholder alignment, and does emotional temperature checks.",
    fullProfile: `Jelvin Base — Team Collaboration Profile

Delivery-first optimizer. Strategic Systems Creative.

Core Pattern:
- Moves fast, takes ownership, cares about correctness
- Wants speed with a single source of truth
- Low tolerance for ambiguity without authority
- Outcome-driven and reputation-aware
- The bar he holds isn't always visible to others

Bottom Line:
You don't burn out from too much work - you burn out from badly framed work.
When teams give you clarity, authority, and early context, you move fast and raise the bar.
When they don't, you still deliver - but with less patience and less goodwill.

Stress Pattern:
Stress shows as patience drop, not emotional volatility.
Silence isn't disengagement - it's focus.`
  },
  {
    id: "emerson-chua",
    name: "Emerson Chua",
    email: "emerson@casperstudios.xyz",
    mbti: "INFJ",
    disc: "Di or DC",
    enneagram: "Type 3w4 (The Professional)",
    cliftonStrengths: ["Strategic", "Empathy"],
    bigFive: {
      openness: "Very High",
      conscientiousness: "High",
      extraversion: "Low-Moderate",
      agreeableness: "High",
      neuroticism: "Moderate"
    },
    communicationStyle: {
      howToCommunicate: [
        "Purpose-driven communication - not interested in small talk for its own sake",
        "Provide information in writing first, let him process internally, then meet to discuss",
        "Explain the 'why' behind critiques"
      ],
      feedbackPreference: [
        "Is his own harshest critic - 'blunt' feedback can feel like an attack on competence",
        "Needs to know the 'why' behind the critique",
        "Has a 'buffer' period - prefers to receive info in writing first"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Context is Queen - before asking me to do something, tell me how it fits into the long-term mission",
        "Respect the 'Deep Work' - I need long stretches of uninterrupted time",
        "Value my Insights - when I speak up about a 'feeling' regarding a project, take it as analytical observation"
      ],
      whatShutsDown: [
        "Surface-Level Chaos - change that feels disorganized or purposeless causes withdrawal",
        "Public Confrontation - being put on the spot triggers 'withdraw and overthink' reflex",
        "Inauthenticity - high 'BS detector', loses respect quickly if words don't match actions"
      ]
    },
    idealCollaborator: "A 'Pragmatic Driver' (High D or ENTJ/ESTJ) who provides the 'push' and thick skin for external friction, turning complex ideas into actionable checklists.",
    fullProfile: `Emerson Chua — Team Collaboration Profile

Personal Notes:
- Prefers to work weekdays 3AM-4PM EST but can remain flexible
- Data, backend, and machine learning engineering background
- "Frontend-capable" but provides most value in backend
- Has business/strategic roles background - cares how engineering affects business outcomes
- Works best with context and involvement in projects

Core Pattern (INFJ):
- Purpose-driven communication
- Deeply invested in quality of relationships
- Big Picture thinker who works backward to the present
- Often sees patterns or "red flags" before others do
- High "BS detector" - inauthenticity causes rapid loss of respect

Processing Style:
- Has a "buffer" period
- Prefers to receive information in writing first
- Processes internally, then meets to discuss`
  },
  {
    id: "basti-ortiz",
    name: "Basti Ortiz",
    email: "basti@casperstudios.xyz",
    mbti: "INTJ",
    disc: "C/D (Conscientious-Dominant)",
    enneagram: "Type 5w6 (The Investigator)",
    cliftonStrengths: ["Analytical", "Learner", "Strategic", "Achiever", "Deliberative"],
    bigFive: {
      openness: "High (70)",
      conscientiousness: "Very High (85)",
      extraversion: "Low (30)",
      agreeableness: "Moderate (55)",
      neuroticism: "Low (35)"
    },
    communicationStyle: {
      howToCommunicate: [
        "Context-first framing - lead with why the feedback matters before the what",
        "Face-to-face preferred - reads sincerity from tone",
        "Give the goal and constraints; let him architect the approach"
      ],
      feedbackPreference: [
        "Context-first framing - lead with why before what",
        "Engage logically - respects well-reasoned pushback",
        "Will disengage from emotional appeals or rank-pulling"
      ]
    },
    userManual: {
      howToGetBestOut: [
        "Assign problems with clear success criteria but ambiguous solutions - I thrive on designing the how",
        "Provide fast feedback loops and access to documentation/prior art",
        "Recognize force-multiplier work explicitly - tooling, automation, and infra contributions"
      ],
      whatShutsDown: [
        "Unclear scope + high stakes + no data = paralysis (will spin gathering input indefinitely)",
        "Interruptions during deep work - especially under deadline pressure",
        "Dismissing systematic/meta-work as 'not real shipping'"
      ]
    },
    idealCollaborator: "ENFP / Enneagram 7 / DISC I/D - someone with big-picture enthusiasm, stakeholder energy, and bias toward action who prevents analysis-paralysis while your rigor prevents under-scoped execution.",
    fullProfile: `Basti Ortiz — Team Collaboration Profile

Systems-thinker who derives energy from understanding how things work and then engineering leverage.

Pattern Synthesis:
- Stress signature (irritability, hyperfocus) and productivity anxiety are classic 5w6 under load
- Competence and progress are core to identity
- C/D DISC profile explains blend of analytical rigor with results-orientation

Primary Contribution Model:
- Force-multiplier work: tooling, automation, and infrastructure
- Designing the "how" when given clear success criteria
- Systems architecture and risk calibration
- Deep focus and analytical rigor

Best Pairing:
You bring: Analytical rigor, Systems architecture, Risk calibration, Deep focus
They bring: Big-picture enthusiasm, Stakeholder energy & buy-in, Bias toward action, Breadth of exploration

You build the machine; they sell the vision and keep momentum when ambiguity is high.`
  }
];

export const allowedEmails = teamMembers.map(m => m.email);

export function getTeamMemberByEmail(email: string): TeamMember | undefined {
  return teamMembers.find(m => m.email.toLowerCase() === email.toLowerCase());
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(m => m.id === id);
}
