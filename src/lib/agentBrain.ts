/**
 * Bilingual response engine for the portfolio's demo agents
 * (StudiesHelper Agent and WellnessOracle Agent).
 *
 * WHY THIS EXISTS INSTEAD OF A LIVE LLM CALL
 * ------------------------------------------
 * These demos previously called `openrouter/free`. Measured directly against
 * that endpoint, six identical requests were served by six different models,
 * and none produced usable Roman Urdu:
 *
 *   - one replied in Arabic script, one mixed in Devanagari
 *   - two answered a Roman Urdu question in English
 *   - one produced broken Urdu ("Alhamdulliah", "mat choray")
 *
 * A follow-up eval of every pinned free model that actually resolves
 * (llama-3.3-70b, mistral-small and deepseek-chat are all unavailable on the
 * free tier now; gemini-2.0-flash-exp has no endpoints left) failed the same
 * language test 5/5 times. A prompt cannot fix grammar, and only a stronger
 * paid model can — so the replies below are authored instead of generated.
 *
 * The upside: language mirroring is now a guarantee rather than a hope, the
 * wording is correct by construction, and the demo responds instantly with no
 * network call and no API cost.
 *
 * Every reply exists in both English and Roman Urdu and is returned in
 * whichever language the visitor used.
 */

export type AgentLanguage = "english" | "roman-urdu";
export type LanguagePreference = "auto" | AgentLanguage;
export type AgentId = "studies-helper" | "wellness-oracle";

/* ------------------------------------------------------------------ */
/* Language detection                                                  */
/* ------------------------------------------------------------------ */

const tokenize = (input: string): string[] =>
  input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

/**
 * Words that occur in Roman Urdu and are never standalone English words.
 *
 * Deliberately excludes anything that is also valid English — "is", "so",
 * "a", "in", "me" and friends would misroute every English sentence. Words
 * like "exam", "topic" or "assignment" are real English, so they live in
 * RU_SHARED instead and only carry weight.
 *
 * A single hit is enough to be confident, which keeps short queries
 * ("kya karun", "motivate me bhai") from being mis-routed.
 */
const RU_UNIQUE = new Set([
  // copula / negation
  "hai", "hain", "ho", "hun", "hoon", "hu", "hy", "nahi", "nahin", "nahee",
  "nhi", "nath",
  // question words
  "kya", "kyun", "kyon", "kyu", "kaisay", "kaise", "kaisa", "kaisi",
  "kidhar", "kahan", "kab",
  // verbs / participles
  "karein", "karna", "karte", "kartey", "karke", "karta", "karti", "karega",
  "karegi", "kar", "karo", "kro", "kren", "kre", "kare", "krha", "krde",
  "rahein", "rahi", "rahe", "rahen", "rehta", "rehti", "rehte",
  "lein", "lena", "lo", "le", "dekho", "dekha", "dekhein", "dekh",
  "batao", "batayein", "bata", "btao", "bta", "btana", "btayein",
  "sunao", "sunayein", "samjhao", "samjha", "samjhana", "samjh", "samajh",
  "chahiye", "chahye", "chahie", "chahia", "chah",
  // pronouns / demonstratives
  "aap", "aapko", "aapki", "aapka", "aapke", "mujhe", "mujhko", "mera",
  "meri", "mere", "ham", "hum", "tum", "tumhe", "tumhara", "tumhari",
  "tumko", "koi", "kuch", "isi", "isay", "iska", "iski", "iske",
  "usi", "usay", "uska", "uski", "uske", "unka", "unki", "unke",
  "ye", "yeh", "yehi", "kis", "kiska", "kisi", "kiski",
  // adjectives / adverbs
  "bohot", "bohat", "bhot", "bhoot", "acha", "achi", "ache", "achha",
  "mushkil", "musal", "asaan", "aasan", "bhi", "zaroor", "zaruri",
  "zaroori", "tayyar", "tayari", "tayyari", "phir", "pher", "magar",
  "lekin", "toh", "abhi", "bas", "bilkul", "thora", "thodi", "thore",
  "thori", "thak", "thaka", "thake", "thaki", "thakan", "pareshan",
  "ghabrahat", "shayad", "sirf", "baqi", "waqt", "wakt", "waqat", "vqt",
  "saath", "sath",
  // interjections
  "bhai", "bhaiya", "yaar", "dost", "salam", "salaam", "assalam",
  "assalamualaikum", "walaikum", "jazak", "shukriya", "shukr",
  // time
  "aaj", "kal", "parso", "hal", "raat", "subah", "shaam", "jaldi",
  "neend", "sona", "jagna", "sone",
  // everyday nouns
  "ghar", "kaam", "khud", "khana", "khane", "khanay", "dawai", "dawaiyan",
  "dawaiyon", "dawaiya", "namak", "chai", "padhai", "parhai", "yaad",
  "koshish", "intezaam", "trhn", "taran", "tarah", "tareeqe", "tareeqay",
  "qarz", "hazaar", "dard", "machi", "maza", "kursi", "kamra", "khidmat",
  "jagah", "hajat", "masla", "masale",
]);

/**
 * Roman-Urdu texting abbreviations. These are how the language is actually
 * typed on a phone, and they are what separates a Roman Urdu message from an
 * English one when the sentence is otherwise identical
 * ("showcasing my proj to judges").
 */
const RU_SLANG = new Set([
  "proj", "vids", "vid", "msgs", "msg", "req", "reqs", "sugg", "pic", "pics",
  "bcz", "bcoz", "mst", "thora", "krdo", "krd", "krwao", "btwn", "grp",
]);

/** Roman Urdu words that are also valid English, so they only carry weight. */
const RU_SHARED = new Set([
  "study", "studies", "exam", "test", "paper", "papers", "revision", "revise",
  "notes", "note", "schedule", "routine", "plan", "focus", "concentrate",
  "concept", "topic", "topics", "subject", "subjects", "chapter", "question",
  "questions", "quiz", "memorize", "remember", "memory", "motivate",
  "motivation", "stress", "tension", "pressure", "sleep", "diet", "exercise",
  "weight", "sugar", "pain", "assignment", "assignments", "homework",
  "semester", "trimester", "marks", "percentage", "procrastinate",
  "procrastination", "lazy", "deadline", "presentation", "interview",
  "hackathon", "demo", "judges", "judge", "pitch", "showcase", "due",
  "submit", "submission", "tired", "exhausted", "burnout", "break", "rest",
  "energy", "injury", "injured", "knee", "back", "shoulder", "joint",
  "muscle", "anxiety", "anxious", "depression", "mood", "stomach",
  "acidity", "gastritis", "indigestion", "heartburn", "bloating",
  "constipation", "supplement", "supplements", "vitamin", "tablet",
  "medicine", "medication", "iron", "calcium", "capsule", "walking",
  "running", "gym", "workout", "training", "cardio", "steps", "insomnia",
  "sleepless", "distracted", "distraction", "phone", "instagram", "reels",
  "youtube", "forget", "forgotten", "diabetes", "glucose", "insulin",
  "hypertension", "sore", "swelling", "sprain", "fracture", "strain",
]);

