import { Question } from "../types/question";
import { questions } from "../data/questions";
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const res = await fetch("http://localhost:3000/data");
    if (!res.ok) throw new Error("Failed to fetch questions");

    const json = await res.json();

    if (Array.isArray(json?.questions)) {
      return json.questions;
    } else {
      return questions;
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    return questions;
  }
};
