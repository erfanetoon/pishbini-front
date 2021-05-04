import { History } from 'history';

export type role = 'ADMIN' | 'USER' | 'GUEST';
export type isLogin = 'TRUE' | 'FALSE' | 'PENDING';
export type status = 'SUCCESS' | 'FAILED' | 'LOGOUT';

export interface childrenFunctionInterface {
  children: React.ReactNode;
  history?: History;
}

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  avatar: string;
  status: boolean;
  role: [role];
  competitions: [CompetitionInterface];
  pay: [PayInterface];
  titles: number;
}

export interface CompetitionInterface {
  id: string;
  price: number;
  image: string;
  champion: TeamInterface;
  winner: UserInterface;
  title: string;
  isFinish: boolean;
  url: string;
  activePeriod: PeriodInterface;
  teams: [TeamInterface];
  championPredictionDateTime: string;
}

export interface PeriodInterface {
  id: string;
  name: string;
  competition: CompetitionInterface;
  bestUser: UserInterface;
  bestUserPoint: number;
}

export interface MatchInterface {
  id: string;
  home: TeamInterface;
  away: TeamInterface;
  matchDateTime: string;
  homeGoal: number;
  awayGoal: number;
  period: string;
  sentDateTime: string;
  myPrediction: PredictionInterface;
  myPoint: number;
}

export interface TeamInterface {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  status: boolean;
}

export interface PredictionInterface {
  id: string;
  user: UserInterface;
  match: MatchInterface;
  homeGoal: number;
  awayGoal: number;
}

export interface PayInterface {
  competition: CompetitionInterface;
  status: boolean;
}

export interface TableInterface {
  user: UserInterface;
  point: number;
}

export interface ChampionInterface {
  point: number;
  myPrediction: TeamInterface;
}

export interface PredictionsInterface {
  user: UserInterface;
  point: number;
  myPredictionScore: PredictionInterface;
  myPredictionChampion: TeamInterface;
}

export interface JobInterface {
  title: string;
  status: boolean;
  description: string;
  phone: string;
  link: string;
}

export interface TitleInterface {
  id: string;
  competition: CompetitionInterface;
  user: UserInterface;
}

export interface SettingInterface {
  servicePrice: number;
}

export interface TableDetails {
  exact: number;
  difference: number;
  winner: number;
  wrong: number;
  empty: number;
  champion: boolean;
}

export interface Output {
  status: status;
  message?: string;
  token?: string;
  user?: UserInterface;
  users?: [UserInterface];
  competitions?: [CompetitionInterface];
  competition?: CompetitionInterface;
  period?: PeriodInterface;
  periods?: [PeriodInterface];
  matches?: [MatchInterface];
  match?: MatchInterface;
  predictions?: [PredictionsInterface];
  champion?: ChampionInterface;
  table?: [TableInterface];
  tableDetails?: TableDetails;
  job?: JobInterface;
  jobs?: [JobInterface];
  titles?: [TitleInterface];
  winners?: [UserInterface];
  settings?: SettingInterface;
  teams?: [TeamInterface];
}
