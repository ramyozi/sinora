import type { LocalizedText } from "@/data/cities/types";

export type ResourceType = "youtube" | "app" | "website" | "course";
export type ResourceLevel = "beginner" | "intermediate" | "advanced";

export interface LearningResource {
  slug: string;
  type: ResourceType;
  title: string;
  description: LocalizedText;
  url: string;
  level: ResourceLevel;
  /** Duree indicative ou format (15 min, 10h, course, ongoing). */
  duration?: LocalizedText;
  /** Ressource entierement gratuite. */
  free: boolean;
}

// Ressources curees, toutes verifiees existantes au moment du commit.
// Privilegie le contenu gratuit et open ; les apps freemium sont marquees free=true
// quand un palier d'usage utile existe sans abonnement.
export const learningResources: LearningResource[] = [
  // ===== YOUTUBE =====
  {
    slug: "mandarin-corner",
    type: "youtube",
    title: "Mandarin Corner",
    description: {
      fr: "Reportages immersifs en mandarin sous-titres pinyin et anglais. Idéal pour l'oral courant.",
      en: "Immersive Mandarin reportage with pinyin and English subtitles. Great for natural listening.",
      zh: "沉浸式普通话短片,附拼音与英文字幕,适合口语提升。",
    },
    url: "https://www.youtube.com/@MandarinCorner",
    level: "intermediate",
    duration: { fr: "Episodes 5-20 min", en: "5-20 min episodes", zh: "5-20 分钟单集" },
    free: true,
  },
  {
    slug: "mandarin-blueprint",
    type: "youtube",
    title: "Mandarin Blueprint",
    description: {
      fr: "Methode visuelle pour memoriser les caracteres via mnemoniques. Approche structuree.",
      en: "Visual mnemonic method to memorise characters. Structured approach.",
      zh: "用视觉助记记汉字,体系化教学。",
    },
    url: "https://www.youtube.com/@MandarinBlueprint",
    level: "beginner",
    duration: { fr: "Cours en serie", en: "Series course", zh: "系列课程" },
    free: true,
  },
  {
    slug: "yoyo-chinese",
    type: "youtube",
    title: "Yoyo Chinese",
    description: {
      fr: "Cours de prononciation, tons et phrases utiles avec Yangyang Cheng. Tres pedagogique.",
      en: "Pronunciation, tones and useful phrases with Yangyang Cheng. Highly pedagogical.",
      zh: "Yangyang Cheng 的发音、声调与实用短句课程。",
    },
    url: "https://www.youtube.com/@YoYoChineseOfficial",
    level: "beginner",
    duration: { fr: "Episodes 5-15 min", en: "5-15 min episodes", zh: "5-15 分钟单集" },
    free: true,
  },
  {
    slug: "chinesepod",
    type: "youtube",
    title: "ChinesePod",
    description: {
      fr: "Plus ancien podcast de mandarin. Episodes par niveau, contexte voyage et business.",
      en: "Oldest Mandarin podcast. Level-tiered episodes covering travel and business.",
      zh: "历史悠久的中文播客,按等级分集,涵盖旅行与商务场景。",
    },
    url: "https://www.youtube.com/@ChinesePodtv",
    level: "intermediate",
    duration: { fr: "Episodes 10-30 min", en: "10-30 min episodes", zh: "10-30 分钟单集" },
    free: true,
  },

  // ===== APPS =====
  {
    slug: "hellochinese",
    type: "app",
    title: "HelloChinese",
    description: {
      fr: "App mobile gamifiee, niveau debutant a HSK 4. Reconnaissance vocale.",
      en: "Gamified mobile app, beginner to HSK 4. Voice recognition.",
      zh: "游戏化手机应用,覆盖初级到 HSK 4,支持语音识别。",
    },
    url: "https://www.hellochinese.cc",
    level: "beginner",
    duration: { fr: "Apprentissage continu", en: "Ongoing practice", zh: "持续练习" },
    free: true,
  },
  {
    slug: "du-chinese",
    type: "app",
    title: "Du Chinese",
    description: {
      fr: "Histoires courtes avec audio natif et traduction tactile. Pour ancrer la lecture.",
      en: "Short stories with native audio and tap-to-translate. Builds reading endurance.",
      zh: "短篇故事配母语音频与点击翻译,锻炼阅读耐力。",
    },
    url: "https://www.duchinese.net",
    level: "intermediate",
    duration: { fr: "Lecture libre", en: "Free reading", zh: "自由阅读" },
    free: true,
  },
  {
    slug: "pleco-mentioned",
    type: "app",
    title: "Pleco",
    description: {
      fr: "Le dictionnaire chinois de reference (deja dans Apps). Recherche par trace, photo, OCR.",
      en: "The reference Chinese dictionary (already in Apps). Handwriting, photo and OCR lookup.",
      zh: "权威汉语词典(已收录于应用模块),手写、拍照与 OCR 查询。",
    },
    url: "https://www.pleco.com",
    level: "beginner",
    duration: { fr: "Outil", en: "Tool", zh: "工具" },
    free: true,
  },

  // ===== SITES GRATUITS =====
  {
    slug: "chinesefor-us",
    type: "website",
    title: "ChineseFor.Us",
    description: {
      fr: "Cours gratuits par Lili Ma, focus sur la grammaire et les caracteres.",
      en: "Free courses by Lili Ma, focused on grammar and characters.",
      zh: "Lili Ma 的免费课程,聚焦语法与汉字。",
    },
    url: "https://www.chinesefor.us",
    level: "beginner",
    duration: { fr: "Cours en ligne", en: "Online course", zh: "在线课程" },
    free: true,
  },
  {
    slug: "mandarin-bean",
    type: "website",
    title: "Mandarin Bean",
    description: {
      fr: "Articles graduels du HSK 1 au HSK 6 avec audio. Excellent pour la lecture intermediaire.",
      en: "Graded articles from HSK 1 to HSK 6 with audio. Excellent for intermediate reading.",
      zh: "HSK 1 至 6 分级文章配音频,中级阅读首选。",
    },
    url: "https://mandarinbean.com",
    level: "intermediate",
    duration: { fr: "Lecture libre", en: "Free reading", zh: "自由阅读" },
    free: true,
  },
  {
    slug: "hanzi-graph",
    type: "website",
    title: "Hanzi Graph",
    description: {
      fr: "Outil open-source qui visualise les composants des caracteres. Aide a memoriser les radicaux.",
      en: "Open-source tool that visualises character components. Helps memorise radicals.",
      zh: "开源工具,可视化汉字部件,助记部首。",
    },
    url: "https://hanzigraph.com",
    level: "beginner",
    duration: { fr: "Reference", en: "Reference", zh: "参考" },
    free: true,
  },

  // ===== COURS EXPRESS =====
  {
    slug: "mini-course-survival",
    type: "course",
    title: "Survival Chinese (Coursera)",
    description: {
      fr: "Cours universitaire gratuit pour comprendre les bases en 2-3 semaines : politesse, transport, commande.",
      en: "Free university course covering basics in 2-3 weeks: politeness, transport, ordering.",
      zh: "免费大学课程,2-3 周掌握礼仪、交通与点餐基础。",
    },
    url: "https://www.coursera.org/learn/mandarin-chinese-1",
    level: "beginner",
    duration: { fr: "2-3 semaines", en: "2-3 weeks", zh: "2-3 周" },
    free: true,
  },
];
