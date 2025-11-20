type AdvisorType = 'operator' | 'growth' | 'finance' | 'product' | 'skeptic';

interface FeedbackResult {
  advisor_type: AdvisorType;
  score: number;
  diagnosis: string;
  prescription: string;
}

interface PersonaResult {
  persona_name: string;
  persona_description: string;
  reaction_quote: string;
  willingness_to_buy: number;
}

interface AnalysisInput {
  idea_name: string;
  idea_description: string;
  target_audience: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function generateHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getSeededScore(input: AnalysisInput, advisorType: string, phase: 'initial' | 'evidence'): number {
  const hash = generateHash(input.idea_name + input.idea_description + advisorType + phase);
  const baseScore = (hash % 50) / 10 + 4;

  if (phase === 'evidence') {
    const improvement = (hash % 20) / 10;
    return Math.min(10, baseScore + improvement + 1);
  }

  return baseScore;
}

export async function generateBoardFeedback(input: AnalysisInput): Promise<{
  feedback: FeedbackResult[];
  averageScore: number;
  verdict: string;
}> {
  await delay(2000);

  const advisorTemplates: Record<AdvisorType, {
    diagnosisPatterns: string[];
    prescriptionPatterns: string[];
  }> = {
    operator: {
      diagnosisPatterns: [
        "Your operational foundation shows {quality}. The execution plan for '{idea}' needs more specificity around resource allocation and timelines.",
        "The operational model has {quality} structure. I see gaps in how you'll scale '{idea}' from 10 to 100 customers.",
        "Your operations thinking is {quality}, but the supply chain and logistics for '{idea}' aren't clearly mapped out.",
      ],
      prescriptionPatterns: [
        "Map out your first 90 days. List the 5 critical hires you need and when. Create a simple Gantt chart.",
        "Write down your customer onboarding process step-by-step. Time each step. Find the bottleneck.",
        "Calculate your unit economics: Cost to deliver one unit of '{idea}' to one customer. Be specific.",
      ],
    },
    growth: {
      diagnosisPatterns: [
        "Your growth strategy shows {quality} understanding of acquisition channels. For '{idea}', I don't see a clear customer acquisition playbook.",
        "The market approach has {quality} potential, but you're missing key metrics. How will you get your first 100 customers for '{idea}'?",
        "Your positioning is {quality}, but the go-to-market motion for '{idea}' lacks focus. You're trying to be everywhere at once.",
      ],
      prescriptionPatterns: [
        "Pick ONE channel for the next 30 days. Master it. Write down 3 experiments you'll run this week.",
        "Interview 10 people from '{audience}'. Ask: 'Where do you look for solutions like this?' Use their language.",
        "Create a simple referral loop. Answer: Why would someone tell their friend about '{idea}'? Make it easy.",
      ],
    },
    finance: {
      diagnosisPatterns: [
        "Your financial model shows {quality} thinking, but the unit economics for '{idea}' aren't sustainable at scale.",
        "The revenue assumptions have {quality} grounding. I need to see CAC, LTV, and payback period for '{idea}'.",
        "Your pricing strategy is {quality}, but you haven't validated willingness to pay for '{idea}' with real data.",
      ],
      prescriptionPatterns: [
        "Build a simple spreadsheet: Month 1-12. Track: Revenue, Costs, Cash. Be conservative. Add a buffer.",
        "Calculate: If you charge $X, how many customers do you need to break even? Is that realistic in 6 months?",
        "Run a pricing test: Offer '{idea}' to 5 people at different price points. See what they actually pay, not what they say.",
      ],
    },
    product: {
      diagnosisPatterns: [
        "Your product vision shows {quality} clarity, but '{idea}' tries to solve too many problems at once.",
        "The user experience has {quality} foundation. The core value prop of '{idea}' gets buried in features.",
        "Your product thinking is {quality}, but you haven't identified the one thing that makes '{idea}' 10x better than alternatives.",
      ],
      prescriptionPatterns: [
        "Cut your feature list in half. Now cut it again. What's the ONE thing users can't live without in '{idea}'?",
        "Draw the user journey on paper: First visit to 'aha moment'. Count the steps. Every step loses 20% of users.",
        "Build the absolute minimum version in 2 weeks. Just enough to test if '{audience}' actually wants this. Ship it.",
      ],
    },
    skeptic: {
      diagnosisPatterns: [
        "I see {quality} potential, but let's talk risks. The biggest threat to '{idea}' is market timing—why now?",
        "Your assumptions show {quality} reasoning, but '{idea}' depends on behavior change, which is incredibly hard.",
        "The competitive landscape is {quality} analyzed. What stops a bigger player from copying '{idea}' in 6 months?",
      ],
      prescriptionPatterns: [
        "List your 3 biggest assumptions. For each, write: 'What if I'm wrong?' Build a plan B for each.",
        "Research your competitors deeply. Find where they're weak. That's your wedge. Write it down in one sentence.",
        "Talk to 5 people who tried to build something similar. Ask what killed their project. Learn from their mistakes.",
      ],
    },
  };

  const feedback: FeedbackResult[] = [];

  for (const [advisorType, templates] of Object.entries(advisorTemplates)) {
    const score = getSeededScore(input, advisorType, 'initial');
    const quality = score > 7 ? 'solid' : score > 5 ? 'decent' : 'weak';

    const diagnosisIndex = generateHash(input.idea_name + advisorType + 'diag') % templates.diagnosisPatterns.length;
    const prescriptionIndex = generateHash(input.idea_name + advisorType + 'presc') % templates.prescriptionPatterns.length;

    const diagnosis = templates.diagnosisPatterns[diagnosisIndex]
      .replace('{quality}', quality)
      .replace('{idea}', input.idea_name)
      .replace('{audience}', input.target_audience);

    const prescription = templates.prescriptionPatterns[prescriptionIndex]
      .replace('{idea}', input.idea_name)
      .replace('{audience}', input.target_audience);

    feedback.push({
      advisor_type: advisorType as AdvisorType,
      score: Number(score.toFixed(1)),
      diagnosis,
      prescription,
    });
  }

  const averageScore = Number((feedback.reduce((sum, f) => sum + f.score, 0) / feedback.length).toFixed(1));

  let verdict = '';
  if (averageScore >= 8) {
    verdict = 'Strong potential. Focus on execution and validation.';
  } else if (averageScore >= 6) {
    verdict = 'Promising concept. Address the key concerns before scaling.';
  } else {
    verdict = 'Needs refinement. Use the feedback to strengthen your foundation.';
  }

  return { feedback, averageScore, verdict };
}

export async function simulateMarket(input: AnalysisInput): Promise<PersonaResult[]> {
  await delay(2000);

  const personaTemplates = [
    {
      names: ['Sarah Chen, Product Manager', 'Michael Torres, Freelance Designer', 'Emma Wilson, Startup Founder'],
      descriptions: [
        'Works remotely, juggles multiple tools, values efficiency',
        'Budget-conscious, seeks simple solutions that just work',
        'Early adopter, willing to try new tools if they save time',
      ],
      reactions: [
        "I like the concept of {idea}, but I'm already using 3 similar tools. Would need a compelling reason to switch.",
        "The idea is interesting, but the pricing needs to be clearer upfront. I don't want surprises.",
        "This could work if it integrates with my existing workflow. The onboarding needs to be under 5 minutes.",
      ],
      willingnessRange: [45, 75],
    },
    {
      names: ['David Park, Small Business Owner', 'Lisa Rodriguez, Team Lead', 'James Anderson, Consultant'],
      descriptions: [
        'Time-poor, needs solutions that work out of the box',
        'Risk-averse, prefers proven solutions with good support',
        'Price-sensitive, compares multiple options carefully',
      ],
      reactions: [
        "{idea} sounds useful, but I need to see case studies from businesses like mine first.",
        "I'm interested, but the learning curve concerns me. My team is already stretched thin.",
        "The value proposition is clear, but I'd want a trial period to test it with real scenarios.",
      ],
      willingnessRange: [30, 60],
    },
    {
      names: ['Priya Sharma, Enterprise Manager', 'Alex Thompson, Operations Director', 'Rachel Kim, VP of Product'],
      descriptions: [
        'Needs enterprise features: security, compliance, reporting',
        'Evaluates ROI carefully, long sales cycles',
        'Requires integration with existing enterprise stack',
      ],
      reactions: [
        "For {idea} to work at our scale, we'd need SSO, audit logs, and dedicated support. Happy to pay for that.",
        "Interesting approach, but I'd need to see a detailed security and compliance document before we can consider it.",
        "The core idea is solid, but enterprise adoption requires change management support and training materials.",
      ],
      willingnessRange: [60, 85],
    },
  ];

  const personas: PersonaResult[] = [];
  const hash = generateHash(input.idea_name + input.idea_description);

  for (let i = 0; i < 3; i++) {
    const template = personaTemplates[i];
    const nameIndex = (hash + i) % template.names.length;
    const descIndex = (hash + i * 2) % template.descriptions.length;
    const reactionIndex = (hash + i * 3) % template.reactions.length;

    const willingness = template.willingnessRange[0] +
      ((hash + i * 10) % (template.willingnessRange[1] - template.willingnessRange[0]));

    personas.push({
      persona_name: template.names[nameIndex],
      persona_description: template.descriptions[descIndex],
      reaction_quote: template.reactions[reactionIndex].replace('{idea}', input.idea_name),
      willingness_to_buy: willingness,
    });
  }

  return personas;
}

export async function analyzeEvidence(
  input: AnalysisInput,
  evidenceData: string,
  previousFeedback: FeedbackResult[]
): Promise<{
  updatedFeedback: FeedbackResult[];
  averageScore: number;
  verdict: string;
}> {
  await delay(2000);

  const hasSubstantialEvidence = evidenceData.length > 100;
  const mentionsNumbers = /\d+/.test(evidenceData);
  const mentionsUsers = /(user|customer|person|people|interview)/i.test(evidenceData);

  const updatedFeedback: FeedbackResult[] = previousFeedback.map(prev => {
    const baseNewScore = getSeededScore(input, prev.advisor_type, 'evidence');
    let improvementBonus = 0;

    if (hasSubstantialEvidence) improvementBonus += 0.3;
    if (mentionsNumbers) improvementBonus += 0.4;
    if (mentionsUsers) improvementBonus += 0.3;

    const newScore = Math.min(10, Math.max(prev.score + 0.5, baseNewScore + improvementBonus));

    const improvementPhrases = [
      'Your updated data shows real progress.',
      'I see tangible evidence of validation.',
      'The additional research strengthens your case.',
      'Good work gathering real-world feedback.',
    ];

    const concernPhrases = [
      'but keep pushing for more specific metrics.',
      'though I still want to see longer-term data.',
      'but validate this with a larger sample size.',
      'though watch out for confirmation bias.',
    ];

    const hash = generateHash(input.idea_name + prev.advisor_type + 'evidence');
    const improvementPhrase = improvementPhrases[hash % improvementPhrases.length];
    const concernPhrase = concernPhrases[(hash + 1) % concernPhrases.length];

    const newDiagnosis = `${improvementPhrase} ${prev.diagnosis.split('.')[0]}, ${concernPhrase}`;

    return {
      ...prev,
      score: Number(newScore.toFixed(1)),
      diagnosis: newDiagnosis,
    };
  });

  const averageScore = Number((updatedFeedback.reduce((sum, f) => sum + f.score, 0) / updatedFeedback.length).toFixed(1));

  let verdict = '';
  if (averageScore >= 8) {
    verdict = 'Excellent progress. Your validation data is strong. Ready to scale.';
  } else if (averageScore >= 7) {
    verdict = 'Solid improvement. Continue gathering evidence and iterating.';
  } else if (averageScore >= 6) {
    verdict = 'Moving in the right direction. More validation needed before major investment.';
  } else {
    verdict = 'Some progress made. Revisit core assumptions and gather stronger evidence.';
  }

  return { updatedFeedback, averageScore, verdict };
}

export function generateNextActions(input: AnalysisInput, averageScore: number): string[] {
  const allActions = [
    'Email 5 people from your target audience and ask for a 15-minute call',
    'Create a simple landing page and drive 100 visitors to it this week',
    'Build a mockup or prototype that demonstrates your core value prop',
    'Write down your unit economics: revenue per customer vs cost to serve',
    'Interview 3 people who use competing solutions—ask what they love and hate',
    'Set up a simple analytics dashboard to track your key metric',
    'Find 2-3 communities where your target audience hangs out and join them',
    'Create a one-page pitch deck and practice your 2-minute pitch',
    'Calculate your runway: how long can you work on this with current resources?',
    'Identify your riskiest assumption and design a test to validate it',
  ];

  const hash = generateHash(input.idea_name + input.idea_description);
  const selectedIndices = new Set<number>();

  while (selectedIndices.size < 5) {
    const index = (hash + selectedIndices.size * 7) % allActions.length;
    selectedIndices.add(index);
  }

  return Array.from(selectedIndices).map(i => allActions[i]);
}
