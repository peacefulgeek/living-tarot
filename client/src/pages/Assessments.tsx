import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";
import { Link } from "wouter";

interface AssessmentQuestion {
  question: string;
  options: { text: string; score: number }[];
}

interface AssessmentResult {
  range: [number, number];
  title: string;
  description: string;
  recommendations: string[];
}

interface Assessment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  questions: AssessmentQuestion[];
  results: AssessmentResult[];
}

const ASSESSMENTS: Assessment[] = [
  {
    id: "intuitive-reader-type",
    title: "What Type of Intuitive Reader Are You?",
    subtitle: "Discover your natural reading style",
    description: "This assessment identifies whether you lean toward visual, emotional, analytical, or somatic intuition when reading tarot cards. Understanding your dominant mode helps you work with your strengths rather than against them.",
    questions: [
      { question: "When you first look at a tarot card, what do you notice first?", options: [{ text: "The colors and visual composition", score: 1 }, { text: "The emotional feeling it evokes", score: 2 }, { text: "The symbolic meanings and correspondences", score: 3 }, { text: "A physical sensation in your body", score: 4 }] },
      { question: "How do you typically remember a reading?", options: [{ text: "I see the card images in my mind", score: 1 }, { text: "I remember how the reading felt", score: 2 }, { text: "I recall the logical narrative that emerged", score: 3 }, { text: "I remember where I felt tension or ease in my body", score: 4 }] },
      { question: "When a card confuses you, what do you do?", options: [{ text: "Look more closely at the imagery for clues", score: 1 }, { text: "Sit with the discomfort and wait for clarity", score: 2 }, { text: "Reference a book or known meaning", score: 3 }, { text: "Notice what happens in my chest or stomach", score: 4 }] },
      { question: "What makes a reading feel complete to you?", options: [{ text: "When I can see the whole story visually", score: 1 }, { text: "When there is an emotional resolution", score: 2 }, { text: "When the logic of the spread makes sense", score: 3 }, { text: "When my body relaxes", score: 4 }] },
      { question: "How do you prepare for a reading?", options: [{ text: "I arrange the space visually — candles, cloth, lighting", score: 1 }, { text: "I center myself emotionally and set an intention", score: 2 }, { text: "I review the spread positions and their meanings", score: 3 }, { text: "I do a body scan or breathing exercise", score: 4 }] },
      { question: "Which description resonates most with your experience?", options: [{ text: "I often see images or scenes when reading cards", score: 1 }, { text: "I absorb the querent's emotions during readings", score: 2 }, { text: "I build a coherent narrative from card positions", score: 3 }, { text: "I feel physical signals that guide my interpretation", score: 4 }] },
      { question: "What frustrates you most about reading for others?", options: [{ text: "When they cannot see what seems obvious in the imagery", score: 1 }, { text: "When they are emotionally closed off", score: 2 }, { text: "When the cards do not form a logical pattern", score: 3 }, { text: "When I cannot trust my body's signals in the moment", score: 4 }] },
      { question: "What draws you to tarot in the first place?", options: [{ text: "The beauty and symbolism of the artwork", score: 1 }, { text: "The emotional depth and connection it offers", score: 2 }, { text: "The structured system of meaning and correspondence", score: 3 }, { text: "The way it connects me to something I feel but cannot name", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Visual Intuitive", description: "You process tarot information primarily through imagery and visual pattern recognition. Your readings are strongest when you let the artwork speak before consulting any book meanings. You likely notice details in card illustrations that others miss entirely.", recommendations: ["Spend time with each card's artwork before reading any interpretive text", "Try reading with multiple decks to see how different artistic styles affect your readings", "Keep a visual journal — sketch the cards or photograph your spreads"] },
      { range: [15, 20], title: "Emotional Intuitive", description: "Your primary channel is empathic — you feel your way through readings. This makes you exceptionally good at reading for others because you naturally attune to their emotional state. The challenge is maintaining boundaries between your feelings and the querent's.", recommendations: ["Practice grounding exercises before and after readings", "Learn to distinguish between your emotions and those you are picking up from others", "The Cups suit is likely your strongest — study the Swords suit to develop your analytical side"] },
      { range: [21, 26], title: "Analytical Intuitive", description: "You approach tarot through systems, correspondences, and structured meaning. Your readings are precise and well-reasoned. The strength of this approach is clarity and consistency. The growth edge is learning to trust impressions that do not fit neatly into known frameworks.", recommendations: ["Study the Kabbalistic and astrological correspondences — they will satisfy your systematic mind", "Practice reading without any reference materials to build trust in your direct perception", "Try free-association with cards before applying structured meanings"] },
      { range: [27, 32], title: "Somatic Intuitive", description: "Your body is your primary instrument of knowing. You receive information through physical sensations — gut feelings, chest tightness, warmth in your hands, or a settling in your spine. This is the oldest form of intuition and often the most reliable, though the hardest to articulate.", recommendations: ["Develop a personal vocabulary for your body signals — what does each sensation mean for you?", "Practice body scanning before readings to establish a baseline", "The somatic approach pairs powerfully with breathwork — explore pranayama or Wim Hof method"] },
    ],
  },
  {
    id: "shadow-work-readiness",
    title: "Shadow Work Readiness Assessment",
    subtitle: "Are you prepared for deep inner work?",
    description: "Shadow work through tarot involves confronting the parts of yourself you have avoided or denied. This assessment helps you gauge whether you are in a stable enough place to do this work productively, or whether you need more foundational support first.",
    questions: [
      { question: "When an uncomfortable emotion arises, how do you typically respond?", options: [{ text: "I try to distract myself or push it away", score: 1 }, { text: "I acknowledge it but feel overwhelmed", score: 2 }, { text: "I can sit with it for a while before it becomes too much", score: 3 }, { text: "I can observe it with curiosity and let it move through me", score: 4 }] },
      { question: "How do you react when someone gives you critical feedback?", options: [{ text: "I feel attacked and defensive", score: 1 }, { text: "I feel hurt but try to consider it later", score: 2 }, { text: "I can hear it in the moment even if it stings", score: 3 }, { text: "I can separate the message from my emotional reaction", score: 4 }] },
      { question: "Do you have a regular contemplative or grounding practice?", options: [{ text: "No, I have been meaning to start one", score: 1 }, { text: "I practice occasionally when I remember", score: 2 }, { text: "I have a semi-regular practice, a few times a week", score: 3 }, { text: "I have a daily practice I rarely miss", score: 4 }] },
      { question: "How would you describe your current emotional baseline?", options: [{ text: "I am in crisis or significant distress", score: 1 }, { text: "I am managing but feel fragile", score: 2 }, { text: "I am generally stable with occasional difficulty", score: 3 }, { text: "I feel grounded and resourced", score: 4 }] },
      { question: "When you pull a card like The Tower or Death, what happens?", options: [{ text: "I feel genuine fear or dread", score: 1 }, { text: "I feel anxious but try to find the positive meaning", score: 2 }, { text: "I can engage with the card's full range of meaning", score: 3 }, { text: "I welcome the disruption as useful information", score: 4 }] },
      { question: "Do you have support systems — a therapist, trusted friend, or community?", options: [{ text: "I am mostly navigating things alone right now", score: 1 }, { text: "I have one or two people I can talk to", score: 2 }, { text: "I have a reliable support network", score: 3 }, { text: "I have professional support and a strong personal network", score: 4 }] },
      { question: "How do you relate to your own flaws and mistakes?", options: [{ text: "I am very self-critical and struggle with shame", score: 1 }, { text: "I try to be kind to myself but often fall into self-judgment", score: 2 }, { text: "I can usually hold my imperfections with some compassion", score: 3 }, { text: "I see my flaws as part of being human, without excessive judgment", score: 4 }] },
      { question: "What is your relationship with uncertainty?", options: [{ text: "I find it very difficult — I need to know what is going to happen", score: 1 }, { text: "I tolerate it but it causes significant anxiety", score: 2 }, { text: "I can sit with not-knowing for reasonable periods", score: 3 }, { text: "I have learned to be comfortable with ambiguity", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Foundation Building Phase", description: "Right now, the most productive work is building your emotional foundation before diving into shadow material. This is not a judgment — it is a recognition that shadow work requires a stable base to be productive rather than destabilizing.", recommendations: ["Focus on grounding practices: daily walks, regular sleep, basic meditation", "Work with the gentler cards first — the Aces, the Star, Temperance", "Consider working with a therapist or counselor before deep shadow work"] },
      { range: [15, 20], title: "Approaching Readiness", description: "You have some of the resources needed for shadow work but may benefit from strengthening your foundation in specific areas. Gentle, guided shadow work with clear boundaries would be appropriate.", recommendations: ["Start with structured shadow work exercises rather than open-ended exploration", "Keep sessions short — 20 minutes maximum — and always end with a grounding practice", "The Moon card and the court cards are good starting points for gentle shadow exploration"] },
      { range: [21, 26], title: "Ready for Guided Shadow Work", description: "You have the emotional stability and self-awareness to engage with shadow material productively. You can handle the discomfort that arises without being overwhelmed by it, and you have support systems in place.", recommendations: ["Work with The Tower, The Devil, and the more challenging Major Arcana cards directly", "Try the Shadow Spread: pull three cards for what you hide from others, what you hide from yourself, and what wants to be integrated", "Journal extensively after shadow work sessions — the insights often deepen over the following days"] },
      { range: [27, 32], title: "Deep Shadow Work Ready", description: "You have the grounding, self-awareness, and support systems to do intensive shadow work through tarot. You can hold difficult material with compassion and use it for genuine transformation rather than re-traumatization.", recommendations: ["Explore the reversed cards as shadow expressions of their upright meanings", "Work with the entire Major Arcana as a shadow journey — The Fool's descent into and return from the underworld", "Consider facilitating shadow work for others — your stability makes you a safe guide"] },
    ],
  },
  {
    id: "tarot-knowledge-level",
    title: "Tarot Knowledge Assessment",
    subtitle: "Where are you on the learning path?",
    description: "This assessment maps your current tarot knowledge across multiple dimensions — card meanings, spread design, intuitive reading, and historical context. It helps you identify where to focus your study next.",
    questions: [
      { question: "How well do you know the Major Arcana meanings?", options: [{ text: "I know a few cards but most are unfamiliar", score: 1 }, { text: "I know the basic keywords for most cards", score: 2 }, { text: "I understand the deeper symbolism and can read them in context", score: 3 }, { text: "I can read them intuitively without referencing memorized meanings", score: 4 }] },
      { question: "How comfortable are you with the Minor Arcana?", options: [{ text: "I mostly skip them or feel confused by them", score: 1 }, { text: "I know the suit associations but struggle with individual cards", score: 2 }, { text: "I can read most Minor Arcana cards confidently", score: 3 }, { text: "The Minor Arcana feels as natural as the Major Arcana to me", score: 4 }] },
      { question: "How do you handle Court Cards?", options: [{ text: "They are the most confusing part of the deck for me", score: 1 }, { text: "I can identify them as people or personality types", score: 2 }, { text: "I read them as aspects of personality, situations, or actual people depending on context", score: 3 }, { text: "Court Cards are some of my most nuanced and accurate readings", score: 4 }] },
      { question: "How many spread layouts can you use confidently?", options: [{ text: "Just the three-card spread", score: 1 }, { text: "Two or three spreads including the Celtic Cross", score: 2 }, { text: "Five or more spreads, and I modify them for specific questions", score: 3 }, { text: "I design custom spreads for each reading situation", score: 4 }] },
      { question: "How do you work with reversed cards?", options: [{ text: "I do not use reversals", score: 1 }, { text: "I read them as the opposite of the upright meaning", score: 2 }, { text: "I read them as blocked, internalized, or shadow expressions", score: 3 }, { text: "Reversals add a nuanced layer that I integrate naturally into readings", score: 4 }] },
      { question: "How much do you know about tarot history?", options: [{ text: "Very little — I focus on practical reading", score: 1 }, { text: "I know the basics — Rider-Waite, Marseille, Thoth", score: 2 }, { text: "I understand the historical evolution and how it affects interpretation", score: 3 }, { text: "I can trace symbolic lineages across traditions and historical periods", score: 4 }] },
      { question: "How often do you read for other people?", options: [{ text: "I only read for myself", score: 1 }, { text: "Occasionally for friends or family", score: 2 }, { text: "Regularly for others, with generally positive feedback", score: 3 }, { text: "I read professionally or could do so confidently", score: 4 }] },
      { question: "How do you integrate tarot with other practices?", options: [{ text: "Tarot is my only contemplative practice", score: 1 }, { text: "I combine it loosely with meditation or journaling", score: 2 }, { text: "I have a structured practice that integrates tarot with other modalities", score: 3 }, { text: "Tarot is woven into a comprehensive spiritual or psychological practice", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Curious Beginner", description: "You are at the exciting beginning of your tarot journey. Everything is new and there is enormous potential for growth. Focus on building a solid foundation with the Major Arcana and simple spreads before expanding.", recommendations: ["Start with the Major Arcana only — learn all 22 before adding the Minor Arcana", "Use only the three-card spread until it feels completely natural", "Read Rachel Pollack's Seventy-Eight Degrees of Wisdom as your primary study text"] },
      { range: [15, 20], title: "Developing Reader", description: "You have a working knowledge of tarot and can do basic readings. The next phase of growth involves deepening your understanding of the Minor Arcana, Court Cards, and developing your intuitive voice alongside book knowledge.", recommendations: ["Focus on the Court Cards — they are the bridge between beginner and intermediate reading", "Start experimenting with five-card and seven-card spreads", "Begin reading for others regularly — feedback accelerates learning faster than solo study"] },
      { range: [21, 26], title: "Competent Reader", description: "You have solid knowledge across most areas of tarot and can give meaningful readings. Your growth edge is developing the intuitive dimension — reading beyond what you know intellectually and trusting your direct perception.", recommendations: ["Practice reading without any reference materials for a month", "Study the historical and esoteric traditions behind the cards", "Design your own spreads for specific life situations"] },
      { range: [27, 32], title: "Advanced Practitioner", description: "You have deep knowledge and genuine intuitive skill. Your readings are nuanced, historically informed, and personally meaningful. The next frontier is integration — weaving tarot into a comprehensive practice of self-understanding.", recommendations: ["Explore the connections between tarot and other symbolic systems — Kabbalah, astrology, alchemy", "Consider teaching or writing about tarot to deepen your own understanding", "Work with the deck as a complete philosophical system rather than individual cards"] },
    ],
  },
  {
    id: "emotional-intelligence-tarot",
    title: "Emotional Intelligence Through Tarot",
    subtitle: "How well do you read the emotional landscape?",
    description: "Tarot is fundamentally a tool for emotional literacy. This assessment measures how effectively you use the cards to understand and navigate emotional territory — both your own and others'.",
    questions: [
      { question: "When the Cups suit dominates a reading, how do you respond?", options: [{ text: "I feel overwhelmed by the emotional content", score: 1 }, { text: "I can identify the emotions but struggle to articulate them clearly", score: 2 }, { text: "I navigate emotional readings with reasonable comfort", score: 3 }, { text: "Emotional readings are where I do my best work", score: 4 }] },
      { question: "How do you handle it when a reading brings up grief or loss?", options: [{ text: "I try to redirect toward more positive cards", score: 1 }, { text: "I acknowledge it but feel uncomfortable sitting with it", score: 2 }, { text: "I can hold space for grief without rushing to fix it", score: 3 }, { text: "I trust that grief in a reading is the cards doing their most important work", score: 4 }] },
      { question: "Can you distinguish between your emotional reaction and the card's message?", options: [{ text: "I often confuse my feelings with what the card is saying", score: 1 }, { text: "Sometimes, but it takes effort", score: 2 }, { text: "Usually — I have learned to notice the difference", score: 3 }, { text: "Yes — I can observe my reaction and the card's message as separate streams", score: 4 }] },
      { question: "How do you work with anger in readings (Swords, The Tower)?", options: [{ text: "I avoid or soften angry cards", score: 1 }, { text: "I acknowledge anger but prefer to focus on resolution", score: 2 }, { text: "I can sit with anger as valid information", score: 3 }, { text: "I welcome anger in readings — it often points to where boundaries need to be set", score: 4 }] },
      { question: "When reading for someone in emotional pain, what do you prioritize?", options: [{ text: "Making them feel better", score: 1 }, { text: "Giving them accurate information even if it is hard to hear", score: 2 }, { text: "Balancing honesty with compassion", score: 3 }, { text: "Being fully present with whatever arises, without an agenda", score: 4 }] },
      { question: "How do you process your own emotions after an intense reading?", options: [{ text: "I do not have a specific practice for this", score: 1 }, { text: "I try to shake it off and move on", score: 2 }, { text: "I journal or meditate to process what came up", score: 3 }, { text: "I have a reliable integration practice that I use consistently", score: 4 }] },
      { question: "How comfortable are you with emotional ambiguity in readings?", options: [{ text: "I need clear emotional conclusions", score: 1 }, { text: "I can tolerate some ambiguity but prefer clarity", score: 2 }, { text: "I am learning to sit with mixed or unclear emotional messages", score: 3 }, { text: "I understand that emotional truth is often paradoxical and hold that comfortably", score: 4 }] },
      { question: "Do your readings help people understand their emotions better?", options: [{ text: "I am not sure — I focus more on events and outcomes", score: 1 }, { text: "Sometimes, when the emotional content is obvious", score: 2 }, { text: "Often — people tell me my readings help them feel understood", score: 3 }, { text: "Consistently — emotional clarity is the primary value I offer in readings", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Developing Emotional Awareness", description: "Your tarot practice currently focuses more on events and outcomes than emotional content. Building emotional literacy through the cards will dramatically improve your readings and your self-understanding.", recommendations: ["Spend a week with each Cups card, journaling about what emotions it evokes", "Practice naming emotions with specificity — not just 'sad' but 'grieving' or 'melancholy' or 'disappointed'", "Read The Body Keeps the Score to understand the somatic dimension of emotions"] },
      { range: [15, 20], title: "Growing Emotional Reader", description: "You recognize the emotional dimension of tarot but are still developing your ability to navigate it skillfully. You can identify emotions but may struggle with the more complex or uncomfortable ones.", recommendations: ["Practice sitting with difficult cards for five minutes without interpreting them — just feeling", "Work with the Swords suit specifically to develop comfort with mental and emotional pain", "Consider a mindfulness practice to build your capacity for emotional presence"] },
      { range: [21, 26], title: "Emotionally Skilled Reader", description: "You navigate the emotional landscape of readings with genuine skill. You can hold space for difficult emotions without being overwhelmed or rushing to resolution. Your readings offer real emotional insight.", recommendations: ["Explore the relationship between emotional patterns and recurring cards in your readings", "Study Tara Brach's RAIN technique as a framework for emotional processing during readings", "Begin teaching others how to develop emotional literacy through tarot"] },
      { range: [27, 32], title: "Emotionally Masterful Reader", description: "Emotional intelligence is your greatest strength as a reader. You can navigate the full spectrum of human emotion with compassion, clarity, and genuine presence. Your readings are transformative because they help people feel truly seen.", recommendations: ["Your gift is rare — consider offering readings specifically focused on emotional healing", "Explore the intersection of tarot and therapeutic modalities like IFS or somatic experiencing", "Write about your approach to emotional reading — others need to learn what you know"] },
    ],
  },
  {
    id: "spiritual-practice-depth",
    title: "Spiritual Practice Depth Assessment",
    subtitle: "How deep does your practice go?",
    description: "This assessment examines the depth and consistency of your spiritual practice as it relates to tarot. It is not about how much you know — it is about how deeply you live what you practice.",
    questions: [
      { question: "How often do you engage with tarot or a related contemplative practice?", options: [{ text: "Occasionally, when I feel like it or need guidance", score: 1 }, { text: "A few times a week", score: 2 }, { text: "Daily, with occasional missed days", score: 3 }, { text: "Daily, as a non-negotiable part of my routine", score: 4 }] },
      { question: "Has your tarot practice changed how you relate to uncertainty?", options: [{ text: "Not really — I still find uncertainty very uncomfortable", score: 1 }, { text: "Somewhat — I am more aware of my need for certainty", score: 2 }, { text: "Yes — I am noticeably more comfortable with not knowing", score: 3 }, { text: "Profoundly — uncertainty has become a teacher rather than a threat", score: 4 }] },
      { question: "Do you notice the cards' themes showing up in your daily life?", options: [{ text: "Rarely — tarot and daily life feel separate", score: 1 }, { text: "Sometimes, when the connection is obvious", score: 2 }, { text: "Often — I see card themes reflected in my experiences regularly", score: 3 }, { text: "Constantly — the boundary between reading and living has become very thin", score: 4 }] },
      { question: "How has tarot affected your self-awareness?", options: [{ text: "I enjoy readings but have not noticed major personal changes", score: 1 }, { text: "I have gained some insights about myself", score: 2 }, { text: "Tarot has significantly deepened my self-understanding", score: 3 }, { text: "Tarot has been one of the most transformative tools in my inner life", score: 4 }] },
      { question: "Do you have a relationship with silence or stillness?", options: [{ text: "I find silence uncomfortable", score: 1 }, { text: "I can tolerate short periods of silence", score: 2 }, { text: "I value silence and seek it out regularly", score: 3 }, { text: "Silence is where my deepest understanding arises", score: 4 }] },
      { question: "How do you relate to the concept of 'not knowing'?", options: [{ text: "It makes me anxious — I want answers", score: 1 }, { text: "I understand its value intellectually but struggle with it emotionally", score: 2 }, { text: "I can rest in not-knowing for meaningful periods", score: 3 }, { text: "Not-knowing has become a doorway rather than an obstacle", score: 4 }] },
      { question: "Has your practice affected your relationships with others?", options: [{ text: "Not noticeably", score: 1 }, { text: "I am slightly more empathetic or patient", score: 2 }, { text: "My relationships have meaningfully improved through greater presence and understanding", score: 3 }, { text: "My practice has fundamentally changed how I relate to other people", score: 4 }] },
      { question: "What happens when your practice feels dry or meaningless?", options: [{ text: "I stop practicing until inspiration returns", score: 1 }, { text: "I push through but feel frustrated", score: 2 }, { text: "I adjust my practice and trust the dry period will pass", score: 3 }, { text: "I recognize dry periods as part of the deepening process and stay with them", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Exploring Practitioner", description: "You are in the exploration phase — trying tarot on, seeing how it fits. This is a beautiful and necessary stage. The key is consistency: even five minutes daily will deepen your practice more than occasional marathon sessions.", recommendations: ["Commit to a single daily card pull for 30 days — no exceptions", "Keep a simple journal: date, card, one sentence about your day", "Read one chapter of a tarot book per week to build context"] },
      { range: [15, 20], title: "Developing Practitioner", description: "Your practice has roots but has not yet become a central organizing principle in your life. You are past the curiosity stage and into genuine engagement. The next step is deepening consistency and beginning to notice how the cards mirror your lived experience.", recommendations: ["Add a five-minute meditation before your daily draw", "Start tracking patterns — which cards appear repeatedly and what life themes they correspond to", "Find a tarot community or study partner to share your practice with"] },
      { range: [21, 26], title: "Committed Practitioner", description: "Tarot has become a genuine spiritual practice for you — not just a hobby or tool, but a way of engaging with life's deeper questions. Your practice is consistent and has produced real changes in how you relate to yourself and others.", recommendations: ["Explore the connections between your tarot practice and other wisdom traditions", "Begin working with the cards as a complete philosophical system", "Consider how your practice might serve others — teaching, writing, or offering readings"] },
      { range: [27, 32], title: "Deep Practitioner", description: "Your practice has moved beyond technique into genuine transformation. The cards are not separate from your life — they are a language for understanding it. This level of depth is rare and valuable.", recommendations: ["Your practice is mature enough to benefit from extended retreat or intensive study", "Consider working with a spiritual director or teacher who can support your continued deepening", "Share your understanding — the world needs practitioners who have gone this deep"] },
    ],
  },
  {
    id: "reading-ethics",
    title: "Tarot Reading Ethics Assessment",
    subtitle: "How ethically grounded is your practice?",
    description: "Ethics in tarot reading is not about following rules — it is about developing the sensitivity to navigate complex human situations with integrity. This assessment examines your ethical awareness across common reading scenarios.",
    questions: [
      { question: "Someone asks you to read about a third party who is not present. What do you do?", options: [{ text: "I read about the third party — the querent asked, so it is their reading", score: 1 }, { text: "I am uncomfortable but usually do it anyway", score: 2 }, { text: "I redirect the reading to focus on the querent's relationship with that person", score: 3 }, { text: "I explain the ethical issue and reframe the question to center the querent's experience", score: 4 }] },
      { question: "A querent is clearly in a mental health crisis. How do you respond?", options: [{ text: "I continue the reading — they came for guidance", score: 1 }, { text: "I try to give them a positive reading to help them feel better", score: 2 }, { text: "I gently suggest they might benefit from professional support", score: 3 }, { text: "I pause the reading, acknowledge what I am seeing, and provide professional referrals", score: 4 }] },
      { question: "You pull cards that suggest a very difficult outcome. What do you say?", options: [{ text: "I soften or omit the difficult information", score: 1 }, { text: "I deliver it directly — they deserve the truth", score: 2 }, { text: "I present the information with context and compassion", score: 3 }, { text: "I frame it as a possibility to be aware of, not a fixed outcome, and explore what agency the querent has", score: 4 }] },
      { question: "How do you handle confidentiality?", options: [{ text: "I sometimes share interesting readings with friends, without names", score: 1 }, { text: "I try to keep readings private but have slipped occasionally", score: 2 }, { text: "I maintain strict confidentiality as a rule", score: 3 }, { text: "Confidentiality is absolute — I would not share reading content under any circumstances", score: 4 }] },
      { question: "A querent wants you to make a major life decision for them. What do you do?", options: [{ text: "I tell them what the cards say they should do", score: 1 }, { text: "I give my opinion based on the cards", score: 2 }, { text: "I present the information and remind them the decision is theirs", score: 3 }, { text: "I help them explore what the cards reveal about their own values and priorities, then step back", score: 4 }] },
      { question: "How do you handle the power dynamic in a reading?", options: [{ text: "I have not thought much about power dynamics in readings", score: 1 }, { text: "I am aware of it but not sure how to address it", score: 2 }, { text: "I actively work to empower the querent rather than create dependence", score: 3 }, { text: "I see my role as facilitating the querent's own wisdom, not dispensing mine", score: 4 }] },
      { question: "Someone asks you to predict a specific health outcome. How do you respond?", options: [{ text: "I do my best to answer their question", score: 1 }, { text: "I give a general reading about their health situation", score: 2 }, { text: "I explain that health predictions are outside my scope and suggest they consult a doctor", score: 3 }, { text: "I clearly state my boundaries, offer to explore their feelings about the health situation, and provide medical referrals", score: 4 }] },
      { question: "How do you set expectations before a reading?", options: [{ text: "I just start reading — people know what tarot is", score: 1 }, { text: "I give a brief explanation of what tarot can and cannot do", score: 2 }, { text: "I discuss my approach, limitations, and what the querent can expect", score: 3 }, { text: "I have a clear framework that covers scope, confidentiality, and the querent's autonomy before every reading", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Ethics Awareness Needed", description: "Your ethical framework for tarot reading needs development. This is common — most tarot education focuses on card meanings rather than the ethical complexities of reading for others. Building this awareness will make you a safer and more effective reader.", recommendations: ["Study the ethical guidelines published by professional tarot organizations", "Never make health, legal, or financial predictions — always refer to qualified professionals", "Practice saying 'That is outside my scope' until it feels natural"] },
      { range: [15, 20], title: "Developing Ethical Awareness", description: "You have some ethical instincts but have not yet developed them into a consistent framework. You recognize ethical issues when they arise but may not always know how to navigate them skillfully.", recommendations: ["Create a personal code of ethics for your reading practice and review it regularly", "Practice redirecting questions that cross ethical boundaries", "Discuss ethical scenarios with other readers to develop your thinking"] },
      { range: [21, 26], title: "Ethically Grounded Reader", description: "You have a solid ethical foundation and navigate most reading situations with integrity. You understand the power dynamics inherent in readings and work to empower querents rather than create dependence.", recommendations: ["Explore the more nuanced ethical territory — cultural appropriation, spiritual bypassing, and the ethics of charging for readings", "Mentor newer readers in ethical practice", "Review and update your ethical framework annually as your understanding deepens"] },
      { range: [27, 32], title: "Ethically Exemplary Reader", description: "Your ethical practice is sophisticated and deeply integrated into how you read. You navigate complex situations with both firmness and compassion, and you actively work to empower every querent who sits across from you.", recommendations: ["Your ethical clarity is a gift to the tarot community — consider writing or teaching about reading ethics", "Explore the intersection of tarot ethics with broader questions of spiritual responsibility", "Continue to examine your own blind spots — ethical mastery is an ongoing practice, not a destination"] },
    ],
  },
  {
    id: "burnout-risk",
    title: "Reader Burnout Risk Assessment",
    subtitle: "Is your practice sustainable?",
    description: "Tarot readers — especially empathic ones — are vulnerable to burnout. This assessment helps you identify early warning signs and evaluate whether your current practice is sustainable long-term.",
    questions: [
      { question: "How do you feel before a reading session?", options: [{ text: "Drained or reluctant", score: 4 }, { text: "Neutral — it is just something I do", score: 3 }, { text: "Generally positive with occasional reluctance", score: 2 }, { text: "Energized and looking forward to it", score: 1 }] },
      { question: "How do you feel after reading for others?", options: [{ text: "Exhausted and needing significant recovery time", score: 4 }, { text: "Tired but functional", score: 3 }, { text: "A mix of tired and fulfilled", score: 2 }, { text: "Energized and grateful", score: 1 }] },
      { question: "Do you maintain boundaries around when and how often you read?", options: [{ text: "I read whenever someone asks, even when I do not want to", score: 4 }, { text: "I try to set limits but often overextend", score: 3 }, { text: "I have boundaries that I maintain most of the time", score: 2 }, { text: "I have clear, firm boundaries that I honor consistently", score: 1 }] },
      { question: "Has your personal tarot practice suffered because of reading for others?", options: [{ text: "I rarely read for myself anymore", score: 4 }, { text: "My personal practice has definitely declined", score: 3 }, { text: "It fluctuates but is mostly intact", score: 2 }, { text: "My personal practice is strong and separate from client work", score: 1 }] },
      { question: "Do you take on other people's emotional states during readings?", options: [{ text: "Frequently — I carry their emotions for hours or days", score: 4 }, { text: "Sometimes — certain readings stick with me", score: 3 }, { text: "Occasionally, but I can usually clear it", score: 2 }, { text: "I can empathize without absorbing — I have learned to maintain that boundary", score: 1 }] },
      { question: "How is your sleep and physical health?", options: [{ text: "Significantly disrupted — I am not taking care of myself", score: 4 }, { text: "Could be better — I am neglecting some basics", score: 3 }, { text: "Generally good with room for improvement", score: 2 }, { text: "Strong — I prioritize physical health as part of my practice", score: 1 }] },
      { question: "Do you have interests and relationships outside of tarot?", options: [{ text: "Tarot has consumed most of my time and energy", score: 4 }, { text: "I have other interests but they have taken a back seat", score: 3 }, { text: "I maintain a reasonable balance", score: 2 }, { text: "I have a rich life outside of tarot that nourishes my practice", score: 1 }] },
      { question: "When was the last time tarot genuinely surprised or delighted you?", options: [{ text: "I cannot remember — it has become routine", score: 4 }, { text: "It has been a while", score: 3 }, { text: "Recently, but not as often as it used to", score: 2 }, { text: "Regularly — I am still amazed by what the cards reveal", score: 1 }] },
    ],
    results: [
      { range: [8, 14], title: "Low Burnout Risk", description: "Your practice is sustainable and nourishing. You maintain healthy boundaries, take care of yourself physically and emotionally, and still find genuine delight in the work. Keep doing what you are doing.", recommendations: ["Continue prioritizing your personal practice alongside any client work", "Share your sustainability strategies with other readers who may be struggling", "Check in with this assessment every six months to catch any drift early"] },
      { range: [15, 20], title: "Moderate Burnout Risk", description: "There are some early warning signs that your practice may not be fully sustainable. Nothing is critical yet, but paying attention now will prevent problems later.", recommendations: ["Identify one boundary that needs strengthening and commit to it this week", "Schedule non-tarot activities that recharge you", "Consider reducing your reading load temporarily to restore your personal practice"] },
      { range: [21, 26], title: "High Burnout Risk", description: "You are showing significant signs of reader burnout. Your practice has shifted from nourishing to depleting, and your physical and emotional health may be affected. This needs attention now, not later.", recommendations: ["Take a reading sabbatical — even one week can make a significant difference", "Establish a firm maximum number of readings per week and do not exceed it", "Invest in your own support — therapy, bodywork, or time in nature"] },
      { range: [27, 32], title: "Critical Burnout", description: "You are in active burnout. Your practice is causing more harm than good right now, and continuing at this pace will damage both your health and your relationship with tarot. This is not a failure — it is a signal that something needs to change fundamentally.", recommendations: ["Stop reading for others immediately for a minimum of two weeks", "Focus exclusively on basic self-care: sleep, nutrition, movement, social connection", "When you return to reading, start with personal practice only — no client work until you feel genuinely restored"] },
    ],
  },
  {
    id: "spread-design-skill",
    title: "Spread Design Mastery Assessment",
    subtitle: "Can you create readings that ask the right questions?",
    description: "The ability to design custom spreads is what separates mechanical card readers from genuine tarot practitioners. This assessment evaluates your understanding of spread architecture and your ability to create layouts that serve specific questions.",
    questions: [
      { question: "When someone brings you a complex question, what is your first instinct?", options: [{ text: "Use the Celtic Cross — it covers everything", score: 1 }, { text: "Choose from the spreads I already know", score: 2 }, { text: "Modify an existing spread to better fit the question", score: 3 }, { text: "Design a custom spread that maps the specific dimensions of their question", score: 4 }] },
      { question: "How do you think about card positions in a spread?", options: [{ text: "They are labels — past, present, future", score: 1 }, { text: "They frame what aspect of the situation each card addresses", score: 2 }, { text: "They create a narrative structure that guides the reading", score: 3 }, { text: "They are questions within the question — each position asks something specific that the whole reading needs answered", score: 4 }] },
      { question: "How many positions do you typically use in a spread?", options: [{ text: "Three — I keep it simple", score: 1 }, { text: "Five to seven — enough for depth without overwhelm", score: 2 }, { text: "It depends on the question — sometimes three, sometimes twelve", score: 3 }, { text: "I let the question determine the architecture — some need two positions, some need fifteen", score: 4 }] },
      { question: "Do you consider the spatial arrangement of cards meaningful?", options: [{ text: "Not really — I just lay them in a line or grid", score: 1 }, { text: "I follow traditional layouts without thinking much about why", score: 2 }, { text: "I understand that spatial relationships between cards carry meaning", score: 3 }, { text: "The geometry of the spread is part of the reading — I design layouts where physical proximity reflects conceptual relationships", score: 4 }] },
      { question: "How do you handle a question that does not fit any spread you know?", options: [{ text: "I use a general spread and hope it works", score: 1 }, { text: "I try to reframe the question to fit a spread I know", score: 2 }, { text: "I modify an existing spread or combine elements from different ones", score: 3 }, { text: "I build a new spread from scratch, starting with what the question actually needs to explore", score: 4 }] },
      { question: "Have you ever designed a spread that someone else found useful?", options: [{ text: "I have never designed my own spread", score: 1 }, { text: "I have tried but was not confident in the result", score: 2 }, { text: "Yes — I have created spreads that work well for specific situations", score: 3 }, { text: "I regularly design spreads that others adopt into their own practice", score: 4 }] },
      { question: "How do you test whether a spread works?", options: [{ text: "I do not test spreads — I just use them", score: 1 }, { text: "I try it once and see how it feels", score: 2 }, { text: "I use it multiple times and refine positions that do not produce useful information", score: 3 }, { text: "I test with multiple questions, multiple readers, and iterate until every position consistently produces insight", score: 4 }] },
      { question: "What role does the significator card play in your spreads?", options: [{ text: "I do not use significators", score: 1 }, { text: "I sometimes use them as tradition dictates", score: 2 }, { text: "I use them strategically when they serve the reading", score: 3 }, { text: "I understand multiple approaches to significators and choose based on what the specific reading needs", score: 4 }] },
    ],
    results: [
      { range: [8, 14], title: "Spread User", description: "You work with established spreads and have not yet ventured into designing your own. This is perfectly fine for many readers, but developing spread design skills will give you much more flexibility and precision in your readings.", recommendations: ["Start by modifying the three-card spread — change the position meanings to fit specific questions", "Study why the Celtic Cross positions are arranged the way they are", "Try creating one simple custom spread this week for a question that matters to you"] },
      { range: [15, 20], title: "Developing Designer", description: "You have begun to modify and experiment with spreads but have not yet developed a systematic approach to spread design. Your instincts are good — now you need to develop them into a reliable skill.", recommendations: ["Practice the 'question decomposition' technique: break every question into its component parts, then assign each part a card position", "Study spreads from multiple traditions to understand different design philosophies", "Keep a spread design journal — document what works and what does not"] },
      { range: [21, 26], title: "Skilled Designer", description: "You can design effective custom spreads and understand the principles behind good spread architecture. Your readings benefit from your ability to create layouts that precisely match the question being asked.", recommendations: ["Explore non-linear spread designs — circular, spiral, and three-dimensional layouts", "Study the relationship between spread geometry and reading flow", "Teach spread design to other readers — articulating your process will deepen it"] },
      { range: [27, 32], title: "Master Designer", description: "Spread design is one of your strongest skills. You understand that the spread is not just a layout — it is a framework for inquiry that shapes what the reading can reveal. Your custom spreads are precise, elegant, and genuinely useful.", recommendations: ["Document your best spread designs and share them with the tarot community", "Explore the intersection of spread design with other inquiry frameworks — Socratic questioning, design thinking, therapeutic models", "Consider writing a book or course on spread design — this is an underserved area of tarot education"] },
    ],
  },
];

function generatePDF(assessment: Assessment, answers: number[], result: AssessmentResult) {
  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const maxScore = assessment.questions.length * 4;

  let content = `THE LIVING TAROT — ASSESSMENT RESULTS\n`;
  content += `${"=".repeat(50)}\n\n`;
  content += `Assessment: ${assessment.title}\n`;
  content += `Date: ${new Date().toLocaleDateString()}\n`;
  content += `Score: ${totalScore} / ${maxScore}\n\n`;
  content += `${"─".repeat(50)}\n\n`;
  content += `YOUR RESULT: ${result.title}\n\n`;
  content += `${result.description}\n\n`;
  content += `RECOMMENDATIONS:\n\n`;
  result.recommendations.forEach((rec, i) => {
    content += `${i + 1}. ${rec}\n\n`;
  });
  content += `${"─".repeat(50)}\n\n`;
  content += `YOUR RESPONSES:\n\n`;
  assessment.questions.forEach((q, i) => {
    const selectedOption = q.options.find(o => o.score === answers[i]);
    content += `Q${i + 1}: ${q.question}\n`;
    content += `A: ${selectedOption?.text || "N/A"}\n\n`;
  });
  content += `\n${"─".repeat(50)}\n`;
  content += `Generated by The Living Tarot — ${SITE_CONFIG.domain}\n`;
  content += `This assessment is for educational purposes only.\n`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${assessment.id}-results.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function AssessmentRunner({ assessment, onBack }: { assessment: Assessment; onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ < assessment.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const getResult = (): AssessmentResult => {
    const total = answers.reduce((sum, a) => sum + a, 0);
    return assessment.results.find(r => total >= r.range[0] && total <= r.range[1]) || assessment.results[assessment.results.length - 1];
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const result = getResult();
    const total = answers.reduce((sum, a) => sum + a, 0);
    const maxScore = assessment.questions.length * 4;
    const percentage = Math.round((total / maxScore) * 100);

    return (
      <div ref={resultRef}>
        <div className="mb-6">
          <button onClick={onBack} className="text-sm text-[var(--royal-purple)] hover:underline">
            ← Back to all assessments
          </button>
        </div>

        <div className="p-8 border border-[var(--antique-gold)]/30 rounded-lg bg-gradient-to-br from-[var(--mystic-cream)] to-[var(--parchment)]">
          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mb-2">{result.title}</h2>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 flex-1 bg-[var(--deep-purple)]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--royal-purple)] rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
            </div>
            <span className="text-sm text-[var(--deep-purple)]/60 font-medium">{total}/{maxScore}</span>
          </div>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed mb-6">{result.description}</p>

          <h3 className="font-serif text-lg text-[var(--deep-purple)] mb-3">Recommendations</h3>
          <ul className="space-y-3 mb-8">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-sm text-[var(--deep-purple)]/70">
                <span className="text-[var(--antique-gold)] font-bold mt-0.5">{i + 1}.</span>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => generatePDF(assessment, answers, result)}
              className="px-5 py-2.5 bg-[var(--royal-purple)] text-[var(--mystic-cream)] rounded font-medium text-sm hover:bg-[var(--deep-purple)] transition-colors"
            >
              Download Results (PDF)
            </button>
            <button
              onClick={restart}
              className="px-5 py-2.5 border border-[var(--royal-purple)] text-[var(--royal-purple)] rounded font-medium text-sm hover:bg-[var(--royal-purple)]/10 transition-colors"
            >
              Retake Assessment
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-[var(--antique-gold)]/30 text-[var(--deep-purple)]/60 rounded font-medium text-sm hover:bg-[var(--antique-gold)]/10 transition-colors"
            >
              Try Another Assessment
            </button>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="mt-6 p-4 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)]/50 text-xs text-[var(--deep-purple)]/50 leading-relaxed">
          This assessment is for educational and self-reflection purposes only. It is not a clinical diagnostic tool and should not be used as a substitute for professional psychological evaluation or medical advice.
        </div>
      </div>
    );
  }

  const question = assessment.questions[currentQ];
  const progress = ((currentQ) / assessment.questions.length) * 100;

  return (
    <div>
      <div className="mb-6">
        <button onClick={onBack} className="text-sm text-[var(--royal-purple)] hover:underline">
          ← Back to all assessments
        </button>
      </div>

      <h2 className="font-serif text-2xl text-[var(--deep-purple)] mb-2">{assessment.title}</h2>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1.5 flex-1 bg-[var(--deep-purple)]/10 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--antique-gold)] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-[var(--deep-purple)]/50">{currentQ + 1}/{assessment.questions.length}</span>
      </div>

      {/* Question */}
      <div className="p-6 border border-[var(--antique-gold)]/20 rounded-lg bg-[var(--parchment)]">
        <p className="font-serif text-lg text-[var(--deep-purple)] mb-6 leading-relaxed">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-4 border border-[var(--antique-gold)]/20 rounded-lg hover:border-[var(--royal-purple)]/40 hover:bg-[var(--royal-purple)]/5 transition-all text-sm text-[var(--deep-purple)]/70 leading-relaxed"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Assessments() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  const assessment = ASSESSMENTS.find(a => a.id === activeAssessment);

  return (
    <Layout>
      <SEOHead
        title="Tarot Self-Assessments — Discover Your Reading Style"
        description="Take our free tarot self-assessments to discover your intuitive reading type, shadow work readiness, knowledge level, and more. Instant results with PDF download."
        canonical={`${SITE_CONFIG.domain}/assessments`}
      />

      <div className="container py-12 md:py-16 max-w-4xl mx-auto">
        {assessment ? (
          <AssessmentRunner assessment={assessment} onBack={() => setActiveAssessment(null)} />
        ) : (
          <>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-4">
              Tarot Self-Assessments
            </h1>
            <p className="text-[var(--deep-purple)]/70 text-base leading-relaxed mb-10 max-w-2xl">
              These assessments are designed to help you understand yourself as a tarot practitioner — your strengths, your growth edges, and where to focus your development next. Each one takes about five minutes and provides immediate results you can download.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {ASSESSMENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActiveAssessment(a.id)}
                  className="text-left p-6 border border-[var(--antique-gold)]/20 rounded-lg bg-[var(--parchment)] hover:border-[var(--antique-gold)]/40 hover:shadow-md transition-all group"
                >
                  <h3 className="font-serif text-lg text-[var(--deep-purple)] mb-1 group-hover:text-[var(--royal-purple)] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs text-[var(--antique-gold)] mb-3">{a.subtitle}</p>
                  <p className="text-sm text-[var(--deep-purple)]/60 leading-relaxed">
                    {a.description.slice(0, 120)}...
                  </p>
                  <span className="inline-block mt-3 text-sm text-[var(--royal-purple)] font-medium">
                    Take Assessment →
                  </span>
                </button>
              ))}
            </div>

            {/* Links */}
            <div className="mt-12 p-6 border border-[var(--antique-gold)]/20 rounded-lg bg-[var(--mystic-cream)]">
              <h2 className="font-serif text-xl text-[var(--deep-purple)] mb-3">Want to test your knowledge?</h2>
              <p className="text-sm text-[var(--deep-purple)]/60 mb-4">
                Our quizzes test specific tarot knowledge, while these assessments explore your practice style and development. Try both.
              </p>
              <Link href="/quizzes" className="text-sm text-[var(--royal-purple)] font-medium no-underline hover:underline">
                Take a Tarot Quiz →
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
