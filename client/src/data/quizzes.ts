export interface QuizQuestion {
  question: string;
  options: { text: string; value: string }[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  articles: string[]; // slugs of recommended articles
}

export interface Quiz {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  getResult: (answers: string[]) => QuizResult;
}

function tallyAnswers(answers: string[], results: QuizResult[]): QuizResult {
  const counts: Record<string, number> = {};
  answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
  let maxKey = results[0].id;
  let maxCount = 0;
  Object.entries(counts).forEach(([key, count]) => {
    if (count > maxCount) { maxCount = count; maxKey = key; }
  });
  return results.find(r => r.id === maxKey) || results[0];
}

export const quizzes: Quiz[] = [
  {
    slug: "which-major-arcana-are-you",
    title: "Which Major Arcana Card Are You?",
    description: "Discover which of the 22 Major Arcana cards mirrors your current consciousness.",
    metaDescription: "Take this quiz to discover which Major Arcana tarot card reflects your current life journey and consciousness.",
    questions: [
      { question: "When faced with a major life decision, you tend to:", options: [{ text: "Leap without looking — trust the universe", value: "fool" }, { text: "Research extensively before committing", value: "hermit" }, { text: "Consult your gut feeling above all else", value: "priestess" }, { text: "Take bold, decisive action immediately", value: "emperor" }] },
      { question: "Your ideal Saturday morning looks like:", options: [{ text: "An unplanned adventure wherever the wind takes you", value: "fool" }, { text: "Quiet meditation and journaling alone", value: "hermit" }, { text: "Deep conversation with someone you trust", value: "priestess" }, { text: "Organizing your space and planning the week", value: "emperor" }] },
      { question: "What draws you most to tarot?", options: [{ text: "The mystery and possibility of the unknown", value: "fool" }, { text: "The wisdom encoded in ancient symbols", value: "hermit" }, { text: "The intuitive connection it opens", value: "priestess" }, { text: "The structured framework for understanding life", value: "emperor" }] },
      { question: "When someone you love is struggling, you:", options: [{ text: "Remind them that everything is an adventure", value: "fool" }, { text: "Give them space and check in later", value: "hermit" }, { text: "Hold space and listen without fixing", value: "priestess" }, { text: "Help them create a plan to move forward", value: "emperor" }] },
      { question: "Your relationship with uncertainty is:", options: [{ text: "Exciting — uncertainty means possibility", value: "fool" }, { text: "Contemplative — uncertainty invites reflection", value: "hermit" }, { text: "Intuitive — you sense your way through", value: "priestess" }, { text: "Uncomfortable — you prefer clear direction", value: "emperor" }] },
      { question: "The quality you most value in yourself:", options: [{ text: "Courage and willingness to begin again", value: "fool" }, { text: "Depth of understanding and patience", value: "hermit" }, { text: "Sensitivity and inner knowing", value: "priestess" }, { text: "Strength and ability to lead", value: "emperor" }] },
      { question: "When you pull a card that frightens you:", options: [{ text: "Get curious — what adventure is this pointing to?", value: "fool" }, { text: "Sit with it in silence until it speaks", value: "hermit" }, { text: "Close your eyes and feel what it stirs", value: "priestess" }, { text: "Analyze the symbolism methodically", value: "emperor" }] },
    ],
    results: [
      { id: "fool", title: "The Fool", description: "You carry the energy of pure beginning — the willingness to step into the unknown with nothing but trust. Your consciousness is oriented toward possibility rather than certainty, and this makes you both brave and occasionally reckless. The Fool's gift is the capacity to begin again, always.", articles: ["court-cards-in-relationship-readings", "the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "hermit", title: "The Hermit", description: "Your consciousness naturally turns inward, seeking the lamp of understanding that can only be found in solitude. You process the world through reflection rather than reaction, and your wisdom comes from the willingness to sit with questions longer than most people can tolerate.", articles: ["meditation-practices-that-sharpen-intuition", "the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "priestess", title: "The High Priestess", description: "You live between the pillars of knowing and mystery, comfortable with paradox in a way that unsettles others. Your intuition is not a party trick — it is a refined instrument of perception that you have learned to trust over the noise of rational analysis.", articles: ["meditation-practices-that-sharpen-intuition", "court-cards-in-relationship-readings"] },
      { id: "emperor", title: "The Emperor", description: "Your consciousness organizes reality into workable structures. This is not rigidity — it is the capacity to create order from chaos, to build foundations that others can stand on. Your challenge is learning when to release control and let the cards speak on their own terms.", articles: ["court-cards-in-relationship-readings", "the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[0].results),
  },
  {
    slug: "your-tarot-reading-style",
    title: "What's Your Tarot Reading Style?",
    description: "Are you an intuitive reader, a traditional scholar, or something entirely different?",
    metaDescription: "Discover your unique tarot reading style — intuitive, traditional, somatic, or analytical.",
    questions: [
      { question: "When you first look at a tarot card, you notice:", options: [{ text: "The feeling it creates in your body", value: "somatic" }, { text: "The traditional symbolism and numerology", value: "traditional" }, { text: "The story the image tells you personally", value: "intuitive" }, { text: "The patterns and connections to other cards", value: "analytical" }] },
      { question: "Your preferred way to learn a new card:", options: [{ text: "Meditate with it and notice what arises", value: "somatic" }, { text: "Study its history and traditional meanings", value: "traditional" }, { text: "Pull it in readings and see what it means in context", value: "intuitive" }, { text: "Map its connections to astrology, numerology, elements", value: "analytical" }] },
      { question: "During a reading, you most rely on:", options: [{ text: "Physical sensations — tingling, warmth, tension", value: "somatic" }, { text: "Established card meanings and spread positions", value: "traditional" }, { text: "Whatever images or words come to mind spontaneously", value: "intuitive" }, { text: "Logical connections between the cards", value: "analytical" }] },
      { question: "When a reading doesn't make sense:", options: [{ text: "You sit with the discomfort until clarity comes through the body", value: "somatic" }, { text: "You consult reference books for deeper traditional meaning", value: "traditional" }, { text: "You trust that the meaning will reveal itself later", value: "intuitive" }, { text: "You re-examine the spread structure and card positions", value: "analytical" }] },
      { question: "Your ideal tarot practice space:", options: [{ text: "Comfortable cushions, candles, something to ground you", value: "somatic" }, { text: "A well-organized desk with reference materials nearby", value: "traditional" }, { text: "Wherever the mood strikes — the cards travel with you", value: "intuitive" }, { text: "A quiet space with your journal and correspondence charts", value: "analytical" }] },
    ],
    results: [
      { id: "somatic", title: "The Somatic Reader", description: "You read with your whole body. The cards speak to you through sensation — a tightening in the chest, warmth in the hands, a shift in breathing. This is not imagination; it is the body's native intelligence recognizing patterns that the conscious mind has not yet processed.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "traditional", title: "The Traditional Scholar", description: "You honor the lineage. The centuries of accumulated wisdom in tarot symbolism are not obstacles to intuition — they are its foundation. Your readings carry the weight of tradition, and this depth gives your interpretations a reliability that purely intuitive readers sometimes lack.", articles: ["court-cards-in-relationship-readings"] },
      { id: "intuitive", title: "The Intuitive Channel", description: "The cards are a doorway, and you walk through it every time you read. Your gift is the ability to receive information that has no obvious source — images, words, feelings that arrive unbidden and prove remarkably accurate.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "analytical", title: "The Pattern Weaver", description: "You see the web. Where others see individual cards, you see systems — the numerological progressions, the elemental interactions, the astrological correspondences that connect every card to every other card in a vast network of meaning.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[1].results),
  },
  {
    slug: "your-shadow-card",
    title: "What's Your Shadow Card?",
    description: "Every reader has a card they avoid. Discover yours — and what it's trying to teach you.",
    metaDescription: "Discover your shadow tarot card — the card you unconsciously avoid and what it reveals about your growth edge.",
    questions: [
      { question: "The emotion you find hardest to sit with:", options: [{ text: "Grief or deep sadness", value: "death" }, { text: "Anger or rage", value: "tower" }, { text: "Helplessness or loss of control", value: "wheel" }, { text: "Loneliness or isolation", value: "hermit" }] },
      { question: "In conflict, your default pattern is:", options: [{ text: "Withdraw and process alone", value: "hermit" }, { text: "Avoid it until it becomes unavoidable", value: "death" }, { text: "React intensely in the moment", value: "tower" }, { text: "Try to control the outcome", value: "wheel" }] },
      { question: "The life change that would scare you most:", options: [{ text: "Losing someone you love", value: "death" }, { text: "Having your life completely upended overnight", value: "tower" }, { text: "Realizing you have no control over what happens next", value: "wheel" }, { text: "Being truly alone with yourself for an extended time", value: "hermit" }] },
      { question: "When this card appears in a reading, you:", options: [{ text: "Feel a heaviness settle in", value: "death" }, { text: "Feel your stomach drop", value: "tower" }, { text: "Feel anxious about what's coming", value: "wheel" }, { text: "Feel resistant to its message", value: "hermit" }] },
      { question: "The growth edge you most need right now:", options: [{ text: "Learning to let go of what's already gone", value: "death" }, { text: "Accepting that some things need to be destroyed to be rebuilt", value: "tower" }, { text: "Surrendering to the cycles you cannot control", value: "wheel" }, { text: "Turning inward instead of seeking answers outside yourself", value: "hermit" }] },
    ],
    results: [
      { id: "death", title: "Death (XIII)", description: "Your shadow card is Death — not physical death, but the transformation that requires something to end. You may resist endings, hold on past the point of usefulness, or avoid grief. The card is asking you to trust that what dies makes room for what needs to be born.", articles: ["court-cards-in-relationship-readings"] },
      { id: "tower", title: "The Tower (XVI)", description: "Your shadow card is The Tower — sudden, structural change that cannot be negotiated with. You may over-invest in stability, avoid necessary confrontations, or build elaborate structures to protect yourself from chaos. The Tower asks: what would remain if everything you've built fell away?", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "wheel", title: "Wheel of Fortune (X)", description: "Your shadow card is the Wheel of Fortune — the reminder that life moves in cycles you cannot control. Your resistance to this card suggests a deep need for predictability and agency. The Wheel asks you to find peace within the turning rather than trying to stop it.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "hermit", title: "The Hermit (IX)", description: "Your shadow card is The Hermit — the invitation to turn inward that you keep declining. You may fill silence with noise, avoid solitude, or seek answers from others when the answer lives inside you. The Hermit is not loneliness. It is the discovery that you are your own best teacher.", articles: ["meditation-practices-that-sharpen-intuition"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[2].results),
  },
  {
    slug: "your-tarot-suit",
    title: "Which Tarot Suit Speaks to You?",
    description: "Cups, Wands, Swords, or Pentacles — discover your elemental affinity.",
    metaDescription: "Find out which tarot suit — Cups, Wands, Swords, or Pentacles — resonates most with your energy and approach to life.",
    questions: [
      { question: "When you wake up, your first impulse is:", options: [{ text: "Check in with how you're feeling emotionally", value: "cups" }, { text: "Think about what you want to create today", value: "wands" }, { text: "Review your mental to-do list", value: "swords" }, { text: "Ground yourself with a physical routine", value: "pentacles" }] },
      { question: "You process difficult experiences through:", options: [{ text: "Feeling them fully — tears, joy, everything", value: "cups" }, { text: "Channeling the energy into creative projects", value: "wands" }, { text: "Analyzing and understanding what happened", value: "swords" }, { text: "Taking practical action to change your circumstances", value: "pentacles" }] },
      { question: "In relationships, you most value:", options: [{ text: "Emotional depth and vulnerability", value: "cups" }, { text: "Shared passion and adventure", value: "wands" }, { text: "Honest communication and intellectual connection", value: "swords" }, { text: "Reliability and building something together", value: "pentacles" }] },
      { question: "Your biggest strength is:", options: [{ text: "Empathy — you feel what others feel", value: "cups" }, { text: "Vision — you see possibilities others miss", value: "wands" }, { text: "Clarity — you cut through confusion to truth", value: "swords" }, { text: "Persistence — you build things that last", value: "pentacles" }] },
      { question: "The element you feel most connected to:", options: [{ text: "Water — flowing, deep, emotional", value: "cups" }, { text: "Fire — passionate, transformative, alive", value: "wands" }, { text: "Air — clear, sharp, intellectual", value: "swords" }, { text: "Earth — grounded, stable, nourishing", value: "pentacles" }] },
    ],
    results: [
      { id: "cups", title: "Cups — The Way of Water", description: "You move through the world with your heart as your primary instrument of perception. The suit of Cups reflects your capacity for emotional depth, intuitive knowing, and the kind of compassion that comes from having felt everything yourself.", articles: ["court-cards-in-relationship-readings"] },
      { id: "wands", title: "Wands — The Way of Fire", description: "Creative energy moves through you like a current. The suit of Wands mirrors your passion, your vision, and your willingness to act on inspiration before the rational mind has finished its risk assessment.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "swords", title: "Swords — The Way of Air", description: "Your mind is your sharpest tool. The suit of Swords reflects your capacity for clarity, honest assessment, and the sometimes painful gift of seeing things as they actually are rather than as you wish they were.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "pentacles", title: "Pentacles — The Way of Earth", description: "You understand that the spiritual and the material are not separate. The suit of Pentacles mirrors your gift for making things real — turning vision into form, intention into practice, and ideas into something you can hold.", articles: ["court-cards-in-relationship-readings"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[3].results),
  },
  {
    slug: "tarot-intuition-level",
    title: "How Developed Is Your Tarot Intuition?",
    description: "An honest assessment of where you are on the intuitive development path.",
    metaDescription: "Assess your tarot intuition level — from beginner to advanced — and get personalized recommendations for deepening your practice.",
    questions: [
      { question: "When you look at a card you've never studied:", options: [{ text: "I see an image and wait for the book meaning", value: "emerging" }, { text: "I get a general feeling but second-guess it", value: "developing" }, { text: "Images and words come to me that feel relevant", value: "strong" }, { text: "I receive detailed impressions that prove accurate", value: "refined" }] },
      { question: "Your relationship with the 'book meanings' of cards:", options: [{ text: "I rely on them heavily — they're my foundation", value: "emerging" }, { text: "I know them but sometimes feel pulled in a different direction", value: "developing" }, { text: "I use them as a starting point but trust my own impressions more", value: "strong" }, { text: "They're one voice among many — my body and intuition speak louder", value: "refined" }] },
      { question: "During a reading, physical sensations:", options: [{ text: "I don't notice any particular physical response", value: "emerging" }, { text: "Sometimes I notice something but I'm not sure what it means", value: "developing" }, { text: "I regularly feel specific sensations that inform the reading", value: "strong" }, { text: "My body is a reliable instrument — I trust its signals completely", value: "refined" }] },
      { question: "When you read for someone else:", options: [{ text: "I mostly relay the traditional card meanings", value: "emerging" }, { text: "I share meanings but sometimes add personal impressions", value: "developing" }, { text: "I blend traditional knowledge with strong intuitive hits", value: "strong" }, { text: "The reading flows through me — I'm more channel than interpreter", value: "refined" }] },
      { question: "Your daily card practice:", options: [{ text: "I pull a card and look up its meaning", value: "emerging" }, { text: "I sit with the card briefly before checking references", value: "developing" }, { text: "I spend time in dialogue with the card before any reference", value: "strong" }, { text: "The card and I have a conversation — no references needed", value: "refined" }] },
    ],
    results: [
      { id: "emerging", title: "Emerging Intuition", description: "You are at the beautiful beginning — the place where curiosity meets the cards for the first time. Your intuition is not absent; it is simply waiting beneath the noise of self-doubt and the desire to 'get it right.' The work now is not to develop intuition but to stop suppressing it.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "developing", title: "Developing Intuition", description: "You hear two voices when you read — the book and something else. That 'something else' is your intuition, and the fact that you notice it means it is already stronger than you think. Your growth edge is learning to trust it when it contradicts what you've memorized.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "strong", title: "Strong Intuition", description: "Your intuitive capacity is well-developed and increasingly reliable. You have learned to distinguish between genuine intuitive impressions and wishful thinking — a distinction that many readers never master. The next frontier is learning to trust the impressions that make no logical sense.", articles: ["court-cards-in-relationship-readings"] },
      { id: "refined", title: "Refined Intuition", description: "You have arrived at the place where the cards are less a tool and more a conversation partner. Your body, your awareness, and the symbolic language of tarot have merged into a single instrument of perception. The work now is not development but deepening — and teaching others what you have learned.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[4].results),
  },
  {
    slug: "tarot-and-your-nervous-system",
    title: "Tarot and Your Nervous System",
    description: "How does your nervous system respond to the cards? Discover your somatic reading pattern.",
    metaDescription: "Explore the connection between your nervous system and tarot reading. Discover your somatic response pattern.",
    questions: [
      { question: "When you shuffle the cards, your body:", options: [{ text: "Relaxes — shuffling is calming and meditative", value: "ventral" }, { text: "Tenses slightly — anticipation of what might come", value: "sympathetic" }, { text: "Goes still — a kind of focused freeze", value: "dorsal" }, { text: "Fluctuates — different each time depending on the question", value: "flexible" }] },
      { question: "After a difficult reading, you tend to:", options: [{ text: "Process it calmly and integrate the message", value: "ventral" }, { text: "Feel activated — restless, need to move or talk", value: "sympathetic" }, { text: "Feel heavy — need to withdraw and be alone", value: "dorsal" }, { text: "Move through several states before settling", value: "flexible" }] },
      { question: "Your breathing during a reading:", options: [{ text: "Stays steady and deep throughout", value: "ventral" }, { text: "Gets shallow or rapid during intense cards", value: "sympathetic" }, { text: "Sometimes you realize you've been holding your breath", value: "dorsal" }, { text: "Changes naturally with the emotional content of each card", value: "flexible" }] },
      { question: "When The Tower appears:", options: [{ text: "You acknowledge it and explore its meaning calmly", value: "ventral" }, { text: "Your heart rate increases and you feel alert", value: "sympathetic" }, { text: "You feel a sinking sensation and want to stop", value: "dorsal" }, { text: "You notice your body's response and use it as information", value: "flexible" }] },
      { question: "Your ideal state for reading:", options: [{ text: "Grounded and present — connected to your body", value: "ventral" }, { text: "Energized and alert — slightly activated", value: "sympathetic" }, { text: "Deeply internal — almost trance-like", value: "dorsal" }, { text: "It varies — you adapt to what the reading needs", value: "flexible" }] },
    ],
    results: [
      { id: "ventral", title: "Ventral Vagal Reader", description: "You read from a place of safety and groundedness. Your nervous system is regulated during readings, which allows you to receive difficult messages without becoming overwhelmed. This is the ideal reading state — present, connected, and able to hold complexity without collapsing into reactivity.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "sympathetic", title: "Sympathetic Activation Reader", description: "Your readings carry a charge of energy and alertness. This activation can be a gift — it sharpens perception and creates intensity. The practice is learning to channel this energy without letting it tip into anxiety or over-interpretation.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "dorsal", title: "Dorsal Vagal Reader", description: "You tend to go deep — sometimes too deep. Your readings can feel like diving underwater, and the challenge is maintaining enough presence to interpret what you find there. The body's tendency to freeze or withdraw is not a flaw; it is a protective response that can be gently renegotiated.", articles: ["court-cards-in-relationship-readings"] },
      { id: "flexible", title: "Flexible Response Reader", description: "Your nervous system moves fluidly between states during a reading, and you have learned to use each state as information rather than something to manage. This flexibility is the hallmark of a mature reader — one who can meet whatever the cards bring without losing their center.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[5].results),
  },
  {
    slug: "your-tarot-learning-path",
    title: "Your Ideal Tarot Learning Path",
    description: "Not everyone learns the cards the same way. Find the approach that matches how your mind works.",
    metaDescription: "Discover your ideal tarot learning path based on how your mind naturally processes symbolic information.",
    questions: [
      { question: "You learn best by:", options: [{ text: "Reading and studying — give me the books", value: "scholar" }, { text: "Doing — I learn by pulling cards and figuring it out", value: "practitioner" }, { text: "Feeling — I absorb meaning through meditation and contemplation", value: "mystic" }, { text: "Teaching — I understand things best when I explain them to others", value: "teacher" }] },
      { question: "When you encounter a concept you don't understand:", options: [{ text: "Research it thoroughly from multiple sources", value: "scholar" }, { text: "Try it out and see what happens", value: "practitioner" }, { text: "Sit with it until understanding arrives on its own", value: "mystic" }, { text: "Discuss it with someone to work through it together", value: "teacher" }] },
      { question: "Your tarot journal is:", options: [{ text: "Detailed notes on card meanings, spreads, and correspondences", value: "scholar" }, { text: "Records of actual readings and what happened after", value: "practitioner" }, { text: "Stream of consciousness reflections and meditative insights", value: "mystic" }, { text: "Organized insights you could share with a beginner", value: "teacher" }] },
      { question: "The tarot resource you'd most value:", options: [{ text: "A comprehensive encyclopedia of card meanings", value: "scholar" }, { text: "A deck of cards and permission to experiment", value: "practitioner" }, { text: "A guided meditation series for each card", value: "mystic" }, { text: "A community of readers to learn alongside", value: "teacher" }] },
      { question: "Your relationship with tarot 'rules':", options: [{ text: "I want to know all the rules before I start", value: "scholar" }, { text: "Rules are guidelines — I'll find what works for me", value: "practitioner" }, { text: "Rules are training wheels — eventually you ride without them", value: "mystic" }, { text: "Rules help me teach others, even if I don't always follow them", value: "teacher" }] },
    ],
    results: [
      { id: "scholar", title: "The Scholar's Path", description: "Your mind craves depth and structure. The Scholar's Path honors the intellectual tradition of tarot — the centuries of accumulated wisdom, the symbolic systems, the correspondences that connect each card to astrology, numerology, and Kabbalah. Your readings will be rich with knowledge.", articles: ["court-cards-in-relationship-readings"] },
      { id: "practitioner", title: "The Practitioner's Path", description: "You learn by doing. The Practitioner's Path is the path of direct experience — pulling cards, making mistakes, discovering through practice what no book can teach you. Your understanding of tarot will be earned through thousands of readings, each one a teacher.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "mystic", title: "The Mystic's Path", description: "You approach the cards as a contemplative practice. The Mystic's Path treats each card as a doorway into meditation, each reading as a conversation with consciousness itself. Your gift is the ability to receive meaning that transcends the intellectual.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "teacher", title: "The Teacher's Path", description: "You understand things most deeply when you share them. The Teacher's Path is not about having all the answers — it is about the clarity that comes from articulating what you know and discovering what you don't in the process of helping others.", articles: ["court-cards-in-relationship-readings"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[6].results),
  },
  {
    slug: "which-spread-fits-your-question",
    title: "Which Spread Fits Your Question?",
    description: "Not every question needs the Celtic Cross. Find the spread that matches your inquiry.",
    metaDescription: "Discover which tarot spread is best suited for the type of question you're currently holding.",
    questions: [
      { question: "Your current question is about:", options: [{ text: "A specific yes/no decision", value: "three" }, { text: "Understanding a complex situation from multiple angles", value: "celtic" }, { text: "Your relationship with another person", value: "relationship" }, { text: "Your personal growth and spiritual development", value: "growth" }] },
      { question: "How much time do you want to spend on this reading?", options: [{ text: "5-10 minutes — quick clarity", value: "three" }, { text: "30-45 minutes — deep exploration", value: "celtic" }, { text: "20-30 minutes — thorough but focused", value: "relationship" }, { text: "As long as it takes — this matters", value: "growth" }] },
      { question: "What kind of answer are you looking for?", options: [{ text: "Clear direction — past, present, future", value: "three" }, { text: "A complete map of the situation and its influences", value: "celtic" }, { text: "Understanding the dynamics between two energies", value: "relationship" }, { text: "Insight into what's blocking you and how to move forward", value: "growth" }] },
      { question: "Your experience level with spreads:", options: [{ text: "I prefer simple, straightforward layouts", value: "three" }, { text: "I'm comfortable with complex multi-card spreads", value: "celtic" }, { text: "I like spreads designed for specific purposes", value: "relationship" }, { text: "I want a spread that goes deep into one area", value: "growth" }] },
      { question: "After the reading, you want to feel:", options: [{ text: "Clear about what to do next", value: "three" }, { text: "Like you understand the full picture", value: "celtic" }, { text: "More connected to the other person or situation", value: "relationship" }, { text: "Transformed — like something shifted inside you", value: "growth" }] },
    ],
    results: [
      { id: "three", title: "The Three-Card Spread", description: "Sometimes the most powerful readings are the simplest. The three-card spread — past, present, future or situation, challenge, advice — gives you exactly what you need without the noise. For your current question, clarity will come from simplicity, not complexity.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "celtic", title: "The Celtic Cross", description: "Your question has layers, and it deserves a spread that can hold them all. The Celtic Cross is the most comprehensive traditional spread — ten cards that map the situation, the influences, the hopes, the fears, and the likely outcome. This is deep work.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
      { id: "relationship", title: "The Relationship Spread", description: "When two energies meet, the space between them tells its own story. A relationship spread places cards for each person and for the dynamic itself — revealing not just what each person brings, but what the relationship creates that neither person could create alone.", articles: ["court-cards-in-relationship-readings"] },
      { id: "growth", title: "The Growth Spread", description: "You are not looking for prediction — you are looking for transformation. A growth-oriented spread focuses on what is blocking you, what is supporting you, what you need to release, and what is trying to emerge. This is tarot as consciousness work.", articles: ["meditation-practices-that-sharpen-intuition"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[7].results),
  },
  {
    slug: "your-tarot-blind-spot",
    title: "What's Your Tarot Blind Spot?",
    description: "Every reader has one. The pattern you can't see because you're standing inside it.",
    metaDescription: "Discover your tarot reading blind spot — the unconscious pattern that may be limiting your readings.",
    questions: [
      { question: "When you read for yourself, you tend to:", options: [{ text: "See what you want to see — positive bias", value: "optimism" }, { text: "Focus on problems and miss the gifts", value: "shadow" }, { text: "Over-intellectualize and miss the emotional truth", value: "head" }, { text: "Get the message but never act on it", value: "action" }] },
      { question: "The feedback you most often get from others about your readings:", options: [{ text: "You're encouraging but sometimes miss the hard truths", value: "optimism" }, { text: "You're intense — sometimes people need more hope", value: "shadow" }, { text: "You're insightful but it feels more like analysis than reading", value: "head" }, { text: "You give great advice but don't seem to follow it yourself", value: "action" }] },
      { question: "The card position you struggle with most:", options: [{ text: "Challenges and obstacles — you want to skip to the outcome", value: "optimism" }, { text: "Hopes and desires — you're more comfortable with fears", value: "shadow" }, { text: "Feelings and emotions — you gravitate toward meaning", value: "head" }, { text: "Action cards — you understand but don't implement", value: "action" }] },
      { question: "Your relationship with difficult cards:", options: [{ text: "You reframe them positively — every cloud has a silver lining", value: "optimism" }, { text: "You dive deep into their darkness — sometimes too deep", value: "shadow" }, { text: "You analyze their symbolism but don't feel their weight", value: "head" }, { text: "You understand their message but struggle to change", value: "action" }] },
      { question: "If you're honest, your readings would improve if you:", options: [{ text: "Were willing to deliver uncomfortable truths", value: "optimism" }, { text: "Balanced shadow work with hope and possibility", value: "shadow" }, { text: "Let yourself feel more and think less during readings", value: "head" }, { text: "Actually did what the cards told you to do", value: "action" }] },
    ],
    results: [
      { id: "optimism", title: "The Optimism Blind Spot", description: "Your warmth is genuine, but it sometimes prevents you from delivering the medicine the reading actually contains. Not every Tower is a 'blessing in disguise.' Sometimes it is just a tower falling, and the person needs to hear that before they can begin to rebuild.", articles: ["court-cards-in-relationship-readings"] },
      { id: "shadow", title: "The Shadow Fixation", description: "You are drawn to the depths — which is a gift — but you sometimes forget that the cards also carry light. Your readings may leave people feeling seen but not held, understood but not hopeful. The challenge is balancing truth with tenderness.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "head", title: "The Intellectual Override", description: "Your mind is sharp, but it sometimes intercepts messages that were meant for your body or your heart. The cards speak in images, sensations, and feelings before they speak in words. Your growth edge is learning to receive before you interpret.", articles: ["meditation-practices-that-sharpen-intuition"] },
      { id: "action", title: "The Integration Gap", description: "You receive the message clearly. You understand it intellectually. You can articulate it beautifully. And then you do nothing. Your blind spot is not perception — it is implementation. The cards are not asking you to understand. They are asking you to change.", articles: ["the-bridge-spread-connecting-where-you-are-to-where-you-want-to-be"] },
    ],
    getResult: (answers) => tallyAnswers(answers, quizzes[8].results),
  },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find(q => q.slug === slug);
}
