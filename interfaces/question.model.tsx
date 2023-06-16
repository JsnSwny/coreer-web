import { Profile } from "./profile.model";

export interface Question {
  id: number;
  text: string;
  question_type: "P" | "S" | "R";
}

export interface UserAnswer {
  id: number;
  user: Profile;
  question: Question;
  answer: string;
}

export interface UserAnswerRequest {
  user: number;
  question_id: number;
  answer: string;
}
