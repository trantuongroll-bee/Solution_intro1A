import { VocabWord, ListeningItem } from '../types';

export const LEAD_IN_MIME_HOBBIES = [
  { id: 'swimming', title: 'swimming', emoji: '🏊‍♂️', hint: 'Moving through water using arms and legs', category: 'water sport' },
  { id: 'flying-a-kite', title: 'flying a kite', emoji: '🪁', hint: 'Holding a string as something flies high in the wind', category: 'outdoor' },
  { id: 'drawing', title: 'drawing', emoji: '🎨', hint: 'Making pictures with pencil, pen or crayons', category: 'art' },
  { id: 'dancing', title: 'dancing', emoji: '💃', hint: 'Moving your body rhythmically to music', category: 'performance' },
  { id: 'reading', title: 'reading', emoji: '📖', hint: 'Looking at words in a book or comic', category: 'leisure' },
  { id: 'playing-games', title: 'playing games', emoji: '🎮', hint: 'Using a controller, mobile phone or console', category: 'indoor' },
];

export const MORE_HOBBY_IDEAS = [
  'cooking',
  'playing football',
  'riding a bicycle',
  'singing',
  'gardening',
  'doing martial arts',
  'making models',
  'skateboarding'
];

export const VOCABULARY_LIST: VocabWord[] = [
  {
    id: 'chemistry',
    word: 'chemistry',
    phonetic: '/ˈkemɪstri/',
    collocation: 'study chemistry',
    category: 'subject',
    meaning: 'The scientific study of substances and what happens when they combine or react.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    clipSuggestion: 'School Lab: Colorful Chemical Reactions (30s clip)',
    clipDetails: 'Teacher mixes sodium bicarbonate with vinegar producing fizzing colored foam.',
    exampleSentence: 'I study chemistry in the science lab on Tuesday mornings.'
  },
  {
    id: 'gymnastics',
    word: 'gymnastics',
    phonetic: '/dʒɪmˈnæstɪks/',
    collocation: 'do gymnastics',
    category: 'hobby',
    meaning: 'Physical exercises on mats, bars, and beams that develop balance, agility, and strength.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    clipSuggestion: 'Teen Gymnastics: Balance Beam & Floor Routine (20s clip)',
    clipDetails: 'A young gymnast performing a cartwheel and handstand with perfect balance.',
    exampleSentence: 'Maya and her friends do gymnastics after school twice a week.'
  },
  {
    id: 'chess',
    word: 'chess',
    phonetic: '/tʃes/',
    collocation: 'play chess',
    category: 'hobby',
    meaning: 'A board game of strategic skill for two players played on a checkered board of 64 squares.',
    imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
    clipSuggestion: 'Blitz Chess Match: Quick Thinking & Checkmate (25s clip)',
    clipDetails: 'Two students playing a fast, exciting chess duel in the school library.',
    exampleSentence: 'Do you want to play chess with me during the lunch break?'
  },
  {
    id: 'photography',
    word: 'photography',
    phonetic: '/fəˈtɒɡrəfi/',
    collocation: 'do photography / take photos',
    category: 'hobby',
    meaning: 'The hobby or art of taking and processing photographs with a camera or smartphone.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    clipSuggestion: 'Photography Basics: Framing Wildlife & City Nature (30s clip)',
    clipDetails: 'Photographer adjusting the focus ring and capturing a bird taking flight.',
    exampleSentence: 'He loves to do photography and take photos of nature in the park.'
  },
  {
    id: 'trekking',
    word: 'trekking',
    phonetic: '/ˈtrekɪŋ/',
    collocation: 'go trekking',
    category: 'hobby',
    meaning: 'Going on a long, strenuous journey on foot over mountains, forests, and wild trails.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80',
    clipSuggestion: 'Mountain Trekking: Packing Backpacks & Crossing Trails (30s clip)',
    clipDetails: 'Hikers with trekking poles and backpacks walking through a scenic green pine forest.',
    exampleSentence: 'Every summer my family goes trekking in the national park.'
  }
];

export const LISTENING_EXERCISE_ITEMS: ListeningItem[] = [
  { id: 'skateboarding', text: 'go skateboarding', category: 'hobby', isHeard: true, timeMentioned: '0:14' },
  { id: 'ice-skating', text: 'ice skating', category: 'hobby', isHeard: true, timeMentioned: '0:26' },
  { id: 'bowling', text: 'bowling', category: 'hobby', isHeard: true, timeMentioned: '0:35' },
  { id: 'math', text: 'math', category: 'subject', isHeard: false, timeMentioned: 'Not mentioned' },
  { id: 'history', text: 'history', category: 'subject', isHeard: true, timeMentioned: '0:07' },
  { id: 'pe', text: 'PE', category: 'subject', isHeard: true, timeMentioned: '0:04' },
];

export const LISTENING_AUDIO_SCRIPT = [
  { speaker: 'Teacher', text: 'Welcome back, everyone! What subjects do you have on your timetable this morning?' },
  { speaker: 'Liam', text: 'Well, first we have PE in the gym, and then we have history with Mrs. Jenkins!' },
  { speaker: 'Teacher', text: 'Great! And what about after school? Any exciting hobbies today?' },
  { speaker: 'Liam', text: 'Yes! Mark and I are going to go skateboarding at the skatepark.' },
  { speaker: 'Chloe', text: 'I am going ice skating with my sister, and then on Saturday we are going bowling!' },
  { speaker: 'Teacher', text: 'Sounds like fun! Have a wonderful afternoon!' }
];

export const LIKES_COLUMNS_DATA = {
  like: {
    title: 'LIKE',
    emoji: '👍',
    color: 'emerald',
    phrases: [
      { text: 'I love…', example: 'I love playing chess.' },
      { text: 'I like…', example: 'I like photography.' },
      { text: "I'm keen on…", example: "I'm keen on trekking in the mountains." }
    ]
  },
  ok: {
    title: 'OK',
    emoji: '😐',
    color: 'amber',
    phrases: [
      { text: "I don't mind…", example: "I don't mind studying chemistry." }
    ]
  },
  dontLike: {
    title: "DON'T LIKE",
    emoji: '👎',
    color: 'rose',
    phrases: [
      { text: "I don't like…", example: "I don't like gymnastics." },
      { text: 'I hate…', example: 'I hate getting up early for math.' },
      { text: "I'm not keen on…", example: "I'm not keen on ice skating." },
      { text: '… is terrible.', example: 'Bowling is terrible!' }
    ]
  }
};

export const WORD_BANK_FOR_PRACTICE = [
  { name: 'studying chemistry', type: 'subject' },
  { name: 'doing gymnastics', type: 'hobby' },
  { name: 'playing chess', type: 'hobby' },
  { name: 'doing photography', type: 'hobby' },
  { name: 'going trekking', type: 'hobby' },
  { name: 'going skateboarding', type: 'hobby' },
  { name: 'ice skating', type: 'hobby' },
  { name: 'bowling', type: 'hobby' },
  { name: 'history', type: 'subject' },
  { name: 'PE', type: 'subject' },
  { name: 'math', type: 'subject' },
  { name: 'flying a kite', type: 'hobby' }
];
