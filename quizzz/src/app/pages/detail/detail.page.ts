import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { DownloadService } from 'src/app/Download/download.service';
import { Quiz, QuizQuestion } from 'src/app/Quizz/quizz.model';
import { QuizzService } from 'src/app/Quizz/quizz.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DetailPage implements OnInit {

  quiz: Quiz | null = null;
  currentQuestionIndex = 0;
  userAnswers: number[] = [];
  quizCompleted = false;
  score = 0;

  constructor(
    private quizService: QuizzService, 
    private route: ActivatedRoute,
    private downloadService: DownloadService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizzById(quizId).subscribe(quiz => {
        this.quiz = quiz;
        this.userAnswers = new Array(quiz?.questions.length).fill(-1);
      });
    }
  }

  get currentQuestion(): QuizQuestion | undefined {
    return this.quiz?.questions[this.currentQuestionIndex];
  }

  get isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === (this.quiz?.questions.length ?? 0) - 1;
  }

  previousQuestion() {
    if (!this.isFirstQuestion) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (!this.isLastQuestion) {
      this.currentQuestionIndex++;
    }
  }

  selectAnswer(answerIndex: number) {
    this.userAnswers[this.currentQuestionIndex] = answerIndex;
  }

  async submitQuiz() {
    if (!this.quiz) return;

    let correctAnswers = 0;
    this.quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === this.userAnswers[index] + 1) {
        correctAnswers++;
      }
    });

    this.score = (correctAnswers / this.quiz.questions.length) * 100;
    this.quizCompleted = true;
  }

  isAnswerSelected(answerIndex: number): boolean {
    return this.userAnswers[this.currentQuestionIndex] === answerIndex;
  }

  async downloadResults() {
    try {
      if (this.quiz) {
        await this.downloadService.downloadQuizResults(this.quiz, this.score);
        
          const toast = await this.toastController.create({
            message: 'The results have been downloaded in your Documents folder',
            duration: 1500,
            position: 'top',
          });
      
          await toast.present();
      }
    } catch (error) {
      console.error('Error in downloadResults:', error);
    }
}

home() {
  this.router.navigate(['/home']);
}
}