const EN_MARKERS = new Set([
  "the", "is", "are", "am", "you", "your", "yours", "i", "my", "me", "we",
  "our", "and", "or", "but", "to", "of", "in", "on", "for", "with", "that",
  "this", "can", "could", "should", "would", "will", "do", "does", "did",
  "have", "has", "had", "please", "how", "what", "why", "when", "where",
  "who", "give", "tell", "help", "need", "want", "make", "take", "get", "any",
  "some", "not", "no", "be", "been", "it", "its", "there", "here", "about",
  "from", "up", "out", "best", "good", "more", "less", "very", "much",
  "quick", "quickly", "tips", "study", "exam", "motivate", "focus",
  "schedule", "plan", "today",
]);

/**
 * Decide which language the visitor is writing in.
 *
 * Ties resolve to English, the safer default for a portfolio visitor, and the
 * chat UI exposes an explicit EN / Roman Urdu override so nobody is ever stuck
 * with a language they did not choose.
 */
export function detectLanguage(input: string): AgentLanguage {
  const tokens = tokenize(input);
  if (tokens.length === 0) return "english";

  if (tokens.some((t) => RU_UNIQUE.has(t) || RU_SLANG.has(t))) return "roman-urdu";

  let ru = 0;
  let en = 0;
  for (const token of tokens) {
    if (RU_SHARED.has(token)) ru += 1;
    else if (EN_MARKERS.has(token)) en += 1;
  }
  // Require real corroboration before guessing Roman Urdu from shared words.
  return ru >= 2 && ru > en ? "roman-urdu" : "english";
}

/** Resolve the language to answer in, honouring a manual override. */
export function resolveLanguage(
  input: string,
  preference: LanguagePreference,
): AgentLanguage {
  return preference === "auto" ? detectLanguage(input) : preference;
}

/* ------------------------------------------------------------------ */
/* Intent matching                                                     */
/* ------------------------------------------------------------------ */

/**
 * Does `token` look like the keyword `kw`?
 *
 * One-directional on purpose. Matching `kw` as a prefix of the token is safe
 * ("supplements" -> "supplement", "stressed" -> "stress"), but the reverse is
 * not: it made "should" match "shoulder" and "blood" match "bleeding", which
 * routed visitors to completely wrong intents.
 */
function matches(token: string, kw: string): boolean {
  if (token === kw) return true;
  if (kw.length < 4) return false;
  return token.startsWith(kw) && token.length - kw.length <= 5;
}

function findToken(tokens: string[], keywords: string[]): string | undefined {
  for (const kw of keywords) {
    for (const token of tokens) {
      if (matches(token, kw)) return token;
    }
  }
  return undefined;
}

type Intent = {
  id: string;
  keywords: string[];
  /**
   * Whole-phrase patterns, for anything where a keyword match would be unsafe.
   * `"blood"` as a keyword fires on "my blood pressure is high" and escalates
   * to a 1122 ambulance call, so emergency and wellbeing escalation are matched
   * on phrases instead.
   */
  patterns?: RegExp[];
  /**
   * Tie-breaker between intents that both match. Higher wins. Only needed
   * where one intent is a genuine specialisation of another — e.g. a knee
   * complaint during a run is an injury question, not an exercise question.
   */
  priority?: number;
  /** Checked before every other intent — safety and wellbeing first. */
  guard?: boolean;
  en: string[];
  ru: string[];
};

/* ------------------------------------------------------------------ */
/* StudiesHelper Agent                                                 */
/* ------------------------------------------------------------------ */

