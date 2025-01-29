export interface QuizQuestion {
    questionText: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
  }
  
  export interface Quiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
  }