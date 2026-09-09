export interface TargetAreaItem {
  id: string;
  text: string;
}

export interface TargetArea {
  id: string;
  title: string;
  items: TargetAreaItem[];
  color: string;
}

export interface PrincipleItem {
  number: number;
  title: string;
  description?: string;
  subPoints?: string[];
  quote?: string;
}

export interface PersonalLaw {
  lawNumber: number;
  title: string;
}

export interface DailyRoutineItem {
  time: string;
  title: string;
  description?: string;
  tag?: string;
  color?: string;
}

export interface PhysicalTrainingGroup {
  name: string;
  value: string;
  isOptional?: boolean;
}

export interface CoachingTest {
  duration: string;
  maths: string;
  physics: string;
  chemistry: string;
}

export interface DailyLogDay {
  dayNumber: number;
  totalDays: number;
  date: string;
  dayOfWeek: string;
  percentThroughCycle: number;
  isFreeDay?: boolean;
  freeDayNote?: string;
  isMilestone?: boolean;
  milestoneTitle?: string;
  coachingTest?: CoachingTest;
  academicTargets: string[];
  speedPracticeNote?: boolean;
  mentalTraining: {
    title: string;
    duration: string;
    note?: string;
  };
  cardioAndPushUps: PhysicalTrainingGroup[];
  coreLegsAndPull: PhysicalTrainingGroup[];
  eveningManifestation: string;
}

export type StudyTargetStatus = 'green' | 'yellow' | 'red';
export type PhysicalTargetStatus = 'green' | 'red';