const STUDY_INTENTS: Intent[] = [
  {
    id: "study.distress",
    guard: true,
    keywords: [],
    patterns: [
      /\b(suicide|suicidal|self[\s-]?harm|selfharm|end\s*my\s*life|endmylife)\b/i,
      /\b(kill|harm|hurt|hang)\s*(myself|my\s*self|me|himself|herself|yourself)\b/i,
      /\bno\s*reason\s*(to\s*live|for\s*living|for\s*to\s*live)\b/i,
      /\bnothing\s*to\s*live\s*for\b/i,
      /\bbetter\s*off\s*(dead|without\s*me)\b/i,
      /\bworthless\b/i,
      /khud\s*ko\s*(maa?r|marna|morn|mar)\w*/i,
      /jeena\s*chah?t\w*\s*nahi/i,
    ],
    en: [
      "I'm really sorry you're feeling this, and please don't sit with it alone. I'm an AI, so I can't actually help you in the way this needs — please talk to a real person who knows you today: a friend, a family member, or a teacher. In Pakistan you can reach Umang, the government mental-health helpline, and 1122 works for emergencies. If it's easier, just send one message to someone saying \"not a good day\" — that alone is enough for today.",
    ],
    ru: [
      "Yeh sun kar mujhe afsos hai, aur please is mein akele na baithen. Main AI hoon, is liye is kaam mein asal madad nahi kar sakta — aaj kisi real insaan se zaroor baat karein jo aapko jaanta ho: dost, family member ya teacher. Pakistan mein government ka mental-health helpline Umang hai, aur emergency mein 1122 kaam karta hai. Agar aasan lage to kisi ko sirf itna likh dein ke \"aaj din acha nahi\" — aaj ke liye itna kaafi hai.",
    ],
  },
  {
    id: "study.greeting",
    keywords: [
      "hello", "hi", "hey", "helo", "salam", "assalam", "assalamualaikum",
      "salaam", "goodmorning", "morning",
    ],
    en: [
      "Hello! Ask me anything about study planning, focus, revision, exam nerves or motivation. What are you working on today?",
      "Hey there! Study plan, focus, revision, exam nerves — whatever you need. What's the situation today?",
    ],
    ru: [
      "Salam! Study planning, focus, revision, exam ka tension ya motivation — koi bhi sawal pooch lein. Aaj kya kaam hai?",
      "Assalam o alaikum! Study plan, focus, revision, ya exam ki chinta — jo marzi pooch lein. Aaj kya chal raha hai?",
    ],
  },
  {
    id: "study.presentation",
    keywords: [
      "hackathon", "demo", "judges", "judge", "pitch", "showcase", "viva",
      "presentation", "present", "interview", "expo",
    ],
    en: [
      "Good luck with the showcase — this is your moment to be calm and specific. Pitch it in three beats: the problem in one sentence, what you built and how, then where the technology earned its place. Spend your prep time on whatever gets a real reaction: a live demo, a real number, or a clear before-and-after. Rehearse the full run twice and memorise your first 30 seconds cold. Prep five answers for the questions they always ask, because that is where most of the score actually comes from. Send me the specific question you are expecting and I will help you frame it.",
      "You've got this. Judges reward structure far more than polish, so open with the problem, not with your stack. Then walk through one clear demo path rather than showing every feature you built. Have a one-line answer ready for \"what would you do next?\" — judges almost always ask it. And rehearse the opening until it feels boring to you, because nerves hit hardest in the first thirty seconds.",
    ],
    ru: [
      "Showcase ke liye best of luck — yeh aapka moment hai, aur aapko sirf calm aur specific rehna hai. Apna pitch 3 hisson mein rakhein: masla ek jumle mein, phir aapne kya banaya aur kaise, aur phir technology ne apna kaam kahan dikhaya. Tayari us cheez par karo jis se judges ka reaction mile — live demo, koi asli number, ya saaf before-and-after. Poora rehearsal 2 baar karein aur pehle 30 second ka introduction ratt lein. 5 sawalon ke jawab pehle se tayyar rakhein, kyunke asal scoring wahin se aata hai. Jo specific sawal aapko lagta hai, mujhe likh dein, main usay frame karne mein madad kar deta hoon.",
      "Aap kar denge yeh. Judges ko polish se zyada structure pasand aata hai, is liye shuruat masla se karein, apne stack se nahi. Phir har feature dikhane ke bajaye ek saaf demo path chalayein. \"Agle step mein kya karenge?\" ka ek-line jawab zaroor tayyar rakhein — yeh sawal judges poochte hi hain. Aur opening ko itna practice karein ke woh aapko boring lagne lage, kyunke nervous sab se zyada pehle 30 second mein hota hai.",
    ],
  },
  {
    id: "study.motivation",
    keywords: [
      "motivate", "motivation", "demotivated", "unmotivated", "hopeless",
      "giveup", "scared", "nervous", "anxious", "confidence", "fear",
      "tension", "stress", "sad", "alone", "empty",
    ],
    en: [
      "Absolutely — let's build that back up. First: one hard exam never defines you, and the fact that you're still pushing shows more grit than you think. Pick the single topic you've been avoiding and give it 25 focused minutes, then take a real break. Tell me which subject it is and I'll build you a plan around it.",
      "Here's the honest version: every topper you admire once sat exactly where you are and felt the same doubt. So start badly on purpose — pick the topic that makes you sigh and just stay with it for 15 minutes. Momentum does the rest, not motivation. Message me the subject and the deadline and I'll lay out a day-by-day plan.",
    ],
    ru: [
      "Bilkul, yeh dobara ban jayega. Pehle yeh samajh lein: aik mushkil exam aapko define nahi karta, aur aap abhi bhi koshil kar rahe hain — yeh aap se zyada taqat hai jitni aap ko lagti hai. Sirf woh ek topic chunein jise aap avoid kar rahi hain, 25 minute focused kaam karein, phir asli break lein. Batayein kaunsa subject hai, main aap ke around plan bana deta hoon.",
      "Sach wali baat yeh hai: har topper jo aap admire karti hain, ek waqt aap hi jagah baith kar wohi shak feel kar chuka hai. Is liye jaan boojh kar shuru karein — woh topic lein jo aap ko thaka deta hai aur 15 minute usi mein rahein. Momentum kaam karta hai, motivation nahi. Mujhe subject aur deadline bata dein, main roz ka schedule bana ke deta hoon.",
    ],
  },
  {
    id: "study.examPrep",
    keywords: [
      "exam", "test", "paper", "papers", "preparation", "prepare",
      "syllabus", "revision", "final", "quiz",
    ],
    en: [
      "Let's turn the remaining days into a plan instead of a panic. Today, cover the three or four topics with the highest weight — that is where the marks are. Tomorrow, finish the rest plus one full revision pass. Last day: quick revision and sleep only, no new topics. After each topic, close the notes and write down everything you remember from memory, then check what you missed. Tell me your subjects, the exam date, and how many hours you study daily, and I'll build the day-by-day schedule.",
      "Here's the order that works: past papers first, because they show you the real pattern, then the topics you keep getting wrong, then a light pass over the rest. In the final 24 hours, do formulas, definitions and previously-repeated questions only — that is the highest-value revision there is. Send me your subjects and how many days are left and I'll sequence it for you.",
    ],
    ru: [
      "Baaki dinon ko panic se plan bana lete hain. Aaj un 3-4 topics par kaam karein jin ka weight sab se zyada hai — marks wahin se aate hain. Kal baqi topics khatam kar ke ek poora revision pass karein. Aakhri din: sirf quick revision aur neend, koi naya topic nahi. Har topic ke baad notes band karke khud se likh kar dekhein ke aap ko kya yaad hai, phir check karein. Apne subjects, exam date aur roz kitne ghante padhte hain mujhe bata dein, main roz ka schedule bana ke deta hoon.",
      "Jo tareeqa kaam karta hai woh yeh hai: pehle past papers, kyunke us se asli pattern pata chal jata hai; phir woh topics jo baar baar ghalat hote hain; phir baqi ka halka pass. Aakhri 24 ghanton mein sirf formulas, definitions aur pehle aaye hue sawal revise karein — yahi sab se zehadar faida deta hai. Apne subjects aur kitne din bache hain bata dein, main poori tarteeb bana deta hoon.",
    ],
  },
  {
    id: "study.procrastination",
    keywords: [
      "procrastinate", "procrastination", "lazy", "distracted", "distraction",
      "phone", "instagram", "reels", "youtube", "start", "focus",
      "concentrate",
    ],
    en: [
      "Not being able to start is the hardest part, not the work itself — and it's the part everyone skips past. Shrink the first step until it feels too small to refuse: one subject, one page, one question, phone in another room, timer set for 25 minutes. When it ends, stop even if you feel motivated — that's exactly what builds the habit. Which subject is it?",
      "That's a focus problem, not a discipline problem, so fix the environment first. Silence notifications, keep the phone out of sight, and open only the file you need — no extra tabs. Then commit to one 25-minute block and let yourself feel bored; boredom is the feeling that actually comes right before focus. Tell me what's pulling you away and I'll suggest a specific workaround.",
    ],
    ru: [
      "Shuru na karna hi sab se mushkil hissa hai, kaam khud asaan nahi hota — aur yehi woh hissa hai jise sab log nikal lete hain. Pehla qadam itna chhota karein ke mana karna mushkil ho: ek subject, ek page, ek sawal, phone dusre kamre mein, 25 minute ka timer. Khatam hone par ruk jayein chahe mann kare ya na kare — aadat isi se banti hai. Kaunsa subject hai?",
      "Yeh focus ka masla hai, discipline ka nahi, is liye pehle environment theek karein. Notifications band karein, phone aankhon se door rakhein, aur sirf wahi file kholen jo chahiye — koi extra tab nahi. Phir aik 25 minute ka block decide karein aur bore hone dein — focus aane se thori pehle yahi feeling aati hai. Aap kya cheez distract karti hai bataiye, main khaas hal bata deta hoon.",
    ],
  },
  {
    id: "study.timeManagement",
    keywords: [
      "schedule", "timetable", "routine", "management", "organize",
      "balance", "plan", "day",
    ],
    en: [
      "A timetable works only if it removes decisions, so build one and stop negotiating with it. A solid day looks like this: 45 minutes on your hardest subject, 15 minutes break, 45 minutes of lighter revision, an hour of practice questions, then 30 minutes of recall before sleep. Limit yourself to two subjects a day — context switching is what quietly kills revision. Write tomorrow's three tasks tonight so your morning brain has nothing left to decide.",
      "The trick is to timebox, not to estimate. Decide each task gets a fixed 40 minutes and note down when the timer started — estimating is where plans die. Keep one buffer hour in the day for whatever overruns, because something always does. And put your hardest subject first, while you still have the most energy, not last.",
    ],
    ru: [
      "Timetable sirf tab kaam karta hai jab woh faislay khud khatam kar de — is liye bana lijiye aur uske saath baat-saat na karein. Aik acha din aisa hota hai: 45 minute sab se mushkil subject, 15 minute break, 45 minute halki revision, aik ghanta practice questions, aur sone se pehle 30 minute recall. Roz sirf do subjects rakhein — context switching hi revision khaa deta hai. Kal ke 3 task aaj raat likh lein, taake subah dimagh ke paas koi faisla na bache.",
      "Asal tareeqa timebox hai, estimate karna nahi. Har task ko thora 40 minute decide karein aur note kar lein ke timer kab chala — plan wahi marta hai jahan estimate shuru hota hai. Din mein aik buffer ghanta chhor dein, kyunke kuch na kuch zaroor over hota hai. Aur sab se mushkil subject pehle rakhein jab energy abhi zyada ho, aakhri mein nahi.",
    ],
  },
  {
    id: "study.concept",
    keywords: [
      "explain", "understand", "concept", "confused", "clear", "difference",
      "formula", "derive", "proof", "samjhao", "samjhna", "samajh",
    ],
    en: [
      "The way to actually lock this in is three steps: write the definition, then explain it in three lines in your own words, then attach one small real example. If you cannot do those three, you have recognised the topic but not understood it — and that gap is exactly where exam questions come from. Tell me the exact topic and your class or board, and I'll walk you through it in small chunks with examples until it's clear.",
      "Most confusion here is not the topic, it's the missing prerequisite. So tell me the chapter name and the last point you *did* understand. I'll start from just after that, build up one idea at a time, and check with you after each step. Small confirmed steps beat one long explanation every time.",
    ],
    ru: [
      "Isay yaad rakhne ka tareeqa teen step hai: definition likhein, phir apne alfaz mein 3 lines mein bataiye ke yeh kaam kya karta hai, phir aik chhota asli example jodein. Agar teenon cheezein na ho sakein to aap ne topic pehchana hai, samjha nahi — aur exam ka sawal wahin se aata hai. Mujhe exact topic aur apni class ya board bata dein, main chhote chunks mein example ke saath samjha deta hoon jab tak clear na ho jaye.",
      "Yahan zyada tar masla topic ka nahi, us se pehle woh cheez ka hota hai jo aapne chhorr di. Is liye chapter ka naam aur woh aakhri point bataiye jise aap samajh chuki thi. Main uske baad se shuru karke ek-ek idea bana kar aage badhunga aur har step ke baad aapse check kar lunga. Lambi tafseel se behtar chhote confirmed steps hote hain.",
    ],
  },
  {
    id: "study.deadline",
    keywords: [
      "deadline", "due", "submission", "submit", "reminder", "remind",
      "assignment", "homework", "delayed", "late",
    ],
    en: [
      "Deadlines stop being scary once you cut them into pieces. Tonight, write three small tasks with the easiest one first, so you bank a finished item early. Give each one a fixed 20 minutes and take a 10-minute break after each. And put the phone in another room when you start — that one habit gives back hours across a week. How many days do you have left?",
      "Two things make deadlines manageable: a fixed timebox for each task, and a hard finish time for the day. Without a finish time, revision quietly eats your sleep, and your sleep was the thing keeping you sharp. Write the finish time on paper, tell someone what it is, and hold yourself to it.",
    ],
    ru: [
      "Deadline tab dar ki nahi rehti jab usey tukdon mein tor dein. Aaj raat 3 chhote task likhein aur sab se aasan pehle, taake jaldi koi cheez mukammal ho jaye. Har task ko 20 minute dein aur uske baad 10 minute break lein. Aur shuru karte waqt phone dusre kamre mein rakhein — yeh aik chhoti aadat hafte mein ghanton wapas de deti hai. Kitne din bache hain?",
      "Deadline sambhalne ke liye do cheezein chahiye: har task ka fixed time, aur din ka pakka finish time. Finish time ke baghair revision chupke se neend kha lein hai, aur neend hi cheez thi jo aapko tez rakhti thi. Finish time paper par likh lein, kisi ko bata dein, aur usi par tayyar rahen.",
    ],
  },
  {
    id: "study.burnout",
    keywords: [
      "tired", "exhausted", "burnout", "break", "sleep", "energy", "thakan",
      "neend", "rest", "overwhelmed", "padhai",
    ],
    en: [
      "Running low isn't failure, but a tired brain cannot focus for two hours — so shrink today's target to one topic and 30 minutes. Use the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds. Then protect 7-8 hours of sleep, because sleep debt quietly cuts retention by up to a third. If you are genuinely depleted, stopping today is part of studying, not a break from it.",
      "If everything feels heavy, that's usually a rest debt rather than a work problem. Take today off properly — not in bed scrolling, but a walk, food, and an early night. Then restart with one 30-minute block tomorrow. Working at half capacity for six hours is slower than working at full capacity for two.",
    ],
    ru: [
      "Energy khatam hona nakaam nahi hai, lekin thaka hua dimagh 2 ghante focus nahi kar sakta — is liye aaj ka target aik topic aur 30 minute rakhein. 20-20-20 rule use karein: har 20 minute baad 20 second ke liye 20 feet door dekhein. Phir 7-8 ghante ki neend poori lein, kyunke neend ka qarz yaaddaari up to ek teenai ghaata deta hai. Agar sach mein poori tar thak gayi hain to aaj rukna padhai ka hissa hai, us se break nahi.",
      "Agar sab kuch bhaari lag raha hai to woh aam tor par aaram ka qarz hai, kaam ka masla nahi. Aaj proper break lein — scroll karte hue bistar par nahi, balki chhal phir, khana aur jaldi sona. Phir kal aik 30 minute ke block se shuru karein. 6 ghante aadhi taqat se kaam karna 2 ghante poori taqat se kaam karne se bhi slow hai.",
    ],
  },
  {
    id: "study.lastMinute",
    keywords: [
      "lastminute", "tonight", "overnight", "slepless", "morning",
    ],
    en: [
      "All-nighters backfire: without sleep, your brain retains almost nothing after about three hours. Tonight, revise only formulas, definitions, and previously-repeated questions. Tomorrow morning, before anything else, write down the five most important topics from memory and check it — that is the highest-value ten minutes of your day. Sleep early. A rested brain outscores a tired one that crammed.",
      "With this little time, don't try to learn anything new. Do two passes: one fast pass over everything you've already studied, then a slow pass over only the topics you keep forgetting. Then sleep — four hours beats six broken hours. On the way to the exam, revise in your head rather than on paper, because panic reading wastes time you don't have.",
    ],
    ru: [
      "Raat bhar jaag kar padhna nuksan karta hai — neend ke bina dimagh tees minute ke baad kuch yaad nahi rakhta. Aaj raat sirf formulas, definitions aur pehle aaye hue sawal revise karein. Kal subah sab se pehle sab se ahem 5 topics yaad se likh kar dekhein — yahi din ki sab se zehadar faide wali 10 minute hain. Jaldi so jayein. Thaka hua dimagh, poora kar ke thake dimagh se behtar hota hai.",
      "Itni dhaat mein koi nayi cheez seekhne ki koshish na karein. Do pass karein: aik tez pass poore par jise aapne pehle padha hai, phir aik dheema pass sirf un topics par jo baar baar bhool jati hain. Phir so jayein — 4 ghante 6 tukde ghanton se behtar hain. Exam ki taraf ja kar paper par nahi, apne dimagh mein revise karein, kyunke ghabrahat mein padhna woh waqt barbaad karta hai jo aap ke paas hai hi nahi.",
    ],
  },
  {
    id: "study.fallback",
    keywords: [],
    en: [
      "Happy to help with that. So I can give you something actually useful instead of generic advice, tell me three things: which subject, what you need (a concept explained, a revision plan, or practice questions), and your deadline. Write your question in as much detail as you can and I'll work through it with you step by step.",
      "I can help with that properly. Tell me which subject it is, what exactly you're stuck on, and when the deadline is — then I'll give you a concrete plan instead of general encouragement. If you paste the full question or the topic, we can go through it step by step right here.",
    ],
    ru: [
      "Bilkul madad karta hoon. Aam si baat ke bajaye aapko sach kaam ka kaam karne ke liye teen cheezein bataiye: kaunsa subject, kya chahiye (concept samjhana, revision plan, ya practice questions), aur deadline kab hai. Apna sawal jitna detail mein likh sakti hain likh dein, main aap ke saath step by step chalunga.",
      "Is mein main sahi tarah madad kar sakta hoon. Batayein kaunsa subject hai, aap exactly kis cheez par atke hain, aur deadline kab hai — phir main aam tasalli ke bajaye aik practical plan de deta hoon. Poora sawal ya topic yahan paste kar dein, hum yahin step by step chal lete hain.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* WellnessOracle Agent                                                */
/* ------------------------------------------------------------------ */

const WELLNESS_INTENTS: Intent[] = [
  {
    id: "wellness.emergency",
    guard: true,
    keywords: [],
    patterns: [
      // chest pain — the phrase, never the bare word "chest"
      /\b(chest|seene|sin|chest)\s*(mein|me|ki)?\s*(pain|dard|jal\s*raha|jal\s*raha|dard\s*ho)/i,
      /\b(chestpain|chest\s*pain)\b/i,
      // breathing
      /breathless|saans\s*(nahi|phool|ruk|band)/i,
      // consciousness / stroke / seizure
      /unconscious|behosh|bekho?osh/i,
      /stroke|falij/i,
      /seizure|dhaaga|jal\s*jana/i,
      // bleeding / vomiting blood / black stool
      /(severe|heavy|bohot|zyada|bahut)\s*(khoon|bleed|bleeding)/i,
      /(ulti|vomit)\w*\s*(mein\s*)?(khoon|blood)/i,
      /(kala|black)\s*(stool|peshab)/i,
      /overdose|extra\s*dose|zyada\s*dawai/i,
      /\b(too\s*many|bohot|zyada|bahut)\s+(pills?|tablets?|capsules?|medicine|dawai|gne)\b/i,
      // collapse
      /\bcollapsed\b|baithe\s*baithe\s*gir|bichhad\s*gay/i,
    ],
    en: [
      "This sounds like it could be a medical emergency. Please call 1122 or go to the nearest emergency department right now — don't wait for an answer here. I'm an AI wellness assistant, not a doctor, and I cannot assess or treat anything at this level. Please get help immediately.",
    ],
    ru: [
      "Yeh baat medical emergency ho sakti hai. Abhi 1122 par call karein ya nearest emergency department chale jayein — yahan intezaar na karein. Main AI wellness assistant hoon, doctor nahi, aur is level ki koi assessment ya ilaj nahi kar sakta. Please foran madad lein.",
    ],
  },
  {
    id: "wellness.greeting",
    keywords: [
      "hello", "hi", "hey", "salam", "assalam", "assalamualaikum",
      "salaam", "morning",
    ],
    en: [
      "Hello! I can help with nutrition, general fitness guidance, recovery, and building a healthy routine. What are you dealing with today?",
      "Hey! Nutrition, workout planning, recovery and healthy habits — that's all in scope for me. How are you feeling right now?",
    ],
    ru: [
      "Salam! Nutrition, general fitness, recovery aur healthy routine — in sab mein madad kar sakta hoon. Aaj masla kya hai?",
      "Assalam o alaikum! Khana, workout planning, recovery aur sehat ki aadatein — yehi meri raange hai. Abhi aap kaisa mehsoos kar rahe hain?",
    ],
  },
  {
    id: "wellness.bp",
    keywords: [
      "bp", "bloodpressure", "pressure", "hypertension", "highbp", "heart",
    ],
    en: [
      "High blood pressure is worth taking seriously, so please get it properly measured and confirmed by a doctor. While you wait: cut salt first, because that is the biggest lever for most people, and add potassium-rich foods like bananas, spinach, beans and yogurt. Aim for 30 minutes of walking daily, keep caffeine to before noon, and take any prescribed medicine on time — never stop it because you feel fine. If your readings stay above 140/90, book a doctor visit this week.",
      "For blood pressure, consistency beats intensity. A low-salt diet, daily walking, and proper sleep will do more for you than any single strict diet. Keep a simple log of your readings with the date and time so your doctor can see the real pattern. And please tell me if you are already on medication, because that changes the advice significantly.",
    ],
    ru: [
      "BP high ko seriously lena chahiye, is liye zaroor raqam doctor se check karwayein. Filhaal sab se bara kaam namak kam karna hai — aksar logon ke liye yahi sab se bari farq laata hai — aur potassium wale khane lein: kela, palak, beans aur dahi. Roz 30 minute chalna sab se acha tareeqa hai, chai dopahar ke baad band karein, aur dawai waqt par lein — achha mehsoos karne par bhi band na karein. Agar raqam 140/90 se upar rahti hai to is hafte doctor se zaroor milein.",
      "BP mein intensity se zyada ahemiat continuity ki hai. Namak kam karke roz chalna aur achhi neend aapke liye kisi bhi sakht diet se zyada faida karte hain. Raqam ka chhota log banayein, date aur time ke saath, taake doctor ko asli pattern nazar aaye. Aur mujhe zaroor batayein ke aap pehle se dawai par hain ya nahi, us se mashwara bohot badal jata hai.",
    ],
  },
  {
    id: "wellness.sugar",
    keywords: [
      "sugar", "diabetes", "bloodsugar", "glucose", "insulin", "sweet",
      "meetha", "shakar",
    ],
    en: [
      "For blood sugar, two habits matter more than anything else: never skip a meal, and pair every carbohydrate with protein or fibre. Skipping meals makes the next spike worse, not better. Cut sugary drinks first — they cause the biggest spikes of all. A 15-20 minute walk after a meal measurably lowers glucose. Keep a simple record of readings with times, take your medicine on schedule, and if you are unsure about a number, get it tested at a lab rather than guessing.",
      "The most effective change for most people is removing liquid sugar, including juices and sweetened tea. Carbohydrates are fine in sensible portions — what makes sugar spike is the amount at one sitting and eating it alone. Have dal or eggs alongside rice, and check your reading at consistent times so you can compare properly.",
    ],
    ru: [
      "Sugar control ke liye do cheezein baqi sab se ahem hain: khaali mat rahein, aur har carbohydrate ke saath protein ya fibre lein. Khali rehne se agla spike aur barh jata hai, kam nahi hota. Pehle sugary drinks hatayein — wahi sab se bari spike lati hain. Khana khane ke 15-20 minute baad thodi chalna glucose kaafi gira deta hai. Raqam ka chhota record banayein time ke saath, dawai waqt par lein, aur koi raqam par shak ho to lab se check karwayein — andaza na lagayein.",
      "Bohot logon ke liye sab se asar daar cheez liquid sugar hatana hai, juice aur meethi chai samet. Carbohydrate meqdaron mein theek hain — spike tab aata hai jab aik baar mein bohot khaya jaye ya akela khaya jaye. Chawal ke saath dal ya anda lein, aur raqam hamesha aik hi waqt par check karein taake sahi moqe se tulna mumkin ho.",
    ],
  },
  {
    id: "wellness.weight",
    keywords: [
      "weight", "loseweight", "weightloss", "fat", "diet", "wazan", "motapan",
      "slim", "obese", "khanaplan", "khana",
    ],
    en: [
      "For weight loss, the only thing that reliably works is eating slightly under what you burn — extreme diets fail because you can't hold them. Keep three rules: protein at every meal (eggs, daal, chicken, fish, yogurt), two or three real meals instead of six snacks, and 30-40 minutes of walking daily. Cut sugary drinks and deep-fried food before anything else. Aim for around half a kilo a week, because faster loss is mostly water and muscle. Please talk to a doctor or nutritionist before starting any new diet, especially if you have diabetes or blood pressure issues.",
      "There is no shortcut, but there is a simpler version than you think: keep three meals, add protein to each, walk daily, and remove sugary drinks. That alone moves the needle more than any special diet. Please check with a doctor first if you are pregnant, under 18, or managing a medical condition — those cases genuinely need professional guidance rather than general advice.",
    ],
    ru: [
      "Wazan kam karne ka sirf woh tareeqa hai jo chalta hai — roz apne burn se thoda kam khayein. Extreme diet zyada tar nahi chalti, kyunke unhein poora kar nahi sakte. Teen qayedein rakhein: har waqt protein lein (anda, dal, murgh, machli, dahi), chhoti chhahi bajaye 2-3 poore khane, aur roz 30-40 minute chalna. Pehle sugary drinks aur deep-fried cheezen hatayein. Hafte mein aadha kilo ke qareeb target rakhein, kyunke us se tez wazan ghata ka matlab zyada tar pani aur muscle jaana hai. Koi bhi nayi diet shuru karne se pehle doctor ya nutritionist se mashwara lein, khaas kar agar sugar ya BP ka masla hai.",
      "Koi shortcut nahi hai, lekin jo aap soch rahe hain us se aasan version mojood hai: teen waqt khana rakhein, har ek mein protein milayein, roz chalna, aur sugary drinks hatana. Sirf itni cheezon se farq nazar aata hai, kisi khaas diet se zyada. Agar aap pregnant hain, 18 se kam hain, ya koi bimari manage kar rahe hain to pehle doctor se zaroor check karwayein — un mein amli mashwara sach mein zaroori hai.",
    ],
  },
  {
    id: "wellness.exercise",
    priority: 10,
    keywords: [
      "exercise", "workout", "gym", "running", "run", "walk", "steps",
      "training", "cardio", "kasrat",
    ],
    en: [
      "Start smaller than you think you need to. Fifteen minutes of brisk walking daily beats two gym days a week that you quit in a month. Add strength work twice a week — bodyweight squats, push-ups, and rows — because muscle is what keeps your metabolism alive as you age. Increase your duration by about 10% a week and no more, because the fastest way to get injured is a sudden jump. If you have chest pain, breathlessness on mild effort, or a known heart condition, please get cleared by a doctor first.",
      "Consistency beats intensity every single time. Pick something you can do in your clothes without changing, and do it at the same time daily. Walking counts fully. If you're starting from zero, ten minutes twice a day is a better starting point than an hour you abandon by Wednesday.",
    ],
    ru: [
      "Shuruat us se chhoti karein jitni aapko lagti hai. Roz 15 minute tez raft chalna us se zyada faida deti hai jo hafte mein 2 din gym karke chor dete hain. Hafte mein 2 baar halka weight ka kaam zaroor karein — bodyweight squat, push-up aur rows — kyunke muscle hi metabolism ko zinda rakhta hai. Har hafte waqt sirf 10% barhayein, zyada nahi, kyunke achanak barhana hi sab se amari sab se badi wajaah hai. Agar seene mein dard, halki kasrat mein saans phoolna, ya dil ki koi jaani bimari ho to pehle doctor se check karwayein.",
      "Har baar consistency intensity se jeet jati hai. Woh cheez chunein jo aap kapde badle bina kar sakte hon, aur roz usi waqt karein. Chalna poora count hota hai. Agar bilkul zero se shuru kar rahe hain to roz 10 minute do baar behtar hai jitna aik ghanta hai jo aap chhorr dein.",
    ],
  },
  {
    id: "wellness.sleep",
    keywords: [
      "sleep", "insomnia", "sleepless", "neend", "sona", "jagna", "tired",
      "thaka", "thak",
    ],
    en: [
      "Sleep is when your brain actually consolidates memory, so late-night cramming costs you twice. Keep a fixed bedtime even at weekends, and get 15 minutes of morning sunlight within an hour of waking — that single habit anchors your entire rhythm. If you can't fall asleep within 20 minutes, get up, sit somewhere dim without a phone, and return when you feel sleepy. And avoid caffeine after noon: it has a half-life of around six hours, so an evening coffee is still working at midnight.",
      "The most common sleep mistake is staying in bed trying to force sleep. That teaches your brain that bed means wakefulness. Get up, do something dull in dim light, and return only when sleepy. Also keep your room cool and dark, and if you nap, keep it under 20 minutes and before 3pm.",
    ],
    ru: [
      "Neend hi woh waqt hai jab dimagh yaad rakhta hai, is liye raat bhar jaag kar padhna aapko do baar nuksan deta hai. Fix bedtime rakhein, chahe hafte mein ayam ke bhi, aur subah uth kar 1 ghante ke andar 15 minute dhoop lein — yahi aik aadat poora schedule set kar deti hai. Agar 20 minute mein neend na aaye to uth jayein, kam roshni mein phone ke baghair kuch boring karein, aur sirf neend aane par laut jayein. Dopahar ke baad chai aur coffee bilkul band karein — us ka asar aadha se zyada ghante tak rehta hai, matlab raat ki chai subah tak chal rahi hoti hai.",
      "Neend ka sab se aam ghalat tareeqa yeh hai ke aap bistar par rut kar so ne lagane ki koshish karte hain. Is se dimagh ko sikhaya jaata hai ke bistar matlab jaagna. Uth jayein, kam roshni mein kuch boring karein, aur sirf neend aane par laut jayein. Kamre ko thanda aur andhera rakhein, aur agar din mein soyen to 20 minute se kam aur dopahar 3 baje se pehle.",
    ],
  },
  {
    id: "wellness.stress",
    keywords: [
      "stress", "anxiety", "anxious", "depression", "tension", "pareshan",
      "ghabrahat", "dar", "mood", "chinta", "udaas",
    ],
    en: [
      "When anxiety spikes, try 4-7-8 breathing: breathe in for 4 counts, hold for 7, and exhale for 8. It pulls your body out of fight-or-flight within about two minutes. Movement helps too — even a 10-minute walk lowers cortisol. Then be practical: write down the single thing you can actually control today and deliberately park the rest. If this persists beyond a couple of weeks, or it's affecting your eating, sleep or work, please speak to a doctor. It's treatable and not something to endure alone.",
      "Worry and a plan feel identical until you write them down. So take a pen and split your list into two columns: what you can control, and what you can't. Almost everything lands in the second column, and you'll notice your shoulders drop. For the first column, pick the smallest possible first step and do it today, even if it's a five-minute task.",
    ],
    ru: [
      "Jab ghabrahat tez ho jaye to 4-7-8 saans lein: 4 tak saans andar, 7 tak roka, 8 tak bahar chhorein. Yehi aik tareeqa hai jis se jism ko panic se nikalne mein lagbhag 2 minute lagte hain. Harkat bhi madad karti hai — chahe 10 minute chhalna cortisol gira deta hai. Phir aam ki baat karein: sirf woh aik cheez likhein jo aap aaj sach mein control kar sakte hain, aur baqi jaan boojh kar side mein rakh dein. Agar yeh 2 hafte se zyada rahe, ya khane, neend ya kaam par asar kare to zaroor doctor se baat karein — yeh qabil-e-ilaj hai aur akele sehna zaroori nahi.",
      "Fikr aur plan dono ek jaise lagte hain jab tak aap unhein likh kar dekh na lein. Is liye qalam uthayein aur list ko do hisson mein baant dein: jo aap control kar sakte hain, aur jo nahi. Zyadatar cheezein doosre column mein aa jayengi, aur aap khud dekhenge ke kandhe utar gaye. Pehle column mein sab se chhota mumkin qadam chunein aur aaj hi kar lein, chahe woh 5 minute ka kaam ho.",
    ],
  },
  {
    id: "wellness.injury",
    priority: 20,
    keywords: [
      "pain", "injury", "injured", "sprain", "fracture", "strain", "dard",
      "machi", "hazaar", "mardana", "knee", "kamar", "ghutno", "pair", "haath",
      "sar", "ankle", "wrist", "elbow", "shoulder", "joint", "muscle",
    ],
    en: [
      "For any new pain, R.I.C.E. is the safe starting point for the first 48 hours: Rest, Ice, Compression, and Elevation. After that, add gentle pain-free movement, because complete rest for more than a few days causes stiffness and slower healing. Please get it checked by a doctor if there's swelling, you can't bear weight, the joint feels unstable, numbness appears, or the pain hasn't improved after a week. And please don't train through an injury just because an exam or hackathon is close — a second injury is always worse than a delayed one.",
      "The question that matters most is whether this is new or a long-standing thing. If it's new and came after a specific movement, rest it properly. If it's been there for weeks and never fully settled, it deserves an assessment rather than more self-treatment. In the meantime, gentle range-of-motion movement within a pain-free range keeps the joint from stiffening.",
    ],
    ru: [
      "Kisi bhi nayi dard ke liye pehle 48 ghante R.I.C.E. sab se mehfooz tareeqa hai: Rest (aaram), Ice (thanda), Compression (patti), Elevation (utha kar rakhein). Uske baad dard na ho aise halke harkat shuru karein, kyunke poori tar aaram karne se jor jam jati hai aur ilaj tez hota hai. Doctor se zaroor dikhwayein agar sujan hai, weight nahi dal sakte, jor kamzor lag raha hai, ya alag mehsoos hone laga, ya hafte baad bhi dard kam nahi hua. Aur sirf is liye dard ignore na karein ke exam ya hackathon qareeb hai — doosri chot pehli se bhi buri hoti hai.",
      "Sab se ahem sawal yeh hai ke yeh nayi dard hai ya bohat purani. Agar nayi hai aur kisi khaas harkat ke baad shuru hui hai to usee theek se aaram dein. Agar hafton se hai aur kabhi poora theek nahi hui, to self-treatment se zyada aik jaiza (assessment) chahiye. Filhaal dard ke baghair halki harkat karte rahein taake jor jam na jaye.",
    ],
  },
  {
    id: "wellness.digestion",
    priority: 30,
    keywords: [
      "stomach", "acidity", "gastritis", "indigestion", "heartburn", "bloating",
      "constipation", "pet", "seethi", "qayqay",
    ],
    en: [
      "For acidity or stomach discomfort, smaller and more frequent meals work far better than three large ones. Don't lie down for two hours after eating, cut late-night tea and fried food, and drink water along with your meal rather than chugging a litre at once. If you ever notice black or bloody stools, unexplained weight loss, or vomiting blood, see a doctor urgently — that is not something to manage at home.",
      "For bloating, the most common causes are eating too fast, fizzy drinks, and a lot of raw onion or beans. Eat slowly, cut soda for a week, and see whether it changes anything before you start removing whole food groups. If the pain is severe, localised, or comes with fever, please get it examined.",
    ],
    ru: [
      "Seethi ya pet mein problem ho to chhoti chhoti baar khana 3 bohot khane se kahin behtar hai. Khane ke baad 2 ghante tak lete na rahein, raat ki chai aur fried cheezen chhorein, aur khane ke saath paani dheere dheere lein — aik baar mein poora litre nahi. Agar kala ya khoon wala stool dikhe, bina wajah wazan ghat raha ho, ya ulti mein khoon aaye to foran doctor se milein — yeh ghar par sambhalne wali cheez nahi hai.",
      "Pet phoolne ki sab se aam wajahein hain: tez khana, cold drinks, aur zyada kacha pyaz ya beans. Dheere khayein, aik hafte soda chhorein, aur poora food group hatane se pehle dekhein ke kuch farq pada ya nahi. Agar dard bohot tez hai, aik jagah mehsoos ho raha hai, ya bukhar bhi hai to zaroor check karwayein.",
    ],
  },
  {
    id: "wellness.supplements",
    keywords: [
      "supplement", "vitamin", "tablet", "medicine", "medication", "dawai",
      "iron", "calcium", "proteinpowder", "capsule", "injection", "injections",
    ],
    en: [
      "Be careful with supplements — more is not better, and some interact with blood pressure or sugar medicines. Vitamin D, B12 and omega-3 are genuinely low in Pakistan, but get tested before taking high doses. Iron is different: don't take it unless your haemoglobin is actually low, because excess iron causes real harm. Buy from a registered pharmacy, not a market stall. Tell me what you're taking and for what, and I'll flag anything that needs a doctor's confirmation.",
      "One thing worth doing regardless: take any prescribed medicine at a fixed time linked to a daily habit, like after brushing your teeth. Adherence matters more than dosage. And don't add a new supplement while you're already on regular medication without checking for interactions first — your pharmacist can check this for you in a couple of minutes, free of charge.",
    ],
    ru: [
      "Supplements lete waqt ehtiyat karein — zyada ka faida nahi hota, aur kuch cheezein BP ya sugar ki dawai ke saath takra jati hain. Vitamin D, B12 aur omega-3 Pakistan mein waqai kam hote hain, lekin high dose lene se pehle test karwayein. Alag baat hai iron: haemoglobin kam na ho to iron bilkul na lein, us se asal nuksan hota hai. Dawai registered pharmacy se lein, bazaar se nahi. Batayein kya le rahe hain aur kis liye, main bata dunga ke kahan doctor ki confirmation zaroori hai.",
      "Chahe kuch bhi ho, aik kaam faida deta hai: dawai aik fix time par lein jo kisi roz ki aadat se jude ho, jaise daant saaf karne ke baad. Time par lena dose se zyada ahem hai. Aur agar aap pehle se koi regular dawai le rahe hain to naya supplement bina check kiye shuru na karein — aapka pharmacist yeh aik do minute mein muft check kar deta hai.",
    ],
  },
  {
    id: "wellness.fallback",
    keywords: [],
    en: [
      "I can help with general wellness, but I can't diagnose anything — that's a doctor's job. Tell me a bit more so the advice is actually useful: what are you feeling, how long has it been going on, and have you already had anything checked? Then I can give you sensible general guidance, though please confirm anything specific with a doctor.",
      "Happy to help. So I can be specific rather than generic, tell me what's going on and what your main concern is. I'll give general guidance, and I'll always tell you clearly which parts genuinely need a doctor — I'm an assistant, not a substitute for one.",
    ],
    ru: [
      "General wellness mein madad kar sakta hoon, lekin kisi bimari ka diagnosis nahi kar sakta — woh doctor ka kaam hai. Thora aur bataiye taake mashwara asal kaam ka ho: kya mehsoos kar rahe hain, kitne din se hai, aur kya pehle kuch check karwaya hai? Phir main theek general guidance de sakta hoon, aur jo khaas cheez doctor se confirm karwani hogi woh saaf bata dunga — main assistant hoon, doctor ki jagah nahi.",
      "Bilkul madad karta hoon. Taake mashwara aam na ho khaas ho, batayein masla kya hai aur aapki sab se bari fikr kya hai. Main general guidance de dunga, aur jo cheez sach mein doctor se check karwani chahiye woh saaf bata dunga.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Engine                                                              */
/* ------------------------------------------------------------------ */

const BANK: Record<AgentId, Intent[]> = {
  "studies-helper": STUDY_INTENTS,
  "wellness-oracle": WELLNESS_INTENTS,
};

/** Stable, cheap hash so the same question keeps the same phrasing. */
function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export type AgentReply = {
  text: string;
  language: AgentLanguage;
  intentId: string;
};

/**
 * Produce a bilingual reply that always comes back in the language the
 * visitor used (unless they explicitly picked one in the UI).
 */
export function replyTo({ agent, query, preference }: {
  agent: AgentId;
  query: string;
  preference: LanguagePreference;
}): AgentReply {
  const language = resolveLanguage(query, preference);
  const tokens = tokenize(query);
  const intents = BANK[agent];
  const seed = hash(`${agent}:${query.toLowerCase()}`);

  // Matching priority, most important first:
  //   1. safety / wellbeing guards (phrase patterns, not loose keywords)
  //   2. any substantive topic intent
  //   3. a greeting — only if nothing else applies, so that
  //      "hi please motivate me for my exam" gets motivation, not "hello!"
  const guards = intents.filter((i) => i.guard);
  const substantive = intents
    .filter((i) => !i.guard && !i.id.endsWith(".greeting"))
    .map((intent, index) => ({ intent, index, priority: intent.priority ?? 0 }))
    .sort((a, b) => b.priority - a.priority || a.index - b.index)
    .map((entry) => entry.intent);
  const greetings = intents.filter((i) => i.id.endsWith(".greeting"));

  const hit = (intent: Intent) =>
    (intent.patterns?.some((re) => re.test(query)) ?? false) ||
    findToken(tokens, intent.keywords) !== undefined;

  const matched =
    guards.find(hit) ??
    substantive.find(hit) ??
    greetings.find(hit) ??
    intents[intents.length - 1];

  const variants = matched[language === "roman-urdu" ? "ru" : "en"];

  return {
    text: variants[seed % variants.length],
    language,
    intentId: matched.id,
  };
}

export const STUDY_AGENT_WELCOME = {
  english:
    "Hello! I'm StudiesHelper Agent, connected to StudentReminderAgent and MotivationAgent. Ask me about exam prep, study techniques, focus, time management or motivation — in English or Roman Urdu, whichever you prefer.",
  "roman-urdu":
    "Salam! Main StudiesHelper Agent hoon, StudentReminderAgent aur MotivationAgent se juda hua. Exam ki tayari, study techniques, focus, time management ya motivation — kisi bhi cheez ke baare mein poochein, English ya Roman Urdu, jo aapko theek lage.",
} as const;

export const WELLNESS_AGENT_WELCOME = {
  english:
    "Hello! I'm WellnessOracle Agent, connected to NutritionExpertAgent, InjurySupportAgent and EscalationAgent. Ask me about nutrition, fitness, recovery or healthy routines — in English or Roman Urdu. For medical emergencies please call 1122.",
  "roman-urdu":
    "Salam! Main WellnessOracle Agent hoon, NutritionExpertAgent, InjurySupportAgent aur EscalationAgent se juda hua. Khana, fitness, recovery ya sehat ki aadatein — kisi bhi cheez ke baare mein poochein, English ya Roman Urdu. Medical emergency mein 1122 par call karein.",
} as const;
