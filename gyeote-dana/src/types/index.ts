export interface Program {
  id: string;
  title: string;
  org: string;
  region: string;
  mode: string;
  motive: string[];
  status: '현재 신청 가능' | '모집 예정' | '마감';
  period: string;
  support: string[];
  deadline: string;
  duration: string;
  spots: number;
  spotsLeft: number;
  cover: string;
  tag: string;
  summary: string;
  detail: string;
  bullets: string[];
}

export interface Review {
  id: string;
  handle: string;
  program: string;
  body: string;
  weeks: string;
  color: string;
}

export interface Support {
  id: string;
  cat: string;
  title: string;
  org: string;
  amount: string;
  body: string;
}

export interface FilterState {
  region: string;
  motive: string;
  mode: string;
  period: string;
  support: string;
  status: string;
}

export type ViewMode = 'grid' | 'list';
export type AppTab = 'home' | 'support' | 'my' | 'community' | 'notice';
