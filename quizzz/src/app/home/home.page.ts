import { Component, OnInit } from '@angular/core';
import { Quiz } from '../Quizz/quizz.model';
import { QuizzService } from '../Quizz/quizz.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit { 
  quizList: Quiz[] = [];

  constructor(private quizService: QuizzService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.quizList = quizzes as Quiz[];
      console.log(this.quizList);
    });
  }

  ionViewWillEnter() {
    this.loadQuizzes();
  }

  async removeQuiz(id: string) {
    await this.quizService.deleteQuiz(id);
    this.quizList = this.quizList.filter(quiz => quiz.id !== id);
}
}
