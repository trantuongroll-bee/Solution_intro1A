export type SlideId =
  | 'cover'
  | 'lead-in'
  | 'presentation'
  | 'listening'
  | 'team-game'
  | 'likes-table'
  | 'pair-work'
  | 'find-a-friend'
  | 'consolidation';

export interface SlideMeta {
  id: SlideId;
  title: string;
  subtitle: string;
  stage: string;
  stageNumber: string;
  iconName: string;
  teacherTip?: string;
}

export interface VocabWord {
  id: string;
  word: string;
  phonetic: string;
  collocation: string;
  category: 'hobby' | 'subject';
  meaning: string;
  imageUrl: string;
  clipSuggestion: string;
  clipDetails: string;
  exampleSentence: string;
}

export interface ListeningItem {
  id: string;
  text: string;
  category: 'hobby' | 'subject';
  isHeard: boolean;
  timeMentioned?: string;
}

export interface ScoreState {
  hobby: number;
  subject: number;
}
