import { SlideMeta } from '../types';

export const SLIDES_CONFIG: SlideMeta[] = [
  {
    id: 'presentation',
    title: 'Vocabulary: Meaning → Pronunciation → Form',
    subtitle: '5 Words with Collocations & Video Suggestions',
    stage: 'Presentation',
    stageNumber: '1',
    iconName: 'Award',
    teacherTip: 'Teach chemistry (study chemistry), gymnastics (do gymnastics), chess (play chess), photography (do photography/take photos), trekking (go trekking). Elicit meaning from photo, reveal pronunciation & repeat, then highlight collocation.'
  },
  {
    id: 'listening',
    title: 'Ex 2 – Listening',
    subtitle: 'Listen and circle the hobbies & subjects you hear',
    stage: 'Listening',
    stageNumber: '2',
    iconName: 'Headphones',
    teacherTip: 'Play audio track once for students to scan and circle. Play a second time to verify. Reveal correct answers together and check the transcript.'
  },
  {
    id: 'team-game',
    title: 'TEAM HOBBY vs TEAM SUBJECT',
    subtitle: '1 Marker · 1 Minute · Relay Race Scoreboard',
    stage: 'Practice',
    stageNumber: '3',
    iconName: 'Trophy',
    teacherTip: 'Line up teams. One student writes one word on the board, then passes the marker. 1 pt for correct spelling, 2 pts for today’s vocab, 0 for duplicates or wrong category. Timer runs 60 seconds!'
  },
  {
    id: 'likes-table',
    title: 'Ex 6 – Likes / OK / Don’t like',
    subtitle: 'Elicit Ryan & Becky → 3-Column Opinion Scale',
    stage: 'Language Focus',
    stageNumber: '4',
    iconName: 'ThumbsUp',
    teacherTip: 'Ask: Ryan says "I’m not very keen on ice skating." Which column? (Don\'t like). Becky says "I don’t mind ice skating." Like or don\'t like? (OK). Then reveal the 3-column table.'
  },
  {
    id: 'pair-work',
    title: 'Pair Work: Opinion Exchanges',
    subtitle: 'A: What do you think of ___? B: I ___ What about you? A: I ___.',
    stage: 'Speaking',
    stageNumber: '5',
    iconName: 'Users',
    teacherTip: 'Keep speaking scaffold visible. Student A asks about an activity/subject on the board. Student B replies and asks back. Swap roles after 1 minute!'
  },
  {
    id: 'find-a-friend',
    title: 'Find a friend who…',
    subtitle: 'Classroom mingling survey with 3 different classmates',
    stage: 'Production',
    stageNumber: '6',
    iconName: 'Table',
    teacherTip: 'Students stand up with notes. They ask at least 3 classmates about what they like, hate, or don\'t mind, using the ASK & ANSWER support scaffold.'
  },
  {
    id: 'consolidation',
    title: 'Classroom Report',
    subtitle: '1–2 students report their survey findings to the class',
    stage: 'Consolidation',
    stageNumber: '7',
    iconName: 'PartyPopper',
    teacherTip: 'Select 1–2 students using "Pick a Reporter". Students deliver their 4-sentence summary using the provided structure.'
  }
];

export const OMITTED_SLIDES: SlideMeta[] = [
  {
    id: 'cover',
    title: 'Hobbies & Subjects',
    subtitle: 'Solution Intro 1A · Vocabulary & Speaking',
    stage: 'Welcome',
    stageNumber: '0',
    iconName: 'BookOpen',
    teacherTip: 'Display this title slide as students enter the room and prepare notebooks and pens.'
  },
  {
    id: 'lead-in',
    title: 'Hobbies we know',
    subtitle: 'Duck Race → Body language mime → Brainstorm',
    stage: 'Lead-in',
    stageNumber: '0',
    iconName: 'Sparkles',
    teacherTip: 'Run the Duck Race to pick an actor student. The student acts out one of the 6 target hobbies with body language only (no speaking). Class guesses. Then brainstorm: "Can you think of MORE hobbies?"'
  }
];

